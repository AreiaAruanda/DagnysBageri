import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import Cart from './Cart'; // Import the Cart component
import './Checkout.css';  // Import the CSS file here
import '../App.css'; // Import the CSS file for styling

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleCheckout = () => {
    // Simulate backend call here
    console.log('Customer Info:', customerInfo);
    console.log('Cart Items:', cart);
    clearCart();
    alert('Checkout Successful!');
  };

  return (

    <div className="background">
      <div className="checkout-container">
        <h2>Checkout</h2>

        <div className="cart-summary">
          <Cart /> {/* Cart component stays separate but included in the layout */}
        </div>

        <div className="customer-info">
          <h3>Customer Information</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={customerInfo.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" name="address" value={customerInfo.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="checkout-button">Complete Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;