import { Avatar, Box, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from "@mui/x-date-pickers";
import { Container, Figure, Form, InputGroup, Row } from "react-bootstrap";
import { MdAttachMoney } from "react-icons/md";
import { notBlank } from "../../../scripts/validators";
import { UserStorage } from "../../../../store/userStorage";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import dayjs from 'dayjs';

export type Props = {
  user: any
  setFormData: (data: any) => void
  setErrors: (data: any) => void
  formData: any
  errors: any
  data: any
  handleHiddenEditProposals: () => void
  handleUpdateProposals: () => void
}

export function ProposalUpdate({
  user,
  setFormData,
  setErrors,
  formData,
  errors,
  data,
  handleHiddenEditProposals,
  handleUpdateProposals
}: Props) {

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

  return (
    <Grid container className="pt-0 px-0" maxWidth={"100%"}>
      <Grid item container xs={12} className="position-relative">
        <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
          <Avatar
            sx={{
              width: "50px",
              height: "50px",
              bgcolor: "#274C77",
            }}
            alt={user.name}
            src={user.photo ? `data:image/png;base64, ${user.photo}` : "/assets/images/profile.png"}
          />
          <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="text-color fw-bold f-18 f-inter">{user.name}</span>
              {/* <Figure className="d-flex align-items-center m-0">
                <Figure.Image
                  width='13px'
                  height='13px'
                  alt="dollar"
                  src="/assets/icons/star.svg"
                  className="m-0"
                />
                <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                  {user.rate}
                </Figure.Caption>
              </Figure> */}
            </div>
          </Figure.Caption>
        </Figure>
        {user.id === UserStorage.getIdUserLocalStorage() && (
          <Box
            className="position-absolute"
            sx={{
              right: 0,
              cursor: 'pointer'
            }}
          >
            <ClearIcon onClick={handleHiddenEditProposals} sx={{ fontSize: '30px', marginRight: '5px' }} color="error" />
            <DoneIcon onClick={handleUpdateProposals} sx={{ fontSize: '30px' }} color="success" />
          </Box>
        )}
      </Grid>
      <Grid item xs={12} className="ps-0 mb-3">
        <Grid container item xs={5} className="p-0 mb-3">
          <Grid item xs={6} className="p-0 pe-2 mb-3">
            <Typography variant="body2" className="f-12 f-poppings">
              Orçamento:
            </Typography>
            <TextField
              error={!!errors.value}
              id="value"
              name="value"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={formData.value}
              autoComplete="given-name"
              variant="standard"
              helperText={
                errors.value
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.value || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("value", e.target.value)}
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
                value={dayjs(formData.deadline)}
                onChange={(e: any) => {
                  setField('deadline', e.$d)
                }}
                className="p-0"
                slotProps={{
                  textField: {
                    helperText: errors.deadline ? (
                      <Typography variant="body2" className="f-14">
                        {errors.deadline}
                      </Typography>
                    ) : null
                  }
                }}
                format="DD/MM/YYYY"
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
      </Grid>
    </Grid>
  )
}
