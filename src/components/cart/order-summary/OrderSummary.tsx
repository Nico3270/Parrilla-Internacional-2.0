import React from "react";
import { useCartStore } from "@/store";

export const OrderSummary: React.FC = () => {
  const cartItems = useCartStore((state) => state.cart);

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resumen de tu orden</h2>
      <p className="mb-2">Cantidad de artículos: {totalItems}</p>
      <p className="mb-2">Total a pagar: ${totalPrice.toFixed(2)}</p>

      {/* Puedes agregar aquí más detalles sobre los adicionales si es necesario */}
    </div>
  );
};
