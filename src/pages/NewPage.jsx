// src/pages/NewPage.jsx (CÓDIGO MINIMALISTA Y CORRECTO)

import React, { useMemo } from "react";
// 💡 Asegúrate que la ruta sea correcta
import { ALL_PRODUCTS } from "../Data/productData";
import ProductGallery from "../components/products/ProductGallery";
// ❌ Quitamos ProductFilterBar por ahora para aislar el error

const CATEGORY_TO_SHOW = "New";

export default function NewPage() {
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(ALL_PRODUCTS)) return [];
    return ALL_PRODUCTS.filter((p) => p.category === CATEGORY_TO_SHOW);
  }, []);

  return (
    <section className="container mx-auto mt-20 px-4">
      <h1 className="text-3xl md:text-4xl text-black font-semibold mb-6">
        New Arrivals
      </h1>

      <div className="w-full mt-10">
        <p className="text-lg text-gray-600 mb-6">
          Mostrando {filteredProducts.length} resultados.
        </p>
        {/* 💡 PASAMOS LA LISTA FILTRADA AL COMPONENTE GALERÍA */}
        <ProductGallery products={filteredProducts} />
      </div>
    </section>
  );
}
