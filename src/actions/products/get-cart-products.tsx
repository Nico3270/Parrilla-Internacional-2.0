"use server"

// src/app/actions/getCartProducts.ts
import prisma from "@/lib/prisma";
import { CartProduct } from "@/interfaces";

export async function getCartProducts(cartItems: CartProduct[]) {
  const productIds = cartItems.map((item) => item.id);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: {
      id: true,
      titulo: true,
      precio: true,
      slug: true,
    },
  });

  return products;
}
