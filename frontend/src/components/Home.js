import React from 'react';
import './Home.css';
import cardImage from '../assets/mormors_cookie.png';
import logo from '../assets/logo_circle.png';

// Functional component for the Home page
const Home = () => {
    return (
        <div className="background">
            <div className="container">
                <div className="row">
                    {/* Centered column for the content */}
                    <div className="col-12">
                        {/* LOGO */}
                        <a href="/" className="logo">
                            <img 
                                src={logo} 
                                alt="Mormor Dagny's Bageri" 
                            /> 
                        </a>
                        {/*categories*/}
                        <div className="category-links">
                            <a href="/products/classic-breads">CLASSIC BREADS</a>
                            <a href="/products/grandmas-pastries">GRANDMA’S PASTRIES</a>
                            <a href="/products/homemade-cakes">HOMEMADE CAKES</a>
                            <a href="/products/warm-drinks-coffee">WARM DRINKS & COFFEE</a>
                            <a href="/products/hearty-sandwiches">HEARTY SANDWICHES</a>
                        </div>
                        <a href="/" className="cookie-button">
                            <img 
                                src={cardImage} 
                                alt="Go to our webshop" 
                                className="cookie" 
                            />
                            <span className="button-text">ORDER NOW</span> 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
