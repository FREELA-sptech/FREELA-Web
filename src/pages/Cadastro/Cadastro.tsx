import "./style.scss";
import { Col, Container, Row, Form, Tabs, Tab, InputGroup } from "react-bootstrap";
import BenefitsCard from "../Index/components/BenefitsCard/BenefitsCard";
import { UserForm } from "./components/UserForm/UserForm";
import { InterestForm } from "./components/InterestForm/InterestForm";

//Hooks
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { emailValidation, isValidCPF, notBlank, passwordValidation } from "../../shared/scripts/validators";
import { createUser } from "../../services/userService";


function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        cpf: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        userName: '',
        email: '',
        cpf: '',
        password: ''
    });
    const formComponents = [<UserForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />, <InterestForm />]
    const { currentStep, currentComponent, changeStep } = useForm(formComponents)
    const validateForm = () => {
        const { name, userName, email, cpf, password } = formData;
        const newErros = {
            name: '',
            userName: '',
            email: '',
            cpf: '',
            password: ''
        }

        if (notBlank(name)) {
            newErros.name = "O campo nome não pode estar vazio";
        }

        if (notBlank(userName)) {
            newErros.userName = "O campo usuário não pode estar vazio";
        }

        if (notBlank(email)) {
            newErros.email = "O campo email não pode estar vazio";
        } else if (!emailValidation(email)) {
            newErros.email = "Email inválido";
        }

        if (notBlank(cpf)) {
            newErros.cpf = "O campo CPF não pode estar vazio";
        } else if (!isValidCPF(cpf)) {
            newErros.cpf = "CPF inválido";
        }

        if (notBlank(password)) {
            newErros.password = "O campo senha não pode estar vazio";
        } else if (passwordValidation(password)) {
            newErros.password = "Senha muito curta";
        }

        return newErros;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const errors = validateForm();
            const valores = Object.values(errors);
            const errorsValues = valores.every(valor => valor === "");
            if (!errorsValues) {
                setErrors(errors);
            } else {
                console.log(formData);
                const response = await createUser(formData);
                if (response.status == 201) {
                    changeStep(currentStep+1)
                    // navigator("/login")
                }
            }
        } catch (error) {
            alert(error)
        }

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
                    <Col xs={12} md={12} lg={6} className="container-form d-flex flex-column justify-content-center align-items-center">
                        <Col xs={10} md={11} lg={12} className="d-flex flex-column align-items-center justify-content-center">
                            <Form onSubmit={handleSubmit} className="form d-flex flex-column col-md-10 col-lg-8">
                                {currentComponent}
                                <Col className="d-flex">
                                    <button className="button-base primary-standart" type="submit">Avançar</button>
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
