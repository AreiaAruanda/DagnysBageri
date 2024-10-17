import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';


const ProductList = () => {
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
  const [products, setProducts] = useState([]); // State to hold the fetched products

    useEffect(() => {
    // Fetch product data from the JSON file in the public folder
    fetch('/products.json')
      .then(response => response.json())  // Convert the response to JSON
      .then(data => setProducts(data))  // Set the fetched products to state
      .catch(error => console.error('Error fetching products:', error));
  }, []);  // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
