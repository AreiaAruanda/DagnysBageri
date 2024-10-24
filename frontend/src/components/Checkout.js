import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext'; // Assuming you have the cart context
import Cart from './Cart';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext); // Access the cart and clearCart function
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupDate: '',
    orderDate: new Date().toISOString().split('T')[0], // Set current date by default
    totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total cart amount
    orderItems: cart,
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleCheckout = () => {
    // Here you'd typically send this info to the backend
    console.log('Customer Info:', customerInfo);

    // Example: Use fetch or axios to send the data to the backend
    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerInfo),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Checkout Successful:', data);
      clearCart(); // Clear the cart after successful checkout
    })
    .catch(error => {
      console.error('Checkout Error:', error);
    });

    alert('Checkout Successful!');
  };

  return (

    <div className="background">
      <div className="checkout-container">
        <h2>Checkout</h2>

        <div className="cart-summary">
          <Cart />
        </div>

        <div className="customer-info">
          <h3>Customer Information</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={customerInfo.firstName} onChange={handleInputChange} maxLength="50" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={customerInfo.lastName} onChange={handleInputChange} maxLength="50" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={customerInfo.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={customerInfo.phone} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" value={customerInfo.pickupDate} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Order Date</label>
              <input type="date" name="orderDate" value={customerInfo.orderDate} readOnly />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" className='textarea' value={customerInfo.notes} onChange={handleInputChange} maxLength="500" />
            </div>
            <button type="submit" className="checkout-button">Complete Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;