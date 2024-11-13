"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Usamos Link de Next.js para la redirección
import clsx from "clsx";
import { useCartStore, usePreferenceDelivey } from "@/store";
import { Precio } from "@/components/ui/precio/Precio";

export const OrderSummaryWithActions = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const [isMounted, setIsMounted] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<string | null>(null); // Estado para la opción seleccionada
  
  // Llamar correctamente el setPreference sin paréntesis
  const setPreference = usePreferenceDelivey((state) => state.setPreference);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Maneja el cambio de la opción seleccionada
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    setDeliveryOption(selectedOption);
    
    // Actualizamos la preferencia en el estado global
    if (selectedOption === "restaurante") {
      setPreference("restaurant");
    } else if (selectedOption === "domicilio") {
      setPreference("delivery");
    }
  };

  // Si el componente no está montado, no mostramos nada para evitar errores de hidratación
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resumen de tu orden</h2>
      <p>Cantidad de artículos: {totalItems}</p>
      <p>Total a pagar: {<Precio value={totalPrice} />}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">¿Cómo prefieres recibir tu comida?</h3>

        <div className="flex items-center mb-2">
          <input
            type="radio"
            name="deliveryOption"
            value="restaurante"
            checked={deliveryOption === "restaurante"}
            onChange={handleOptionChange}
            className="mr-2"  // Añadimos margen a la derecha
          />
          <label>Comer en restaurante</label>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="radio"
            name="deliveryOption"
            value="domicilio"
            checked={deliveryOption === "domicilio"}
            onChange={handleOptionChange}
            className="mr-2"  // Añadimos margen a la derecha
          />
          <label>Pedir a domicilio</label>
        </div>
      </div>

      {/* Botón de continuar */}
      <Link
        href={
          deliveryOption === "restaurante"
            ? "/checkout"
            : deliveryOption === "domicilio"
            ? "/checkout/address"
            : "#"
        }
        className={clsx(
          "mt-4 block text-center px-4 py-2 rounded-lg",
          deliveryOption
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-400 text-white cursor-not-allowed"
        )}
        prefetch={false} // Deshabilita el prefetch para evitar redirección anticipada
      >
        Continuar con la orden
      </Link>
    </div>
  );
};
