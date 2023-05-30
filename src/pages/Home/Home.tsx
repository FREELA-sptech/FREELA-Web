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
import { CircularProgress, Typography } from "@mui/material";

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [responseData, setResponseData] = useState([])
  const [freelancerData, setFreelancerData] = useState([])
  const { getOrders, findByTitle, getAllOrders } = OrdersAPI()
  const { getFreelancersByInterests } = UserAPI()
  const [filter, setFilter] = useState("interest");
  const [message, setMessage] = useState("");
  const items = [];

  const handleClose = () => setShowModal(false)
  const handleOpen = () => setShowModal(true)
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (UserStorage.getIsFreelancerLocalStorage()) {
      getOrders()
        .then((res: any) => {
          setResponseData(res.data)
        }).finally(() => {
          setIsLoading(false)
        })
    } else {
      getFreelancersByInterests()
        .then((res: any) => {
          setFreelancerData(res.data)
        }).finally(() => {
          setIsLoading(false)
        })
    }
  }, [])

  const handleFilterByText = (text: string) => {
    setSearchTerm(text)
  }

  const filteredItems = responseData && responseData.filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFreelancer = freelancerData && freelancerData.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSelectDataByInterest = (type: string) => {
    setFilter(type)
    if (type == "interest") {
      return getOrders()
        .then((response: any) => {
          setResponseData(response.data)
          if (response.data.length <= 0) {
            setMessage("Nenhuma ordem disponível")
          }
        }).finally(() => {
          setIsLoading(false)
        })
    } else {
      return getAllOrders()
        .then((res: any) => {
          setResponseData(res.data)
          if (res.data.length <= 0) {
            setMessage("Nenhuma ordem disponível")
          }
        }).finally(() => {
          setIsLoading(false)
        })
    }
  }

  console.log(filteredFreelancer, ' filteredFreelancer')

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex">
          <Row className="pt-3 pb-3 d-flex">
            <h1 className="d-flex flex-column w-auto text-uppercase f-roboto dark-contrast-color fw-bold f-30">
              {UserStorage.getIsFreelancerLocalStorage() ? 'projetos disponíveis' : 'profissionais disponíveis'}
            </h1>
          </Row>
          <Modal className="d-block w-100 h-100" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ordenar por:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FiltersCard handleSelectDataByInterest={handleSelectDataByInterest} />
            </Modal.Body>
          </Modal>
          <Col lg={12}>
            <Row className="px-lg-3 px-0 d-flex gap-2">
              <Figure style={{ cursor: "pointer" }} onClick={handleOpen} className="home-icon-background d-flex justify-content-center align-items-center">
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
                  onChange={(e) => handleFilterByText(e.target.value)}
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
              {filteredFreelancer.length <= 0 && filteredItems.length <= 0 && (
                <Col xs={12} className="d-flex justify-content-center pt-2">
                  <Typography variant="body2" className="f-22">
                    Nenhum resultado para a busca
                  </Typography>
                </Col>
              )}

              {!UserStorage.getIsFreelancerLocalStorage() &&
                filteredFreelancer.map((data: any) => (
                  <Col xs={12} md={6} lg={4} className="p-3">
                    <FreelancerProfileCard data={data} />
                  </Col>
                ))}

              {UserStorage.getIsFreelancerLocalStorage() &&
                filteredFreelancer.map((data: any) => (
                  <Col xs={12} md={6} lg={4} className="p-3">
                    <ServicesAvailableCard data={data} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container >
    </section >
  );
}

export default Home
