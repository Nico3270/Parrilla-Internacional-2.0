export interface Product {
  id: string;
  titulo: string;
  description: string;
  shortDescription?: string;
  images: string[];  // URLs de las imágenes del producto
  available: boolean;
  precio: number;
  discountPrice?: number;
  slug: string;
  tags: string[];
  seccion: SeccionEnum;  // Usar el enum en lugar de string
  priority?: number;
  featured?: boolean;
  isAvailableDuring?: { start: string; end: string };
  createdAt?: Date;
  updatedAt?: Date;
  tipo: TipoEnum;  // Usar el enum en lugar de string
  reviews?: Review[];
  customizationOptions?: {
    extras: { name: string; price: number }[];
    choices: {
      name: string;
      values: string[];
    }[];
  };
}

export interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user" | "server" | "kitchen" | "delivery"

}


export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  opcionesPersonalizacion: { name: string; price: number }[];
  opcionesDisponibles?: { name: string; price: number }[];  // Nueva propiedad opcional
  comentario?: string;
  cartItemId: string; // Identificador único del producto en el carrito
}

export interface FavoriteProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export enum SeccionEnum {
  PLATOS_FUERTES = "PLATOS_FUERTES",
  ENTRADAS = "ENTRADAS",
  HAMBURGUESAS = "HAMBURGUESAS",
  PERROS_CALIENTES = "PERROS_CALIENTES",
  CERVEZAS = "CERVEZAS",
  BEBIDAS_CALIENTES = "BEBIDAS_CALIENTES",
  COCTELES = "COCTELES",
  PIZZA = "PIZZA",
}

export enum TipoEnum {
  COMIDA = "COMIDA",
  ENTRADAS = "ENTRADAS",
  BEBIDAS = "BEBIDAS",
  POSTRES = "POSTRES",
}

export interface Review {
  username: string;
  comment: string;
  rating: number;
  date: string;
}

// src/interfaces/product.interface.ts
export interface SeedProduct {
  titulo: string;
  description: string;
  shortDescription?: string;
  available: boolean;
  precio: number;
  discountPrice?: number;
  slug: string;
  tags: string[];
  seccion: string; // Usar string en lugar del enum aquí
  tipo: string; // Usar string en lugar del enum aquí
  isAvailableDuring?: { start: string; end: string };
  customizationOptions?: {
    extras: { name: string; price: number }[];
    choices: { name: string; values: string[] }[];
  };
  images?: string[];
  reviews?: {
    username: string;
    comment: string;
    rating: number;
    date: string;
  }[];
}
