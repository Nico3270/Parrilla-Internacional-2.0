"use server";

import prisma from "@/lib/prisma";

// Definir el tipo de la respuesta que esperas obtener
interface OrderResponse {
  id: string;
  status: string;
  preference: string;
  mesa: string | null;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: {
    product: {
      titulo: string;
      description: string;
      productImages: { url: string }[];
    };
    quantity: number;
    price: number;
    extras: string | null; // extras puede ser un JSON o nulo
  }[];
  address: {
    name: string;
    address: string;
    city: string;
    phone: string;
  } | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  statusHistory: {
    status: string;
    changedAt: Date;
    changedBy: {
      name: string;
    } | null; // Puede ser nulo si no hay información del usuario que hizo el cambio
  }[];
}

export const getOrderById = async (orderId: string) => {
  try {
    const resp = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                productImages: true, // Para obtener imágenes del producto
              },
            },
          },
        },
        address: true, // Incluye dirección si necesitas esos detalles
        user: true, // Incluye la información del usuario
        // Incluir historial de estados
        statusHistory: {
          orderBy: {
            changedAt: 'asc', // Ordena cronológicamente
          },
          include: {
            changedBy: true, // Incluye el usuario que realizó el cambio
          },
        },
      },
    });

    // Verificar si la respuesta es nula
    if (!resp) {
      return {
        ok: false,
        message: `La orden con id ${orderId} no fue encontrada`,
      };
    }

    return {
      ok: true,
      respuesta: resp as OrderResponse, // Aseguramos que el tipo sea correcto
      message: "Orden encontrada",
    }; 
  } catch (error) {
    console.log("Error fetching order:", error);
    return {
      ok: false,
      message: `La orden con id ${orderId} no fue encontrada`,
      error: `Mensaje de error: ${error}`,
    };
  }
};
