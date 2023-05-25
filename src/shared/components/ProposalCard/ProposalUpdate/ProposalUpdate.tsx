import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from "@mui/x-date-pickers";
import { Container, Figure, Form, InputGroup, Row } from "react-bootstrap";
import { MdAttachMoney } from "react-icons/md";
import { notBlank } from "../../../scripts/validators";

export function ProposalUpdate(props: any) {
  const setField = (field: any, value: any) => {
    props.setFormData({
      ...props.formData, [field]: value
    })

    if (!!props.errors[field]) {
      props.setErrors({
        ...props.errors, [field]: null
      })
    }
  }

  return (
    <Grid container className="pt-0 px-0" maxWidth={"100%"}>
      <Grid item xs={12} className="ps-0 mb-3">
        <Grid container item xs={5} className="p-0 mb-3">
          <Grid item xs={6} className="p-0 pe-2 mb-3">
            <Typography variant="body2" className="f-12 f-poppings">
              Orçamento:
            </Typography>
            <TextField
              error={!!props.errors.proposalValue}
              id="proposalValue"
              name="proposalValue"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={props.formData.proposalValue}
              autoComplete="given-name"
              variant="standard"
              helperText={
                props.errors.proposalValue
                  ? (
                    <Typography variant="body2" className="f-14">
                      {props.errors.proposalValue || " "}
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
                value={props.formData.expirationTime}
                onChange={() => { }}
                className="p-0"
                slotProps={{
                  textField: {
                    helperText: props.errors.expirationTime ? (
                      <Typography variant="body2" className="f-14">
                        {props.errors.expirationTime}
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
            error={!!props.errors.description}
            id="description"
            name="description"
            fullWidth
            value={props.formData.description}
            variant="outlined"
            helperText={
              props.errors.description
                ? (
                  <Typography variant="body2" className="f-14">
                    {props.errors.description || " "}
                  </Typography>
                )
                : " "
            }
            onChange={(e) => setField("description", e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
