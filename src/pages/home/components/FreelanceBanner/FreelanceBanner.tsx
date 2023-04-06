import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { useNavigate } from "react-router-dom";
import BenefitsCard from "../BenefitsCard/BenefitsCard";

function FreelanceBanner() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/cadastro")
  }

  return (
    <section className="freelance-banner-background flex-column">
      <div className="container flex-row">
        <div className="card image">
          <img src="/assets/images/banner-freelance.svg" alt="homem no computador" />
        </div>
        <div className="card text">
          <h1 className="category">AUTÔNOMO</h1>
          <h2 className="title">A <span className="logo">FREELA</span> é uma ótima opção para encontrar novos projetos e clientes.</h2>
          <ButtonBase onClick={handleNavigate} buttonType="secundary-standart" label={"SOU AUTÔNOMO"} ></ButtonBase>
        </div>
      </div>
      <div className="container flex-row justify-space-between">
        <BenefitsCard iconPath="/assets/icons/users.svg" label="Acesso a uma ampla base de clientes em potencial" />
        <BenefitsCard iconPath="/assets/icons/bag.svg" label="Grande variedade de trabalhos, desde pequenos projetos a longo prazo" />
        <BenefitsCard iconPath="/assets/icons/arrows.svg" label="Criar um portfólio on-line e uma presença na web para mostrar suas habilidades e experiência." />
      </div>
    </section>
  );
}

export default FreelanceBanner
