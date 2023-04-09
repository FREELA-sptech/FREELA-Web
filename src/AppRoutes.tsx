import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'




const AppRoutes = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
