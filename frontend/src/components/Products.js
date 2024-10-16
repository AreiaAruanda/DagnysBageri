import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';

// Functional component for the Products page
const Products = () => {
    const [products, setProducts] = useState([]);  // State to store the products
    const [loading, setLoading] = useState(true);  // State to show loading spinner
    const [error, setError] = useState(null);      // State to handle errors
    const { category } = useParams();              // Get the category from the URL

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

    const filteredProducts = category
        ? products.filter(product => 
            product.categories.some(cat => cat.categoryURL === category))
        : products;

    const categoryName = category && filteredProducts.length > 0
        ? filteredProducts[0].categories.find(cat => cat.categoryURL === category)?.name
        : 'Products';

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
                <h2>{categoryName}</h2>
                <div className="row justify-content-center">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="col-sm-auto col-md-auto col-lg-auto">
                                <div className="d-flex justify-content-center align-items-stretch h-100">
                                    <div className="card mb-4 d-flex flex-column">
                                        <div className="card-img-wrapper">
                                            <img
                                                src={product.thumbnail}
                                                className="card-img-top"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text">Price: {product.price}</p>
                                        </div>
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
