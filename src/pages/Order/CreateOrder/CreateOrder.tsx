import { Breadcrumb, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { MdArrowBack, MdOutlineHome } from "react-icons/md";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import { useState } from "react";
import { InfoOrder } from "./components/InfoOrder/InfoOrder";
import { PrevisionOrder } from "./components/PrevisionOrder/PrevisionOrder";
import { useForm } from "../../../hooks/useForm";
import { notBlank } from "../../../shared/scripts/validators";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ['Informe os dados do pedido', 'asdasd', 'Create an ad', 'asdasd'];

export function CreateOrder() {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategoryIds: '',
    maxValue: '',
    deadline: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    subCategoryIds: '',
    maxValue: '',
    deadline: ""
  });

  const validateFormInfo = () => {
    const { title, description } = formData;
    const newErros = {
      title: '',
      description: '',
      category: '',
      subCategoryIds: '',
      maxValue: '',
      deadline: ""
    }

    if (notBlank(title)) {
      newErros.title = "O campo titulo não pode estar vazio";
    }
    if (notBlank(description)) {
      newErros.description = "O campo descrição não pode estar vazio";
    } else if (description.length < 30) {
      newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
    }

    return newErros;
  }


  const handleSubmit = () => {
    if (activeStep === steps.length - 1) {

    } else {
      const errors = validateFormInfo();
      const valores = Object.values(errors);
      const errorsValues = valores.every(valor => valor === "");

      if (!errorsValues) {
        setErrors(errors)
      } else {
        setActiveStep(activeStep + 1)
      }
    }
  }

  const handleCancel = () => {
    navigate("/home")
  }

  return (
    <section className="home-background">
      <Container>
        <Row className="ps-5 pb-5" style={{ backgroundColor: 'white' }}>
          <Row className="mt-4">
            <Row className="pt-3 pb-3 d-flex justify-content-end">
              <h1 className="title-underline d-flex flex-column justify-content-center w-auto text-uppercase f-roboto dark-contrast-color fw-bold f-30 dark-contrast-color">
                Crie um Pedido
              </h1>
            </Row>
            <Row>
              <InfoOrder formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
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

  // const [dataCategory, setDataCategory] = useState([]);
  // const [formData, setFormData] = useState({
  //     title: '',
  //     description: '',
  //     category: '',
  //     subCategoryIds: '',
  //     maxValue: '',
  //     deadline: ''
  // });

  // console.log(dataCategory)

  // const [errors, setErrors] = useState({
  //     title: '',
  //     description: '',
  //     category: '',
  //     subCategoryIds: '',
  //     maxValue: '',
  //     deadline: ""
  // });
  // const formComponents = [<InterestForm dataCategory={dataCategory} setDataCategory={setDataCategory} />
  //     , <InfoOrder formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
  //     , <PrevisionOrder formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />];
  // const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents);

  // const handleHeaderText = () => {
  //     if (currentStep == 0) { return (<h4 >Selecione as categorias:</h4>) }
  //     if (currentStep == 1) { return (<h4 >Detalhe o que deseja</h4>) }
  //     return <h4 >Orçamento</h4>;
  // }
  // const validateFormInfo = () => {
  //     const { title, description } = formData;
  //     const newErros = {
  //         title: '',
  //         description: '',
  //         category: '',
  //         subCategoryIds: '',
  //         maxValue: '',
  //         deadline: ""
  //     }

  //     if (notBlank(title)) {
  //         newErros.title = "O campo titulo não pode estar vazio";
  //     }
  //     if (notBlank(description)) {
  //         newErros.description = "O campo descrição não pode estar vazio";
  //     } else if (description.length < 30) {
  //         newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
  //     }

  //     return newErros;
  // }
  // const validateFormPrevision = () => {
  //     const { maxValue, deadline } = formData;
  //     const newErros = {
  //         title: '',
  //         description: '',
  //         category: '',
  //         subCategoryIds: '',
  //         maxValue: '',
  //         deadline: ""
  //     }

  //     if (notBlank(maxValue)) {
  //         newErros.maxValue = "O campo Valor máximo não pode estar vazio";
  //     }
  //     if (notBlank(deadline)) {
  //         newErros.deadline = "O campo prazo não pode estar vazio";
  //     }

  //     return newErros;
  // }
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     if (currentStep == 0) return changeStep(currentStep + 1)
  //     else if(currentStep == 1) {
  //         try {
  //             const errors = validateFormInfo();
  //             const valores = Object.values(errors);
  //             const errorsValues = valores.every(valor => valor === "");
  //             if (!errorsValues) {
  //                 setErrors(errors);
  //             } else {
  //                 setFormData(formData);
  //                 return changeStep(currentStep + 1)
  //             }
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     }else{
  //         const errors = validateFormPrevision();
  //         const valores = Object.values(errors);
  //         const errorsValues = valores.every(valor => valor === "");
  //         if (!errorsValues) {
  //             setErrors(errors);
  //         } else {
  //             setFormData(formData);
  //             console.log(formData);
  //         }
  //     }


  // };
  // return (
  //     <Container fluid className="order-details">
  //         <Container className="container d-flex flex-column justify-content-start">
  //             <Row>
  //                 <Col>
  //                     <Breadcrumb className="d-flex align-items-center">
  //                         <Breadcrumb.Item href="/home"><MdOutlineHome size={"24px"} fill="#1d1d1d" /></Breadcrumb.Item>
  //                         <Breadcrumb.Item active>Solicitar Serviço</Breadcrumb.Item>
  //                     </Breadcrumb>
  //                 </Col>
  //             </Row>
  //             <Row className="d-flex w-100 justify-content-between">
  //                 <Col>
  //                     <h4>Solicite um Serviço</h4>
  //                 </Col>
  //             </Row>
  //             <Row>
  //                 <Col>
  //                     <Card>
  //                         <Card.Body className="info-category-item">
  //                             <div className="d-flex gap-3 align-items-center">
  //                                 {!isFirstStep && (
  //                                     <a className="link" onClick={() => changeStep(currentStep - 1)}><MdArrowBack size={"2rem"} /></a>
  //                                 )}
  //                                 {handleHeaderText()}
  //                             </div>
  //                             <Form onSubmit={handleSubmit}>
  //                                 {currentComponent}
  //                                 <Col className="d-flex justify-content-center align-items-center gap-3">
  //                                     {!isLastStep ? (
  //                                         <>
  //                                             <button className="button-base primary-standart w-100" type="submit">Avançar</button>
  //                                         </>

  //                                     ) : (
  //                                         <button className="button-base primary-standart w-100" type="submit">Concluir</button>
  //                                     )}
  //                                 </Col>
  //                             </Form>

  //                         </Card.Body>

  //                     </Card>
  //                 </Col>
  //             </Row>
  //             <Row>

  //             </Row>
  //         </Container>
  //     </Container>
  // )
}
