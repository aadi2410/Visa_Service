import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('loginData')||null;

    return (
    
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />

  );
};

export default PrivateRoute;
