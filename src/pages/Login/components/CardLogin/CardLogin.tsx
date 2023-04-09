import { Card, Form } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Link } from "react-router-dom";

function CardLogin() {

  return (
    <Card className="card-login-background w-100">
      <Card.Body>
        <Card.Title className="title text-center">Entrar</Card.Title>
        <Card.Subtitle className="mb-3 text-muted subtitle text-center">Digite suas credenciais e faça login</Card.Subtitle>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email:</Form.Label>
            <Form.Control className="primary-input" type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Senha:</Form.Label>
            <Form.Control className="primary-input" type="password" placeholder="********" />
          </Form.Group>
          <ButtonBase onClick={() => { }} className="w-100 mt-2" buttonType={"primary-standart"} label={"entrar"} />
          <Form.Text className="summary mt-3 text-center w-100 d-block">
            Ainda não tem uma conta? <Link to='/cadastro' className="destak-color">Cadastre-se</Link>
          </Form.Text>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CardLogin
