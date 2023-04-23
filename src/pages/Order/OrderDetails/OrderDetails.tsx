import { useState } from "react";
import { Breadcrumb, Card, Col, Container, ListGroup, Row, Tab, Tabs, Image } from "react-bootstrap";
import { MdAttachMoney, MdCalendarToday, MdCategory, MdDelete, MdOutlineDelete, MdOutlineEdit, MdOutlineHome } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./style.scss";
import ButtonBase from "../../../shared/components/ButtonBase/ButtonBase";
import ProposalCard from "../../../shared/components/ProposalCard/ProposalCard";

export function OrderDetails() {
    const [order, setOrder] = useState({})
    return (
        <Container fluid className="order-details">
            <Container className="container d-flex flex-column justify-content-start">
                <Row>
                    <Col>
                        <Breadcrumb className="d-flex align-items-center">
                            <Breadcrumb.Item href="/home"><MdOutlineHome size={"24px"} fill="#1d1d1d" /></Breadcrumb.Item>
                            <Breadcrumb.Item active>Detalhes Serviço</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="d-flex w-100 justify-content-between">
                    <Col>
                        <h1>Criação de Site para Petshop</h1>
                        <h3 className="category">Criado em 19 de abril por Marcos Cliente</h3>
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
                    </Col>
                    <Col className="d-flex justify-content-end align-items-start gap-3">
                        {/* <button className="btn-update"><MdOutlineEdit fill="#274c77" size={"32px"} /></button>
                        <button className="btn-delete"><MdOutlineDelete fill="#BA1A1A" size={"32px"} /></button> */}
                        <button className="buttonBase primary-standart">Fazer Proposta</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs
                            className="gap-3"
                            defaultActiveKey="info"
                            transition={true}
                            id="order"
                            fill
                        >
                            <Tab eventKey="info" title="Informações" tabClassName="painel">
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="info-category-item">
                                            <div className="image-container">
                                                <img src="https://focalizando.com.br/sites/default/files/2023-03/ideias-de-tatuagens-no-antebraco-masculina-e-feminina.jpg" alt="" />
                                            </div>
                                            <h4 className="title-info">Descrição</h4>
                                            <p>Somos uma loja de animais de estimação que oferece produtos e serviços para cães, gatos, pássaros e outros animais. Nós gostaríamos de ter um site que represente a nossa marca e ajude a aumentar nossa presença online.</p>
                                            <p>O site deve incluir informações sobre os produtos e serviços que oferecemos, bem como informações úteis sobre cuidados com animais, dicas e notícias relevantes para nossos clientes. Queremos ter uma seção para exibir nossos produtos, uma seção para os serviços que oferecemos, uma seção para a nossa equipe e uma seção de contato para os clientes nos encontrarem.</p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Tab>
                            <Tab eventKey="propostas" title="Propostas" tabClassName="painel">
                                <Card>
                                    <Card.Body className="d-flex gap-3">
                                        <ProposalCard/>
                                    </Card.Body>
                                </Card>
                            </Tab>
                        </Tabs>

                    </Col>
                </Row>
            </Container>
        </Container>
    )
}