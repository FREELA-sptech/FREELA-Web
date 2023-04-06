import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase"
import ClientBanner from "../ClientBanner/ClientBanner";
import FreelanceBanner from "../FreelanceBanner/FreelanceBanner";
import { Col, Container, Row } from "react-bootstrap";

function AboutUs() {
  const handleButton = () => {

  }

  return (
    <section className="about-us-background">
      <Container>
        <Row>
          <Col sm={12} className="text-center">
            <h1 className="title about-us-title">O que é a <span className="logo">FREELA</span>?</h1>
          </Col>
          <Col sm={12} className="text-center">
            <p className="summary">
              Nossa plataforma oferece uma ampla variedade de oportunidades de trabalho,
              desde tarefas simples a projetos mais complexos, em diversas áreas, como design gráfico,
              redação, programação, marketing digital, tradução, entre outras.
            </p>
          </Col>
        </Row>
      </Container>
      <ClientBanner />
      <FreelanceBanner />
    </section>
  );
}

export default AboutUs
