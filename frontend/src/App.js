// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import Home from './components/Home'; // Import the Home component
import './App.css'; // Import the CSS file for styling
import ProductList from './components/ProductList';
import { CartProvider } from './contexts/CartContext';  // Import CartContext provider
import Navbar from './components/Navbar'; // Import the Navbar component
import Products from './components/Products'; // Import the Products component
import Contact from './components/Contact'; // Import the Contact component
import Cart from './components/Cart'; // Import the Cart component

// Main App component
function App() {
  return (
    // Router component to enable routing in the application
    <Router>
    <CartProvider>
      <div className="App">
        {/* Routes component to define the different routes in the application */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </CartProvider>
    </Router>
  );
}

// Export the App component as the default export
export default App;
