import "./style.scss"

function AboutUs() {
    return (
        <section className="container">
            <div className="about-us-header">
                <h1>O que é a Freela ?</h1>
                <p className="about-us-header-subtitle">Nossa plataforma oferece uma ampla variedade de oportunidades de trabalho, desde tarefas simples a projetos mais complexos, em diversas áreas, como design gráfico, redação, programação, marketing digital, tradução, entre outras.</p>
            </div>
            <div className="about-us-body">
                <div className="section-client">
                    <div className="body">
                        <div className="card text">
                            <h2>SOU CLIENTE</h2>

                            <h3>A FREELA oferece uma ampla seleção de profissionais qualificados e talentosos em diferentes áreas.</h3>

                            <button>
                                SOU CLIENTE
                            </button>
                        </div>
                        <div className="card image">
                            <img src="/assets/images/about-us-client.svg" alt="" />
                        </div>
                    </div>
                    <div className="footer">

                    </div>
                </div>

                <div className="section-freelance">

                </div>
            </div>
        </section>
    );
}

export default AboutUs