import { Link } from 'react-router-dom';
import './style.scss'
import { Container, Figure, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { UserStorage } from '../../../store/userStorage';
import { Box } from '@mui/system';

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
        <Navbar.Toggle
          aria-controls='control-show-right-side-menu'
          className='p-0 w-auto'
          onClick={handleOpen} />
        <Navbar.Offcanvas
          id='control-show-right-side-menu'
          aria-labelledby='control-show-label-menu'
          placement="start"
          restoreFocus={false}
          show={menuIsOpen}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton className='align-items-end'>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="text-center justify-content-between h-100 flex-grow-1">
              <Box className="d-flex flex-column flex-xl-row">
                <Link to='/' className='logo dark-contrast-color' onClick={handleClose}>
                  FREELA
                </Link>
                <Link to='/home' className='tertiary-text' onClick={handleClose}>
                  Encontre projetos
                </Link>
              </Box>
              <Box className="d-flex flex-column flex-xl-row">
                <Link to='/login' className='tertiary-text' onClick={handleClose}>
                  login
                </Link>
                <Link to='/cadastro' className='primary-standart' onClick={handleClose}>
                  cadastro
                </Link>
              </Box>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
export default Header;
