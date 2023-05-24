import { Container, Figure, Row } from "react-bootstrap";
import { ProposalUpdate } from "../ProposalUpdate/ProposalUpdate";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { notBlank } from "../../../scripts/validators";
import EditIcon from '@mui/icons-material/Edit';

export function ProposalDetails() {
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    maxValue: '',
    expirationTime: ''
  });

  const [errors, setErrors] = useState({
    description: '',
    maxValue: '',
    expirationTime: ''
  });


  const validateForm = () => {
    const { maxValue, expirationTime, description, } = formData;
    const newErros = {
      description: '',
      maxValue: '',
      expirationTime: ''
    }

    if (notBlank(description)) {
      newErros.description = "O campo descrição não pode estar vazio";
    } else if (description.length < 30) {
      newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
    }
    if (notBlank(maxValue)) {
      newErros.maxValue = "O campo Valor máximo não pode estar vazio";
    }
    if (notBlank(expirationTime)) {
      newErros.expirationTime = "O campo prazo não pode estar vazio";
    }

    return newErros;
  }

  const handleSubmit = () => {
    try {
      const errors = validateForm();
      const valores = Object.values(errors);
      const errorsValues = valores.every(valor => valor === "");

      if (!errorsValues) {
        setErrors(errors);
      } else {
        setFormData(formData);
        const timeoutId = setTimeout(() => {
          navigate('/home');
        }, 1500);
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/home")
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleEditCancel = () => {
    setEditing(false)
  }

  return (
    <Grid container className="pt-0 px-3" maxWidth={"100%"}>
      <Grid item container xs={12} className="position-relative">
        <Figure className="d-flex align-items-center gap-2">
          <Row style={{
            borderRadius: '99%',
            padding: '3px',
            margin: 0,
            width: '50px',
            height: '43px',
            backgroundColor: 'var(--contrast-background-color)',
            overflow: 'hidden'
          }}>
            <Figure.Image
              width='100%'
              height='100%'
              style={{ padding: 0 }}
              alt="dollar"
              src="https://www.ogol.com.br/img/jogadores/58/976658_med__20230131161334_cassio.png"
              className="m-0"
            />
          </Row>
          <Figure.Caption className="w-100 d-flex align-items-center">
            <div className="d-flex flex-column">
              <span className="dark-contrast-color fw-bold f-22 f-inter">Cassio Ramos</span>
            </div>
            <Figure className="d-flex align-items-center m-0 ms-2">
              <Figure.Caption className="fw-bold f-roboto aditional-color f-14">
                4.9
              </Figure.Caption>
              <Figure.Image
                width='10px'
                height='10px'
                alt="dollar"
                src="/assets/icons/star.svg"
                className="m-0"
                style={{ marginLeft: '100px !important' }}
              />
            </Figure>
          </Figure.Caption>
        </Figure>
        {!editing &&
          <EditIcon
            onClick={handleEdit}
            className="position-absolute"
            sx={{
              right: '0',
              top: '5px',
              cursor: 'pointer',
            }}
          />}
      </Grid>
      {!editing ?
        <Grid item container xs={12}>
          <Grid item container xs={5} className="d-flex justify-content-start my-3">
            <Grid item xs={6}>
              <Figure className="d-flex align-items-center gap-2 w-auto m-0">
                <Figure.Image
                  width='30px'
                  height='30px'
                  alt="calendario"
                  src="/assets/icons/price.svg"
                  className="m-0"
                />
                <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                  Orçamento: <span className="f-roboto f-18 text-color fw-bold">R$: 200,00</span>
                </Figure.Caption>
              </Figure>
            </Grid>
            <Grid item xs={6}>
              <Figure className="d-flex align-items-center gap-2 w-auto m-0">
                <Figure.Image
                  width='30px'
                  height='30px'
                  alt="calendario"
                  src="/assets/icons/calendar.svg"
                  className="m-0"
                />
                <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                  Prazo: <span className="f-roboto f-18 text-color fw-bold">7 dias</span>
                </Figure.Caption>
              </Figure>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h4 className="f-20 f-inter">Descrição</h4>
            <p className="f-16 aditional-color f-roboto">Com base em sua descrição, acredito que posso criar um site moderno e profissional que atenda às suas necessidades. Eu tenho ampla experiência em desenvolvimento de sites para empresas de diferentes segmentos, incluindo petshops. Eu posso garantir que o site será fácil de usar e acessível em todos os dispositivos.</p>
          </Grid>
          <Grid item xs={12} className="d-flex justify-content-between my-3 gap-2">
            <button className="primary-outline w-auto" onClick={handleCancel}>Recusar</button>
            <button className="primary-standart w-auto" onClick={handleSubmit}>Aceitar</button>
          </Grid>
        </Grid>
        : <ProposalUpdate
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          handleCancel={handleEditCancel}
          handleSubmit={handleSubmit}
        />}
    </Grid>
  )
}
