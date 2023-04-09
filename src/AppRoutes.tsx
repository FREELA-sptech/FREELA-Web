import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Home from './pages/home/Home'
import Cadastro from './pages/Cadastro/Cadastro'

const AppRoutes = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro/>}/>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
