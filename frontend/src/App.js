import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import Home from './components/Home'; // Import the Home component
import './App.css'; // Import the CSS file for styling
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { CartProvider } from './contexts/CartContext';  // Import CartContext provider



// Main App component
function App() {
  return (
    // Router component to enable routing in the application
    <Router>
    <CartProvider>
      <div className="App">
      <ProductList/>  {/* Product list for adding items */}
        {/* Routes component to define the different routes in the application */}
        <Routes>
          {/* Route for the home page, rendering the Home component */}
          <Route exact path="/" element={<Home />} />
        </Routes>
      <Cart/>
      </div>
    </CartProvider>
    </Router>
  );
}

// Export the App component as the default export
export default App;