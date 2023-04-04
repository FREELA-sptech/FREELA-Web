import { useNavigate } from 'react-router-dom';
import ButtonBase from '../ButtonBase/ButtonBase';
import './style.scss'

function Header() {
  const navigate = useNavigate();

  const handleTransition = (path: string) => {
    navigate(path)
  }

  return (
    <header className="header-background">
      <div className="container flex-row justify-space-between">
        <h1 className="logo" onClick={() => handleTransition("/")}>FREELA</h1>
        <ul className='menu flex-row align-center'>
          <li className='forms flex-row'>
            <ButtonBase onClick={() => handleTransition("/login")} buttonType='tertiary-outline' label='login' />
            <ButtonBase onClick={() => handleTransition("/cadastro")} buttonType='secundary-standart' label='cadastre-se' />
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;
