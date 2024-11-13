"use client";

import {  merriWeather } from "@/config/fonts";
import Link from "next/link";
import React, { useRef } from "react";
import {
  FaUtensils,
  FaPizzaSlice,
  FaBeer,
  FaCocktail,
  FaHamburger,
  FaHotdog,
} from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";

// Lista de secciones con nombre, ícono y estilo personalizado
const sections = [
  { name: "Platos Fuertes", icon: FaUtensils, href: "platos_fuertes" },
  { name: "Entradas", icon: FaPizzaSlice, href: "entradas" },
  { name: "Hamburguesas", icon: FaHamburger, href: "hamburguesas" },
  { name: "Pizza", icon: FaPizzaSlice, href: "pizza" },
  { name: "Perros Calientes", icon: FaHotdog, href: "perros_calientes" },
  { name: "Cervezas", icon: FaBeer, href: "cervezas" },
  { name: "Cocteles", icon: FaCocktail, href: "cocteles" },
  { name: "Bebidas calientes", icon: GiCoffeeCup, href: "bebidas_calientes" },
];

export const MenuSectionsBar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full bg-white">
      {/* Contenedor con padding-left en pantallas pequeñas y distribución en pantallas grandes */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-6 p-4 w-full bg-white rounded-lg no-scrollbar justify-around md:justify-around"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {sections.map((section, index) => (
          <Link key={index} href={`/section/${section.href}`}>
            <div className="flex flex-col items-center text-center min-w-[80px] max-w-[100px] md:min-w-0">
              <section.icon className="text-xl hover:text-red-800" />
              <span
                className={`text-sm mt-2 hover:text-red-800 break-words ${merriWeather.className}`}
              >
                {section.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
