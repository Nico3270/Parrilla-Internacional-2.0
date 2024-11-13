"use server";

import prisma from "@/lib/prisma";

export const fetchProductsfromDbAction = async () => {
  try {
    const productsFromDbAction = await prisma.product.findMany({
      include: {
        customizationOptions: {
          include: {
            extras: {
              include: {
                extra: true,  // Incluimos las opciones extras de personalización
              },
            },
          },
        },
      },
    });
    return {
      ok: true,
      message: "Productos extraídos correctamente",
      productos: productsFromDbAction,
    };
  } catch (error) {
    console.error("Error al extraer los productos:", error);
    return {
      ok: false,
      message: "Se presentó un error al buscar los productos",
      error: error.message, // También incluimos el mensaje del error para debug
    };
  }
};
