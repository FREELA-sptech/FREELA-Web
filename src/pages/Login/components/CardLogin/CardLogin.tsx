import { Alert, Card, Col, Form, InputGroup, Toast } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { emailValidation, notBlank, passwordValidation } from "../../../../shared/scripts/validators";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { UserAPI } from "../../../../api/userApi";
import { UserStorage } from "../../../../store/userStorage";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import useSnackbar from "../../../../hooks/useSnackbar";

function CardLogin() {
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [SnackbarComponent, showSnackbar] = useSnackbar();
  const { login } = UserAPI();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    const { email, password } = formData;

    const newErros = {
      email: '',
      password: ''
    }

    if (notBlank(email)) {
      newErros.email = "Informe seu email";
    } else if (!emailValidation(email)) {
      newErros.email = "Email inválido";
    }

    if (notBlank(password)) {
      newErros.password = "Informe sua senha";
    } else if (passwordValidation(password)) {
      newErros.password = "Senha muito curta";
    }

    return newErros;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    const valores = Object.values(errors);
    const errorsValues = valores.every(valor => valor === "");

    if (!errorsValues) {
      setErrors(errors);
    } else {
      login(formData)
        .then((res) => {
          const userData = res.data

          UserStorage.setIsFreelancerLocalStorage(userData.isFreelancer)
          UserStorage.setTokenUserLocalStorage(userData.token)

          navigate("/perfil")
        })
        .catch(() => {
          showSnackbar(true, "Email ou Senha incorreta, Tente Novamente!")
        })
    }
  }

  return (
    <Col xs={12} md={6} className="form-login-background d-flex justify-content-center">
      <Col xs={10} lg={8} className="card-login d-flex flex-column align-items-center justify-content-center">
        <h1 className="f-32 dark-contrast-color text-center">Entrar</h1>
        <h1 className="text-muted f-roboto aditional-color f-16 text-center">Digite suas credenciais e faça login</h1>
        <Form onSubmit={handleSubmit} className="form d-flex w-100 flex-column justify-content-center gap-0">
          <SnackbarComponent />
          <Grid item lg={12} xs={12} className="p-0 mb-3">
            <Typography variant="body2" className="f-16">
              Email:
            </Typography>
            <TextField
              error={Boolean(errors.email)}
              id="email"
              name="email"
              fullWidth
              value={formData.email}
              autoComplete="given-name"
              variant="standard"
              helperText={
                errors.email
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.email || " "}
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
          <Grid item lg={12} xs={12} className="p-0 mb-4">
            <Typography variant="body2" className="f-16">
              Senha:
            </Typography>
            <TextField
              error={Boolean(errors.password)}
              id="password"
              name="password"
              fullWidth
              value={formData.password}
              autoComplete="given-name"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              helperText={
                errors.password
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.password || " "}
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
          <button className="button-base primary-standart" type="submit">Entrar</button>
          <Form.Text className="summary mt-3 text-center w-100 d-block">
            <p className="f-roboto f-16 aditional-color">Ainda não tem uma conta? &nbsp;<Link to='/cadastro' className="f-roboto f-16 contrast-color">Cadastre-se</Link></p>
          </Form.Text>
        </Form>
      </Col>
    </Col>
  );
}

export default CardLogin
