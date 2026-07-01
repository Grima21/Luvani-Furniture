import React, { useContext } from "react"; // <-- CAMBIO 1: Importamos useContext
import { CartContext } from "../context/CartContext"; // <-- CAMBIO 2: Importamos tu red Wi-Fi

export default function CartSidebar({ isOpen, setIsOpen }) {
  // <-- CAMBIO 3: Conectamos este sidebar al Wi-Fi del carrito
  const { cartItems } = useContext(CartContext);

  return (
    <>
      {/* BACKGROUND OSCURO (OVERLAY) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* EL CONTENEDOR DEL SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ENCABEZADO */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-wider text-gray-900 uppercase font-serif">
            Tu Carrito
          </h2>
          {/* BOTÓN X PARA CERRAR */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* LISTA DE MUEBLES (CUERPO MULTI-ARTÍCULOS) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* CAMBIO 4: Validación de carrito vacío */}
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Tu carrito está vacío
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-gray-50 pb-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="text-gray-900 font-semibold mt-1">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* BOTÓN DE CHECKOUT (FOOTER) */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button className="w-full bg-[#1e3a61] hover:bg-[#162a47] text-white py-3.5 px-4 rounded font-medium tracking-wide uppercase text-xs transition-colors shadow-sm">
            Continuar al Checkout
          </button>
        </div>
      </div>
    </>
  );
}
