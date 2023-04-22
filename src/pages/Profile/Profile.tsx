import { Accordion, Card, Col, Container, Figure, Form, Modal, Row, useAccordionButton } from "react-bootstrap";
import './style.scss'
import { useState } from "react";
import ServicesAvailableCard from "../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import FreelancerProfileCard from "../../shared/components/FreelancerProfileCard/FreelancerProfileCard";
import CardProfile from "./components/CardProfile/CardProfile";

function Profile() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleOpen = () => setShowModal(true)

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex pt-3">
          <Col lg={5}>
            <CardProfile />
          </Col>
          <Col lg={7} className="px-3 pt-lg-0 pt-4 d-flex flex-column gap-2">
            <Row className="d-flex">
              <Col xs={12} md={6} className="p-3 pt-0">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <ServicesAvailableCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <FreelancerProfileCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <FreelancerProfileCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <FreelancerProfileCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <FreelancerProfileCard />
              </Col>
              <Col xs={12} md={6} className="p-3 pt-0">
                <FreelancerProfileCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Profile
