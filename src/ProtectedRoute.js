import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpinAtom from './components/atoms/Spin';



function ProtectedRoute({ children, allowedRoles }) {
  const user = useSelector((state) => state.auth.user);
  const userProfile = useSelector(state => state.profiles.user)
  const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');

  // console.log(userProfile)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!userProfile) {
    return (
      <div style={{
        backgroundColor: backgroundColor.trim() || '#1a1a2e', 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
        <SpinAtom>Loading...</SpinAtom>;
      </div>
    )

  }

  const userRole = userProfile.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}

export default ProtectedRoute;

