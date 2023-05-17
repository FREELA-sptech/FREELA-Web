import "./style.scss";
import { Col, Container, Row, Form, Tabs, Tab } from "react-bootstrap";
import BenefitsCard from "../Index/components/BenefitsCard/BenefitsCard";
import { UserForm } from "./components/UserForm/UserForm";
import { InterestForm } from "../../shared/components/InterestForm/InterestForm";
import { MdArrowBack } from "react-icons/md";

import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { emailValidation, notBlank, passwordValidation } from "../../shared/scripts/validators";
import UserType from "./components/UserType/UserType";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../api/userApi";


function Cadastro() {
  const navigate = useNavigate();
  const [dataCategory, setDataCategory] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    uf: "",
    city: "",
    subCategoryId: [],
    isFreelancer: false,
    profilePhoto: [],
    description: ""
});

  const [errors, setErrors] = useState({
    name: '',
    userName: '',
    email: '',
    password: ''
  });

  const formComponents = [<UserType formData={formData} setFormData={setFormData} />, <UserForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />, <InterestForm dataCategory={dataCategory} setDataCategory={setDataCategory} />]
  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents)

  const validateForm = () => {
    const { name, email, password, city, uf } = formData;
    const newErros = {
      name: '',
      userName: '',
      city: '',
      uf: '',
      email: '',
      password: ''
    }

    if (notBlank(name)) {
      newErros.name = "Informe o seu nome";
    }

    if (notBlank(city)) {
      newErros.city = "Selecione uma cidade";
    }

    if (notBlank(uf)) {
      newErros.uf = "Selecione uma UF";
    }

    if (notBlank(email)) {
      newErros.email = "Informe seu email";
    } else if (!emailValidation(email)) {
      newErros.email = "Email inválido";
    }

    if (notBlank(password)) {
      newErros.password = "Informe a sua senha";
    } else if (passwordValidation(password)) {
      newErros.password = "Senha muito curta";
    }

    return newErros;
  }

  const handleHeaderText = (currentStep: number) => {
    if (currentStep == 0) { return (<h1 className="f-36 dark-contrast-color text-center w-100">Escolha um Perfil</h1>) }
    if (currentStep == 1) { return (<h1 className="f-36 dark-contrast-color text-center">Informe seus Dados</h1>) }
    return <h1 className="f-36 dark-contrast-color text-center">Selecione seus Interesses</h1>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep == 0) return changeStep(currentStep + 1)

    if (currentStep == 1) {
      const errors = validateForm();
      const valores = Object.values(errors);
      const errorsValues = valores.every(valor => valor === "");

      if (!errorsValues) {
        setErrors(errors);
      } else {
        setFormData(formData);
        changeStep(currentStep + 1)
      }
    }

    if (dataCategory.length > 0) {
      formData.subCategoryId = dataCategory

      UserAPI.register(formData)
        .then(() => {
          navigate("/login")
        })
    }
  };

  return (
    <Container fluid className="cadastro-background">
      <Container>
        <Row className="content d-flex align-items-stretch justify-content-center">
          <Col className="image-section d-none d-lg-flex flex-column align-items-center justify-content-center gap-3" md={12} lg={6}>
            <h1 className="f-inter dark-contrast-color f-52 text-center">Seja bem vindo</h1>
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
          <Col xs={12} md={12} lg={6} className="container-form d-flex flex-column justify-content-center align-items-center">
            <Col xs={10} md={11} lg={12} className="d-flex flex-column align-items-center justify-content-center">
              <Col lg={10} xs={12} className="d-flex align-items-center gap-3">
                {!isFirstStep && (
                  <a className="link" onClick={() => changeStep(currentStep - 1)}><MdArrowBack size={"2rem"} /></a>
                )}
                {handleHeaderText(currentStep)}
              </Col>
              <Form onSubmit={handleSubmit} className="form d-flex flex-column col-md-10 col-lg-8">
                {currentComponent}
                <Col className="d-flex justify-content-center align-items-center gap-3">
                  {!isLastStep ? (
                    <button className="button-base primary-standart w-100" type="submit">Avançar</button>
                  ) : (
                    <button className="button-base primary-standart w-100" type="submit">Concluir</button>
                  )}
                </Col>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Cadastro;
