"use server"
// src/actions/getCartProducts.ts
import prisma from "@/lib/prisma";
import { CartProduct } from "@/interfaces";

// Server Action para obtener productos del carrito desde la base de datos
export async function fetchProductsForCartFromDB(cartItems: CartProduct[]) {
  const updatedCartItems = await Promise.all(
    cartItems.map(async (item) => {
      const productFromDb = await prisma.product.findUnique({
        where: { id: item.id },  // Buscamos el producto por su ID en la base de datos
        include: {
          customizationOptions: {
            include: {
              extras: {
                include: {
                  extra: true,  // Incluimos los extras de personalización
                },
              },
            },
          },
        },
      });

      if (productFromDb) {
        return {
          ...item,
          opcionesDisponibles: productFromDb.customizationOptions?.extras.map(extraRelation => ({
            name: extraRelation.extra.name,
            price: extraRelation.extra.price,
          })) || [],  // Obtenemos las opciones disponibles del producto
          opcionesPersonalizacion: item.opcionesPersonalizacion || [],  // Mantenemos las personalizaciones elegidas
        };
      }

      return item;  // Si no encontramos el producto en la BD, devolvemos el item tal cual
    })
  );

  return updatedCartItems;  // Devolvemos el array de productos con sus opciones de personalización
}