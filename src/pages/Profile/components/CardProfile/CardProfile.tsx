import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";


function CardProfile() {
  return (
    <Card className="card-profile-background b-radius overflow-hidden">
      <Card.Body className="px-4 py-4">
        <Figure className="d-flex flex-column align-items-center gap-2 m-0" style={{ padding: '1px' }}>
          <Row style={{
            borderRadius: '99%',
            padding: '3px',
            margin: 0,
            width: '150px',
            height: '150px',
            backgroundColor: 'var(--contrast-background-color)',
            overflow: 'hidden'
          }}>
            <Figure.Image
              width='100%'
              height='100%'
              style={{ padding: 0 }}
              alt="dollar"
              src="https://www.ogol.com.br/img/jogadores/58/976658_med__20230131161334_cassio.png"
              className="m-0"
            />
          </Row>
          <Figure.Caption className="w-100 d-flex align-items-center justify-content-center pt-3">
            <span className="f-30 f-inter dark-contrast-color fw-bold">Cassio Ramos</span>
          </Figure.Caption>
        </Figure>
        <Row className="d-flex justify-content-center mt-1 text-center">
          <Figure className="d-flex align-items-center justify-content-center m-0">
            <Figure.Image
              width='15px'
              height='15px'
              alt="dollar"
              src="/assets/icons/location.svg"
              className="m-0 me-2"
            />
            <Figure.Caption className="text-color fw-semibold f-16 f-inter">
              São Paulo, SP
            </Figure.Caption>
          </Figure>
        </Row>
        <Row className="d-flex justify-content-between my-3 text-center">
          <span className="f-poppings aditional-color f-16">"Sou um jogador que está sempre buscando evoluir e aprimorar minhas habilidades, seja através de treinos específicos ou análise de jogos."</span>
        </Row>
        <Row className="d-flex justify-content-between my-3 text-center">
          <h1 className="text-color f-18 f-inter fw-bold mt-2">Minhas Especialidades</h1>
          <div className="d-flex justify-content-center gap-2 pt-1">
            <OverlayTrigger
              trigger={["hover", "focus"]}
              key='teste'
              placement='top'
              overlay={
                <h1 className="tooltip b-radius px-3 mb-1 fw-bold">Tradução</h1>
              }
            >
              <Figure.Image
                width='40px'
                height='40px'
                alt="dollar"
                src="/assets/icons/tradution.svg"
                className=""
              />
            </OverlayTrigger>
          </div>
        </Row>
        <Row className="d-flex justify-content-between px-5 w-100 m-0">
        <Row className="d-flex w-auto justify-content-start align-items-start text-start flex-column">
            <h2 className="aditional-color f-poppings f-14 fw-normal w-auto">Avalição:</h2>
            <Figure className="d-flex align-items-center gap-2 w-auto m-0 p-0">
              <Figure.Image
                width='30px'
                height='30px'
                alt="calendario"
                src="/assets/icons/star.svg"
                className="m-0"
              />
              <Figure.Caption className="d-flex flex-column">
                <span className="f-roboto f-22 text-color fw-bold">4.9</span>
              </Figure.Caption>
            </Figure>
          </Row>
          <Row className="d-flex w-auto justify-content-start align-items-start text-start flex-column">
            <h2 className="aditional-color f-poppings f-14 fw-normal w-auto">Negócios:</h2>
            <Figure className="d-flex align-items-center gap-2 w-auto m-0 p-0">
              <Figure.Image
                width='30px'
                height='30px'
                alt="calendario"
                src="/assets/icons/handshake.svg"
                className="m-0"
              />
              <Figure.Caption className="d-flex flex-column">
                <span className="f-roboto f-22 text-color fw-bold">300</span>
              </Figure.Caption>
            </Figure>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CardProfile
