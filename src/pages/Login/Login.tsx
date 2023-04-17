import { Col, Container, Row, Toast, ToastContainer } from "react-bootstrap";
import CardLogin from "./components/CardLogin/CardLogin";
import "./style.scss"
import React from "react";


function Login() {

  return (
    <Container fluid className="login-background d-flex justify-content-center align-items-center">
      <Container>
        <Row className="content d-flex justify-content-center align-items-stretch">
          <CardLogin />
          <Col className="image-section d-none d-md-flex flex-column align-items-start justify-content-start gap-3" md={6} lg={6}>
            <div className="text-container h-100 w-100">
            <h1 className="big-title">Bem vindo de volta</h1>
            <h1 className="category">Inicie sessão para voltar a buscar por serviços com seus interesses</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login
