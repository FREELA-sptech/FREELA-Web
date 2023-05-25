import { Button, Card, Figure, Modal, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";
import { ProposalDetails } from "./ProposalDetails/ProposalDetails";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Avatar } from '@mui/material'
import { ProposalUpdate } from "./ProposalUpdate/ProposalUpdate";


function ProposalCard(props: any) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentComponent, setCurrentComponent] = useState(0);

  const proposalComponents = [<ProposalDetails data={props.data} />, <ProposalUpdate data={props.data} />]
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
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  bgcolor: "#274C77",
                }}
                alt={props.data.originUser.name}
                src={`data:image/png;base64,${props.data.originUser.profilePhoto}`}
              />
              <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span className="text-color fw-bold f-18 f-inter">{props.data.originUser.name}</span>
                  <Figure className="d-flex align-items-center m-0">
                    <Figure.Image
                      width='13px'
                      height='13px'
                      alt="dollar"
                      src="/assets/icons/star.svg"
                      className="m-0"
                    />
                    <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                      {props.data.originUser.rate}
                    </Figure.Caption>
                  </Figure>
                </div>
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
                Orçamento:
                <span className="f-roboto f-18 text-color fw-bold">{
                  props.data.proposalValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
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
                Prazo:
                <span className="f-roboto f-18 text-color fw-bold">
                  {props.data.expirationTime}
                </span>
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
