import { CartContext } from "../context/CartContext";
import React, { useContext } from "react";
import Hero from "../components/Hero";
import FeatureCollection from "../components/FeatureCollection";
import Collections from "../components/Collections";
import FeatureSelector from "../components/Feactures";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { listadoProductos } from "../product";

export default function Home() {
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <Navbar />
      <Hero />

      {/* SECCIÓN NUEVA: NUESTROS MUEBLES */}
      <section className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 font-serif uppercase tracking-wider text-gray-900">
          Nuestros Productos
        </h2>

        {/* Contenedor en malla (Grid) para que se vean uno al lado del otro */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {listadoProductos.map((producto) => (
            <div
              key={producto.id}
              className="border border-gray-100 p-4 rounded-lg shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={producto.image}
                  alt={producto.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-medium text-gray-800 text-base">
                  {producto.title}
                </h3>
                <p className="text-gray-900 font-bold mt-1">
                  ${producto.price}
                </p>
              </div>

              {/* AL DAR CLIC AQUÍ, ENVIAMOS EL MUEBLE REAL A LA CENTRAL GLOBAL */}
              <button
                onClick={() => addToCart(producto)}
                className="mt-4 w-full bg-black text-white py-2 text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors rounded"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </section>
      <FeatureCollection />
      <Collections />
      <FeatureSelector />
      <Form />
      <Footer />
    </>
  );
}
