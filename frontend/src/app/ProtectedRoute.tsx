import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './hooks';

interface ProtectedRouteProps {
  redirectPath?: string;
  adminOnly?: boolean; // New prop to specify if the route is admin-only
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/',
  adminOnly = false, // Default to false if not provided
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userRole = useAppSelector((state) => state.auth.user?.role); // Assuming userRole is part of the auth state

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  // If the route is admin-only, check the user role
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to={redirectPath} />;
  }

  // Render child routes if all checks pass
  return <Outlet />;
};

export default ProtectedRoute;
