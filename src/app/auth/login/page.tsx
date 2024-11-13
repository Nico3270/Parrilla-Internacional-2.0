"use client";


import { LoginForm } from "@/components";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda - Formulario */}
      <LoginForm />

      {/* Columna derecha - Imagen */}
      <div className="md:w-1/2 relative hidden md:block bg-gray-100">
        <Image
          src="/imgs/restaurant-login-image.webp" // Coloca aquí la ruta de la imagen del restaurante
          alt="Imagen de Restaurante"
          fill
          style={{ objectFit: "cover" }} // Asegura que la imagen cubra el espacio correctamente
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
