import { Accordion, Card, Col, Container, Figure, Form, Modal, Row, useAccordionButton } from "react-bootstrap";
import './style.scss'
import { useState } from "react";
import ServicesAvailableCard from "../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import FreelancerProfileCard from "../../shared/components/FreelancerProfileCard/FreelancerProfileCard";
import CardProfile from "./components/CardProfile/CardProfile";
import { OrderUpdate } from "../Order/OrderUpdate/OrderUpdate";
import { Portfólio } from "./components/Portfolio/Portfolio";

function Profile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex pt-3">
          <Col lg={5}>
            <CardProfile />
          </Col>
          <Col lg={7} className="px-3 pt-lg-0 pt-4 d-flex flex-column gap-2">
            <button onClick={() => setShow(true)} className="buttonBase primary-standart">Adicionar Projeto</button>
            <Row className="d-flex">

            </Row>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Projeto ao Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Portfólio />
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Profile
