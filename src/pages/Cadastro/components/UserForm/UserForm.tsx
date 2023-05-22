import { Col, Form, InputGroup } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai"
import { BsFillPersonVcardFill, BsFillPersonFill } from "react-icons/bs"
import { Alert, Autocomplete, Avatar, Box, CircularProgress, Dialog, Grid, Input, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { ExternalAPI } from "../../../../api/externalApi";
import useSnackbar from "../../../../hooks/useSnackbar";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

export function UserForm(props: any) {
  const [disableInputs, setDisableInputs] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [ufsData, setUfsData] = useState<any>([])
  const [citysData, setCitysData] = useState<any>([])
  const [SnackbarComponent, showSnackbar] = useSnackbar();

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

  const getUFS = () => {
    getCitys(props.formData.uf)
    ExternalAPI.getUFS()
      .then((res) => {
        const ufs = res.data.map((response: any) => {
          return response.sigla
        })

        setUfsData(ufs)
        setDisableInputs(false)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para buscar as UFS");
      })
  }

  const getCitys = (uf: string) => {
    uf !== props.formData.uf && (props.formData.city = "")
    setField("uf", uf)
    ExternalAPI.getCitys(uf)
      .then((res) => {
        const citys = res.data.map((response: any) => {
          return response.nome
        })

        setCitysData(citys)
        setDisableInputs(false)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para buscar as Cidades");
      })
  }

  useEffect(() => {
    getUFS()
  }, [])

  return (
    <Grid item container xs={12} lg={12} className="pt-4">
      <SnackbarComponent />
      <Grid item lg={12} xs={12} className="p-0 mb-3">
        <Typography variant="body2" className="f-16">
          Nome:
        </Typography>
        <TextField
          error={Boolean(props.errors.name)}
          id="name"
          name="name"
          fullWidth
          value={props.formData.name}
          autoComplete="given-name"
          variant="standard"
          helperText={
            props.errors.name
              ? (
                <Typography variant="body2" className="f-14">
                  {props.errors.name || " "}
                </Typography>
              )
              : " "
          }
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
          }}
          onChange={(e) => setField("name", e.target.value)}
        />
      </Grid>
      <Grid item lg={12} xs={12} className="p-0 mb-3">
        <Typography variant="body2" className="f-16">
          Email:
        </Typography>
        <TextField
          error={Boolean(props.errors.email)}
          id="email"
          name="email"
          fullWidth
          value={props.formData.email}
          autoComplete="given-name"
          variant="standard"
          helperText={
            props.errors.email
              ? (
                <Typography variant="body2" className="f-14">
                  {props.errors.email || " "}
                </Typography>
              )
              : " "
          }
          InputProps={{
            startAdornment:
              <InputAdornment position="start">
                <EmailIcon />
              </ InputAdornment>
          }}
          onChange={(e) => setField("email", e.target.value)}
        />
      </Grid>
      <Grid item container spacing={2} lg={12} xs={12} className="ms-0 p-0">
        <Grid item lg={3} xs={3} className="ps-0">
          <Typography variant="body2" className="f-16">
            UF:
          </Typography>
          <Autocomplete
            id="uf-autocomplete"
            options={ufsData}
            value={props.formData.uf}
            disabled={disableInputs}
            noOptionsText="Não Encontrado"
            onKeyUp={(e: any) => {
              const selectedValue = e.target.textContent || e.target.defaultValue
              if (ufsData.includes(selectedValue) || selectedValue === '') {
                getCitys(selectedValue)
              }
            }}
            onSelect={(e: any) => {
              const selectedValue = e.target.textContent || e.target.defaultValue
              if (ufsData.includes(selectedValue) || selectedValue === '') {
                getCitys(selectedValue)
              }
            }}
            renderInput={(params) =>
              <TextField
                {...params}
                error={Boolean(props.errors.uf)}
                id="uf"
                name="uf"
                autoComplete="uf-autocomplete"
                variant="standard"
                helperText={
                  props.errors.uf
                    ? (
                      <Typography variant="body2" className="f-14">
                        {props.errors.uf || " "}
                      </Typography>
                    )
                    : " "
                }
              />
            }
          />
        </Grid>
        <Grid item lg={9} xs={9}>
          <Typography variant="body2" className="f-16">
            Cidade:
          </Typography>
          <Autocomplete
            id="city-autocomplete"
            options={citysData}
            value={props.formData.city}
            disabled={disableInputs || !props.formData.uf}
            noOptionsText="Não Encontrado"
            onKeyUp={(e: any) => {
              const selectedValue = e.target.textContent || e.target.defaultValue
              if (citysData.includes(selectedValue) || selectedValue === '') {
                setField("city", selectedValue)
              }
            }}
            onSelect={(e: any) => {
              const selectedValue = e.target.textContent || e.target.defaultValue
              if (citysData.includes(selectedValue) || selectedValue === '') {
                setField("city", selectedValue)
              }
            }}
            renderInput={(params) =>
              <TextField
                {...params}
                error={Boolean(props.errors.city)}
                id="city"
                name="city"
                variant="standard"
                helperText={
                  props.errors.city
                    ? (
                      <Typography variant="body2" className="f-14">
                        {props.errors.city || " "}
                      </Typography>
                    )
                    : " "
                }
              />
            }
          />
        </Grid>
      </Grid>
      <Grid item lg={12} xs={12} className="p-0 mb-3">
        <Typography variant="body2" className="f-16">
          Senha:
        </Typography>
        <TextField
          error={Boolean(props.errors.password)}
          id="password"
          name="password"
          fullWidth
          value={props.formData.password}
          autoComplete="given-name"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          helperText={
            props.errors.password
              ? (
                <Typography variant="body2" className="f-14">
                  {props.errors.password || " "}
                </Typography>
              )
              : " "
          }
          InputProps={{
            startAdornment:
              <InputAdornment
                style={{ cursor: 'pointer' }}
                onClick={() => { setShowPassword(!showPassword) }}
                position="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
          }}
          onChange={(e) => setField("password", e.target.value)}
        />
      </Grid>
    </Grid>
  )
}
