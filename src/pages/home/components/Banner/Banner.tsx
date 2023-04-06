import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Col, Container, Row } from "react-bootstrap";

function Banner() {
  const handleClickButton = () => {

  }

  return (
    <section className="banner-background">
      <Container>
        <Row>
          <Col xl={6} sm={12} className="d-flex flex-column justify-content-center align-items-start">
            <h1 className="big-title pb-1">
              ONDE <span style={{color: "var(--dark-contrast-color)"}}>QUEM</span> PRECISA <br />
              ACHA <span style={{color: "var(--dark-contrast-color)"}}>QUEM</span> FAZ.
            </h1>
            <p className="summary pb-4">
              Conectamos talentosos profissionais independentes com empresas
              e indivíduos em busca de ajuda para projetos de curto ou longo prazo.
            </p>
            <ButtonBase onClick={handleClickButton} buttonType="secundary-standart" label="Quero Começar" />
          </Col>
          <Col xl={6} sm={12} className="d-flex justify-content-center align-items-center py-5">
            <img className="mw-100 h-100" src="/assets/images/banner-icon.svg" alt="duas setas para direita" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Banner
