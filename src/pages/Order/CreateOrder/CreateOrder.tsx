import { Breadcrumb, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { MdArrowBack, MdOutlineHome } from "react-icons/md";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import { useState } from "react";
import { InfoOrder } from "./components/InfoOrder/InfoOrder";
import { useForm } from "../../../hooks/useForm";
import { notBlank } from "../../../shared/scripts/validators";
import { Stepper, Step, StepLabel, Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ['Informe os dados do pedido', 'asdasd', 'Create an ad', 'asdasd'];

export function CreateOrder() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        subCategoryId: [],
        maxValue: '',
        deadline: '',
        Foto: []
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        category: '',
        subCategoryId: [],
        maxValue: '',
        deadline: "",
        Foto: []
    });

    const validateFormInfo = () => {
        const { title, description, deadline, maxValue } = formData;
        const newErros = {
            title: '',
            description: '',
            category: '',
            subCategoryId: [],
            maxValue: '',
            deadline: "",
            Foto: []
        }

        if (notBlank(title)) {
            newErros.title = "O campo titulo não pode estar vazio";
        }
        if (notBlank(description)) {
            newErros.description = "O campo descrição não pode estar vazio";
        } else if (description.length < 30) {
            newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
        }
        if (notBlank(deadline)) {
            newErros.deadline = "O campo prazo não pode estar vazio";
        }
        if (notBlank(maxValue)) {
            newErros.maxValue = "O campo preço não pode estar vazio";
        }

        return newErros;
    }

    const handleSubmit = () => {
        const errors = validateFormInfo();
        const valores = Object.values(errors);
        const errorsValues = valores.every(valor => valor === "");
        if (!errorsValues) {
            setErrors(errors)
            console.log(uploadedFiles);
            console.log(formData);
        
        }
    }

    const handleCancel = () => {
        navigate("/home")
    }

    return (
        <section className="home-background">
            <Container>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                        Home
                    </Link>
                    <Typography color="text.primary">Criar Pedido</Typography>
                </Breadcrumbs>
                <Row className="ps-5 pb-5" style={{ backgroundColor: 'white' }}>
                    <Row className="mt-4">
                        <Row className="d-flex justify-content-end">
                            <h1 className="title">
                                Crie um Pedido
                            </h1>
                        </Row>
                        <Row>
                            <InfoOrder formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                        </Row>
                        <Row className="d-flex flex-row justify-content-between">
                            <button className="primary-text w-auto" onClick={handleCancel}>{"Cancelar"}</button>
                            <button className="primary-standart w-auto" onClick={handleSubmit}>{"Finalizar"}</button>
                        </Row>
                    </Row>
                </Row>
            </Container>
        </section>
    )
}
