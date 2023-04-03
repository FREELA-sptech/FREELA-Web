import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='background-class'>
      <Header/>
      <Home/>
    </div>
  )
}

export default App
