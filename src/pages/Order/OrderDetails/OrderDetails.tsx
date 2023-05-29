import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { OrdersAPI } from "../../../api/ordersApi";
import { Avatar, Backdrop, Box, Breadcrumbs, Button, CircularProgress, Grid, MobileStepper, Skeleton, Tab, TextField, Typography, useTheme } from '@mui/material';
import HtmlTooltip from "../../../shared/tools/MuiTooltipCustom";
import useSnackbar from "../../../hooks/useSnackbar";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ServicesAvailableCard from "../../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import { Col, Row, Container, Modal } from "react-bootstrap";
import ProposalCard from "../../../shared/components/ProposalCard/ProposalCard";
import OrderDetailsCard from "./components/OrderDetailsCard/OrderDetailsCard";
import CardProposta from "../../Proposta/components/CardProposta/CardProposta";
import OrderEditCard from "./components/OrderEditCard/OrderEditCard";
import SnackbarContext from "../../../hooks/useSnackbar";

function OrderDetails() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [data, setData] = useState<any>()
  const [editingOrder, setEditingOrder] = useState(false)
  const [value, setValue] = useState('1');
  const { detailsOrder, deleteOrder, updateOrderById, updatePictures } = OrdersAPI();
  const [showSendProposalsModal, setShowSendProposalsModal] = useState(false)
  const { showSnackbar } = useContext(SnackbarContext);
  const [proposals, setProposals] = useState()
  const [dataAccepted, setDataAccepted] = useState<any>([])
  const [dataRefused, setDataRefused] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState({
    description: '',
    proposalValue: '',
    expirationTime: ''
  });

  const handleShowEditOrder = () => setEditingOrder(true)
  const handleHiddenEditOrder = () => setEditingOrder(false)
  const handleShowSendProposalsModal = () => setShowSendProposalsModal(true)
  const handleHiddenSendProposalsModal = () => setShowSendProposalsModal(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const convertTime = (date: string) => {
    const newTime = new Date(date);
    const yyyy = newTime.getFullYear();
    let mm: any = newTime.getMonth() + 1;
    let dd: any = newTime.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    return formattedToday
  }

  const updateValues = (newValues: any) => {
    setData({ ...newValues, expirationTime: convertTime(newValues.expirationTime) })
    const date = new Date(newValues.expirationTime);
    setFormData({
      description: newValues.description,
      title: newValues.title,
      maxValue: newValues.maxValue,
      subCategoriesIds: newValues.subCategories,
      expirationTime: newValues.expirationTime,
      photos: newValues.photos,
      newPhotos: [],
      deletedPhotos: []
    })
    setProposals(newValues.proposals)

    const acceptedList: any[] = []
    const refusedList: any = []

    newValues.proposals.map((localData: any) => {
      localData.isAccepted && acceptedList.push(localData)
    })
    setDataAccepted(acceptedList)

    newValues.proposals.map((localData: any) => {
      localData.isRefused && refusedList.push(localData)
    })
    setDataRefused(refusedList)
  }

  const handleGetOrderDetails = () => {
    detailsOrder(id)
      .then((res) => {
        updateValues(res.data)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para trazer os detalhes da ordem!")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDeleteOrder = () => {
    deleteOrder(id)
      .then((res) => {
        showSnackbar(false, "Ordem deletada com sucesso!")
        navigate("/perfil")
      })
      .catch((e) => {
        showSnackbar(true, "Problemas para deletar ordem, Tente Novamente!")
      })
  }

  const handleUpdateOrder = () => {
    const isArrayOfNumbers = formData.subCategoriesIds.every(
      (element: any) => typeof element === "number"
    );

    if (!isArrayOfNumbers) {
      formData.subCategoriesIds = formData.subCategoriesIds.map((value: any) => {
        return value.id
      })
    }

    const newFormData = new FormData()

    formData.newPhotos.forEach((file) => {
      newFormData.append("newPhotos", file);
    });

    formData.deletedPhotos.forEach((file) => {
      newFormData.append("deletedPhotos", file);
    });

    updateOrderById(id, formData)
      .then(() => {
        updatePictures(newFormData, id)
          .then((res) => {
            updateValues(res.data)
            handleHiddenEditOrder()
            showSnackbar(false, "Pedido editado com sucesso!")
          })
      })
      .catch((error) => {
        showSnackbar(true, "Problemas para editar o pedido!")
      })
  }

  useEffect(() => {
    handleGetOrderDetails()
  }, [id])

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex px-3"
          style={{
            backgroundColor: 'white',
            borderRadius: '16px 16px'
          }}>
          <Col lg={12}>
            {!editingOrder ? (
              data &&
              <OrderDetailsCard
                user={data.user}
                handleShowEditOrder={handleShowEditOrder}
                handleDeleteOrder={handleDeleteOrder}
                handleShowSendProposalsModal={handleShowSendProposalsModal}
                data={data} />
            ) : (
              data &&
              <OrderEditCard
                handleHiddenEditOrder={handleHiddenEditOrder}
                handleUpdateOrder={handleUpdateOrder}
                setFormData={setFormData}
                setErrors={setErrors}
                formData={formData}
                errors={errors}
              />
            )}
          </Col>
          <Grid container lg={12} className="pb-4" flexDirection="column">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label={"Propostas Recebidas"} value="1" />
                  <Tab label="Proposta Aceita" value="2" />
                  <Tab label="Propostas Recusadas" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" className="px-0">
                <Grid container spacing={4} xs={12}>
                  {proposals && proposals.length > 0 ?
                    proposals.map((localData: any) => (
                      <Grid item xs={12} md={6} lg={3} key={localData.id}>
                        <ProposalCard data={localData} />
                      </Grid>)
                    ) : (
                      <Grid
                        item
                        container
                        xs={12}
                        justifyContent="flex-end"
                        alignItems="center"
                        flexDirection="column"
                        gap={2}
                      >
                        <Typography variant="body2" className="f-22 pt-4">
                          Você ainda não possui nenhuma proposta
                        </Typography>
                      </Grid>
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
                        Você ainda não aceitou nenhuma proposta!
                      </Typography>
                    </Grid>
                  ) : (
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
                  ) : (
                    dataRefused.map((localData: any) => (
                      <Grid item xs={12} md={6} lg={4}>
                        <ProposalCard data={localData} />
                      </Grid>
                    ))
                  )}
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
        </Row>
        <Modal
          show={showSendProposalsModal}
          onHide={handleHiddenSendProposalsModal}
          backdrop="static"
          size="lg"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="f-inter f-22">Envie uma Proposta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CardProposta handleCloseModal={handleHiddenSendProposalsModal} />
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  )


}


export default OrderDetails;
