"use client"; // Este componente se ejecuta solo en el cliente

import React from 'react';
import { FavoritesCard } from '../favorites-card.tsx/FavoritesCard';
import { useFavoritesStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';

export const FavoritestGrid = () => {
  const products = useFavoritesStore((state) => state.favorites);
  const totalFavorites = useFavoritesStore((state) => state.getTotalItems());

  return (
    <>
      {/* Si no hay productos en los favoritos */}
      {totalFavorites === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">
            No tienes productos en tus favoritos
          </p>
          {/* Imagen generada por IA */}
          <Image
            src="/imgs/no_favorites.webp" // Coloca aquí la ruta de la imagen
            alt="No hay favoritos"
            width={300} // Ajusta el ancho de la imagen
            height={300} // Ajusta la altura de la imagen
            className="mx-auto mb-6"
          />

          <Link href="/products">
            <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Explorar Productos
            </button>
          </Link>
        </div>
      ) : (
        /* Mostrar productos en el grid */
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {products.map((product) => (
            <FavoritesCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
