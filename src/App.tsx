import './style.scss'

import AppRoutes from "./AppRoutes"
import { AuthProvider } from './context/AuthContext'

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
)

export default App
