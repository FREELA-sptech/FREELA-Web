import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";


function ServicesAvailableCard() {
  return (
    <Card className="services-available-background b-radius position-relative overflow-hidden">
      <OverlayTrigger
        trigger="hover"
        key='teste'
        placement='left'
        overlay={
          <h1 className="tooltip b-radius px-3 fw-bold">Tradução</h1>
        }
      >
        <Figure.Image
          width='40px'
          height='40px'
          alt="dollar"
          src="/assets/icons/tradution.svg"
          className="position-absolute ms-2 mt-2"
        />
      </OverlayTrigger>
      <Card.Img style={{ borderRadius: '16px 16px 0 0' }} width='100%' height='250px' variant="top" src="https://focalizando.com.br/sites/default/files/2023-03/ideias-de-tatuagens-no-antebraco-masculina-e-feminina.jpg" />
      <Card.Body className="mb-4">
        <Card.Title className="title">Criação de Landing Page</Card.Title>
        <Figure className="d-flex align-items-center gap-2 my-3">
          <Figure.Image
            width='30px'
            height='30px'
            alt="dollar"
            src="/assets/icons/dolar-background.svg"
            className="m-0"
          />
          <Figure.Caption>
            Valor: <span className="text-color fw-bold">R$ 20,00</span>
          </Figure.Caption>
        </Figure>
        <Row className="d-flex justify-content-between my-3">
          <Figure className="d-flex align-items-center gap-2 w-auto m-0">
            <Figure.Image
              width='30px'
              height='30px'
              alt="calendario"
              src="/assets/icons/calendar.svg"
              className="m-0"
            />
            <Figure.Caption>
              Criada: <span className="text-color fw-bold">01/04/2023</span>
            </Figure.Caption>
          </Figure>
          <Figure className="d-flex align-items-center gap-2 w-auto m-0">
            <Figure.Image
              width='30px'
              height='30px'
              alt="calendario"
              src="/assets/icons/calendar.svg"
              className="m-0"
            />
            <Figure.Caption>
              Prazo: <span className="text-color fw-bold">17/04/2023</span>
            </Figure.Caption>
          </Figure>
        </Row>
      </Card.Body>
      <ButtonBase onClick={() => { }} className="b-radius-button position-absolute w-100 button-hidden" buttonType={"primary-standart"} label={"fazer proposta"} ></ButtonBase>
    </Card>
    // <Card className="services-available-background">
    //   <Card.Body>
    //     <Card.Title className="d-flex justify-content-between align-items-center">
    //       <h1 className="category w-auto">Criação de Landing Page</h1>
    //       <h2 className="subtitle w-auto">R$ 500,00 - 1.300</h2>
    //     </Card.Title>
    //     <Card.Subtitle className="mb-2 subtitle">
    //       Criada: 04/04/2023
    //     </Card.Subtitle>
    //     <Card.Text>
    //       Some quick example text to build on the card title and make up the
    //       bulk of the card's content.
    //     </Card.Text>
    //     <ButtonBase onClick={() => {}} buttonType={"primary-standart"} label={"fazer proposta"} ></ButtonBase>
    //   </Card.Body>
    // </Card>
  );
}

export default ServicesAvailableCard
