import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import { OrderDetails } from './pages/Order/OrderDetails/OrderDetails'
import { CreateOrder } from './pages/Order/CreateOrder/CreateOrder'
import Proposta from './pages/Proposta/Proposta'
import { AuthContext, AuthProvider } from './context/AuthContext'
import { useContext, useEffect } from 'react'

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/order-details/:id" element={isAuthenticated ? <OrderDetails /> : <OrderDetails />} />
        <Route path="/create-order" element={isAuthenticated ? <CreateOrder /> : <CreateOrder />} />
        <Route path="/proposta" element={isAuthenticated ? <Proposta /> : <Proposta />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
