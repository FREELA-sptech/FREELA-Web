import { Breadcrumb, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { MdArrowBack, MdOutlineHome } from "react-icons/md";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import { useContext, useEffect, useState } from "react";
import { InfoOrder } from "./components/InfoOrder/InfoOrder";
import { useForm } from "../../../hooks/useForm";
import { notBlank } from "../../../shared/scripts/validators";
import { Stepper, Step, StepLabel, Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OrdersAPI } from "../../../api/ordersApi";
import { UserAPI } from "../../../api/userApi";
import SnackbarContext from "../../../hooks/useSnackbar";
import dayjs from "dayjs";

const steps = ['Informe os dados do pedido', 'asdasd', 'Create an ad', 'asdasd'];

export function CreateOrder() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { createOrder, updatePicture, deleteOrder } = OrdersAPI()
  const { userDetails } = UserAPI();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    userDetails()
      .then(res => {
        setUserId(res.data.id)
      })
  }, [userId])
  const { showSnackbar } = useContext(SnackbarContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subCategoriesIds: [],
    value: '',
    deadline: '',
    photo: []
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    subCategoriesIds: '',
    value: '',
    deadline: '',
    photo: ''
  });

  const validateFormInfo = () => {
    const { title, description, deadline, value } = formData;
    const newErros = {
      title: '',
      description: '',
      subCategoriesIds: '',
      value: '',
      deadline: '',
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

    if(notBlank(value)){
      newErros.value = "O campo valor máximo não pode estar vazio";
    }else if(Number(value) <= 0){
      newErros.value = "O campo valor máximo não pode ser negativo ou 0";
    }

    if (notBlank(deadline)) {
      newErros.deadline = "O prazo não pode estar vazio";
    }else if(Number(deadline) <= 0) {
      newErros.deadline = "O prazo não pode ser menor ou igual a zero";
    } else if (dayjs(deadline).isBefore(dayjs(), 'day')) {
      newErros.deadline = "A data de expiração deve ser a partir de hoje";
    }

    return newErros;
  }

    const handleSubmit = () => {
      const errors = validateFormInfo();
      const valores = Object.values(errors);
      const errorsValues = valores.every(valor => valor === "");

      if (errorsValues) {
        const newFormData = new FormData()

        const order = {
          description: formData.description,
          title: formData.title,
          value: parseFloat(formData.value), // Certifique-se de enviar um número, não uma string
          subCategoriesIds: formData.subCategoriesIds,
          deadline: formData.deadline,
          userId: 20,
        };

        newFormData.append("createOrderRequest", JSON.stringify(order))
        formData.photo.forEach((file) => {
          newFormData.append(`photos`, file);
        });

        console.log(newFormData.get("images"))
        console.log(newFormData);
        console.log(formData.photo)

        createOrder(newFormData)
          .then((res) => {
            if (newFormData.get("images")) {
              updatePicture(newFormData, res.data.id)
                .then(() => {
                  showSnackbar(false, "Ordem Criada com sucesso!")
                  navigate("/perfil")
                })
                .catch(() => {
                  showSnackbar(true, "Problemas para salvar imagens!")
                  deleteOrder(res.data.id)
                })
            } else {
              showSnackbar(false, "Ordem Criada com sucesso!")
              navigate("/perfil")
            }
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
