import { Card, Row } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";


function ServicesAvailableCard() {
  return (
    <Card className="services-available-background">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <h1 className="category w-auto">Criação de Landing Page</h1>
          <h2 className="subtitle w-auto">R$ 500,00 - 1.300</h2>
        </Card.Title>
        <Card.Subtitle className="mb-2 subtitle">
          Criada: 04/04/2023
        </Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <ButtonBase onClick={() => {}} buttonType={"primary-standart"} label={"fazer proposta"} ></ButtonBase>
      </Card.Body>
    </Card>
  );
}

export default ServicesAvailableCard
