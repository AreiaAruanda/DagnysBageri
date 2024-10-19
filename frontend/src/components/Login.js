import React, { useState, useContext } from 'react'; // Import React, useState, and useContext hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AuthContext from '../contexts/AuthContext'; // Import AuthContext
import logo from '../assets/logo_circle.png'; // Import logo image

// Define the Login component
const Login = () => {
    // State variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Initialize navigate function
    const navigate = useNavigate();

    // Access login function from AuthContext
    const { login } = useContext(AuthContext);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Send a POST request to the authentication endpoint using fetch
            const response = await fetch('http://localhost:5032/api/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Username: username, Password: password })
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Parse the JSON response
            const data = await response.json();

            // Call the login function from AuthContext with the token
            login(data.token);

            // Navigate to the home page
            navigate('/orders');
        } catch (error) {
            // Handle error response
            console.error('Login failed:', error);
        }
    };

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
                        <div className="login-form mt-5">
                            <h2 className="login-title mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Username"
                                        aria-label="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="button">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;