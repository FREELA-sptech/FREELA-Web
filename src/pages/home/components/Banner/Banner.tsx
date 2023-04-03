import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";

function Banner() {
  const handleButton = () => {
    alert("PAULIN");
  }

  return (
    <section className="container-banner">
      <div className="container">
        <div>
          <h1>ONDE QUEM PRECISA ACHA QUEM FAZ.</h1>
          <h3>Conectamos talentosos profissionais independentes com empresas e indivíduos em busca de ajuda para projetos de curto ou longo prazo.</h3>
          <ButtonBase />
        </div>
        <div>
          <img src="/assets/img/img-banner.svg" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Banner
