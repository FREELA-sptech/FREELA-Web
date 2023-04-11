import "./style.scss";
import { Col, Container, Row, Form, Tabs, Tab, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../services/userService";
import BenefitsCard from "../Index/components/BenefitsCard/BenefitsCard";

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createUser(formData);
      alert("CADASTRADO");
    } catch (error) {
      alert(error)
    }

  };
  return (
    <Container fluid className="cadastro-background">
      <Container>
        <Row className="content d-flex align-items-stretch">
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
          <Col md={12} lg={6} className="container-form d-flex flex-column justify-content-center align-items-center">
            <h1 className="title text-center">Cadastre-se ainda hoje</h1>
            <Form onSubmit={handleSubmit} className="form d-flex flex-column col-xs-12 col-md-10 col-lg-8">
              <Form.Group>
                <Form.Label>
                  Nome
                </Form.Label>
                <Form.Control onChange={handleInputChange} name="name" size="lg" type="name" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email
                </Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    onChange={handleInputChange}
                    name="email"
                    size="lg"
                    type="text"
                    placeholder=""
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Email inválido
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Senha
                </Form.Label>
                <Form.Control
                  onChange={handleInputChange}
                  size="lg"
                  type="password"
                  name="password"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="Concordo com os termos" />
              </Form.Group>
              <button className="button-base primary-standart" type="submit">Criar conta</button>
            </Form>
          </Col>
        </Row>
      </Container>

    </Container>
  )
}

export default Cadastro;
