import { Breadcrumb, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { MdArrowBack, MdOutlineHome } from "react-icons/md";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import { useEffect, useState } from "react";
import { InfoOrder } from "./components/InfoOrder/InfoOrder";
import { useForm } from "../../../hooks/useForm";
import { notBlank } from "../../../shared/scripts/validators";
import { Stepper, Step, StepLabel, Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OrdersAPI } from "../../../api/ordersApi";
import useSnackbar from "../../../hooks/useSnackbar";
import { UserAPI } from "../../../api/userApi";

const steps = ['Informe os dados do pedido', 'asdasd', 'Create an ad', 'asdasd'];

export function CreateOrder() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { createOrder, updatePicture } = OrdersAPI()
  const { userDetails } = UserAPI();
  const [userId,setUserId] = useState(null);
  useEffect(()=>{
    userDetails()
    .then(res => {
      setUserId(res.data.id)
    })
  },[userId])
  const [SnackbarComponent, showSnackbar] = useSnackbar()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subCategoryId: [],
    maxValue: '',
    expirationTime: '',
    photo: []
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    subCategoryIds: '',
    maxValue: '',
    expirationTime: '',
    photo: ''
  });

  const validateFormInfo = () => {
    const { title, description, expirationTime, maxValue } = formData;
    const newErros = {
      title: '',
      description: '',
      subCategoryIds: '',
      maxValue: '',
      expirationTime: '',
      photo: ''
    }

    if (notBlank(title)) {
      newErros.title = "O campo titulo não pode estar vazio";
    }
    if (notBlank(description)) {
      newErros.description = "O campo descrição não pode estar vazio";
    } else if (description.length < 30) {
      newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
    }

    // if (Number(expirationTime) <= 0) {
    //   newErros.expirationTime = "O prazo não pode menor ou igual a zero";
    // }

    if (notBlank(maxValue)) {
      newErros.maxValue = "O campo preço não pode estar vazio";
    }

    return newErros;
  }

  const handleSubmit = () => {
    const errors = validateFormInfo();
    const valores = Object.values(errors);
    const errorsValues = valores.every(valor => valor === "");

    if (errorsValues) {
      const newFormData = new FormData()

      formData.photo.forEach((file) => {
        newFormData.append("images", file);
      });

      const order = {
        title: formData.title,
        description: formData.description,
        maxValue: formData.maxValue,
        subCategoryId: formData.subCategoryId,
        expirationTime: `${formData.expirationTime} dias`
      };
      createOrder(order)
        .then((res) => {
          updatePicture(newFormData, res.data.id)
            .then(() => {
              showSnackbar(false, "Ordem Criada com sucesso!")
              navigate("/perfil")
            })
            .catch(() => {
              showSnackbar(true, "Problemas para salvar imagens!")
            })
        })
        .catch((error) => {
          showSnackbar(true, "Problemas para criar ordem!")
        })
    } else {
      setErrors(errors)
    }
  }

  const handleCancel = () => {
    navigate("/home")
  }

  return (
    <section className="home-background">
      <SnackbarComponent />
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
              <button className="primary-outline w-auto" onClick={handleCancel}>{"Cancelar"}</button>
              <button className="primary-standart w-auto" onClick={handleSubmit}>{"Finalizar"}</button>
            </Row>
          </Row>
        </Row>
      </Container>
    </section>
  )
}
