import { Accordion, Card, Col, Container, Figure, Form, Modal, Row, useAccordionButton } from "react-bootstrap";
import ServicesAvailableCard from "./components/ServicesAvailableCard/ServicesAvailableCard";
import './style.scss'
import { useState } from "react";
import FiltersCard from "./components/FiltersCard/FiltersCard";

function Home() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleOpen = () => setShowModal(true)

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex">
          <Modal className="d-block d-lg-none w-100 h-100" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Filtrar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FiltersCard />
            </Modal.Body>
          </Modal>
          <Col lg={3} className="d-none d-lg-block">
            <FiltersCard />
          </Col>
          <Col lg={9} className="px-3 d-flex flex-column gap-2">
            <Row className="px-3 d-flex gap-2">
              <Figure onClick={handleOpen} className="home-icon-background d-flex d-lg-none justify-content-center align-items-center">
                <Figure.Image
                  width='40px'
                  height='40px'
                  alt="icone filtro"
                  src="assets/icons/filter.svg"
                  className="m-0"
                />
              </Figure>
              <Form.Control className="primary-input w-auto flex-grow-1" placeholder="Busque Aqui" />
            </Row>

            <Row className="d-flex">
              <Col xs={12} md={6} lg={4} className="p-3">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} lg={4} className="p-3">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} lg={4} className="p-3">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} lg={4} className="p-3">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} lg={4} className="p-3">
                <ServicesAvailableCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home
