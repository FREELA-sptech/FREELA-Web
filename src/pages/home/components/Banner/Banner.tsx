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
          <Col xl={6} className="banner-card">
            <h1 className="big-title banner-title">
              ONDE <span>QUEM</span> PRECISA <br />
              ACHA <span>QUEM</span> FAZ.
            </h1>
            <p className="summary banner-summary">
              Conectamos talentosos profissionais independentes com empresas
              e indivíduos em busca de ajuda para projetos de curto ou longo prazo.
            </p>
            <ButtonBase onClick={handleClickButton} buttonType="secundary-standart" label="Quero Começar" />
          </Col>
          <Col xl={6} className="banner-card image">
            <img src="/assets/images/banner-icon.svg" alt="duas setas para direita" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Banner
