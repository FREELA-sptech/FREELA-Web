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
import { UserStorage } from "../../../store/userStorage";
import { notBlank } from "../../../shared/scripts/validators";
import dayjs from "dayjs";

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
  const [proposals, setProposals] = useState<any[]>()
  const [dataAccepted, setDataAccepted] = useState<any>([])
  const [dataRefused, setDataRefused] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState({
    description: '',
    value: '',
    deadline: ''
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

  const validateFormInfo = () => {
    const { title, description, deadline, value } = formData;
    const newErros = {
      title: '',
      description: '',
      subCategoriesIds: '',
      value: '',
      deadline: '',
      photo: ''
    }

    if (notBlank(title)) {
      newErros.title = "O campo titulo não pode estar vazio";
    }
    if (notBlank(description)) {
      newErros.description = "O campo descrição não pode estar vazio";
    } else if (description.length < 30) {
      newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
    }

    if (notBlank(value)) {
      newErros.value = "O campo valor máximo não pode estar vazio";
    } else if (Number(value) <= 0) {
      newErros.value = "O campo valor máximo não pode ser negativo ou 0";
    }

    if (notBlank(deadline)) {
      newErros.deadline = "O prazo não pode estar vazio";
    } else if (Number(deadline) <= 0) {
      newErros.deadline = "O prazo não pode ser menor ou igual a zero";
    } else if (dayjs(deadline).isBefore(dayjs(), 'day')) {
      newErros.deadline = "A data de expiração deve ser a partir de hoje";
    }

    return newErros;
  }

  const updateValues = (newValues: any) => {
    setData({ ...newValues, deadline: convertTime(newValues.deadline) })
    const date = new Date(newValues.deadline);
    setFormData({
      description: newValues.description,
      title: newValues.title,
      value: newValues.value,
      subCategoriesIds: newValues.subCategories,
      deadline: newValues.deadline,
      photos: newValues.photos,
      newPhotos: [],
      deletedPhotos: []
    })

    const acceptedList: any[] = []
    const refusedList: any = []
    const pedingList: any[] = []

    newValues.proposals.map((localData: any) => {
      localData.status == "ACCEPTED" && acceptedList.push(localData)
    })
    setDataAccepted(acceptedList)

    newValues.proposals.map((localData: any) => {
      localData.status == "REFUSED" && refusedList.push(localData)
    })
    setDataRefused(refusedList)

    newValues.proposals.map((localData: any) => {
      localData.status == "OPEN" && pedingList.push(localData)
    })
    setProposals(pedingList)
  }

  const handleGetOrderDetails = () => {
    detailsOrder(Number(id))
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
    deleteOrder(Number(id))
      .then((res) => {
        showSnackbar(false, "Ordem deletada com sucesso!")
        navigate("/perfil")
      })
      .catch((e) => {
        showSnackbar(true, "Problemas para deletar ordem, Tente Novamente!")
      })
  }

  const handleUpdateOrder = () => {
    const errors = validateFormInfo();

    const valores = Object.values(errors);
    const errorsValues = valores.every(valor => valor === "");
    if (errorsValues) {
      const isArrayOfNumbers = formData.subCategoriesIds.every(
        (element: any) => typeof element === "number"
      );

      if (!isArrayOfNumbers) {
        formData.subCategoriesIds = formData.subCategoriesIds.map((value: any) => {
          return value.id
        })
      }

      const newFormData = new FormData()

      formData.newPhotos.forEach((file: any) => {
        newFormData.append("newPhotos", file);
      });

      newFormData.append("updateOrderRequest", JSON.stringify(formData));

      updateOrderById(Number(id), newFormData)
        .then((res) => {
            updateValues(res.data)
            handleHiddenEditOrder()
            showSnackbar(false, "Pedido editado com sucesso!")
        })
        .catch((error) => {
          showSnackbar(true, "Problemas para editar o pedido!")
        })
    } else {
      setErrors(errors)
    }
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
          {data && data.user.id == UserStorage.getIdUserLocalStorage() &&
            <Grid container lg={12} className="pb-4" flexDirection="column">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    {data && !data.accepted && <Tab label={"Propostas Recebidas"} value="1" />}
                    <Tab label="Proposta Aceita" value="2" />
                    {data && !data.accepted && <Tab label="Propostas Recusadas" value="3" />}
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
            </Grid>}
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
