"use client";

import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interfaces";
import { useState } from "react";
import { AddFavorites, Precio } from "@/components";


interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 relative">
      {/* Imagen y enlace al producto */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-56 w-full">
          <Image
            src={`/imgs/${displayImage}`}
            alt={product.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        </div>
      </Link>

      {/* Botón de favoritos fuera del Link */}
      <div className="absolute top-2 right-2 z-20">
        <AddFavorites
          id={product.id}
          title={product.titulo}
          price={product.precio}
          description={product.description}
          slug={product.slug}
          images={product.images}
        />
      </div>

      {/* Información del producto */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">{product.titulo}</h3>
        <p className="text-sm text-gray-600">
          {product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
          {product.description.length > 80 && (
            <Link
              href={`/product/${product.slug}`}
              className="text-red-500 hover:underline ml-1"
            >
              Ver más
            </Link>
          )}
        </p>
      </div>

      {/* Precio y botón de agregar al carrito */}
      <div className="mt-4 flex justify-between items-center">
        <Precio value={product.precio}/>
        <Link href={`/product/${product.slug}`}>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center">
            <FaShoppingCart className="mr-2" />
            Agregar
          </button>
        </Link>
      </div>
    </div>
  );
};
