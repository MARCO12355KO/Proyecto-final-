// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

// 1. Crear el contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 2. Inicializar el estado leyendo de localStorage (Persistencia)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 3. Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Evitamos duplicados exactos, si ya existe no lo agregamos de nuevo
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };

  // Función para eliminar del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Cálculo del total dinámico
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};