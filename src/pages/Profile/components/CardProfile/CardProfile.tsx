import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";


function CardProfile() {
  return (
    <Card className="card-profile-background b-radius overflow-hidden">
      <Card.Body className="px-5">
        <Card.Title className="title">
          <Figure className="d-flex flex-column align-items-center gap-2" style={{ padding: '1px' }}>
            <Row style={{
              borderRadius: '99%',
              padding: '3px',
              margin: 0,
              width: '200px',
              height: '200px',
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
              <span className="title destak-color fw-bold">Cassio Ramos</span>
            </Figure.Caption>
          </Figure>
        </Card.Title>
        <Row className="d-flex justify-content-center my-3 text-center">
          <Figure className="d-flex align-items-center justify-content-center m-0">
            <Figure.Image
              width='15px'
              height='15px'
              alt="dollar"
              src="/assets/icons/location.svg"
              className="m-0 me-2"
            />
            <Figure.Caption className="text-color fw-normal fs-6">
              São Paulo, SP
            </Figure.Caption>
          </Figure>
        </Row>
        <Row className="d-flex justify-content-between my-3 text-center">
          <span className="mini-summary">"Sou um jogador que está sempre buscando evoluir e aprimorar minhas habilidades, seja através de treinos específicos ou análise de jogos."</span>
        </Row>
        <Row className="d-flex justify-content-between my-3 text-center">
          <h1 className="title fs-5">Minhas Especialidades</h1>
          <div className="d-flex justify-content-center gap-2">
            <OverlayTrigger
              trigger={["hover", "focus"]}
              key='teste'
              placement='top'
              overlay={
                <h1 className="tooltip b-radius px-3 fw-bold">Tradução</h1>
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
            <OverlayTrigger
              trigger={["hover", "focus"]}
              key='teste'
              placement='top'
              overlay={
                <h1 className="tooltip b-radius px-3 fw-bold">Tradução</h1>
              }
            >
              <Figure.Image
                width='40px'
                height='40px'
                alt="dollar"
                src="/assets/icons/tradution.svg"
              />
            </OverlayTrigger>
          </div>
        </Row>
        <Row className="d-flex justify-content-between px-1 w-auto">
          <Row className="d-flex w-auto justify-content-center align-items-center text-center ">
            <h2 className="fs-6 text-color fw-normal p-0">Avaliação:</h2>
            <Figure className="d-flex align-items-center gap-2 w-auto m-0">
              <Figure.Image
                width='30px'
                height='30px'
                alt="calendario"
                src="/assets/icons/star.svg"
                className="m-0"
              />
              <Figure.Caption className="d-flex flex-column">
                <span className="fs-4 text-color fw-bold">4,9</span>
              </Figure.Caption>
            </Figure>
          </Row>
          <Row className="d-flex w-auto justify-content-center align-items-center text-center">
            <h2 className="fs-6 text-color fw-normal p-0">Negócios:</h2>
            <Figure className="d-flex align-items-center gap-2 w-auto m-0">
              <Figure.Image
                width='30px'
                height='30px'
                alt="calendario"
                src="/assets/icons/handshake.svg"
                className="m-0"
              />
              <Figure.Caption className="d-flex flex-column">
                <span className="fs-4 text-color fw-bold">300</span>
              </Figure.Caption>
            </Figure>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CardProfile
