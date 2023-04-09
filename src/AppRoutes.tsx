import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'

const AppRoutes = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
