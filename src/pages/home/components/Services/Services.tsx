import { Col, Container, Row } from "react-bootstrap";
import "./style.scss"

function Services() {
    return (
        <Container fluid className="d-flex services-background align-items-center flex-column justify-content-center">
            <Container className="d-flex justify-content-between flex-wrap align-items-center">
                <Col md={5} xs={12} className="flex-column left-side ">
                    <div className="services-header">
                        <h2 className="services-topic text-uppercase">Descubra</h2>
                        <h1 className="services-title text-uppercase">Principais Serviços.</h1>
                    </div>
                    <div className="content">
                        <p className="services-content-text">Nossa plataforma oferece uma ampla variedade de serviços, desde tarefas simples a projetos mais complexos, em diversas áreas, como design gráfico, redação, programação, marketing digital, tradução, entre outras.</p>
                    </div>
                    <hr />
                </Col>
                <Col md={7} xs={12} className="d-flex left-side flex-wrap">
                    <Row className="d-flex justify-content-center flex-wrap container-cards">
                        <Col lg={5} md={12} className="card-service d-flex flex-wrap align-items-center">
                            <img src="/assets/icons/code-2.svg" alt="" />
                            <h5 className="title">Programação</h5>
                        </Col>
                        <Col lg={5} md={12} className="card-service d-flex flex-wrap align-items-center">
                            <img src="/assets/icons/paintbrush.svg" alt="" />
                            <h5 className="title">Design</h5>
                        </Col>
                        <Col lg={5} md={12} className="card-service d-flex flex-wrap align-items-center">
                            <img src="/assets/icons/languages.svg" alt="" />
                            <h5 className="title">Tradução</h5>
                        </Col>
                        <Col lg={5} md={12} className="card-service d-flex flex-wrap align-items-center">
                            <img src="/assets/icons/book-open.svg" alt="" />
                            <h5 className="title">Redação</h5>
                        </Col>
                        <Col lg={5} md={12} className="card-service d-flex flex-wrap align-items-center">
                            <img src="/assets/icons/palette.svg" alt="" />
                            <h5 className="title">Artes</h5>
                        </Col>
                        <Col lg={5} md={12} className="card-service d-flex flex-wrap align-items-center">
                            <img src="/assets/icons/paintbrush.svg" alt="" />
                            <h5 className="title">Marketing</h5>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </Container>
    )
}

export default Services;