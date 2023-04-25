import { Link } from 'react-router-dom';
import './style.scss'
import { Container, Figure, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { isAuthenticated } = useContext(AuthContext);

  const handleClose = () => setMenuIsOpen(false)
  const handleOpen = () => setMenuIsOpen(true)

  return (
    <Navbar
      expand='xl'
      className='py-3 header-background'
      sticky='top'
    >
      <Container>
        <Link to='/' className='logo dark-contrast-color' onClick={handleClose}>
          FREELA
        </Link>
        {isAuthenticated && (
          <>
            <Link to='/home' className='tertiary-text d-none d-xl-block' onClick={handleClose}>
              Encontre projetos
            </Link>
          </>
        )}
        <Row className='d-flex flex-grow-1 flex-nowrap m-0 justify-content-end align-items-center'>
          {isAuthenticated && (
            <>
              <Link to='/perfil' className='w-auto px-2 d-xl-none' onClick={handleClose}>
                <Figure.Image
                  width='35px'
                  height='35px'
                  alt="dollar"
                  src="/assets/icons/notification.svg"
                  className="m-0"
                />
              </Link>
              <Link to='/perfil' className='w-auto px-2 d-xl-none' onClick={handleClose}>
                <Figure.Image
                  width='35px'
                  height='35px'
                  alt="dollar"
                  src="/assets/icons/profile.svg"
                  className="m-0"
                />
              </Link>
            </>
          )}
          <Navbar.Toggle
            aria-controls='control-show-right-side-menu'
            className='p-0 w-auto'
            onClick={handleOpen} />
        </Row>
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
              {!isAuthenticated ? (
                <>
                  <Link to='/login' className='tertiary-text' onClick={handleClose}>
                    login
                  </Link>
                  <Link to='/cadastro' className='primary-standart' onClick={handleClose}>
                    cadastro
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/home' className='tertiary-text d-xl-none' onClick={handleClose}>
                    Encontre projetos
                  </Link>
                  <Link to='/perfil' className='w-auto px-2 d-xl-block d-none' onClick={handleClose}>
                    <Figure.Image
                      width='35px'
                      height='35px'
                      alt="dollar"
                      src="/assets/icons/notification.svg"
                      className="m-0"
                    />
                  </Link>
                  <Link to='/perfil' className='w-auto px-2 d-xl-block d-none' onClick={handleClose}>
                    <Figure.Image
                      width='35px'
                      height='35px'
                      alt="dollar"
                      src="/assets/icons/profile.svg"
                      className="m-0"
                    />
                  </Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
export default Header;
