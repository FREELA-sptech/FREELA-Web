import { NavLink, useNavigate } from 'react-router-dom';
import ButtonBase from '../ButtonBase/ButtonBase';
import './style.scss'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();

  const handleTransition = (path: string) => {
    navigate(path)
  }

  return (
    <Navbar className='position-fixed w-100' collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login" className='tertiary-outline button-base'>
              Teste
              {/* <ButtonBase onClick={() => handleTransition("/login")} buttonType='tertiary-outline' label='login' /> */}
            </Nav.Link>
            <Nav.Link>
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <header className="header-background">
    //   <div className="container flex-row justify-space-between">
    //     <h1 className="logo" onClick={() => handleTransition("/")}>FREELA</h1>
    //     <ul className='menu flex-row align-center'>
    //       <li className='forms flex-row'>
    //         <ButtonBase onClick={() => handleTransition("/login")} buttonType='tertiary-outline' label='login' />
    //         <ButtonBase onClick={() => handleTransition("/cadastro")} buttonType='secundary-standart' label='cadastre-se' />
    //       </li>
    //     </ul>
    //   </div>
    // </header>
  );
}
export default Header;
