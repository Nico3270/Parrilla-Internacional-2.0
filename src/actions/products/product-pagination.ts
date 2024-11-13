"use server";

import prisma from "@/lib/prisma";
import { SeccionEnum, TipoEnum } from "@/interfaces";

interface PaginationOptions {
  page?: number;
  take?: number;
  id?: string; // Nombre de la sección o undefined si no se filtra por sección
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  id, // Este es el nombre de la sección o undefined si no se filtra
}: PaginationOptions) => {
  // Validación de la página
  page = Number(page);
  if (isNaN(page) || page < 1) page = 1;

  let sectionId;

  try {
    // Si se proporciona un id, buscar el sectionId basado en el nombre de la sección
    if (id) {
      const section = await prisma.section.findUnique({
        where: { name: id },
      });

      // Si no se encuentra la sección, retornar un array vacío
      if (!section) {
        return {
          products: [],
          currentPage: page,
          totalPages: 0,
        };
      }

      sectionId = section.id; // Guardar el sectionId para usar en la consulta
    }

    // Paso 1. Obtener los productos con paginación, con o sin filtro de sección
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        productImages: {
          take: 2,
          select: { url: true },
        },
        section: true,
        type: true,
      },
      where: {
        ...(sectionId ? { sectionId } : {}), // Solo filtrar por sectionId si está presente
      },
    });

    // Paso 2. Obtener el total de páginas
    const totalCount = await prisma.product.count({
      where: {
        ...(sectionId ? { sectionId } : {}), // Solo contar con el filtro si hay sectionId
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    // Paso 3. Formatear los productos
    const formattedProducts = products.map((product) => {
      // Verificar que la sección y tipo existan y sean válidos
      const seccion =
        SeccionEnum[product.section?.name?.toUpperCase() as keyof typeof SeccionEnum] ||
        SeccionEnum.PLATOS_FUERTES; // Valor por defecto en caso de error

      const tipo =
        TipoEnum[product.type?.name?.toUpperCase() as keyof typeof TipoEnum] ||
        TipoEnum.COMIDA; // Valor por defecto en caso de error

      let isAvailableDuring;
      if (product.isAvailableDuring && typeof product.isAvailableDuring === "object") {
        const { start, end } = product.isAvailableDuring as { start: string; end: string };
        isAvailableDuring = { start, end };
      } else {
        isAvailableDuring = undefined;
      }

      return {
        id: product.id,
        titulo: product.titulo,
        description: product.description,
        shortDescription: product.shortDescription ?? undefined,
        images: product.productImages.map((image) => image.url),
        available: product.available,
        precio: product.precio,
        discountPrice: product.discountPrice || 0,
        slug: product.slug,
        tags: product.tags,
        priority: product.priority ?? undefined,
        featured: product.featured ?? undefined,
        isAvailableDuring,
        seccion, // Asegura que seccion sea del tipo SeccionEnum
        tipo, // Asegura que tipo sea del tipo TipoEnum
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });

    return {
      products: formattedProducts,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching products", error);

    // En caso de error, devolver un objeto vacío pero consistente con la estructura esperada
    return {
      products: [],
      currentPage: page,
      totalPages: 0,
    };
  }
};
