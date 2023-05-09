import { Alert, Card, Col, Form, InputGroup, Toast } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { emailValidation, notBlank, passwordValidation } from "../../../../shared/scripts/validators";
import { AiFillEye } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { UserAPI } from "../../../../api/userApi";
import { UserStorage } from "../../../../store/userStorage";

function CardLogin() {
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

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
      newErros.email = "O campo email não pode estar vazio";
    } else if (!emailValidation(email)) {
      newErros.email = "Email inválido";
    }

    if (notBlank(password)) {
      newErros.password = "O campo senha não pode estar vazio";
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
      await UserAPI.login(formData)
      .then((res) => {
        const userData = res.data

        setMessageError("")
        UserStorage.setIsFreelancerLocalStorage(userData.freelancer)
        UserStorage.setTokenUserLocalStorage(userData.token)

        navigate("/home")
      })
      .catch(() => {
        setMessageError("Email ou senha inválida, por favor tente novamente")
      })
      // if (response.status == 200) {
      //   if (response.data == "") {
      //     setMessageError("Email ou senha inválida, por favor tente novamente")
      //     return messageError;
      //   }
      //   setMessageError("")
      //   login()
      //   navigate("/home")
      // }
    }

  }
  return (
    <Col xs={12} md={6} className="form-login-background d-flex justify-content-center">
      <Col xs={10} lg={8} className="card-login d-flex flex-column align-items-center justify-content-center">
        <h1 className="f-32 dark-contrast-color text-center">Entrar</h1>
        <h1 className="text-muted f-roboto aditional-color f-16 text-center">Digite suas credenciais e faça login</h1>
        <Form onSubmit={handleSubmit} className="form d-flex w-100 flex-column justify-content-center">
          <Alert variant={"danger"} show={!!messageError}>
            {messageError}
          </Alert>
          <Form.Group>
            <Form.Label className="f-roboto fw-bold">
              Email:
            </Form.Label>
            <InputGroup hasValidation>
              <MdAlternateEmail
                className="position-absolute ms-2 h-100"
                style={{ zIndex: 99 }}
                fill="#274C77"
                size={"20px"}
              />
              <Form.Control
                className="rounded"
                style={{
                  paddingLeft: "35px"
                }}
                onChange={(e) => setField("email", e.target.value)}
                name="email"
                size="lg"
                type="text"
                placeholder=""
                aria-describedby="inputGroupPrepend"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className="f-roboto fw-bold">
              Senha:
            </Form.Label>
            <InputGroup hasValidation>
              <AiFillEye
                className="position-absolute ms-2 h-100"
                style={{ zIndex: 99 }}
                fill="#274C77"
                size={"20px"}
              />
              <Form.Control
                className="rounded"
                style={{
                  paddingLeft: "35px"
                }}
                onChange={(e) => setField("password", e.target.value)}
                size="lg"
                type="password"
                name="password"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
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
