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
import { Box, CircularProgress, Grid, InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material";

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [responseData, setResponseData] = useState([])
  const [freelancerData, setFreelancerData] = useState([])
  const { getOrders, findByTitle, getAllOrders } = OrdersAPI()
  const { getFreelancersByInterests } = UserAPI()
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const items = [];
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(true)

  const handleClose = () => setShowModal(false)
  const handleOpen = () => setShowModal(true)
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (UserStorage.getIsFreelancerLocalStorage()) {
      getOrders("all")
        .then((res: any) => {
          setResponseData(res.data)
        }).finally(() => {
          setIsLoading(false)
          setIsLoadingOrder(false)
        })
    } else {
      getFreelancersByInterests()
        .then((res: any) => {
          setFreelancerData(res.data)
        }).finally(() => {
          setIsLoading(false)
          setIsLoadingOrder(false)
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
    getOrders(type)
      .then((res: any) => {
        setResponseData(res.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }


  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex">
          <Row className="pt-3 pb-3 d-flex">
            <h1 className="d-flex flex-column w-auto text-uppercase f-roboto dark-contrast-color fw-bold f-30">
              {UserStorage.getIsFreelancerLocalStorage() ? 'projetos disponíveis' : 'profissionais disponíveis'}
            </h1>
          </Row>

          <Col lg={12}>
            <Row className="px-lg-3 px-0 d-flex gap-2">
              <InputGroup className="p-0 primary-input w-auto flex-grow-1 mb-3">
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
              {UserStorage.getIsFreelancerLocalStorage() &&
                <Col xs={12} className="w-100 justify-content-end d-flex flex-column py-2">
                  <Box className="w-25">
                    <InputLabel id="demo-simple-select-helper-label">Ordernar por:</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={filter}
                      className="w-100"
                      onChange={(e) => handleSelectDataByInterest(e.target.value)}
                    >
                      <MenuItem value={"all"}>Relevância</MenuItem>
                      <MenuItem value={"mais-barato"}>Menor Preço</MenuItem>
                      <MenuItem value={"mais-caro"}>Maior Preço</MenuItem>
                    </Select>
                  </Box>
                </Col>}

              {filteredFreelancer.length <= 0 && filteredItems.length <= 0 && !isLoadingOrder && (
                <Col xs={12} className="d-flex justify-content-center pt-2">
                  <Typography variant="body2" className="f-22">
                    Nenhum resultado para a busca
                  </Typography>
                </Col>
              )}

              {!UserStorage.getIsFreelancerLocalStorage() && (
                isLoadingOrder ? (
                  [1, 2, 3].map(() => (
                    <Col xs={12} md={6} lg={4} className="p-3">
                      <Skeleton className="b-radius" sx={{ height: "250px" }} animation="wave" variant="rectangular" />
                    </Col>
                  ))
                ) : (
                  filteredFreelancer.map((data: any) => (
                    <Col key={data.id} xs={12} md={6} lg={4} className="p-3">
                      <FreelancerProfileCard data={data} />
                    </Col>
                  ))
                )
              )}


              {UserStorage.getIsFreelancerLocalStorage() && (
                isLoadingOrder ? (
                  [1, 2, 3].map(() => (
                    <Col xs={12} md={6} lg={4} className="p-3">
                      <Skeleton className="b-radius" sx={{ height: "400px" }} animation="wave" variant="rectangular" />
                    </Col>
                  ))
                ) : (
                  filteredItems.map((data: any) => (
                    <Col xs={12} md={6} lg={4} className="p-3">
                      <ServicesAvailableCard data={data} />
                    </Col>
                  ))
                )
              )}
            </Row>
          </Col>
        </Row>
      </Container >
    </section >
  );
}

export default Home
