import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";


function ServicesAvailableCard() {
  return (
    <Card className="services-available-background b-radius position-relative overflow-hidden">
      <OverlayTrigger
        trigger={["hover", "focus"]}
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
      <Card.Img style={{ borderRadius: '16px 16px 0 0' }} width='100%' height='45%' variant="top" src="https://focalizando.com.br/sites/default/files/2023-03/ideias-de-tatuagens-no-antebraco-masculina-e-feminina.jpg" />
      <Card.Body className="mb-4">
        <Card.Title className="title">Criação de Landing Page</Card.Title>
        <Row className="d-flex justify-content-start my-3 gap-2">
          <Figure className="d-flex align-items-center gap-2 w-auto m-0">
            <Figure.Image
              width='30px'
              height='30px'
              alt="calendario"
              src="/assets/icons/calendar.svg"
              className="m-0"
            />
            <Figure.Caption className="d-flex flex-column">
              Orçamento: <span className="fs-6 text-color fw-bold">R$: 200,00</span>
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
            <Figure.Caption className="d-flex flex-column">
              Prazo: <span className="fs-6 text-color fw-bold">7 DIAS</span>
            </Figure.Caption>
          </Figure>
        </Row>
      </Card.Body>
      <ButtonBase onClick={() => { }} className="b-radius-button position-absolute w-100 button-hidden" buttonType={"primary-standart"} label={"Ver detalhes"} ></ButtonBase>
    </Card>
  );
}

export default ServicesAvailableCard
