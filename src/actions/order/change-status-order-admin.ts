// action.ts
"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client"; // Importar el enum

export const changeStatusOrderAdmin = async (orderId: string, newStatus: OrderStatus, userId: string) => {
  try {
    // Actualizar el estado de la orden
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }, // Usar el tipo OrderStatus
    });

    // Registrar el cambio de estado en el historial
    await prisma.orderStatusHistory.create({
      data: {
        orderId: orderId,
        status: newStatus, // Usar el tipo OrderStatus
        changedById: userId, // El usuario que realiza el cambio
      },
    });

    return {
      ok: true,
      message: "El estado de la orden ha sido actualizado correctamente",
      updatedOrder,
    };
  } catch (error) {
    console.error("Error al actualizar el estado de la orden:", error);
    return {
      ok: false,
      message: "Hubo un error al actualizar el estado de la orden",
    };
  }
};
