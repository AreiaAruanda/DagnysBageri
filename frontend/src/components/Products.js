import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link for navigation
import './Products.css';
import { CartContext } from '../contexts/CartContext'; // Import the Cart Context after Merging with makeCart branch

const Products = () => {
    const [products, setProducts] = useState([]);  // State to store the products
    const [loading, setLoading] = useState(true);  // State to show loading spinner
    const [error, setError] = useState(null);      // State to handle errors
    const { category } = useParams();              // Get the category from the URL
    const { addToCart } = useContext(CartContext); // Access addToCart from CartContext after Merging with makeCart branch

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
                <h2 className="title">{categoryName}</h2>
                <div className="row justify-content-center">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="col-sm-auto col-md-auto col-lg-auto">
                                <div className="d-flex justify-content-center align-items-stretch h-100">
                                    <div className="card mb-4 d-flex flex-column">
                                        <div className="card-img-wrapper">
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    src={product.thumbnail}
                                                    className="card-img-top"
                                                    alt={product.name}
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <Link to={`/product/${product.id}`}>
                                                <h5 className="card-title">{product.name}</h5>
                                            </Link>
                                            <p className="card-text">{product.description}</p>
                                            <p id="price" className="card-text">Price: ${product.price}</p>
                                            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
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

export default Products;