import { FaHeart } from "react-icons/fa";

import { FavoritestGrid } from "@/components";




export default function FavoritePage() {
  return (
    <div className="container mx-auto p-6">
      {/* Título con Icono */}
      <div className="flex items-center justify-center mb-8">
        <FaHeart className="text-red-500 text-4xl mr-3" />
        <h1 className="text-4xl font-bold text-center">Mis Favoritos</h1>
      </div>
      <FavoritestGrid />
    </div>
  );
}

