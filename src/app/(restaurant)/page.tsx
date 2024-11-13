export const revalidate = 60;

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full p-0 grid gap-0 grid-cols-1 md:grid-cols-3 grid-rows-3">

      {/* Cuadro Principal */}
      <div className="relative md:col-span-2 row-span-2 h-[900px] ">
        <Link href="/products">
          <Image
            src="/imgs/nuestros_productos.webp" // Cambia la ruta según tu imagen
            alt="Nuestros Productos"
            fill = {true}
           
            className="rounded-none object-cover"
            
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white p-4 bg-black bg-opacity-60">
              <h2 className="text-3xl md:text-4xl font-bold">Nuestros Productos</h2>
              <p className="text-lg">Promociones y productos destacados del restaurante</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Sección Bebidas */}
      <div className="relative h-[450px] shadow-lg">
        <Link href="category/Bebidas">
          <Image
            src="/imgs/Bebidas.webp" // Cambia la ruta según tu imagen
            alt="Bebidas"
            fill= {true}
            className="rounded-none object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white p-4 bg-black bg-opacity-60">
              <h2 className="text-2xl font-bold">Bebidas</h2>
              <p className="text-md">Explora nuestra selección de bebidas</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Sección Platos Especiales */}
      <div className="relative h-[450px] shadow-lg">
        <Link href="category/Comida">
          <Image
            src="/imgs/platos especiales.webp" // Cambia la ruta según tu imagen
            alt="Platos Especiales"
            fill= {true}
            className="rounded-none object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white p-4 bg-black bg-opacity-60">
              <h2 className="text-2xl font-bold">Platos Especiales</h2>
              <p className="text-md">Descubre nuestros platos más exclusivos</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Sección Quiénes Somos / Contacto */}
      <div className="relative md:col-span-2 h-[400px] shadow-lg">
        <Link href="/contacto">
          <Image
            src="/imgs/Contacto_redes.webp" // Cambia la ruta según tu imagen
            alt="Quiénes Somos / Contacto"
            fill= {true}
            className="rounded-none object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-30">
            <div className="text-center text-white p-4 bg-black bg-opacity-60">
              <h2 className="text-2xl font-bold">Quiénes Somos / Contacto</h2>
              <p className="text-md">Conoce más sobre nosotros y cómo contactarnos</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Sección Galería de Fotos */}
      <div className="relative h-[400px] shadow-lg">
        <Link href="/galeria">
          <Image
            src="/imgs/Restaurante.webp" // Cambia la ruta según tu imagen
            alt="Galería de Fotos"
            fill = {true}
            className="rounded-none object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white p-4 bg-black bg-opacity-60">
              <h2 className="text-2xl font-bold">Galería de Fotos</h2>
              <p className="text-md">Mira el ambiente de nuestro restaurante</p>
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
}
