"use client";

import React from "react";
import { useCartStore } from "@/store";
import Link from "next/link"; // Para agregar navegación si es necesario
import Image from "next/image";

export default function CartPage() {
  const { cart } = useCartStore(); // Accedemos al carrito desde el store

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>

      {cart.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cart.map((product) => (
            <div key={product.cartItemId} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <Image src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-2" />
              <p>Cantidad: {product.quantity}</p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              
              {/* Opciones de personalización */}
              {product.opcionesPersonalizacion.length > 0 && (
                <div>
                  <p className="font-semibold">Personalización:</p>
                  <ul className="ml-4 list-disc">
                    {product.opcionesPersonalizacion.map((option, index) => (
                      <li key={index}>
                        {option.name} (+${option.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comentarios */}
              {product.comentario && (
                <p className="mt-2">
                  <strong>Comentario:</strong> {product.comentario}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link href="/checkout">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Proceder al pago
          </button>
        </Link>
      </div>
    </div>
  );
}
