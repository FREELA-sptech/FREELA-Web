
import { Form, InputGroup } from "react-bootstrap";
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import "./style.scss"
import { useEffect, useState } from "react";
import { notBlank } from "../../../../shared/scripts/validators";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button, Fab, Input, InputAdornment, InputLabel, MobileStepper, useTheme } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from "@mui/x-date-pickers";

function CardProposta(props: any) {
  const { setShow } = props;
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
        setShow(true);
        const timeoutId = setTimeout(() => {
          setShow(false);
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

  return (
    <Grid container className="pt-0 px-0" maxWidth={"100%"}>
      <Grid item xs={12} className="ps-4 mb-3">
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
              error={!!errors.maxValue}
              id="maxValue"
              name="maxValue"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={formData.maxValue}
              autoComplete="given-name"
              variant="standard"
              helperText={
                errors.maxValue
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.maxValue || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("maxValue", e.target.value)}
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
                onChange={() => { }}
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
                format="MM-DD-YYYY"
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
