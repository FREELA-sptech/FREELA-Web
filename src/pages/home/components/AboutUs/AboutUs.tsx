import "./style.scss"

import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase"
import ClientBanner from "../ClientBanner/ClientBanner";

function AboutUs() {
  const handleButton = () => {

  }

  return (
    <section className="about-us-background">
      <div className="container text-center">
        <h1 className="title">O que é a <span className="logo">FREELA</span>?</h1>
        <p className="summary">Nossa plataforma oferece uma ampla variedade de oportunidades de trabalho, desde tarefas simples a projetos mais complexos, em diversas áreas, como design gráfico, redação, programação, marketing digital, tradução, entre outras.</p>
      </div>
      <ClientBanner />
    </section>
  );
}

export default AboutUs
