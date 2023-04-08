import { Link } from 'react-router-dom';
import './style.scss'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

function Header() {
  return (
    <Navbar
      expand='xl'
      className='py-3 header-background'
      sticky='top'
    >
      <Container>
        <Link to='/' className='logo'>
          FREELA
        </Link>
        <Navbar.Toggle aria-controls='control-show-right-side-menu' />
        <Navbar.Offcanvas
          id='control-show-right-side-menu'
          aria-labelledby='control-show-label-menu'
          placement="end"
        >
          <Offcanvas.Header closeButton className='justify-content-end'>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="text-center justify-content-xl-end flex-grow-1">
              <Link to='/login' className='tertiary-text'>
                login
              </Link>
              <Link to='/cadastro' className='primary-standart'>
                cadastro
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
export default Header;
