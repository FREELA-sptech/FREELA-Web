

import React, { useState } from "react";
import Alerta from "./components/Alert/Alerta"
import CardProposta from "./components/CardProposta/CardProposta";
import { Accordion, Breadcrumb, Card, Col, Container, Row } from "react-bootstrap";
import { MdAttachMoney, MdCalendarToday, MdCategory, MdOutlineHome } from "react-icons/md";

function proposta() {
  const [show, setShow] = useState(false);
  return (
    <Container fluid className="order-details">
      <Container className="container d-flex flex-column justify-content-start">
        <Row>
          <Col>
            <Breadcrumb className="d-flex align-items-center">
              <Breadcrumb.Item href="/home"><MdOutlineHome size={"24px"} fill="#1d1d1d" /></Breadcrumb.Item>
              <Breadcrumb.Item active>Fazer Proposta</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Alerta show={show} setShow={setShow} />
        <Row className="d-flex w-100 flex-column justify-content-between">
          <Col>
            <h4>Fazer Proposta</h4>
            <h1>Criação de Site para Petshop</h1>
          </Col>
          <Col>
            <Accordion className="d-flex flex-column gap-2" alwaysOpen>
              <Accordion.Item eventKey="1" className="filters-card-background">
                <Accordion.Header className="filters-card-header">
                  Detalhes
                </Accordion.Header>
                <Accordion.Body>
                  <h3 className="category">Criado em 19 de abril por Marcos Cliente</h3>
                  <div className="info-line d-flex flex-column align-items-start ">
                    <h4>Descrição</h4>
                    <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                  </div>
                  <div className="info-line d-flex align-items-center ">
                    <div className='fill-icon'>
                      <MdAttachMoney
                        fill='#274c77'
                        size={"24px"}
                      />
                    </div>
                    <p>Orçamento esperado : <b>R$ 200,00</b></p>
                  </div>
                  <div className="info-line d-flex align-items-center ">
                    <div className='fill-icon'>
                      <MdCalendarToday
                        fill='#274c77'
                        size={"24px"}
                      />
                    </div>
                    <p>Prazo de Entrega : <b>26 de abril</b></p>
                  </div>
                  <div className="info-line d-flex align-items-center ">
                    <div className='fill-icon'>
                      <MdCategory
                        fill='#274c77'
                        size={"24px"}
                      />
                    </div>
                    <p>Categorias : <b>Programação</b>, <b>Design</b></p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body className="info-category-item">
                <CardProposta setShow={setShow}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
     
    </Container>
  );
}

export default proposta