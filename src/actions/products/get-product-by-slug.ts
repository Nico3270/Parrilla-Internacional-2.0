"use server"

import prisma from "@/lib/prisma";
import { SeccionEnum, TipoEnum } from "@/interfaces"; // Asegúrate de importar ambos enums

export const getProductBySlug = async (slug: string) => {
  console.log("Fetching product for slug:", slug);

  try {
    // Obtener el producto por slug, incluyendo las relaciones de sección, tipo y reviews
    const product = await prisma.product.findFirst({
      where: { slug },
      include: {
        productImages: { select: { url: true } },
        section: { select: { name: true } },  // Obtener el nombre de la sección
        type: { select: { name: true } },     // Obtener el nombre del tipo
        reviews: {                            // Incluir las reviews del producto
          select: {
            username: true,
            comment: true,
            rating: true,
            date: true,
          },
        },
        customizationOptions: {
          include: {
            extras: {
              select: {
                extra: {
                  select: { name: true, price: true },
                },
              },
            },
            choices: true,
          },
        },
      },
    });

    console.log("Product fetched from database:", product);

    // Si no encuentra el producto, retorna null
    if (!product) {
      console.error("Product not found for slug:", slug);
      return null;
    }

    // Formatear el producto
    const formattedProduct = {
      ...product,
      images: product.productImages.map((img) => img.url), // Convertir productImages a un array de URLs
      seccion: SeccionEnum[product.section?.name as keyof typeof SeccionEnum] || SeccionEnum.PLATOS_FUERTES,  // Asegura que seccion sea un valor del enum
      tipo: TipoEnum[product.type?.name as keyof typeof TipoEnum] || TipoEnum.COMIDA,   
      shortDescription: product.shortDescription ?? undefined,
      discountPrice: product.discountPrice ?? undefined,
      description: product.description ?? "",
      priority: product.priority ?? undefined,
      featured: product.featured ?? undefined,
      isAvailableDuring: product.isAvailableDuring 
        ? (product.isAvailableDuring as { start: string; end: string }) 
        : undefined, // Asegurarse de que sea un objeto válido o undefined
      customizationOptions: product.customizationOptions
        ? {
            extras: product.customizationOptions.extras.map((extra) => ({
              name: extra.extra.name,
              price: extra.extra.price,
            })),
            choices: product.customizationOptions.choices,
          }
        : undefined,
      // Convertimos la fecha de `Date` a `string`
      reviews: product.reviews.map((review) => ({
        ...review,
        date: review.date.toISOString().split('T')[0],  // Convertimos la fecha a formato `YYYY-MM-DD`
      })),
    };

    // Obtener productos similares
    const similarProducts = await prisma.product.findMany({
      where: {
        sectionId: product.sectionId, // Filtrar por la misma sección
        id: { not: product.id },      // Excluir el producto actual
      },
      take: 4, // Limitar a 4 productos
      include: {
        productImages: { select: { url: true } },
        section: { select: { name: true } },  // Incluir nombre de la sección en los productos similares
        type: { select: { name: true } },     // Incluir nombre del tipo en los productos similares
      },
    });

    // Formatear los productos similares
    const formattedSimilarProducts = similarProducts.map((prod) => ({
      ...prod,
      images: prod.productImages.map((img) => img.url), // Convertir las imágenes a un array de URLs
      seccion: SeccionEnum[prod.section?.name as keyof typeof SeccionEnum] || SeccionEnum.PLATOS_FUERTES,
      tipo: TipoEnum[prod.type?.name as keyof typeof TipoEnum] || TipoEnum.COMIDA,
      shortDescription: prod.shortDescription ?? undefined,
      discountPrice: prod.discountPrice ?? undefined,
      priority: prod.priority ?? undefined,
      featured: prod.featured ?? undefined,
      isAvailableDuring: prod.isAvailableDuring 
        ? (prod.isAvailableDuring as { start: string; end: string }) 
        : undefined,
    }));

    return { product: formattedProduct, similarProducts: formattedSimilarProducts };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Error al obtener producto por slug");
  }
};
