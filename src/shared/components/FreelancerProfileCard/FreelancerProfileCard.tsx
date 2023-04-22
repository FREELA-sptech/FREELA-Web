import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";


function FreelancerProfileCard() {
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
        <Card.Title className="title">
          <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
            <Row style={{
              borderRadius: '99%',
              padding: '3px',
              margin: 0,
              width: '50px',
              height: '43px',
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
            <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column">
                <span className="text-color fw-bold f-16 f-inter">Cassio Ramos</span>
                <span className="f-12 f-roboto fw-semibold">Design</span>
              </div>
              <Figure className="d-flex align-items-center m-0">
                <Figure.Image
                  width='15px'
                  height='15px'
                  alt="dollar"
                  src="/assets/icons/star.svg"
                  className="m-0"
                />
                <Figure.Caption className="f-14 f-inter">
                  4.9
                </Figure.Caption>
              </Figure>
            </Figure.Caption>
          </Figure>
        </Card.Title>
        <Row className="d-flex justify-content-between my-3 text-center">
          <span className="f-14 aditional-color">"Sou um jogador que está sempre buscando evoluir e aprimorar minhas habilidades, seja através de treinos específicos ou análise de jogos."</span>
        </Row>
      </Card.Body>
      <ButtonBase onClick={() => { }} className="b-radius-button position-absolute w-100 button-hidden" buttonType={"primary-standart"} label={"Ver Portfólio"} ></ButtonBase>
    </Card>
  );
}

export default FreelancerProfileCard
