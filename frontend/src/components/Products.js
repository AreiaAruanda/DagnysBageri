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

    // State for selected filters and filter popup
    const [selectedTags, setSelectedTags] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [expandedOption, setExpandedOption] = useState(null); // Track expanded option

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

    const filteredProducts = products.filter(product => {
        const categoryMatch = category 
            ? product.categories.some(cat => cat.categoryURL.toLowerCase() === category.toLowerCase())
            : true;

        const tagsMatch = selectedTags.length === 0 || selectedTags.every(tag => product.filterTags.includes(tag));

        return categoryMatch && tagsMatch;
    });

    const categoryName = category && filteredProducts.length > 0
        ? filteredProducts[0].categories.find(cat => cat.categoryURL === category)?.name
        : 'Products';

    const toggleFilterPopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const toggleOptions = (optionId) => {
        // Expand one category at a time
        setExpandedOption(expandedOption === optionId ? null : optionId);
    };

    const handleTagChange = (event) => {
        const { value, checked } = event.target;
        setSelectedTags(prevTags => 
            checked ? [...prevTags, value] : prevTags.filter(tag => tag !== value)
        );
    };

    const applyFilters = () => {
        console.log('Selected Tags:', selectedTags);
        // Logic to apply filters could go here if necessary
        setPopupOpen(false); // Close the popup after applying filters
    };

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Render loading spinner while fetching data
    if (loading) return <div>Loading...</div>;
    // Render error message if something went wrong
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="background">
            <a href="/" className="logo">
                <img src={logo} alt="Mormor Dagny's Bageri" />
            </a>

            <div className="product-container">
                <h1 className="title">{categoryName}</h1>
                {/* Filter Icon and Text */}
                <div className="filter-header">
                    <img className="filter" src={filter} alt="Filter Icon" onClick={toggleFilterPopup} />
                    <span className="filter-text" onClick={toggleFilterPopup}>FILTER</span>
                </div>

                {/* Filter Popup */}
                {isPopupOpen && (
                    <div className="filter-popup">
                        <div className="popup-content">
                            <span className="close" onClick={toggleFilterPopup}>&times;</span>
                            <h3>FILTER BY</h3>

                            {/* Category Filters */}
                            <div className="filter-category">
                                <h5 onClick={() => toggleOptions('category-options')}>Category</h5>
                                <div className="filter-options" style={{ display: expandedOption === 'category-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" value="classic-breads" onChange={handleTagChange} /> Classic Breads</label><br />
                                    <label><input type="checkbox" value="grandmas-pastries" onChange={handleTagChange} /> Grandma’s Pastries</label><br />
                                    <label><input type="checkbox" value="homemade-cakes" onChange={handleTagChange} /> Homemade Cakes</label><br />
                                    <label><input type="checkbox" value="warm-drinks-coffee" onChange={handleTagChange} /> Warm Drinks & Coffee</label><br />
                                    <label><input type="checkbox" value="hearty-sandwiches" onChange={handleTagChange} /> Hearty Sandwiches</label>
                                </div>
                            </div>

                            {/* Flavour Filters */}
                            <div className="filter-category">
                                <h5 onClick={() => toggleOptions('flavour-options')}>Flavour</h5>
                                <div className="filter-options" style={{ display: expandedOption === 'flavour-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" value="chocolate" onChange={handleTagChange} /> Chocolate</label><br />
                                    <label><input type="checkbox" value="vanilla" onChange={handleTagChange} /> Vanilla</label><br />
                                    <label><input type="checkbox" value="fruit" onChange={handleTagChange} /> Fruit</label><br />
                                    <label><input type="checkbox" value="nutty" onChange={handleTagChange} /> Nutty</label><br />
                                    <label><input type="checkbox" value="spiced" onChange={handleTagChange} /> Spiced</label>
                                </div>
                            </div>

                            {/* Dietary Restrictions Filters */}
                            <div className="filter-category">
                                <h5 onClick={() => toggleOptions('dietary-options')}>Dietary Restrictions</h5>
                                <div className="filter-options" style={{ display: expandedOption === 'dietary-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" value="gluten-free" onChange={handleTagChange} /> Gluten-Free</label><br />
                                    <label><input type="checkbox" value="vegan" onChange={handleTagChange} /> Vegan</label><br />
                                    <label><input type="checkbox" value="nut-free" onChange={handleTagChange} /> Nut-Free</label><br />
                                    <label><input type="checkbox" value="sugar-free" onChange={handleTagChange} /> Sugar-Free</label><br />
                                    <label><input type="checkbox" value="dairy-free" onChange={handleTagChange} /> Dairy-Free</label>
                                </div>
                            </div>

                            {/* Occasion Filters */}
                            <div className="filter-category">
                                <h5 onClick={() => toggleOptions('occasion-options')}>Occasion</h5>
                                <div className="filter-options" style={{ display: expandedOption === 'occasion-options' ? 'block' : 'none' }}>
                                    <label><input type="checkbox" value="breakfast" onChange={handleTagChange} /> Breakfast</label><br />
                                    <label><input type="checkbox" value="fika" onChange={handleTagChange} /> Fika</label><br />
                                    <label><input type="checkbox" value="birthday" onChange={handleTagChange} /> Birthday</label><br />
                                    <label><input type="checkbox" value="wedding" onChange={handleTagChange} /> Wedding</label><br />
                                    <label><input type="checkbox" value="lucia" onChange={handleTagChange} /> Lucia</label>
                                </div>
                            </div>

                            <button onClick={applyFilters}>Apply Filters</button>
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

// Export the Products component
export default Products;
