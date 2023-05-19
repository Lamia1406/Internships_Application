import { Route, Redirect, Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
