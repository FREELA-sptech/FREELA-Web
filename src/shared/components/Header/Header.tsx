import { NavLink, useNavigate } from 'react-router-dom';
import ButtonBase from '../ButtonBase/ButtonBase';
import './style.scss'
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();

  const handleTransition = (path: string) => {
    navigate(path)
  }

  return (
    <Navbar
      expand='xl'
      className='py-3 header-background'
    >
      <Container>
        <Navbar.Brand className='logo' href="#">FREELA</Navbar.Brand>
        <Navbar.Toggle aria-controls='control-show-right-side-menu' />
        <Navbar.Offcanvas
          id='control-show-right-side-menu'
          aria-labelledby='control-show-label-menu'
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title style={{color: 'var(--dark-contrast-color)'}} id='control-show-label-menu'>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="text-center justify-content-xl-end flex-grow-1 pt-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
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
