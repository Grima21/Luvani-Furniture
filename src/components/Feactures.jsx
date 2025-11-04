import React, { useState } from "react";

const feacture = [
  {
    id: 1,
    name: "Pistachio",
    description:
      "Every piece begins with the finest materials, carefully selected for their beauty, durability, and sustainable origins. Our craftspeople honor traditional techniques while embracing modern precision.",
    image: "./img/pistacho-sofa.jpg", // recuerda usar /img/... si está en public
  },
  {
    id: 2,
    name: "Lunar",
    description:
      "Experience the perfect harmony of form and function with our designs. Each item is thoughtfully engineered to provide comfort and practicality without compromising on style.",
    image: "./img/lunar-gray-interior.png",
  },
  {
    id: 3,
    name: "Terracotta",
    description:
      "Indulge in the luxury of bespoke furniture, where every detail is tailored to your preferences. From custom upholstery to unique finishes, our pieces are as individual as you are.",
    image: "./img/terracotta-cloud-chair.png",
  },
];

export default function FeatureSelector() {
  const [selected, setSelected] = useState(1);
  const current = feacture.find((f) => f.id === selected) || feacture[0];

  return (
    <section
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden text-white mt-10"
      style={{
        backgroundImage: `url(${current.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay para mejor contraste */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido principal */}
      <div className="max-w-screen-xl -lg mx-auto relative z-10 flex flex-col justify-start items-start px-10 pt-32 ">
        <h2 className="text-5xl md:text-7xl font-semibold mb-6 drop-shadow-lg">
          {current.name}
        </h2>
        <p className="text-base md:text-lg text-gray-200 leading-relaxed">
          {current.description}
        </p>
      </div>

      {/* Botones inferiores */}
      <div className="relative z-10 flex justify-center items-center gap-4 pb-10">
        {feacture.map((f) => {
          const active = f.id === selected;
          return (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                ${
                  active
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm"
                }`}
            >
              {f.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
