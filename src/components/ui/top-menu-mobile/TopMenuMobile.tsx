"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaSearch,
  FaUtensils,
} from "react-icons/fa";
import Image from "next/image";
import { tituloLogo } from "@/config/fonts";
import { MenuSectionsBar, SideBar } from "@/components";
import { useCartStore, useFavoritesStore } from "@/store";

export const TopMenuMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoritesStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div>
      {/* Barra superior fija para pantallas pequeñas */}
      <header className="bg-white text-gray-700 py-2 shadow-lg fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo y nombre del restaurante a la izquierda */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/imgs/restaurant-logo.jpg"
                alt="Logo"
                width={40}
                height={40}
              />
            </Link>
            <div className="ml-2 text-left">
              <Link href="/">
                <span
                  className={`block text-md font-bold leading-tight ${tituloLogo.className}`}
                >
                  Parrilla
                </span>
                <span
                  className={`block text-md font-bold leading-tight ${tituloLogo.className}`}
                >
                  Internacional
                </span>
              </Link>
            </div>
          </div>

          {/* Menú hamburguesa a la derecha */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Menú desplegable */}
        {menuOpen && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg z-20 py-4">
            <nav className="space-y-4 flex flex-col items-center">
              <Link href="/products" className="hover:text-red-700">
                Menú
              </Link>
              <Link href="/services" className="hover:text-red-700">
                Servicios
              </Link>
              <Link href="/gallery" className="hover:text-red-700">
                Galería
              </Link>
              <Link href="/testimonials" className="hover:text-red-700">
                Testimonios
              </Link>
              <Link href="/contact" className="hover:text-red-700">
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Barra de secciones */}
      <div className="mt-16">
        <MenuSectionsBar />
      </div>

      {/* Barra inferior de navegación fija */}
      <nav className="bg-white fixed bottom-0 w-full z-50 border-t shadow-lg">
        <div className="flex justify-around items-center py-2">
          <Link href="/products" className="flex flex-col items-center">
            <FaUtensils className="text-xl" />
            <span className="text-xs">Menú</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center">
            <FaSearch className="text-xl" />
            <span className="text-xs">Buscar</span>
          </Link>
          {/* Botón de favoritos */}
          <Link
            href="/favorites"
            className="relative flex flex-col items-center hover:text-gray-400"
          >
            <FaHeart className="text-xl" />
            {totalFavorites > 0 && loaded && (
              <span className="absolute top-0 right-0 bg-red-700 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center transform translate-x-1/4 -translate-y-1/2">
                {totalFavorites}
              </span>
            )}
            <span className="text-xs">Favoritos</span>
          </Link>

          <Link
            href="/cart"
            className="relative flex flex-col items-center hover:text-gray-400"
          >
            <FaShoppingCart className="text-xl" />
            {totalItemsInCart > 0 && loaded && (
              <span className="absolute top-0 right-0 bg-red-700 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {totalItemsInCart}
              </span>
            )}
            <span className="text-xs">Carrito</span>
          </Link>

          <button
            onClick={() => toggleDrawer(true)}
            className="flex flex-col items-center"
          >
            <FaUser className="text-xl" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>
      <SideBar open={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};
