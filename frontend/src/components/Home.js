import React from 'react';
import { Link } from 'react-router-dom';

// Functional component for the Home page
const Home = () => {
    return (
        // Main container div with Bootstrap class
        <div className="container">
            <div className="row">
                {/* Centered column for the content */}
                <div className="col-12 text-center">
                    {/* Main heading */}
                    <h1>Mormor Dagnys Bageri</h1>
                     {/* Description paragraph */}
                     <p>This is the home page of our webshop</p>
                    <p>Browse our product categories:</p>
                    <Link to="/products" className="btn btn-primary">View Products</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
