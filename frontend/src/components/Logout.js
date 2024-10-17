import React from 'react'; // Import React
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Define the Logout component
const Logout = () => {
    // Initialize navigate function
    const navigate = useNavigate();

    // Function to handle logout action
    const handleLogout = async () => {
        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');

            // Check if the token exists
            if (!token) {
                throw new Error('No token found');
            }

            // Send a DELETE request to the authentication endpoint using fetch
            const response = await fetch('http://localhost:5032/api/v1/auth', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                }
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Check if the response has content
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = {};
            }

            // Handle successful response
            console.log('Logout successful:', data);

            // Remove the token from local storage
            localStorage.removeItem('jwtToken');

            // Navigate to the home page
            navigate('/');
        } catch (error) {
            // Handle error response
            console.error('Logout failed:', error);
        }
    };

    return (
        // Container div with Bootstrap class
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    {/* Button to trigger logout action */}
                    <button onClick={handleLogout} className="btn btn-danger btn-block">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export the Logout component as the default export
export default Logout;