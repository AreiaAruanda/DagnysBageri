import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Define the Orders component
const Orders = () => {
    // State variable to store orders
    const [orders, setOrders] = useState([]);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');

            // Check if the token exists
            if (!token) {
                throw new Error('No token found');
            }

            // Send a GET request to the orders endpoint using fetch
            const response = await fetch('http://localhost:5032/api/v1/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                }
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            // Parse the JSON response
            const data = await response.json();

            // Update the orders state
            setOrders(data);
        } catch (error) {
            // Handle error response
            console.error('Error fetching orders:', error);
        }
    };

    // Use useEffect to fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        // Container div with Bootstrap class
        <div className="container mt-5">
            <h2 className="text-center">Orders</h2>
            {/* Table to display orders */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Order Date</th>
                        <th>Pickup Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{new Date(order.pickupDate).toLocaleDateString()}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.status}</td>
                            <td>
                                <ul>
                                    {order.orderItems.map(item => (
                                        <li key={item.id}>
                                            {item.product.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Export the Orders component as the default export
export default Orders;