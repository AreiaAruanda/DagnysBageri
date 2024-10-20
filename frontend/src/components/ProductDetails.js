import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID from the URL

const ProductDetails = () => {
  const { id } = useParams(); // Get product id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch product details by id
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5032/api/v1/products/${id}`); // Fetch the specific product by its ID
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product details available.</div>;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <img src={product.thumbnail} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Ingredients: {product.ingredients.join(', ')}</p>
      <p>Categories: {product.categories.map(cat => cat.name).join(', ')}</p>
    </div>
  );
};

export default ProductDetails;
