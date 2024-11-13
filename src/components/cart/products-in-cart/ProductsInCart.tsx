"use client";

import React from "react";
import { CartProductCard } from "@/components";
import { useCartStore } from "@/store";

interface ProductsInCartProps {
  productsPersonalization: { id: string; opcionesDisponibles: { name: string; price: number }[] }[];
}

export const ProductsInCart: React.FC<ProductsInCartProps> = ({ productsPersonalization }) => {
  const cartItems = useCartStore((state) => state.cart); // Obtenemos el carrito del estado del cliente (Zustand)

  // Iteramos sobre los productos del carrito y comparamos con los del array productsPersonalization
  const formattedCartItems = cartItems.map((cartItem) => {
    // Buscamos las opciones de personalización para este producto en el array productsPersonalization
    const productPersonalization = productsPersonalization.find(
      (product) => product.id === cartItem.id
    );

    return {
      ...cartItem,  // Mantenemos las propiedades del carrito
      opcionesDisponibles: productPersonalization?.opcionesDisponibles || [],  // Asignamos las opciones disponibles si existen
    };
  });

  return (
    <div className="flex flex-col gap-6"> {/* Cambiamos el grid por flex-col */}
      {formattedCartItems.map((item, index) => (
        <CartProductCard key={index} product={item} />
      ))}
    </div>
  );
};
