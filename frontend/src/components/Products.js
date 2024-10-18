import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { CartContext } from '../contexts/CartContext'; // Import the Cart Context
import logo from '../assets/logo_circle.png';
import filter from '../assets/filters.png';

// Functional component for the Products page
const Products = () => {
    const [products, setProducts] = useState([]); // State to store the products
    const [loading, setLoading] = useState(true); // State to show loading spinner
    const [error, setError] = useState(null); // State to handle errors
    const { category } = useParams(); // Get the category from the URL
    const { addToCart } = useContext(CartContext); // Access addToCart from CartContext

    // Function to fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5032/api/v1/products/list');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const filteredProducts = category
        ? products.filter(product => 
            product.categories.some(cat => cat.categoryURL === category))
        : products;

    const categoryName = category && filteredProducts.length > 0
        ? filteredProducts[0].categories.find(cat => cat.categoryURL === category)?.name
        : 'Products';

    // Filter popup functionality
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [expandedOption, setExpandedOption] = useState(null); // Track expanded option

    const toggleFilterPopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const toggleOptions = (optionId) => {
        // Expand one category at a time
        setExpandedOption(expandedOption === optionId ? null : optionId);
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
            <a href="/" className="logo">
                <img 
                    src={logo} 
                    alt="Mormor Dagny's Bageri" 
                /> 
            </a>

            <div className="product-container">
                <h1 className="title">{categoryName}</h1>
                {/* Filter Icon and Text */}
                <div className="filter-header">
                    <img 
                        className="filter" 
                        src={filter} 
                        alt="Filter Icon" 
                        onClick={toggleFilterPopup} 
                    />
                    <span className="filter-text" onClick={toggleFilterPopup}>FILTER</span>
                </div>

                {/* Filter Popup */}
                {isPopupOpen && (
                    <div className="filter-popup">
                        <div className="popup-content">
                            <span className="close" onClick={toggleFilterPopup}>&times;</span>

                            <h3>Filter by</h3>

                            {/* Category Filters */}
                            <div className="filter-category">
                                <div className="filter-name" onClick={() => toggleOptions('category-options')}>Category</div>
                                <div className="filter-options" style={{ display: expandedOption === 'category-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" name="category" value="classic-breads" /> Classic Breads</label><br />
                                    <label><input type="checkbox" name="category" value="grandmas-pastries" /> Grandma’s Pastries</label><br />
                                    <label><input type="checkbox" name="category" value="homemade-cakes" /> Homemade Cakes</label><br />
                                    <label><input type="checkbox" name="category" value="warm-drinks-coffee" /> Warm Drinks & Coffee</label><br />
                                    <label><input type="checkbox" name="category" value="hearty-sandwiches" /> Hearty Sandwiches</label>
                                </div>
                            </div>          

                            {/* Flavour Filters */}
                            <div className="filter-category">
                                <div className="filter-name" onClick={() => toggleOptions('flavour-options')}>Flavour</div>
                                <div className="filter-options" style={{ display: expandedOption === 'flavour-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" name="flavour" value="chocolate" /> Chocolate</label><br />
                                    <label><input type="checkbox" name="flavour" value="vanilla" /> Vanilla</label><br />
                                    <label><input type="checkbox" name="flavour" value="fruit" /> Fruit</label><br />
                                    <label><input type="checkbox" name="flavour" value="nutty" /> Nutty</label><br />
                                    <label><input type="checkbox" name="flavour" value="spiced" /> Spiced</label>
                                </div>
                            </div>

                            {/* Dietary Restrictions Filters */}
                            <div className="filter-category">
                                 <div className="filter-name" onClick={() => toggleOptions('dietary-options')}>Dietary Restrictions</div>
                                <div className="filter-options" style={{ display: expandedOption === 'dietary-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" name="dietary" value="gluten-free" /> Gluten-Free</label><br />
                                    <label><input type="checkbox" name="dietary" value="vegan" /> Vegan</label><br />
                                    <label><input type="checkbox" name="dietary" value="nut-free" /> Nut-Free</label><br />
                                    <label><input type="checkbox" name="dietary" value="sugar-free" /> Sugar-Free</label><br />
                                    <label><input type="checkbox" name="dietary" value="dairy-free" /> Dairy-Free</label>
                                </div>
                            </div>

                            {/* Occasion Filters */}
                            <div className="filter-category">
                                <div className="filter-name" onClick={() => toggleOptions('occasion-options')}>Occasion</div>
                                <div className="filter-options" style={{ display: expandedOption === 'occasion-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" name="occasion" value="breakfast" /> Breakfast</label><br />
                                    <label><input type="checkbox" name="occasion" value="fika" /> Fika</label><br />
                                    <label><input type="checkbox" name="occasion" value="birthday" /> Birthday</label><br />
                                    <label><input type="checkbox" name="occasion" value="wedding" /> Wedding</label>
                                    <label><input type="checkbox" name="occasion" value="lucia" /> Lucia</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p id="price" className="card-text">Price: ${product.price}</p>
                                            <button className="button" onClick={() => addToCart(product)}>ADD TO CART</button>
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
