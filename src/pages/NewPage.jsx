// src/pages/NewPage.jsx (CÓDIGO MINIMALISTA Y CORRECTO)

import React, { useMemo } from "react";
// 💡 Asegúrate que la ruta sea correcta
import { ALL_PRODUCTS } from "../Data/productData";
import ProductGallery from "../components/products/ProductGallery";
// ❌ Quitamos ProductFilterBar por ahora para aislar el error

export default function NewPage() {
  const productsToShow = useMemo(() => {
    return Array.isArray(ALL_PRODUCTS) ? ALL_PRODUCTS : [];
  }, []);

  return (
    <section className="container mx-auto mt-32 px-4">
      <h1 className="text-3xl md:text-4xl text-black font-semibold mb-6">
        New Arrivals
      </h1>

      <div className="w-full mt-t">
        <p className="text-lg text-gray-600 mb-6">
          Mostrando {productsToShow.length} resultados.
        </p>
        {/* 💡 PASAMOS LA LISTA FILTRADA AL COMPONENTE GALERÍA */}
        <ProductGallery products={productsToShow} />
      </div>
    </section>
  );
}
