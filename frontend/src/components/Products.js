import React, { useState, useEffect } from 'react';

// Functional component for the Products page
const Products = () => {
    const [products, setProducts] = useState([]);  // State to store the products
    const [loading, setLoading] = useState(true);  // State to show loading spinner
    const [error, setError] = useState(null);      // State to handle errors

    // Function to fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5032/api/v1/products/list');  // Send HTTP GET request to the API
            if (!response.ok) {
                throw new Error('Failed to fetch products');  // Handle HTTP errors
            }
            const data = await response.json();  // Parse the JSON response
            setProducts(data);  // Store the fetched products in state
            setLoading(false);  // Set loading to false once data is loaded
        } catch (err) {
            setError(err.message);  // Set error message if request fails
            setLoading(false);      // Stop loading when request completes
        }
    };

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Render loading spinner while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if something went wrong
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="background">
            <div className="container">
                <h2>Products</h2>
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="col-md-4">
                                <div className="card mb-4">
                                    <img
                                        src={product.thumbnail}
                                        className="card-img-top"
                                        alt={product.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">Price: {product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Export the Products component
export default Products;
