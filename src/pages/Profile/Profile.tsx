import { Accordion, Card, Col, Container, Figure, Form, Modal, Row, useAccordionButton, Button } from "react-bootstrap";
import './style.scss'
import { useContext, useEffect, useState } from "react";
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
import { Grid, Skeleton, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { UserAPI } from "../../api/userApi";
import { OrdersAPI } from "../../api/ordersApi";
import CardProposta from "../Proposta/components/CardProposta/CardProposta";
import SnackbarContext from "../../hooks/useSnackbar";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownload from "@mui/icons-material/FileDownload";

function Profile() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('1');
  const [data, setData] = useState<any[]>([])
  const [dataAccepted, setDataAccepted] = useState<any>([])
  const [dataRefused, setDataRefused] = useState<any>([])
  const { showSnackbar } = useContext(SnackbarContext);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { getOrdersByUser, getOrdersByUserId, extract } = OrdersAPI()
  const { getProposalsByUser, getProposalsByUserId } = UserAPI();
  const hideDetails = Boolean(id)
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getOrders = () => {
    getOrdersByUser()
      .then((res) => {
        const acceptedList: any[] = []
        const pedingList: any[] = []

        res.data.map((localData: any) => {
          localData.status == "ACCEPTED" && acceptedList.push(localData)
        })
        setDataAccepted(acceptedList)

        res.data.map((localData: any) => {
          localData.status == "OPEN" && pedingList.push(localData)
        })
        setData(pedingList)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para trazer as ordens!")
        setIsLoadingOrder(false)
      })
      .finally(() => setIsLoadingOrder(false))
  }

  const getOrdersById = () => {
    getOrdersByUserId(Number(id))
      .then((res) => {
        const acceptedList: any[] = []
        const pedingList: any[] = []

        res.data.map((localData: any) => {
          localData.accepted && acceptedList.push(localData)
        })
        setDataAccepted(acceptedList)

        res.data.map((localData: any) => {
          !localData.accepted && pedingList.push(localData)
        })
        setData(pedingList)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para trazer as ordens!")
      })
  }

  const getProposals = () => {
    getProposalsByUser()
      .then((res) => {
        const acceptedList: any[] = []
        const refusedList: any[] = []
        const pedingList: any[] = []

        res.data.map((localData: any) => {
          localData.status == "ACCEPTED" && acceptedList.push(localData)
        })
        setDataAccepted(acceptedList)

        res.data.map((localData: any) => {
          localData.status == "REFUSED" && refusedList.push(localData)
        })
        setDataRefused(refusedList)

        res.data.map((localData: any) => {
          localData.status == "OPEN" && pedingList.push(localData)
        })
        setData(pedingList)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para trazer as propostas!")
        setIsLoadingOrder(false)
      })
      .finally(() => setIsLoadingOrder(false))
  }

  const getProposalsById = () => {
    getProposalsByUserId(Number(id))
      .then((res) => {
        const acceptedList: any[] = []
        const refusedList: any[] = []
        const pedingList: any[] = []

        res.data.map((localData: any) => {
          localData.isAccepted && acceptedList.push(localData)
        })
        setDataAccepted(acceptedList)

        res.data.map((localData: any) => {
          localData.isRefused && refusedList.push(localData)
        })
        setDataRefused(refusedList)

        res.data.map((localData: any) => {
          !localData.isRefused && !localData.isAccepted && pedingList.push(localData)
        })
        setData(pedingList)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para trazer as propostas!")

      })
  }

  const handleGetExtract = () => {
    extract()
      .then((res) => {
        const blob = new Blob([res.data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'arquivo.txt');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => {
        showSnackbar(true, "Problemas para baixar o txt!")
      })
  }

  useEffect(() => {
    if (!UserStorage.getIsFreelancerLocalStorage()) {
      !hideDetails && getOrders()
    } else {
      !hideDetails && getProposals()
    }
  }, [])

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex py-3">
          <Col lg={12}>
            <CardProfile isFreelancer={isFreelancer} setIsFreelancer={setIsFreelancer} userId={id} />
          </Col>
          <Col lg={12} className="position-relative">
            <Box
              className="px-5 pb-4"
              sx={{
                backgroundColor: 'white',
                borderRadius: '0 0 16px 16px'
              }}
            >
              {!id && <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label={isFreelancer ? "Propostas Pendentes" : "Pedidos Pendentes"} value="1" />
                    <Tab label={isFreelancer ? "Propostas Aceitas" : "Pedidos Aceitos"} value="2" />
                    {isFreelancer && (<Tab label="Propostas Recusadas" value="3" />)}
                  </TabList>
                </Box>
                <TabPanel value="1" className="px-0">
                  <Grid item xs={12} container justifyContent="space-between" className="pb-4">
                    <Link to={!isFreelancer ? '/create-order' : '/home'} className='primary-standart d-flex align-items-center'>
                      {!isFreelancer ? 'faça um pedido' : 'encontre um pedido'}
                    </Link>
                  </Grid>
                  <Grid container spacing={4}>
                    {isLoadingOrder ? (
                      [1,2,3].map(() => (
                        <Grid item xs={12} md={6} lg={4}>
                          {isFreelancer ? (
                            <Skeleton className="b-radius" sx={{ height: "250px" }} animation="wave" variant="rectangular" />
                          ) : (
                            <Skeleton className="b-radius" sx={{ height: "400px" }} animation="wave" variant="rectangular" />
                          )}
                        </Grid>
                      ))
                    ) : data.length <= 0 ? (
                      <Grid
                        item
                        container
                        xs={12}
                        justifyContent="flex-end"
                        alignItems="center"
                        flexDirection="column"
                        gap={2}
                      >
                        <Typography variant="body2" className="pt-3 f-22">
                          {!isFreelancer
                            ? "Você ainda não fez nenhum pedido."
                            : "Você ainda não fez nenhuma proposta"}
                        </Typography>
                      </Grid>
                    ) : !isFreelancer ? (
                      data.map((localData: any) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <ServicesAvailableCard data={localData} />
                        </Grid>
                      ))
                    ) : (data.map((localData: any) => (
                      <Grid item xs={12} md={6} lg={4}>
                        <ProposalCard data={localData} />
                      </Grid>
                    )))}
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
                          {isFreelancer ?
                            "Você ainda não tem nenhuma proposta aceita" :
                            "Você ainda não aceitou nenhum pedido"}
                        </Typography>
                        {isFreelancer &&
                          <Link to={'/home'} className='primary-standart'>
                            Faça Proposta!
                          </Link>}
                      </Grid>
                    ) : isFreelancer ? (
                      dataAccepted.map((localData: any) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <ProposalCard data={localData} />
                        </Grid>
                      ))
                    ) : (
                      dataAccepted.map((localData: any) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <ServicesAvailableCard data={localData} />
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
              </TabContext>}
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
