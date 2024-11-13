import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

export const  Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center md:items-start space-y-6 md:space-y-0">
        {/* Columna izquierda: Logo y nombre */}
        <div className="flex items-center space-x-4">
          <Link href="/">
          <Image
            src="/imgs/Logo 2.webp" // Cambia a la ruta de tu logo
            alt="Parrilla Internacional Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
          </Link>
          <div>
            <Link href="/"><h2 className="text-2xl font-bold text-white">Parrilla Internacional</h2></Link>
            <p className="text-sm text-gray-400">Tu mejor experiencia en comida a la parrilla.</p>
          </div>
        </div>

        {/* Columna central: Redes Sociales */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="text-lg font-bold text-white">Síguenos</h3>
          <div className="flex space-x-4">
            <Link href="https://wa.me/123456789" target="_blank" className="text-gray-300 hover:text-green-500 transition-colors">
              <FaWhatsapp size={24} />
            </Link>
            <Link href="https://facebook.com" target="_blank" className="text-gray-300 hover:text-blue-500 transition-colors">
              <FaFacebookF size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-gray-300 hover:text-pink-500 transition-colors">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://tiktok.com" target="_blank" className="text-gray-300 hover:text-black transition-colors">
              <FaTiktok size={24} />
            </Link>
          </div>
        </div>

        {/* Columna derecha: Secciones en dos columnas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-white">Secciones</h3>
            <Link href="/contact" className="hover:text-white transition-colors">Contacto</Link>
            <Link href="/services" className="hover:text-white transition-colors">Servicios</Link>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-white">Más</h3>
            <Link href="/products" className="hover:text-white transition-colors">Productos</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Galería</Link>
          </div>
        </div>
      </div>

      {/* Línea inferior: Derechos Reservados */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Parrilla Internacional. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
