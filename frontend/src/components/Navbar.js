// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/products">PRODUCTS</Link>
        </li>
        <li>
          <Link to="/contact">CONTACTS</Link>
        </li>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
        <li>
          <Link to="/logout">LOGOUT</Link>
        </li>
      </ul>
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fas fa-shopping-bag"></i> {/* Font Awesome Bag Icon */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
