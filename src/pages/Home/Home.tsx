import { Col, Container, Figure, Form, Row } from "react-bootstrap";
import ServicesAvailableCard from "./components/ServicesAvailableCard/ServicesAvailableCard";
import './style.scss'

function Home() {
  return (
    <section className="home-background">
      <Container>
        <Row className="p-3 d-flex gap-2">
          <Figure className="home-icon-background d-flex justify-content-center align-items-center">
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
      </Container>
    </section>
  );
}

export default Home
