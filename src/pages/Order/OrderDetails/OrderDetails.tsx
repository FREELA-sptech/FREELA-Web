import { useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Container, ListGroup, Row, Tab, Tabs, Image, Modal, Button } from "react-bootstrap";
import { MdAttachMoney, MdCalendarToday, MdCategory, MdDelete, MdOutlineDelete, MdOutlineEdit, MdOutlineHome } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ProposalCard from "../../../shared/components/ProposalCard/ProposalCard";
import { OrderUpdate } from "../OrderUpdate/OrderUpdate";
import { OrdersAPI } from "../../../api/ordersApi";
import { Avatar, Backdrop, Box, CircularProgress } from '@mui/material';
import HtmlTooltip from "../../../shared/tools/MuiTooltipCustom";

export function OrderDetails() {
    interface Order {
        id: number;
        description: string;
        title: string;
        maxValue: number;
        category: any;
        deadline: Date;
        user: any;
        subCategories:any;
        proposals: any; 
        isAccepted: boolean;
        photo: any;
    }

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { editOrder } = OrdersAPI();
    const [idUser,setIdUser] = useState(null);
    const { id } = params;
    const [order, setOrder] = useState<Order>({} as Order)
    const handleClose = () => setIsLoading(false);
    const handleCloseModal = () => setShow(false);
    const handleShow = () => setIsLoading(false);
    useEffect(() => {
        editOrder(id)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [id])

    if (isLoading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    !order ? (
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
                        <h1>{order.title}</h1>
                        <h3 className="category">Criado em 19 de abril por Marcos Cliente</h3>
                        <div className="info-line d-flex align-items-center ">
                            <div className='fill-icon'>
                                <MdAttachMoney
                                    fill='#274c77'
                                    size={"24px"}
                                />
                            </div>
                            <p>Orçamento esperado : <b>{order.maxValue}</b></p>
                        </div>
                        <div className="info-line d-flex align-items-center ">
                            <div className='fill-icon'>
                                <MdCalendarToday
                                    fill='#274c77'
                                    size={"24px"}
                                />
                            </div>
                            <p>Prazo de Entrega : <b>{order.deadline.getDay()} de {order.deadline.getMonth()}</b></p>
                        </div>
                        <div className="info-line d-flex align-items-center ">
                            <div className='fill-icon'>
                                <MdCategory
                                    fill='#274c77'
                                    size={"24px"}
                                />
                            </div>
                            <Box className="w-auto d-flex gap-2">
                                {order &&
                                    order.subCategories.map((categories: any) => (
                                        <HtmlTooltip
                                            key={categories.name}
                                            title={
                                                <h1 key={categories.name} style={{ borderRadius: '10px' }} className="px-3 m-0 tooltip fw-bold">{categories.name}</h1>
                                            }
                                            placement="top"
                                            PopperProps={{
                                                sx: {
                                                    padding: 0
                                                },
                                                disablePortal: true,
                                            }}
                                        >
                                            <Box >
                                                <Avatar
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        bgcolor: "#6096BA",
                                                    }}
                                                    alt={categories.name}
                                                    src={`data:image/png;base64,${order.photo[0]}`}
                                                />
                                            </Box>
                                        </HtmlTooltip>
                                    ))
                                }
                            </Box>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-start gap-3">

                        <button className="btn-update" onClick={handleShow}><MdOutlineEdit fill="#274c77" size={"32px"} /></button>
                        <button className="btn-delete"><MdOutlineDelete fill="#BA1A1A" size={"32px"} /></button>
                        {/* <button className="buttonBase primary-standart">Fazer Proposta</button> */}
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
                                                <img src={`data:image/png;base64,${order.photo[0]}`} alt="" />
                                            </div>
                                            <h4 className="title-info">Descrição</h4>
                                            <p>{order.description}</p>
                                            </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Tab>
                            <Tab eventKey="propostas" title="Propostas :  1" tabClassName="painel">
                                <Card>
                                    <Card.Body className="d-flex gap-3">
                                        <ProposalCard />
                                    </Card.Body>
                                </Card>
                            </Tab>
                        </Tabs>

                    </Col>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                size="lg"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar - Criação de Site para Petshop</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderUpdate />
                </Modal.Body>
            </Modal>
        </Container>

    ):(
        <h1>Serviço não encontrado</h1>
    )
}