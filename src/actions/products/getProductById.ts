"use server";

// src/lib/product-actions.ts
import prisma from "@/lib/prisma";

// Cambiamos de buscar por id a buscar por slug
export async function getProductBySlugPrueba(productSlug: string) {
  try {
    console.log("Buscando producto con slug:", productSlug);

    const product = await prisma.product.findUnique({
      where: {
        slug: productSlug,
      },
      include: {
        customizationOptions: {
          include: {
            extras: {
              include: {
                extra: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      console.log("Producto no encontrado con slug:", productSlug);
    } else {
      console.log("Producto encontrado:", product);
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
