"use client";

import React, { useState, useEffect } from "react";
import { TopMenu, TopMenuMobile, Footer } from "@/components";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Renderiza TopMenu o TopMenuMobile dependiendo del tamaño de la pantalla */}
      {isMobile ? <TopMenuMobile /> : <TopMenu />}

      {/* Aseguramos que haya suficiente espacio debajo del menú */}
      {/* <div className="mt-20">
        <MenuSectionsBar />
      </div> */}

      {/* Contenido principal */}
      <div className="mt-0">{children}</div>
      <Footer />
    </main>
  );
}
