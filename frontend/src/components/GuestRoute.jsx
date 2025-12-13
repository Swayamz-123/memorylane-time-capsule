// src/components/GuestRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute = ({ children }) => {
  const { accessToken } = useAuth();

  // If the user has an access token, they are logged in.
  // Redirect them from the guest page (e.g., login) to the home page.
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  // If the user is not logged in, show the component they are trying to access.
  return children;
};

export default GuestRoute;