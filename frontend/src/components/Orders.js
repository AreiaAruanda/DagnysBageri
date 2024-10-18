import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../contexts/AuthContext'; // Correct import path
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const { logout, refreshToken, clearLocalStorageAndLogout } = useContext(AuthContext);
    const expandedOrderRef = useRef(null);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Retrieved token for fetching orders:', token);
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch('http://localhost:5032/api/v1/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                // Token is expired or invalid, try to refresh it
                try {
                    await refreshToken();
                    const newToken = localStorage.getItem('token');
                    const retryResponse = await fetch('http://localhost:5032/api/v1/orders', {
                        headers: {
                            'Authorization': `Bearer ${newToken}`
                        }
                    });
                    if (!retryResponse.ok) {
                        throw new Error('Failed to fetch orders after token refresh');
                    }
                    const data = await retryResponse.json();
                    setOrders(data);
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    clearLocalStorageAndLogout();
                }
            } else if (!response.ok) {
                throw new Error('Failed to fetch orders');
            } else {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            clearLocalStorageAndLogout();
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`http://localhost:5032/api/v1/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.status === 401) {
                // Token is expired or invalid, try to refresh it
                try {
                    await refreshToken();
                    const newToken = localStorage.getItem('token');
                    const retryResponse = await fetch(`http://localhost:5032/api/v1/orders/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newToken}`
                        },
                        body: JSON.stringify({ status: newStatus })
                    });
                    if (!retryResponse.ok) {
                        throw new Error('Failed to update order status after token refresh');
                    }
                    // Update the order status locally
                    setOrders(orders.map(order => 
                        order.id === orderId ? { ...order, status: newStatus } : order
                    ));
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    clearLocalStorageAndLogout();
                }
            } else if (!response.ok) {
                throw new Error('Failed to update order status');
            } else {
                // Update the order status locally
                setOrders(orders.map(order => 
                    order.id === orderId ? { ...order, status: newStatus } : order
                ));
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            clearLocalStorageAndLogout();
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (expandedOrderRef.current && !expandedOrderRef.current.contains(event.target)) {
                setExpandedOrderId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [expandedOrderId]);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <div className="background">
            <div className="orders-container">
                <h2 className="text-center">Orders</h2>
                <div className="row">
                    {orders.map(order => (
                        <div key={order.id} className="col-md-6 col-lg-4 mb-4">
                            <button
                                className={`card order-summary ${expandedOrderId === order.id ? 'order-expanded' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOrderDetails(order.id);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        toggleOrderDetails(order.id);
                                    }
                                }}
                                aria-expanded={expandedOrderId === order.id}
                                ref={expandedOrderId === order.id ? expandedOrderRef : null}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">Order ID: {order.id}</h5>
                                    <p className="card-text"><strong>Customer Name:</strong> {order.customerName}</p>
                                    <p className="card-text"><strong>Order Date:</strong> {order.orderDate}</p>
                                    <p className="card-text"><strong>Status:</strong> {order.status}</p>
                                    {expandedOrderId === order.id && (
                                        <div className="order-details">
                                            <p className="card-text"><strong>Email:</strong> {order.email}</p>
                                            <p className="card-text"><strong>Phone:</strong> {order.phone}</p>
                                            <p className="card-text"><strong>Pickup Date:</strong> {order.pickupDate}</p>
                                            <p className="card-text"><strong>Total Amount:</strong> {order.totalAmount}</p>
                                            <p className="card-text"><strong>Products:</strong></p>
                                            <ul>
                                                {Object.entries(order.orderItems.reduce((acc, item) => {
                                                    if (acc[item.product.name]) {
                                                        acc[item.product.name] += item.quantity;
                                                    } else {
                                                        acc[item.product.name] = item.quantity;
                                                    }
                                                    return acc;
                                                }, {})).map(([name, quantity]) => (
                                                    <li key={name}>
                                                        {name} - Quantity: {quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="form-group">
                                                <label htmlFor={`status-${order.id}`}><strong>Update Status:</strong></label>
                                                <select
                                                    id={`status-${order.id}`}
                                                    className="form-control"
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    onClick={(e) => e.stopPropagation()} // Prevent collapse on select click
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Ready for pick up">Ready for pick up</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;