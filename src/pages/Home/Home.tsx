import { Accordion, Card, Col, Container, Figure, Form, InputGroup, Modal, Row, useAccordionButton } from "react-bootstrap";
import ServicesAvailableCard from "../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import './style.scss'
import { useState } from "react";
import FiltersCard from "./components/FiltersCard/FiltersCard";
import FreelancerProfileCard from "../../shared/components/FreelancerProfileCard/FreelancerProfileCard";
import ProposalCard from "../../shared/components/ProposalCard/ProposalCard";

function Home() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleOpen = () => setShowModal(true)

  return (
    <section className="home-background">
      <Container>
        <Row className="pt-3 pb-3 d-flex justify-content-end">
          <h1 className="title-underline d-flex flex-column justify-content-end w-auto text-uppercase f-roboto dark-contrast-color fw-bold f-42 dark-contrast-color">
            projetos disponíveis
          </h1>
        </Row>
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
            <Row className="px-lg-3 px-0 d-flex gap-2">
              <Figure onClick={handleOpen} className="home-icon-background d-flex d-lg-none justify-content-center align-items-center">
                <Figure.Image
                  width='40px'
                  height='40px'
                  alt="icone filtro"
                  src="assets/icons/filter.svg"
                  className="m-0"
                />
              </Figure>
              <InputGroup className="p-0 primary-input w-auto flex-grow-1">
                <Figure.Image
                  width='15px'
                  height='15px'
                  alt="icone filtro"
                  src="assets/icons/search.svg"
                  className="m-0 ms-3"
                />
                <Form.Control
                  className="primary-input"
                  placeholder="Busque aqui"
                  aria-label="Busque aqui"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Row>
            <Row className="d-flex">
              <Col xs={12} md={6} lg={4} className="p-3">
                <ProposalCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home
