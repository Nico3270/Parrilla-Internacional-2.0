"use client";

import { AddressForm } from "@/components";
import Image from "next/image";

export default function AddressPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen grande para pantallas grandes */}
        <div className="hidden lg:block">
          <Image
            src="/imgs/domicilio.webp" // Cambia esto por el path de la imagen generada
            alt="Entrega a domicilio"
            width={800}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Formulario de dirección */}
        <AddressForm />
      </div>
    </div>
  );
}
