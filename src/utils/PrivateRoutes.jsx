import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoutes = () => {
  
  let newTokenVal = sessionStorage.getItem("accesValue")
  return (
    newTokenVal ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes