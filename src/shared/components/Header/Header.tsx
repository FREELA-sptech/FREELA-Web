import { Link } from 'react-router-dom';
import './style.scss'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleClose = () => setMenuIsOpen(false)
  const handleOpen = () => setMenuIsOpen(true)

  return (
    <Navbar
      expand='xl'
      className='py-3 header-background'
      sticky='top'
    >
      <Container>
        <Link to='/' className='logo' onClick={handleClose}>
          FREELA
        </Link>
        <Navbar.Toggle
          aria-controls='control-show-right-side-menu'
          className='p-0'
          onClick={handleOpen} />
        <Navbar.Offcanvas
          id='control-show-right-side-menu'
          aria-labelledby='control-show-label-menu'
          placement="end"
          restoreFocus={false}
          show={menuIsOpen}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton className='justify-content-end'>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="text-center justify-content-xl-end flex-grow-1">
              <Link to='/login' className='tertiary-text' onClick={handleClose}>
                login
              </Link>
              <Link to='/cadastro' className='primary-standart' onClick={handleClose}>
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
