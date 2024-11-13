"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  // Obtener la sesión del usuario
  const session = await auth();

  // Verificar si el usuario está autenticado
  if (!session?.user?.email) {
    return {
      ok: false,
      message: "Debe estar autenticado",
    };
  }

  try {
    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email, // Buscar el usuario por su correo
      },
    });

    if (!user) {
      return {
        ok: false,
        message: "Usuario no encontrado en la base de datos",
      };
    }
    const NameUser = user.name;
    const userRole = user.role;

    // Buscar todas las órdenes del usuario autenticado por su userId
    const orders = await prisma.order.findMany({
      where: {
        userId: user.id, // Buscar las órdenes según el ID del usuario encontrado
      },
      orderBy: {
        createdAt: "desc", // Ordenar por la columna 'createdAt' de forma descendente
      },
      include: {
        orderItems: true, // Incluir los detalles de los items de la orden
        address: true,    // Incluir la dirección, si es necesario
      },
    });

    if (orders.length === 0) {
      return {
        ok: false,
        message: "No tienes órdenes registradas",
        
      };
    }

    return {
      ok: true,
      usuario: {NameUser},
      role : {userRole},
      orders, // Devolver las órdenes encontradas
      message: "Órdenes encontradas",
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      ok: false,
      message: "Error al buscar las órdenes",
      
    };
  }
};
