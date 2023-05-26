import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import  OrderDetails  from './pages/Order/OrderDetails/OrderDetails'
import { CreateOrder } from './pages/Order/CreateOrder/CreateOrder'
import Proposta from './pages/Proposta/Proposta'
import AuthProvider from './core/Auth/AuthContext'
import RedirectProvider from './core/Auth/RedirectContext'
import { UserStorage } from './store/userStorage'
import Chat from './pages/Chat/Chat'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RedirectProvider element={<Index />} path='/home' />} />
        <Route path="/login" element={<RedirectProvider element={<Login />} path='/home' />} />
        <Route path='/home' element={<AuthProvider element={<Home />} />} />
        <Route path="/cadastro" element={<RedirectProvider element={<Cadastro />} path='/home' />} />
        <Route path="/perfil" element={<AuthProvider element={<Profile />} />} />
        <Route path="/order-details/:id" element={<AuthProvider element={<OrderDetails />} />} />
        <Route path="/create-order" element={<AuthProvider element={<CreateOrder />} />} />
        <Route path="/proposta" element={<AuthProvider element={<Proposta />} />} />
        <Route path="/chat" element={<AuthProvider element={<Chat />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
