import "./style.scss"

import { Col, Container, Row } from "react-bootstrap";

function AboutUs() {
  return (
    <section className="about-us-background">
      <Container>
        <Row>
          <Col sm={12} className="text-center">
            <h1 className="title about-us-title">O QUE É A <span className="logo destak-color">FREELA</span></h1>
          </Col>
          <Col sm={12} className="text-center pb-5">
            <p className="summary">
              Nossa plataforma oferece uma ampla variedade de oportunidades de trabalho,
              desde tarefas simples a projetos mais complexos, em diversas áreas, como design gráfico,
              redação, programação, marketing digital, tradução, entre outras.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutUs
