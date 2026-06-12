import React from "react";

export default function ProductoCard({ product }) {
  // Ahora 'product' está definido como una prop
  if (!product) {
    console.log("ProductoCard: Producto nulo recibido.");
    return null;
  }

  // Función para formatear el precio (usando los datos numéricos)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency || "USD",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    // ✅ CORRECCIÓN 1: Usar w-full para que ocupe todo el ancho de su columna.
    // Se elimina la altura fija (h-[740px]) para que sea más flexible.
    <div className="w-full ">
      {/* // ✅ CORRECCIÓN 2: Usar w-full aquí también para que la imagen se adapte */}
      {/* al contenedor. */}
      <div className="w-full h-96 overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full mt-4 px-2">
        <span className="font-extrabold text-lg">
          {product.badge || product.category}
        </span>
        <h3 className="text-xl mt-1">{product.name}</h3>
        <p className="text-lg mt-2">{formattedPrice}</p>{" "}
        <div className="flex mt-6 gap-3">
          <div className="bg-stone-200 p-1 rounded-xl flex justify-center">
            <span className="text-black text-xs text-center">
              Contract Grade
            </span>
          </div>
          <div className="bg-stone-200 p-1 rounded-xl flex justify-center">
            <span className="text-black text-xs text-center">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
