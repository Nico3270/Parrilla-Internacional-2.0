"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrdersKitchen = async () => {
  const session = await auth();
  if (!session?.user.email) {
    return {
      ok: false,
      message: "Debe estar autenticado",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        role: true,
        id: true,
      },
    });

    if (!user || (user.role !== "kitchen" && user.role !== "admin")) {
      return {
        ok: false,
        message: "Debe ser un usuario de cocina o administrador",
      };
    }

    // Incluir 'mesa' en la consulta y extraer los nombres de los productos
    const ordersKitchen = await prisma.order.findMany({
      where: {
        status: { in: ["CREADA", "EN_PREPARACION", "ENTREGADA", "CANCELADA", "DOMICILIO"] },
      },
      select: {
        id: true,
        mesa: true, // Incluir la mesa
        status: true,
        totalPrice: true,
        createdAt: true,
        user: { select: { name: true } },
        orderItems: {
          select: {
            id: true,
            orderId: true,
            productId: true,
            quantity: true,
            price: true,
            extras: true,
            comentario: true,
            product: {
              select: {
                titulo: true, // Extraer el nombre del producto
              }
            }
          },
        },
        address: true, // Incluye dirección si lo necesitas
        preference: true, // Asegúrate de incluir el campo `preference`
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      ok: true,
      message: "Órdenes de cocina obtenidas",
      ordersKitchen: ordersKitchen,
      userName: user.name,
      role: user.role,
      userId: user.id,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Se produjo el siguiente error: ${error}`,
    };
  }
};
