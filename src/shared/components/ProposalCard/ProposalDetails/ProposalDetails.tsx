import { Container, Figure, Row } from "react-bootstrap";
import { ProposalUpdate } from "../ProposalUpdate/ProposalUpdate";
import { Avatar, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { notBlank } from "../../../scripts/validators";
import EditIcon from '@mui/icons-material/Edit';

export function ProposalDetails(props: any) {
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: props.data.description,
    proposalValue: props.data.proposalValue,
    expirationTime: props.data.expiraionTime
  });

  const [errors, setErrors] = useState({
    description: '',
    proposalValue: '',
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
        <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
          <Avatar
            sx={{
              width: "50px",
              height: "50px",
              bgcolor: "#274C77",
            }}
            alt={props.data.originUser.name}
            src={`data:image/png;base64,${props.data.originUser.profilePhoto}`}
          />
          <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="text-color fw-bold f-18 f-inter">{props.data.originUser.name}</span>
              <Figure className="d-flex align-items-center m-0">
                <Figure.Image
                  width='13px'
                  height='13px'
                  alt="dollar"
                  src="/assets/icons/star.svg"
                  className="m-0"
                />
                <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                  {props.data.originUser.rate}
                </Figure.Caption>
              </Figure>
            </div>
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
                  Orçamento:
                  <span className="f-roboto f-18 text-color fw-bold">{
                    props.data.proposalValue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
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
                  Prazo:
                  <span className="f-roboto f-18 text-color fw-bold">
                    {props.data.expirationTime}
                  </span>
                </Figure.Caption>
              </Figure>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h4 className="f-20 f-inter">Descrição</h4>
            <p className="f-16 aditional-color f-roboto">
              {props.data.description}
            </p>
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
