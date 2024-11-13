"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import {
  PersonalizationOptions,
  RecommendationSection,
  QuantitySelector,
  Precio,
} from "@/components";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { topMeuItems } from "@/config/fonts";

interface CartProductCardProps {
  product: CartProduct;
}

export const CartProductCard: React.FC<CartProductCardProps> = ({
  product,
}) => {
  const {
    updateProductQuantity,
    updateProductOptions,
    updateProductComment,
    removeProduct,
  } = useCartStore();
  const [total, setTotal] = useState<number>(product.price * product.quantity);

  useEffect(() => {
    const totalAdiciones = product.opcionesPersonalizacion.reduce(
      (sum, option) => sum + option.price,
      0
    );
    const nuevoTotal = (product.price + totalAdiciones) * product.quantity;
    setTotal(nuevoTotal);
  }, [product.quantity, product.opcionesPersonalizacion, product.price]);

  const handleQuantityChange = (newQuantity: number) => {
    updateProductQuantity(product.cartItemId, newQuantity);
  };

  const handleOptionsChange = (
    newOptions: { name: string; price: number }[]
  ) => {
    updateProductOptions(product.cartItemId, newOptions);
  };

  const handleCommentChange = (newComment: string) => {
    updateProductComment(product.cartItemId, newComment);
  };

  const handleRemove = () => {
    removeProduct(product.cartItemId);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start p-4 border rounded-lg shadow-md bg-white w-full">
      {/* Imagen del producto */}
      <div className="flex-shrink-0 w-full lg:w-48 h-auto lg:h-48 flex items-center justify-center">
        <Image
          src={`/imgs/${product.image}`}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-cover w-full lg:w-auto"
        />
      </div>

      {/* Detalles del producto */}
      <div className="flex-grow mt-4 lg:mt-0 lg:ml-4">
        {/* Título y botón de eliminar alineados */}
        <div className="flex justify-between items-start lg:items-center w-full">
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-lg lg:text-2xl text-red-500 font-bold break-words overflow-hidden text-ellipsis max-w-full">
              {product.title}
            </h2>
          </Link>
          <button
            className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110 ml-2 mt-2 lg:mt-0"
            onClick={handleRemove}
          >
            <FiTrash2 className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Opciones de personalización */}
        <div className="mt-2">
          <PersonalizationOptions
            customizationOptions={{ extras: product.opcionesDisponibles || [] }}
            selectedOptions={product.opcionesPersonalizacion}
            onUpdateOptions={handleOptionsChange}
          />
        </div>

        {/* Recomendación */}
        <div className="mt-2">
          <RecommendationSection
            comment={product.comentario || ""}
            onUpdateComment={handleCommentChange}
          />
        </div>

        {/* Precio y cantidad en una fila */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-1">
            <p
              className={`text-red-500 text-lg lg:text-2xl font-bold ${topMeuItems.className}`}
            >
              Total:
            </p>
            <span className="whitespace-nowrap">
              <Precio value={total} />
            </span>
          </div>
          <div className="flex items-center">
            <QuantitySelector
              inicio={product.quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
