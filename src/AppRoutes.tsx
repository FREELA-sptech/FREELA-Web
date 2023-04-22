import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'

const AppRoutes = () => (
  <BrowserRouter>
    <Header authenticated={false}></Header>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
