import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Cart.css'; // Import the CSS file here

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useContext(CartContext);

  return (
    <div className="cart-container">
      {/*<h2>Cart Summary</h2>*/}
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id}>
            <div>
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-quantity"> Quantity: {item.quantity}</span>
            </div>
            <button className="button" onClick={() => removeFromCart(item.id)}>
              REMOVE
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        {cart.length > 0 && (
          <button className="button" onClick={clearCart}>
            CLEAR CART
          </button>
        )}
        <div className="cart-total">Total ${cartTotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Cart;
