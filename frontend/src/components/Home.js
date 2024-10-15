import React from 'react';
import Cart from './Cart';
import { CartProvider } from './CartContext';  // Import CartContext provider
import ProductList from './ProductList';


  const products = [
    { id: 1, name: 'Croissant', price: 2.5 },
    { id: 2, name: 'Baguette', price: 1.5 },
    { id: 3, name: 'Muffin', price: 3.0 },
  ];

// Functional component for the Home page
const Home = () => {
    return (
        // Main container div with Bootstrap class
    <CartProvider>
        <div className="container">
                    <Cart/>
            <div className="row">
                {/* Centered column for the content */}
                <div className="col-12 text-center">
                    {/* Main heading */}
                    <h1>Mormor Dagnys Bageri</h1>
                    {/* Description paragraph */}
                    <p>This is the home page of our webshop</p>
                    <ProductList products={products} />  {/* Product list for adding items */}
                </div>
            </div>
        </div>
    </CartProvider>
    );
};

// Export the Home component as the default export
export default Home;