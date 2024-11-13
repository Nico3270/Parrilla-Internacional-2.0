"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { tituloLogo } from "@/config/fonts";
import { MenuSectionsBar, SideBar } from "@/components";
import { useCartStore, useFavoritesStore } from "@/store";


export const TopMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoritesStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false)

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    setLoaded(true)
  }, [])
  

  return (
    <header className="bg-white text-gray-700 py-2 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo del restaurante */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/imgs/restaurant-logo.jpg"
              alt="Logo"
              width={50}
              height={50}
            />
          </Link>
          <div className="ml-4 text-left">
            <Link href="/">
              <span
                className={`block text-xl font-bold leading-tight ${tituloLogo.className}`}
              >
                Parrilla
              </span>
              <span
                className={`block text-xl font-bold leading-tight ${tituloLogo.className}`}
              >
                Internacional
              </span>
            </Link>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <nav className="space-x-8 hidden md:flex">
          <Link
            href="/products"
            className={`hover:text-red-700 ${tituloLogo.className}`}
          >
            Menú
          </Link>
          <Link
            href="/services"
            className={`hover:text-red-700 ${tituloLogo.className}`}
          >
            Servicios
          </Link>
          <Link
            href="/gallery"
            className={`hover:text-red-700 ${tituloLogo.className}`}
          >
            Galería
          </Link>
          <Link
            href="/testimonials"
            className={`hover:text-red-700 ${tituloLogo.className}`}
          >
            Testimonios
          </Link>
          <Link
            href="/contact"
            className={`hover:text-red-700 ${tituloLogo.className}`}
          >
            Contacto
          </Link>
        </nav>

        {/* Barra de búsqueda */}
        <div className="relative hidden md:block w-64">
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-white text-gray-800 rounded-full px-4 py-2 pl-10 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
          />
          {/* Ícono de búsqueda usando React Icons */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
            <FaSearch className="h-4 w-4 mr-4" />
          </div>
        </div>

        {/* Iconos del carrito, favoritos y usuario */}
        <div className="flex space-x-6 items-center">
          <Link href={(totalItemsInCart === 0)
             ? "/empty"
             : "/cart"} 
             className="relative hover:text-gray-400">
            <FaShoppingCart className="text-2xl" />
            {(totalItemsInCart > 0 && loaded) && (
              <span className="absolute top-0 right-0 bg-red-700 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {totalItemsInCart}
              </span>
            )}
          </Link>
          <Link href="/favorites" className="relative hover:text-gray-400">
            <FaHeart className="text-2xl" />
            {(totalFavorites > 0 && loaded) && (
              <span className="absolute top-0 right-0 bg-red-700 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                {totalFavorites}
              </span>
            )}
          </Link>
          <button
            onClick={() => toggleDrawer(true)}
            className="hover:text-gray-400"
          >
            <FaUser className="text-2xl" />
          </button>
        </div>
      </div>
      <SideBar open={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Barra de secciones fija */}
      <MenuSectionsBar />
    </header>
  );
};
