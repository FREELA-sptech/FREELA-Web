import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './shared/components/Header/Header'
import Home from './pages/home/Home'

const AppRoutes = () => (
  <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
