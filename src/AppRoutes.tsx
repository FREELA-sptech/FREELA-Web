import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'

const AppRoutes = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
