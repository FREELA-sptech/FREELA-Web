import "./style.scss";
import { Col, Container, Row, Form, Tabs, Tab, InputGroup } from "react-bootstrap";
import BenefitsCard from "../Index/components/BenefitsCard/BenefitsCard";
import { FirstStep } from "./components/FirstStep";

function Cadastro() {
    const handleObject = (obj : any) => {
      };
    return (
        <Container fluid className="cadastro-background">
            <Container>
                <Row className="content d-flex align-items-stretch justify-content-center">
                    <Col className="image-section d-none d-lg-flex flex-column align-items-center justify-content-center gap-3" md={12} lg={6}>
                        <h1 className="big-title text-center">Seja bem vindo a <h1 className="logo">freela</h1></h1>
                        <Tabs
                            className="gap-3"
                            defaultActiveKey="freelancer"
                            transition={true}
                            id="personas"
                            fill
                        >
                            <Tab eventKey="freelancer" title="Sou Freelancer" tabClassName="painel">
                                <BenefitsCard iconPath="/assets/icons/users.svg" label="Acesso a uma ampla base de clientes em potencial" />
                                <BenefitsCard iconPath="/assets/icons/bag.svg" label="Grande variedade de trabalhos, desde pequenos projetos a longo prazo" />
                                <BenefitsCard iconPath="/assets/icons/arrows.svg" label="Criar um portfólio on-line e uma presença na web para mostrar suas habilidades e experiência." />
                            </Tab>
                            <Tab eventKey="cliente" title="Sou Cliente" tabClassName="painel">
                                <BenefitsCard iconPath="/assets/icons/dollar.svg" label="Economia em relação a contratação de um funcionário em tempo integral" />
                                <BenefitsCard iconPath="/assets/icons/users.svg" label="Freelancers com habilidades especializadas em áreas específicas" />
                                <BenefitsCard iconPath="/assets/icons/add.svg" label="Maior flexibilidade de orçamento e necessidades de negócios." />
                            </Tab>
                        </Tabs>
                    </Col>
                    <FirstStep firstStepData={handleObject}/>
                </Row>
            </Container>

        </Container>
    )
}

export default Cadastro;