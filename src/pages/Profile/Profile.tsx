import { Accordion, Card, Col, Container, Figure, Form, Modal, Row, useAccordionButton } from "react-bootstrap";
import './style.scss'
import { useEffect, useState } from "react";
import ServicesAvailableCard from "../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import FreelancerProfileCard from "../../shared/components/FreelancerProfileCard/FreelancerProfileCard";
import CardProfile from "./components/CardProfile/CardProfile";
import { OrderUpdate } from "../Order/OrderUpdate/OrderUpdate";
import { Portfólio } from "./components/Portfolio/Portfolio";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ProposalCard from "../../shared/components/ProposalCard/ProposalCard";
import { UserStorage } from "../../store/userStorage";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAPI } from "../../api/userApi";
import { OrdersAPI } from "../../api/ordersApi";
import CardProposta from "../Proposta/components/CardProposta/CardProposta";


function Profile() {
  const [show, setShow] = useState(false);
  const isFreelancer = UserStorage.getIsFreelancerLocalStorage()
  const [value, setValue] = useState('1');
  const [data, setData] = useState([])
  const [dataAccepted, setDataAccepted] = useState<any>([])
  const [dataRefused, setDataRefused] = useState<any>([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { getOrdersByUser } = OrdersAPI()
  const { getProposalsByUser } = UserAPI();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getOrders = () => {
    getOrdersByUser()
      .then((res) => {
        setData(res.data)
      })
  }

  const getProposals = () => {
    getProposalsByUser()
      .then((res) => {
        const acceptedList: any[] = []
        const refusedList: any = []

        setData(res.data)

        res.data.map((localData: any) => {
          localData.isAccepted && acceptedList.push(localData)
        })
        setDataAccepted(acceptedList)

        res.data.map((localData: any) => {
          localData.isRefused && refusedList.push(localData)
        })
        setDataAccepted(refusedList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (!isFreelancer) {
      getOrders()
    } else {
      getProposals();
    }
  }, [])

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex py-3">
          <Col lg={12}>
            <CardProfile />
          </Col>
          <Col lg={12}>
            <Box
              className="px-5 pb-4"
              sx={{
                backgroundColor: 'white',
                borderRadius: '0 0 16px 16px'
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label={isFreelancer ? "Propostas Pendentes" : "Pedidos Criados"} value="1" />
                    {isFreelancer && (<Tab label="Propostas Aceitas" value="2" />)}
                    {isFreelancer && (<Tab label="Propostas Recusadas" value="3" />)}
                  </TabList>
                </Box>
                <TabPanel value="1" className="px-0">
                  <Grid container spacing={4}>
                    {data.length > 0 && !isFreelancer &&
                      <Grid
                        container
                        item
                        justifyContent="flex-end"
                        alignItems="center"
                        xs={12}
                      >
                        <Link to='/create-order' className='primary-standart'>
                          faça um pedido
                        </Link>
                      </Grid>}
                    {data.length <= 0 ? (
                      <Grid
                        item
                        container
                        xs={12}
                        justifyContent="flex-end"
                        alignItems="center"
                        flexDirection="column"
                        gap={2}
                      >
                        <Typography variant="body2" className="f-22">
                          {!isFreelancer
                            ? "Você ainda não fez nenhum pedido."
                            : "Você ainda não fez nenhuma proposta"}
                        </Typography>
                        <Link to={!isFreelancer ? '/create-order' : '/home'} className='primary-standart'>
                          {!isFreelancer ? 'faça um pedido' : 'encontre um pedido'}
                        </Link>
                      </Grid>
                    ) : !isFreelancer ? (
                      data.map((localData: any) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <ServicesAvailableCard data={localData} />
                        </Grid>
                      ))
                    ) : (data.map((localData: any) => {
                      if (!localData.isAccepted && !localData.isRefused) {
                        return (
                          <Grid item xs={12} md={6} lg={4}>
                            <ProposalCard data={localData} />
                          </Grid>
                        )
                      }
                    })
                    )}
                  </Grid>
                </TabPanel>
                <TabPanel value="2" className="px-0">
                  <Grid container spacing={4}>
                    {dataAccepted.length <= 0 ? (
                      <Grid
                        item
                        container
                        xs={12}
                        justifyContent="flex-end"
                        alignItems="center"
                        flexDirection="column"
                        gap={2}
                      >
                        <Typography variant="body2" className="f-22">
                          Você ainda não tem nenhuma proposta aceita
                        </Typography>
                        <Link to={'/home'} className='primary-standart'>
                          Faça Proposta!
                        </Link>
                      </Grid>
                    ) : isFreelancer && (
                      dataAccepted.map((localData: any) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <ProposalCard data={localData} />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </TabPanel>
                <TabPanel value="3" className="px-0">
                  <Grid container spacing={4}>
                    {dataRefused.length <= 0 ? (
                      <Grid
                        item
                        container
                        xs={12}
                        justifyContent="flex-end"
                        alignItems="center"
                        flexDirection="column"
                        gap={2}
                      >
                        <Typography variant="body2" className="f-22">
                          Nenhuma proposta recusada, continue assim! :)
                        </Typography>
                      </Grid>
                    ) : isFreelancer && (
                      dataRefused.map((localData: any) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <ProposalCard data={localData} />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </TabPanel>
              </TabContext>
            </Box>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Projeto ao Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Portfólio />
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Profile
