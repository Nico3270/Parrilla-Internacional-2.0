import { Product } from '@/interfaces';
import React from 'react';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export const ProductGridProduct = ({ products }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 w-full">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
};
