import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Define the Login component
const Login = () => {
    // State variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Initialize navigate function
    const navigate = useNavigate();

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

            // Store the JWT token in local storage
            localStorage.setItem('jwtToken', data.token);

            // Handle successful response
            console.log('Login successful:', data);

            // Navigate to the home page
            navigate('/');
        } catch (error) {
            // Handle error response
            console.error('Login failed:', error);
        }
    };

    return (
        // Container div with Bootstrap class
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Card component for the login form */}
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            {/* Form component */}
                            <form onSubmit={handleSubmit}>
                                {/* Username input field */}
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Password input field */}
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* Submit button */}
                                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the Login component as the default export
export default Login;