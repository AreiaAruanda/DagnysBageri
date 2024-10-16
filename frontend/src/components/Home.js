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
                            <a href="/classic-breads">CLASSIC BREADS</a>
                            <a href="/grandmas-pastries">GRANDMA’S PASTRIES</a>
                            <a href="/homemade-cakes">HOMEMADE CAKES</a>
                            <a href="/warm-drinks-coffee">WARM DRINKS & COFFEE</a>
                            <a href="/hearty-sandwiches">HEARTY SANDWICHES</a>
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

// Export the Home component as the default export
export default Home;
