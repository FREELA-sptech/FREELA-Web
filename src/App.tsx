import './style.scss'

import Header from './components/Header/Header';

import Home from "./views/Home"

function App() {
  return (
    <div className='background-class'>
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
