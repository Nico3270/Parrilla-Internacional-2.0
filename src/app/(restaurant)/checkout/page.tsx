"use client";

import { CartCheckout } from "@/components";
import OrderCheckoutSummary from "@/components/checkout/OrderCheckoutSummary";



export default function VerificarOrden() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Verificar Orden </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda - Productos */}
        <CartCheckout />

        {/* Columna derecha - Resumen de la orden */}
        <OrderCheckoutSummary />
      </div>
    </div>
  );
}
