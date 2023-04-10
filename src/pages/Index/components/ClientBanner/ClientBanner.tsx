import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Link, useNavigate } from "react-router-dom";
import BenefitsCard from "../BenefitsCard/BenefitsCard";
import { Col, Container, Row } from "react-bootstrap";

function ClientBanner() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/cadastro")
  }

  return (
    <section className="client-banner-background flex-column">
      <Container>
        <Row className="flex-column-reverse flex-lg-row">
          <Col
            lg={7}
            className="d-flex flex-column justify-content-lg-center text-center text-lg-start align-items-lg-start"
          >
            <h1 className="category pb-3">SOU CLIENTE</h1>
            <h2 className="title pb-4">
              Oferecemos uma ampla seleção de profissionais <span className="destak-color">qualificados</span> e <span className="destak-color">talentosos</span> em diferentes áreas
            </h2>
            <Link to='/cadastro' className="secundary-standart">
              sou cliente
            </Link>
          </Col>
          <Col lg={5} className="d-flex justify-content-center pb-5 px-5">
            <Col md={{ offset: 1, span: 8 }} lg={12}>
              <img className="w-100" src="/assets/images/banner-client.svg" alt="casal sorrindo" />
            </Col>
          </Col>
        </Row>
        <Row className="justify-content-between gap-3 d-none d-lg-flex">
          <BenefitsCard iconPath="/assets/icons/dollar.svg" label="Economia em relação a contratação de um funcionário em tempo integral" />
          <BenefitsCard iconPath="/assets/icons/users.svg" label="Freelancers com habilidades especializadas em áreas específicas" />
          <BenefitsCard iconPath="/assets/icons/add.svg" label="Maior flexibilidade de orçamento e necessidades de negócios." />
        </Row>
      </Container>
    </section>
  );
}

export default ClientBanner
