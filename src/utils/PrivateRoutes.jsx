import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'



const PrivateRoutes = () => {

  const { accessToken } = useAuth();
  

  return (
    accessToken ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoutes