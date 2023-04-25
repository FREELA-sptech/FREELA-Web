import { Col, Container, Figure, Row, Toast, ToastContainer } from "react-bootstrap";
import CardLogin from "./components/CardLogin/CardLogin";
import "./style.scss"
import React from "react";


function Login() {

  return (
    <Container fluid className="login-background d-flex justify-content-center align-items-center">
      <Container>
        <Row className="content d-flex justify-content-center align-items-stretch">
          <CardLogin />
          <Col className="text-container d-none d-md-flex flex-column align-items-start justify-content-center" md={6} lg={6}>
            <Figure>
              <Figure.Image
                width={"100px"}
                src="/assets/images/banner-icon.svg"
              />
            </Figure>
            <div className="w-100">
              <h1 className="f-inter f-52 dark-contrast-color">Bem vindo de volta</h1>
              <h1 className="f-roboto f-22 aditional-color fw-normal">Inicie sessão para voltar a buscar por serviços com seus interesses</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login
