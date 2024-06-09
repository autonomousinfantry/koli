import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // veya başka bir oturum kontrolü
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
