import { Link } from 'react-router-dom';
import './style.scss'
import { Container, Figure, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { useState } from 'react';
import { MdOutlineNotifications, MdPersonOutline } from 'react-icons/md';

function Header(props: any) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleClose = () => setMenuIsOpen(false)
  const handleOpen = () => setMenuIsOpen(true)

  if (props.authenticated) {
    return (
      <Navbar
        expand='xl'
        className='py-3 header-background'
        sticky='top'
      >
        <Container fluid>
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
              <Nav className="text-center justify-content-xl-end flex-grow-1 gap-xl-3">
                <Link to='/cadastro' onClick={handleClose}>
                  <div className='fill-icon'>
                    <MdOutlineNotifications
                      fill='#274c77'
                      size={"32px"}
                    />
                  </div>
                  <p className="d-lg-none">Notificações</p>
                </Link>
                <Link to='/login' onClick={handleClose}>
                  <div className='fill-icon'>
                    <MdPersonOutline
                      fill='#274C77'
                      size={"32px"}
                    />
                  </div>
                  <p className='d-lg-none'>Meu Perfil</p>
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    )
  }

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
        <Link to='/home' className='tertiary-text d-none d-xl-block' onClick={handleClose}>
          Encontre projetos
        </Link>
        <Row className='d-flex flex-grow-1 flex-nowrap m-0 justify-content-end align-items-center'>
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
              {false ? (
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
