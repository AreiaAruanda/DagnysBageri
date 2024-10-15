import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useContext(CartContext); // Access cart, removeFromCart, cartTotal from CartContext

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${cartTotal}</h3>
    </div>
  );
};

export default Cart;
