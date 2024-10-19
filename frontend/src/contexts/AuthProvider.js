import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (this is just a placeholder, replace with actual logic)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const login = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true);
  };

  const logout = useCallback(async () => {
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');

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
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') ? await response.json() : {};

      // Handle successful response
      console.log('Logout successful:', data);

      // Remove the token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // Update the state to reflect that the user is logged out
      setIsLoggedIn(false);

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      // Handle error response
      console.error('Logout failed:', error);
      // Ensure tokens are cleared even if logout request fails
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      navigate('/');
    }
  }, [navigate]);

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await fetch('http://localhost:5032/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  }, [logout]);

  const clearLocalStorageAndLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/');
  }, [navigate]);

  const authContextValue = useMemo(() => ({
    isLoggedIn,
    login,
    logout,
    refreshToken,
    clearLocalStorageAndLogout
  }), [isLoggedIn, logout, refreshToken, clearLocalStorageAndLogout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;