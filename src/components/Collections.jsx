import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";

const products = [
  {
    id: 1,
    name: "MODERN SEATING",
    pieces: "8 pieces",
    image: "./img/collection8.jpg",
  },

  {
    id: 2,
    name: "MODULAR DESIGN",
    pieces: "6 pieces",
    image: "./img/collection5.jpg",
  },
  {
    id: 3,
    name: "CLOUD COLLECTION",
    pieces: "4 pieces",
    image: "./img/collection21.jpg",
  },
  {
    id: 4,
    name: "ARTISTIC PIECES",
    pieces: "7 pieces",
    image: "./img/collection23.jpg",
  },
  {
    id: 5,
    name: "CONTEMPORARY",
    pieces: "7 pieces",
    image: "./img/collection18.jpg",
  },
  {
    id: 6,
    name: "TEXTURAL CRAFT",
    pieces: "3 pieces",
    image: "./img/collection3.jpg",
  },
  {
    id: 7,
    name: "MAXIMALIST ART",
    pieces: "5 pieces",
    image: "./img/collection14.png",
  },
  {
    id: 8,
    name: "VINTAGE INSPIRED",
    pieces: "9 pieces",
    image: "./img/collection11.jpg",
  },
  {
    id: 9,
    name: "LUXURY TEXTILES",
    pieces: "4 pieces",
    image: "./img/collection15.png",
  },
];

export default function Collections() {
  return (
    <section className="w-full mx-auto mt-10 px-4 py-8 flex flex-col mb-10 ">
      <div className="text-center mb-8 space-y-4S">
        <h2 className="text-3xl md:text-6xl font-thin">Colletions</h2>
        <p className="mt-4 text-sm md:text-base text-gray-500 text-center">
          Explore our curated collections, each telling a unique story of
          craftsmanship and design philosophy.
        </p>
      </div>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={10}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`./products/ProductsCard`}>
              <button>
                <div className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 md:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-white text-lg md:text-xl font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-white text-sm md:text-base mt-1">
                      {product.pieces}
                    </p>
                  </div>
                </div>
              </button>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
