import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: "Restaurante Parrilla Internacional | Cocina Tradicional y Gourmet",
  description:
    "Disfruta de la mejor experiencia gastronómica en Restaurante Macedonia. Menús variados con opciones de cocina tradicional y gourmet. ¡Reserva ahora!",
  keywords:
    "Restaurante, Parrilla Internacional, comida gourmet, cocina tradicional, mejores restaurantes, reservas online, menú, delivery",
  robots: "index, follow",
  openGraph: {
    title: "Restaurante Parrilla Internacional | Cocina Tradicional y Gourmet",
    description:
      "Descubre la mejor cocina en Restaurante Macedonia. Menús para todos los gustos y servicios de entrega rápida.",
    type: "website",
    url: "https://www.parrilla-internacional.com", // Reemplaza con la URL de tu restaurante
    images: [
      {
        url: "https://www.parrilla-internacional/imagen.png", // Imagen representativa
        width: 800,
        height: 600,
        alt: "Restaurante Macedonia",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
