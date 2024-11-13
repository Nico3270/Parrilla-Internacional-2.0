"use client";

import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore, useOrderStore } from "@/store"; // Asegúrate de importar correctamente el store
import { PacificoFont } from "../../config/fonts";

export const CartCheckout = () => {
  const cartItems = useCartStore((state) => state.cart); // Obtener los productos del carrito
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isMounted, setIsMounted] = useState(false); // Verificar si el cliente está montado
  const orderCreated = useOrderStore((state) => state.orderCreated)

  useEffect(() => {
    setIsMounted(true); // Marcamos que el componente ya está montado
  }, []);

  // Si no hay productos, redirigir al usuario
  useEffect(() => {
    if (isMounted && totalItems === 0 && !orderCreated) {
      window.location.href = "/empty"; // Redirigir si el carrito está vacío
    }
  }, [isMounted, totalItems, orderCreated]);

  // No renderiza nada si el cliente no está montado o si no hay productos
  if (!isMounted || totalItems === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Link
        href="/cart"
        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 hover:text-red-600 transition-all duration-300 ease-in-out shadow-lg"
      >
        <FaEdit className="mr-2" />
        Editar carro de compras
      </Link>

      {/* Lista de productos (mostrando del último al primero) */}
      {cartItems.slice().reverse().map((product, index) => (
        <div
          key={index}
          className="flex border rounded-lg shadow-md p-4 items-center space-x-4"
        >
          {/* Imagen del producto */}
          <Image
            src={`/imgs/${product.image}`} // Aquí usas el campo "image" del CartProduct
            alt={product.title}
            width={150}
            height={150}
            className="rounded-lg"
          />

          {/* Detalles del producto */}
          <div className="flex-1">
            <h2 className="text-lg font-bold">{product.title}</h2>

            {/* Extras (mostrar solo si hay extras) */}
            {product.opcionesPersonalizacion.length > 0 && (
              <p className="text-sm mt-2">
                <span className="font-bold">Extras:</span>{" "}
                {product.opcionesPersonalizacion.map((extra, i) => (
                  <span key={i}>
                    {extra.name} (+${extra.price})
                    {i < product.opcionesPersonalizacion.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}

            {/* Comentario opcional */}
            {product.comentario && (
              <p className="text-sm mt-2">
                <span className="font-bold">Comentario: </span>
                {product.comentario}
              </p>
            )}

            <p className={`font-bold text-red-600 mt-2 text-xl flex items-center ${PacificoFont.className}`}>
              {product.quantity} x {product.price} = $ {product.quantity * product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
