import React, { createContext, useState, useCallback, useContext, useMemo } from 'react';
import AuthContext from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const { refreshToken, clearLocalStorageAndLogout } = useContext(AuthContext);

    const fetchOrders = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
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
    }, [refreshToken, clearLocalStorageAndLogout]);

    const updateOrderStatus = useCallback(async (orderId, newStatus) => {
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
    }, [orders, refreshToken, clearLocalStorageAndLogout]);


// Utility function to sort orders by status
const sortOrders = useCallback((orders) => {
    const statusOrder = {
        "Pending": 1,
        "Accepted": 2,
        "Ready for pick up": 3,
        "Delivered": 4
    };

    return orders.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}, []);

const contextValue = useMemo(() => ({
    orders,
    fetchOrders,
    updateOrderStatus,
    sortOrders
}), [orders, fetchOrders, updateOrderStatus, sortOrders]);

    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => useContext(OrderContext);