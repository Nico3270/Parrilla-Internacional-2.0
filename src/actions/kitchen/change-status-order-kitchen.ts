"use server"


import prisma from "@/lib/prisma";
import { OrderStatus } from '@prisma/client';




export const ChangeStatusOrderKitchen = async (orderId: string, statusToChange: OrderStatus, userId: string) => {
  try {
    // Cambiar el estado de la orden en la base de datos
    const orderStatusChange = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: statusToChange, // Actualiza el estado de la orden
      },
    });

    // Registrar el cambio de estado en el historial
    await prisma.orderStatusHistory.create({
      data: {
        orderId: orderId,
        status: statusToChange, // El estado cambiado
        changedById: userId, // Quién cambió el estado
      },
    });

    return {
      ok: true,
      message: "El estado de la orden fue actualizado correctamente",
      orderStatusChange,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Se produjo el siguiente error: ${error}`,
    };
  }
};
