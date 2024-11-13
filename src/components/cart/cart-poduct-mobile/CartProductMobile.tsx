"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Product } from "@/interfaces";
import { PersonalizationOptions, QuantitySelector } from "@/components";

interface CartProductCardProps {
  product: Product;
  cantidad: number;
  comentario?: string;
  opcionesPersonalizacion?: { name: string; price: number }[];
  onUpdateQuantity: (slug: string, newQuantity: number) => void;
  onUpdateOptions: (slug: string, newOptions: { name: string; price: number }[]) => void;
  onUpdateComment: (slug: string, newComment: string) => void;
  onRemove: (slug: string) => void;
  onUpdateTotal?: (slug: string, total: number) => void;
}

export const CartProductMobile: React.FC<CartProductCardProps> = ({
  product,
  cantidad,
  comentario,
  opcionesPersonalizacion,
  onUpdateQuantity,
  onUpdateOptions,
  onUpdateComment,
  onRemove,
  onUpdateTotal,
}) => {
  const [quantity, setQuantity] = useState<number>(cantidad);
  const [total, setTotal] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState(opcionesPersonalizacion || []);

  useEffect(() => {
    // Recalculate total price when quantity or selected options change
    const precioBase = product.precio * quantity;
    const precioAdiciones = selectedOptions
      ? selectedOptions.reduce((total, opcion) => total + opcion.price, 0)
      : 0;

    setTotal(precioBase + precioAdiciones * quantity);

    if (onUpdateTotal) {
      onUpdateTotal(product.slug, precioBase + precioAdiciones * quantity);
    }
  }, [quantity, selectedOptions, product.precio, product.slug, onUpdateTotal]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onUpdateQuantity(product.slug, newQuantity);
  };

  const handleOptionsChange = (newOptions: { name: string; price: number }[]) => {
    setSelectedOptions(newOptions);
    onUpdateOptions(product.slug, newOptions);
  };

  return (
    <div className="relative flex flex-col items-center justify-between border rounded-lg shadow-md p-4 mb-4">
      {/* Botón para eliminar el producto (sobre la imagen) */}
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <button
          className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700"
          onClick={() => onRemove(product.slug)}
        >
          <FaTrash className="text-xl" /> {/* Aumentamos el tamaño del icono */}
        </button>
      </div>

      {/* Título del producto */}
      <h2 className="text-xl font-bold text-center">{product.titulo}</h2>

      {/* Imagen del producto */}
      <div className="w-full flex-shrink-0 relative mb-4 mt-2">
        <Image
          src={`/imgs/${product.images[0]}`}
          alt={product.titulo}
          width={300}
          height={200}
          className="rounded-lg mx-auto object-cover"
        />
      </div>

      {/* Precio del producto */}
      <p className="text-2xl font-bold text-red-600 text-center">${product.precio.toFixed(2)}</p>

      {/* Descripción del producto */}
      <p className="text-gray-600 text-center mb-4">{product.description}</p>

      {/* Personalización */}
      {product.customizationOptions && product.customizationOptions.extras.length > 0 && (
        <div className="w-full">
          <PersonalizationOptions
            customizationOptions={product.customizationOptions}
            selectedOptions={selectedOptions}
            comment={comentario}
            onUpdateOptions={handleOptionsChange}
            onUpdateComment={(newComment) => onUpdateComment(product.slug, newComment)}
          />
        </div>
      )}

      {/* Cantidad seleccionada y total */}
      <div className="flex items-center justify-between w-full mt-4 space-x-4">
        <QuantitySelector inicio={quantity} onQuantityChange={handleQuantityChange} />
        <div className="text-right">
          <h4 className="font-bold text-red-600">Total: ${total.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};
