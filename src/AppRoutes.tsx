import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import { OrderDetails } from './pages/Order/OrderDetails/OrderDetails'
import { CreateOrder } from './pages/Order/CreateOrder/CreateOrder'
import Proposta from './pages/Proposta/Proposta'

const AppRoutes = () => (
  <BrowserRouter>
    <Header authenticated={false}></Header>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/order-details/:id" element={<OrderDetails/>} />
      <Route path="/create-order" element={<CreateOrder/>} />
      <Route path="/proposta" element={<Proposta />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
