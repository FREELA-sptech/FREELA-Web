
import { Form, InputGroup } from "react-bootstrap";
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import "./style.scss"
import { useEffect, useState } from "react";
import { notBlank } from "../../../../shared/scripts/validators";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button, Fab, Input, InputAdornment, InputLabel, MobileStepper, useTheme } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from "@mui/x-date-pickers";
import { OrdersAPI } from "../../../../api/ordersApi";
import dayjs from "dayjs";

function CardProposta(props: any) {
  const { handleCloseModal } = props
  const navigate = useNavigate();
  const params = useParams();
  const { sendProposals } = OrdersAPI();

  const { id } = params;

  const [formData, setFormData] = useState({
    description: '',
    proposalValue: '',
    expirationTime: ''
  });

  const [errors, setErrors] = useState({
    description: '',
    proposalValue: '',
    expirationTime: ''
  });

  const setField = (field: any, value: any) => {
    setFormData({
      ...formData, [field]: value
    })
    if (!!errors[field]) {
      setErrors({
        ...errors, [field]: null
      })
    }
  }

  const validateForm = () => {
    const { description, expirationTime, proposalValue } = formData;
    const newErros = {
      description: '',
      proposalValue: '',
      expirationTime: '',
    }

    if (notBlank(description)) {
      newErros.description = "O campo descrição não pode estar vazio";
    } else if (description.length < 30) {
      newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
    }

    if (notBlank(proposalValue)) {
      newErros.proposalValue = "O campo valor máximo não pode estar vazio";
    } else if (Number(proposalValue) <= 0) {
      newErros.proposalValue = "O campo valor máximo não pode ser negativo ou 0";
    }

    if (notBlank(expirationTime)) {
      newErros.expirationTime = "O prazo não pode estar vazio";
    } else if (Number(expirationTime) <= 0) {
      newErros.expirationTime = "O prazo não pode ser menor ou igual a zero";
    } else if (dayjs(expirationTime).isBefore(dayjs(), 'day')) {
      newErros.expirationTime = "A data de expiração deve ser a partir de hoje";
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
        sendProposals(id, formData)
          .then((res) => {
            handleCloseModal()
            console.log(res)
          })
          .catch(() => { })
      }
    } catch (error) {
    }
  };

  const handleCancel = () => {
    navigate("/home")
  }

  return (
    <Grid container className="pt-0 px-0" maxWidth={"100%"}>
      <Grid item xs={12} className="px-3 mb-3">
        <Grid container item xs={12}>
          <Typography variant="body2" className="f-22 fw-bold mb-4">
            Orçamento:
          </Typography>
        </Grid>
        <Grid container item xs={5} className="p-0 mb-3">
          <Grid item xs={6} className="p-0 pe-2 mb-3">
            <Typography variant="body2" className="f-12">
              Preço:
            </Typography>
            <TextField
              error={!!errors.proposalValue}
              id="proposalValue"
              name="proposalValue"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={formData.proposalValue}
              autoComplete="given-name"
              variant="standard"
              helperText={
                errors.proposalValue
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.proposalValue || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("proposalValue", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className="p-0 ps-2 mb-3">
            <Typography variant="body2" className="f-12">
              Prazo:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                fullWidth
                variant="standard"
                value={formData.expirationTime}
                onChange={(e) => setField('expirationTime', e.$d)}
                className="p-0"
                slotProps={{
                  textField: {
                    helperText: errors.expirationTime ? (
                      <Typography variant="body2" className="f-14">
                        {errors.expirationTime}
                      </Typography>
                    ) : null
                  }
                }}
                format="DD-MM-YYYY"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12} className="p-0 mb-3">
          <Typography variant="body2" className="f-12">
            Descrição:
          </Typography>
          <TextField
            error={!!errors.description}
            id="description"
            name="description"
            fullWidth
            value={formData.description}
            variant="outlined"
            helperText={
              errors.description
                ? (
                  <Typography variant="body2" className="f-14">
                    {errors.description || " "}
                  </Typography>
                )
                : " "
            }
            onChange={(e) => setField("description", e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
        <Grid container item justifyContent="space-between" xs={12}>
          <button className="primary-outline w-auto" onClick={handleCancel}>{"Cancelar"}</button>
          <button className="primary-standart w-auto" onClick={handleSubmit}>{"Finalizar"}</button>
        </Grid>
      </Grid>
    </Grid>
  );
}


export default CardProposta
