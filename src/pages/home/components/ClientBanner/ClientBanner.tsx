import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { useNavigate } from "react-router-dom";
import BenefitsCard from "../BenefitsCard/BenefitsCard";

function ClientBanner() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/cadastro")
  }

  return (
    <section className="client-banner-background flex-column">
      <div className="container flex-row">
        <div className="card text">
          <h1 className="category">SOU CLIENTE</h1>
          <h2 className="title">A <span className="logo">FREELA</span> oferece uma ampla seleção de profissionais qualificados e talentosos em diferentes áreas.</h2>
          <ButtonBase onClick={handleNavigate} buttonType="secundary-standart" label={"sou cliente"} ></ButtonBase>
        </div>
        <div className="card image">
          <img src="/assets/images/banner-client.svg" alt="casal sorrindo" />
        </div>
      </div>
      <div className="container flex-row justify-space-between">
        <BenefitsCard iconPath="/assets/icons/dollar.svg" label="Economia em relação a contratação de um funcionário em tempo integral" />
        <BenefitsCard iconPath="/assets/icons/users.svg" label="Freelancers com habilidades especializadas em áreas específicas" />
        <BenefitsCard iconPath="/assets/icons/add.svg" label="Maior flexibilidade de orçamento e necessidades de negócios." />
      </div>
    </section>
  );
}

export default ClientBanner
