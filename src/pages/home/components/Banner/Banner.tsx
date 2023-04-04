import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";

function Banner() {
  const handleClickButton = () => {

  }

  return (
    <section className="banner-background flex-column">
      <div className="container flex-row justify-center align-center flex-wrap">
        <div className="text">
          <h1 className="big-title">
            ONDE <span>QUEM</span> PRECISA <br />
            ACHA <span>QUEM</span> FAZ.
          </h1>
          <p className="summary">
            Conectamos talentosos profissionais independentes com empresas
            e indivíduos em busca de ajuda para projetos de curto ou longo prazo.
          </p>
          <ButtonBase onClick={handleClickButton} buttonType="secundary-standart" label="Quero Começar" />
        </div>
        <div className="image">
          <img src="/assets/images/banner-icon.svg" alt="duas setas para direita" />
        </div>
        <div className="show-more flex-column align-center">
          <img src="/assets/icons/mouse.svg" alt="mouse" />
          <h3 className="subtitle">VER MAIS</h3>
        </div>
      </div>
    </section>
  );
}

export default Banner
