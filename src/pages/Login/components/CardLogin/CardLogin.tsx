import { Alert, Card, Col, Form, InputGroup, Toast } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../../services/userService";
import { emailValidation, notBlank, passwordValidation } from "../../../../shared/scripts/validators";

function CardLogin() {
  const [messageError,setMessageError] = useState("");
  const [messageSuccess,setMessageSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    try {
      const errors = validateForm();
      const valores = Object.values(errors);
      const errorsValues = valores.every(valor => valor === "");
      if (!errorsValues) {
        setErrors(errors);
      } else {
        const response = await login(formData);
        if (response.status == 200) {
          if(response.data == ""){
            setMessageError("Email ou senha inválida, por favor tente novamente")
            return messageError;
          }
          setMessageError("");
          navigate("/home")
        }
      }
    } catch (error) {
      alert(error)
    }

  }
  return (
    <Col xs={12} md={6} className="form-login-background d-flex justify-content-center">
      <Col xs={10} lg={8} className="card-login d-flex flex-column align-items-center justify-content-center">
        <h1 className="title text-center">Entrar</h1>
        <h1 className="text-muted subtitle text-center">Digite suas credenciais e faça login</h1>
        <Form onSubmit={handleSubmit} className="form d-flex w-100 flex-column justify-content-center">
        <Alert variant={"danger"} show={!!messageError}>
          {messageError}
        </Alert>
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
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
            <Form.Label>
              Senha
            </Form.Label>
            <Form.Control
              onChange={(e) => setField("password", e.target.value)}
              size="lg"
              type="password"
              name="password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <button className="button-base primary-standart" type="submit">Entrar</button>
          <Form.Text className="summary mt-3 text-center w-100 d-block">
            <p className="d-flex justify-content-start gap-2">Ainda não tem uma conta? <Link to='/cadastro' className="destak-color">Cadastre-se</Link></p>
          </Form.Text>
        </Form>
      </Col>
    </Col>
  );
}

export default CardLogin
