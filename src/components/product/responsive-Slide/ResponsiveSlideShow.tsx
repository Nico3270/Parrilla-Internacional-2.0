"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
}

export const ResponsiveSlideShow: React.FC<Props> = ({ images, title }) => {
  return (
    <div className="w-full h-[300px] md:h-[300px]">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 7000, // 7 segundos entre cada slide
          disableOnInteraction: false, // El autoplay no se detiene si el usuario interactúa
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper" // Usamos la clase personalizada
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src={`/imgs/${image}`}
                alt={title}
                fill
                className="rounded-lg object-cover"
                style={{ height: '100%' }} // Mantener altura sin desbordarse
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
