"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersAdmin = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return {
      ok: false,
      message: "Debe estar autenticado",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email, // Buscar el usuario por su correo
      },
    });

    if (!user || user.role !== 'admin') {  // Validar si es admin
      return {
        ok: false,
        message: "Usuario no autorizado",
      };
    }

    // Consultar todas las órdenes y ordenarlas por fecha de creación (las más recientes primero)
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc", // Ordenar por la columna 'createdAt' de forma descendente
      },
      include: {
        user: {
          select: { name: true },  // Incluir solo el nombre del usuario
        },
        orderItems: true, // Incluir los items de la orden si los necesitas
        address: true,    // Incluir la dirección si es necesario
      },
    });

    return {
      ok: true,
      message: "Órdenes extraídas exitosamente",
      orders: orders,
      usuario: { NameUser: user.name, userId: user.id }, // Aseguramos que userId también esté presente
      role: { userRole: user.role },
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Se produjo un error al obtener las órdenes",
    };
  }
};
