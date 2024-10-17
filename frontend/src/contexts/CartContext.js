import React, { createContext, useState } from 'react';

// Create a context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
              : item
            );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((item) => 
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId)
      }
    });
  };

  const clearCart = () => {
    setCart([]);  // Empty the cart
  };

  const cartTotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
