// src/actions/getCartProducts.ts
import { fetchProductsfromDbAction } from '../../../actions/cart/fetch-products-from-db';

// Server Action para obtener todos los productos y sus opciones de personalización
export async function fetchProductsForCartFromDB() {
  // Llamar a la action para obtener productos desde la base de datos
  const response = await fetchProductsfromDbAction();

  // Verificar si la respuesta es exitosa antes de acceder a los productos
  if (!response.ok || !response.productos) {
    throw new Error(response.message); // Si hubo un error, lanzamos una excepción
  }

  const productsFromDB = response.productos;

  // Verificar si productsFromDB no es undefined
  if (!productsFromDB) {
    return []; // Si es undefined, devolvemos un array vacío o maneja esto como prefieras
  }

  // Creamos un array con el id del producto y las opciones de personalización disponibles
  const productsPersonalization = productsFromDB.map((product) => ({
    id: product.id,
    opcionesDisponibles: product.customizationOptions?.extras.map(extraRelation => ({
      name: extraRelation.extra.name,
      price: extraRelation.extra.price,
    })) || [],  // Agregamos las opciones de personalización si existen
  }));

  return productsPersonalization;
}