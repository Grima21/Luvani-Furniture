import React, { createContext, useState } from "react";

// 1. Creamos la señal "Wi-Fi" vacía
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// 2. Creamos el componente Proveedor que emitirá los datos
export function CartProvider({ children }) {
  // El arreglo global donde se guardarán los productos del carrito
  const [cartItems, setCartItems] = useState([]);

  // Función global para añadir un producto al carrito
  const addToCart = (product) => {
    // Buscamos si el producto ya existe en el carrito comparando los IDs
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist) {
      // Si ya existe, recorremos el arreglo y le sumamos 1 a la cantidad de ese producto
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Si el producto es nuevo, lo agregamos al arreglo con cantidad inicial de 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Retornamos el Proveedor transmitiendo el arreglo y la función de añadir
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
