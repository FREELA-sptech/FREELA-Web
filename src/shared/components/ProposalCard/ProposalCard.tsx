import { Button, Card, Figure, Modal, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";
import { ProposalDetails } from "./ProposalDetails/ProposalDetails";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { ProposalUpdate } from "./ProposalUpdate/ProposalUpdate";


function ProposalCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentComponent, setCurrentComponent] = useState(0);

  const proposalComponents = [<ProposalDetails />, <ProposalUpdate />]
  const handleSelectComponent = () => {
    if (currentComponent == 1) return setCurrentComponent(currentComponent - 1);
    setCurrentComponent(currentComponent + 1);
  }

  return (
    <>
      <Card className="services-available-background b-radius position-relative overflow-hidden">
        <Card.Body className="mb-0">
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
          <Row className="d-flex justify-content-start my-3 gap-2">
            <Figure className="d-flex align-items-center gap-2 w-auto m-0">
              <Figure.Image
                width='30px'
                height='30px'
                alt="calendario"
                src="/assets/icons/price.svg"
                className="m-0"
              />
              <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                Orçamento: <span className="f-roboto f-18 text-color fw-bold">R$: 200,00</span>
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
              <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                Prazo: <span className="f-roboto f-18 text-color fw-bold">7 dias</span>
              </Figure.Caption>
            </Figure>
          </Row>
        </Card.Body>
        <ButtonBase onClick={() => handleShow()} className="b-radius-button w-100 button-hidden" buttonType={"primary-standart"} label={"Ver detalhes"} ></ButtonBase>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="f-inter f-22">Detalhes da proposta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {proposalComponents[currentComponent]}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProposalCard
