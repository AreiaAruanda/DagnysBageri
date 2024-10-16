import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useContext(CartContext);  // Get cart data and functions from context

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} >
            {item.name} - ${item.price.toFixed(2)} 
            <span> Quantity: {item.quantity}</span>
            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: ${cartTotal.toFixed(2)}</h3>

      {/* Clear Cart Button */}
      {cart.length > 0 && (
        <div>
          <button onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}

    </div>
  );
};

export default Cart;
