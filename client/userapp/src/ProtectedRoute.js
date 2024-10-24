// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext';

// // Higher-order component to protect routes
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />; // Redirect to login if not authenticated
//   }

//   return children;
// };

// export default ProtectedRoute;



// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
