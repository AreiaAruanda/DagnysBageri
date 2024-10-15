import React from 'react';

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
                </div>
            </div>
        </div>
    );
};

// Export the Home component as the default export
export default Home;