import { RegisterForm } from "@/components";
import Image from "next/image";

export default function RegisterPage() {
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Columna izquierda - Formulario */}
      
      <RegisterForm/>

      {/* Columna derecha - Imagen */}
      <div className="md:w-1/2 relative hidden md:block bg-gray-100">
        <Image
          src="/imgs/restaurant-register-image.webp" // Coloca aquí la ruta de la imagen del restaurante
          alt="Imagen de Restaurante"
          fill
          style={{ objectFit: "cover" }} // Ajuste para que la imagen no cubra el contenido
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
