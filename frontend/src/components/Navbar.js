// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

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
        {isLoggedIn && (
        <li>
          <Link to="/orders">ORDERS</Link>
        </li>
        )}
        {!isLoggedIn ? (
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
        ) : (
        <li>
          <button className="logout-button" onClick={logout}>LOGOUT</button>
        </li>
      )}
      </ul>
      {!isLoggedIn && (
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fas fa-shopping-bag"></i> {/* Font Awesome Bag Icon */}
        </Link>
      </div>
      )}
    </nav>
  );
};

export default Navbar;
