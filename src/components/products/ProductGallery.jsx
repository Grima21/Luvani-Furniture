// src/components/products/ProductGallery.jsx (LIMPIO Y REUTILIZABLE)

import React from "react";
import ProductoCard from "./ProductCard";

/**
 * Componente responsable de mapear y mostrar una lista de productos en una cuadrícula.
 * @param {Array} products - La lista de productos YA FILTRADOS que se van a mostrar.
 */
export default function ProductGallery({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-10 text-xl text-gray-500">
        No se encontraron productos en esta categoría.
      </div>
    );
  }

  return (
    // Cuadrícula que utiliza el map para renderizar las tarjetas
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {products.map((product) => (
        // El componente ProductCard recibe el objeto individual
        <ProductoCard key={product.id} product={product} />
      ))}
    </div>
  );
}
