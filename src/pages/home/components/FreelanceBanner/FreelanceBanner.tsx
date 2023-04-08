import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { useNavigate } from "react-router-dom";
import BenefitsCard from "../BenefitsCard/BenefitsCard";
import { Col, Container, Row } from "react-bootstrap";

function FreelanceBanner() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/cadastro")
  }

  return (
    <section className="freelance-banner-background flex-column">
      <Container>
        <Row className="flex-lg-row">
          <Col lg={5} className="d-flex justify-content-center pb-5 px-5">
            <Col md={{ offset: 1, span: 8 }} lg={12}>
              <img className="w-100" src="/assets/images/banner-freelance.svg" alt="homem no computador" />
            </Col>
          </Col>
          <Col
            lg={7}
            className="d-flex flex-column justify-content-lg-center text-center text-lg-start align-items-lg-start"
          >
            <h1 className="category pb-3">AUTÔNOMO</h1>
            <h2 className="title pb-4">
              Somos uma ótima opção para encontrar novos <span className="destak-color">projetos</span> e <span className="destak-color">clientes</span>
            </h2>
            <ButtonBase onClick={handleNavigate} buttonType="secundary-standart" label={"sou cliente"} ></ButtonBase>
          </Col>
        </Row>
        <Row className="justify-content-between gap-3 d-none d-lg-flex">
          <BenefitsCard iconPath="/assets/icons/users.svg" label="Acesso a uma ampla base de clientes em potencial" />
          <BenefitsCard iconPath="/assets/icons/bag.svg" label="Grande variedade de trabalhos, desde pequenos projetos a longo prazo" />
          <BenefitsCard iconPath="/assets/icons/arrows.svg" label="Criar um portfólio on-line e uma presença na web para mostrar suas habilidades e experiência." />
        </Row>
      </Container>
    </section>
  );
}

export default FreelanceBanner
