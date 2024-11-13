"use server"
import { CartProduct } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getProductsFromCart = async (cartItems: CartProduct[]): Promise<CartProduct[]> => {
  const productIds = cartItems.map(item => item.id);

  const productsFromDb = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: {
      id: true,
      titulo: true,
      precio: true,
      slug: true,
    },
  });

  // Combinar los productos de la base de datos con los detalles del carrito
  const enrichedCartProducts = cartItems.map(cartItem => {
    const productFromDb = productsFromDb.find(product => product.id === cartItem.id);

    if (!productFromDb) {
      throw new Error(`Producto no encontrado para el ID: ${cartItem.id}`);
    }

    return {
      ...cartItem,
      title: productFromDb.titulo,
      price: productFromDb.precio,
      slug: productFromDb.slug,
      image: cartItem.image,  // Mantén la imagen que ya tienes
      opcionesPersonalizacion: cartItem.opcionesPersonalizacion,  // Mantén las opciones de personalización
      comentario: cartItem.comentario,  // Mantén el comentario si existe
    };
  });

  return enrichedCartProducts;
};