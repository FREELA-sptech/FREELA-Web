import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="banner-background">
      <Container className="d-flex flex-grow-1">
        <Row>
          <Col
            xl={6}
            sm={12}
            className="text-center text-md-start align-items-md-start d-flex flex-column justify-content-center"
          >
            <h1 className="big-title pb-1 w-100">
              ONDE <span style={{ color: "var(--dark-contrast-color)" }}>QUEM</span> PRECISA <br />
              ACHA <span style={{ color: "var(--dark-contrast-color)" }}>QUEM</span> FAZ
            </h1>
            <p className="summary pb-4 w-100">
              Conectamos talentosos profissionais independentes com empresas
              e indivíduos em busca de ajuda para projetos de curto ou longo prazo
            </p>
            <Link to='/cadastro' className="secundary-standart">
              Quero Começar
            </Link>
          </Col>
          <Col xl={6} sm={12} className="d-none d-xl-flex justify-content-center align-items-center py-5">
            <img className="w-50" src="/assets/images/banner-icon.svg" alt="duas setas para direita" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Banner
