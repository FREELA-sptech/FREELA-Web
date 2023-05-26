import { Accordion, Card, Col, Container, Figure, Form, InputGroup, Modal, Row, useAccordionButton } from "react-bootstrap";
import ServicesAvailableCard from "../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import './style.scss'
import { useEffect, useState } from "react";
import FiltersCard from "./components/FiltersCard/FiltersCard";
import FreelancerProfileCard from "../../shared/components/FreelancerProfileCard/FreelancerProfileCard";
import ProposalCard from "../../shared/components/ProposalCard/ProposalCard";
import { UserStorage } from "../../store/userStorage";
import { OrdersAPI } from "../../api/ordersApi";
import { UserAPI } from "../../api/userApi";

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [responseData, setResponseData] = useState([])
  const { getOrders } = OrdersAPI()
  const { getFreelancersByInterests } = UserAPI()

  const handleClose = () => setShowModal(false)
  const handleOpen = () => setShowModal(true)

  useEffect(() => {
    if (UserStorage.getIsFreelancerLocalStorage()) {
      getOrders()
        .then((res: any) => {
          setResponseData(res.data)
        })
    } else {
      getFreelancersByInterests()
        .then((res: any) => {
          setResponseData(res.data)
        })
    }
  }, [])

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex">
          <Row className="pt-3 pb-3 d-flex">
            <h1 className="d-flex flex-column w-auto text-uppercase f-roboto dark-contrast-color fw-bold f-30">
              {UserStorage.getIsFreelancerLocalStorage() ? 'projetos disponíveis' : 'profissionais disponíveis'}
            </h1>
          </Row>
          <Modal className="d-block d-lg-none w-100 h-100" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Filtrar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FiltersCard />
            </Modal.Body>
          </Modal>
          <Col lg={3} className="d-flex d-lg-none">
            <FiltersCard />
          </Col>
          <Col lg={12}>
            <Row className="px-lg-3 px-0 d-flex gap-2">
              <Figure onClick={handleOpen} className="home-icon-background d-flex justify-content-center align-items-center">
                <Figure.Image
                  width='40px'
                  height='40px'
                  alt="icone filtro"
                  src="assets/icons/filter.svg"
                  className="m-0"
                />
              </Figure>
              <InputGroup className="p-0 primary-input w-auto flex-grow-1">
                <Figure.Image
                  width='15px'
                  height='15px'
                  alt="icone filtro"
                  src="assets/icons/search.svg"
                  className="m-0 ms-3"
                />
                <Form.Control
                  style={{ boxShadow: 'none' }}
                  className="primary-input"
                  placeholder="Busque aqui"
                  aria-label="Busque aqui"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Row>
          </Col>
          <Col lg={12} className="px-3 d-flex flex-column gap-2">
            <Row className="d-flex">
              {responseData.map((data: any) => {
                return UserStorage.getIsFreelancerLocalStorage() ? (
                  <Col xs={12} md={6} lg={4} className="p-3">
                    <ServicesAvailableCard data={data} />
                  </Col>
                ) : (
                  <Col xs={12} md={6} lg={4} className="p-3">
                    <FreelancerProfileCard props={data} />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </Container >
    </section >
  );
}

export default Home
