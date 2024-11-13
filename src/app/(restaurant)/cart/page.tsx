// src/app/cart/page.tsx



import {
  ProductsInCart,
  OrderSummaryWithActions,
  fetchProductsForCartFromDB,
 
  
} from "@/components";

export default async function CartPage() {
  // Obtenemos todos los productos y sus opciones de personalización desde la base de datos
  const productsPersonalization = await fetchProductsForCartFromDB();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna principal para los productos (ocupa todo el ancho en pantallas pequeñas y 2/3 en pantallas grandes) */}
        <div className="w-full lg:w-2/3">
          <ProductsInCart productsPersonalization={productsPersonalization} />
        </div>

        {/* Columna secundaria para el resumen de la orden (ocupa 1/3 del ancho en pantallas grandes) */}
        <div className="w-full lg:w-1/3 bg-white p-4 shadow-md rounded-lg lg:sticky lg:top-24">
          <OrderSummaryWithActions />
        </div>
      </div>
    </div>
  );
}
