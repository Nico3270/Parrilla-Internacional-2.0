"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

interface ProductToOrder {
  productId: string;
  quantity: number;
  extras: {
    name: string;
    price: number;
  }[];
  comentario: string;
}

interface FormInputs {
  name: string;
  address: string;
  city: string;
  department: string;
  phone: string;
  description?: string;
}

interface OrderItemInput {
  productId: string;
  quantity: number;
  price: number;
  extras: string; // Manejar extras como JSON string
  comentario: string
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: FormInputs | null,
  preference: string,
  mesa?: string
) => {
  // Obtener la sesión del usuario
  const session = await auth();
  const email = session?.user.email;

  if (!email) {
    return {
      ok: false,
      message: "No se pudo obtener el correo electrónico del usuario",
    };
  }

  // Buscar el usuario en la base de datos usando el correo electrónico
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      ok: false,
      message: "Usuario no encontrado en la base de datos",
    };
  }

  // Obtener el userId del usuario autenticado
  const userId = user.id;

  // Obtener los productos desde la base de datos usando los IDs de `productIds`
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular el precio total de la orden usando la lógica que proporcionaste
  const { totalPrice, orderItems } = productIds.reduce(
    (acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Producto con id ${item.productId} no encontrado`);

      // Sumar las personalizaciones al precio base y multiplicar por la cantidad
      const totalAdiciones = item.extras.reduce((sum, option) => sum + option.price, 0);
      const itemTotal = (product.precio + totalAdiciones) * item.quantity;

      acc.totalPrice += itemTotal;

      acc.orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: itemTotal, // Precio total del producto con personalizaciones
        extras: JSON.stringify(item.extras), // Guardar los extras como JSON string
        comentario: item.comentario || "",  // Añadir el comentario opcional
      });

      return acc;
    },
    { totalPrice: 0, orderItems: [] as OrderItemInput[] } // Inicializar el acumulador
  );

  try {
    // Iniciar una transacción con Prisma
    const result = await prisma.$transaction(async (tx) => {
      let createdAddress;

      // Crear la dirección si la preferencia es "delivery"
      if (preference === "delivery" && address) {
        createdAddress = await tx.address.create({
          data: {
            name: address.name,
            address: address.address,
            city: address.city,
            department: address.department,
            phone: address.phone,
            description: address.description ?? null, // Campo opcional
          },
        });
      }

      // Crear la orden
      const order = await tx.order.create({
        data: {
          userId: userId,
          preference: preference === "delivery" ? "DELIVERY" : "RESTAURANT",
          mesa: preference === "restaurant" ? mesa : null,
          status: "CREADA",
          orderItems: {
            create: orderItems,
          },
          totalPrice: totalPrice, // Usar el precio total calculado
          addressId: createdAddress ? createdAddress.id : undefined,
        },
      });

      // Crear el historial del estado inicial de la orden
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          status: "CREADA",
          changedById: userId,
        },
      });

      return { order, createdAddress };
    });

    return {
      ok: true,
      orderId: result.order.id,
      message: "Orden creada exitosamente",
    };
  } catch (error: any) {
    console.error("Error detallado creando la orden:", error.message);
    return {
      ok: false,
      message: `Hubo un problema al crear la orden: ${error.message}`,
    };
  }
};
