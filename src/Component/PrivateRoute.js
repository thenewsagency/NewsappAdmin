import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from the context

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
