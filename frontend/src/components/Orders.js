import React, { useState, useEffect, useRef } from 'react';
import { useOrderContext } from '../contexts/OrderContext'; // Correct import path
import './Orders.css';

// Utility function to format dates
const formatDate = (dateString) => {
    return dateString.slice(0, 10);
};


const Orders = () => {
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const { orders, fetchOrders, updateOrderStatus, sortOrders } = useOrderContext();
    const expandedOrderRef = useRef(null);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

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
                    {sortOrders(orders).map(order => (
                        <div key={order.id} className="order-card-wrapper mb-4">
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
                                    <p className="card-text"><strong>Customer Name:</strong> {order.firstName} {order.lastName}</p>
                                    <p className="card-text"><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                                    <p className="card-text"><strong>Status:</strong> {order.status}</p>
                                    {expandedOrderId === order.id && (
                                        <div className="order-details">
                                            <p className="card-text"><strong>Email:</strong> {order.email}</p>
                                            <p className="card-text"><strong>Phone:</strong> {order.phone}</p>
                                            <p className="card-text"><strong>Pickup Date:</strong> {formatDate(order.pickupDate)}</p>
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