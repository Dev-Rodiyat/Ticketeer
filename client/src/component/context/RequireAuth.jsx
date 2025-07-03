import React, { useContext } from 'react'
import { UserContext } from './UserContext.jsx'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const RequireAuth = () => {
  const {user} = useContext(UserContext);

  const content = user? <Outlet/> : <Navigate to={"/login"} replace />;
  toast.error('Please log into your account')

  return content
}

export default RequireAuth;