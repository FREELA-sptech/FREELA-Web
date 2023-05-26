import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { OrdersAPI } from "../../../../../api/ordersApi";
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Fab, Grid, InputAdornment, MobileStepper, Skeleton, TextField, Typography, useTheme } from '@mui/material';
import HtmlTooltip from "../../../../../shared/tools/MuiTooltipCustom";
import useSnackbar from "../../../../../hooks/useSnackbar";
import { InterestForm } from "../../../../../shared/components/InterestForm/InterestForm";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { File } from "../../../../../shared/components/File/File";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Figure, Modal } from "react-bootstrap";
import { UserStorage } from "../../../../../store/userStorage";
import AddIcon from '@mui/icons-material/Add';
import CardProposta from "../../../../Proposta/components/CardProposta/CardProposta";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function HeaderOrder(props: any) {
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const { id } = params;
  const { editOrder, deleteOrder, updateOrderById } = OrdersAPI();

  const [orderEditDetails, setOrderEditDetails] = useState<any>({})
  const [orderEditErrorDetails, setOrderEditErrorDetails] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [disableInputs, setDisableInputs] = useState(false)
  const [editing, setEditing] = useState(false)
  const [SnackbarComponent, showSnackbar] = useSnackbar();
  const [order, setOrder] = useState<any>()
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleClose = () => setIsLoading(false);
  const handleCloseModal = () => setShow(false);
  const handleShow = () => setIsLoading(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    step < order.photos.length && setActiveStep(step);
  };

  const updateOrderData = (order: any) => {
    const initalEditingValues = {
      title: order.title,
      description: order.description,
      subCategoryId: order.subCategories,
      maxValue: order.maxValue,
      expirationTime: order.expirationTime,
      photos: order.photos
    }
    setOrderEditDetails(initalEditingValues)
  }

  useEffect(() => {
    editOrder(id)
      .then((res) => {
        setOrder(res.data);
        props.setProposals(res.data.proposals)
        updateOrderData(res.data);
      })
      .catch((error) => {
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])


  const setField = (field: any, value: any) => {
    setOrderEditDetails({
      ...orderEditDetails, [field]: value
    })

    if (!!orderEditErrorDetails[field]) {
      setOrderEditErrorDetails({
        ...orderEditErrorDetails, [field]: null
      })
    }
  }

  const handleEdit = () => {
    setDisableInputs(true)
    setEditing(true)
  }

  const handleCloseEdit = () => {
    setEditing(false)
  }

  const handleSendEdit = () => {
    const isArrayOfNumbers = orderEditDetails.subCategoryId.every(
      (element: any) => typeof element === "number"
    );

    if (!isArrayOfNumbers) {
      orderEditDetails.subCategoryId = orderEditDetails.subCategoryId.map((value: any) => {
        return value.id
      })
    }

    updateOrderById(id, orderEditDetails)
      .then((res) => {
        setOrder(res.data);
        props.setProposals(res.data.proposals)
        updateOrderData(res.data);
        setEditing(false)
      })
      .catch((error) => {
      })
  }

  const handleDeleteOrder = () => {
    deleteOrder(id)
      .then((res) => {
        navigate("/home")
      })
      .catch((e) => {
      })
  }

  const handleDelete = (name: any) => {
    setField("photos", orderEditDetails.photos.filter((file: any) => file !== name));
    //setOrderEditDetails(orderEditDetails.photos.filter((file: any) => file !== name));
  }

  const handleUpload = (event: any) => {
    const files = Array.from(event.target.files);

    const newFiles: any[] = uploadedFiles || []
    const newPhotos: any[] = orderEditDetails.photos || []

    files.forEach((fileData: any) => {
      if (fileData) {
        const reader = new FileReader();
        const readerUrl = new FileReader();

        reader.onloadend = () => {
          !orderEditDetails.photos.includes(fileData) && newPhotos.push(fileData)
          setField("photos", newPhotos);
        };

        readerUrl.onloadend = () => {
          const fileObject = {
            name: fileData.name,
            data: readerUrl.result,
          };

          !uploadedFiles.includes(fileObject) && newFiles.push(fileObject)
          setOrderEditDetails(newFiles);
        }

        reader.readAsArrayBuffer(fileData);
        readerUrl.readAsDataURL(fileData);
      }
    });
  }

  return (
    <Grid container className="pt-4 px-0 d-flex gap-3" maxWidth={"100%"} position={"relative"}>
      {!editing ?
        order && order.user.id === UserStorage.getIdUserLocalStorage() ?
          <Box
            className="position-absolute"
            sx={{
              right: 0,
              cursor: 'pointer'
            }}
          >
            <EditIcon onClick={handleEdit} className="me-2" />
            <DeleteIcon color='error' onClick={handleDeleteOrder} />
          </Box> :
          <Box
            className="position-absolute"
            sx={{
              right: 0,
              cursor: 'pointer'
            }}
          >
            <button onClick={() => {setShow(true)}} className="primary-standart w-auto">enviar proposta</button>
          </Box>
        :
        <Box
          className="position-absolute"
          sx={{
            right: 0,
            cursor: 'pointer'
          }}
        >
          <ClearIcon onClick={handleCloseEdit} sx={{ fontSize: '30px', marginRight: '5px' }} color="error" />
          <DoneIcon onClick={handleSendEdit} sx={{ fontSize: '30px' }} color="success" />
        </Box>
      }
      <Grid item xs={12} className="p-0 mb-5">
        <h1 className="title">Detalhes um Pedido</h1>
      </Grid>
      <Grid item md={5} xs={12} className="p-0 mb-5">
        {orderEditDetails.photos &&
          <Box className="d-flex flex-column" sx={{ maxWidth: "100%", height: '100%', minHeight: '300px', flexGrow: 1, position: 'relative' }}>
            {editing &&
              <Fab
                component="label"
                className="position-absolute"
                size="small"
                color="primary"
                aria-label="add"
                sx={{
                  top: '10px',
                  left: '10px',
                  zIndex: 2
                }}
              >
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleUpload}
                />
                <AddIcon />
              </Fab>}
            <Box style={{
              position: 'absolute',
              width: '100%',
              height: 'calc(100% - 50px)',
              display: orderEditDetails.photos.length > 0 ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 6
            }}>
              <img
                style={{ height: 100, width: 100 }}
                src="/assets/images/no-picture.png"
                alt="Sem Foto" />
              <Typography>
                Nenhuma Foto Adicionada
              </Typography>
            </Box>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              style={{
                height: 'auto',
                flexGrow: 1,
                position: 'relative'
              }}
            >
              {orderEditDetails.photos.map((step: any, index: any) => (
                <div key={step} style={{ height: '100%', backgroundColor: 'var(--background-color)' }}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
                      {editing &&
                        <DeleteIcon
                          color='error'
                          className='position-absolute'
                          sx={{
                            right: 10,
                            top: 10,
                            height: 40,
                            width: 40,
                            cursor: 'pointer'
                          }}
                          onClick={() => { handleDelete(step) }}
                        />}
                      <Box
                        component="img"
                        sx={{
                          maxHeight: "100%",
                          display: 'block',
                          maxWidth: "100%",
                          overflow: 'hidden'
                        }}
                        src={`data:image/png;base64,${step}`}
                        alt={step}
                      />
                    </Box>
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              sx={{
                height: 50,
              }}
              steps={orderEditDetails.photos.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === orderEditDetails.photos.length - 1 || orderEditDetails.photos.length == 0}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        }
      </Grid>
      {editing ?
        <Grid item lg={5}md={7} xs={12} className="ps-0 mb-3">
          <Grid item xs={12} className="p-0 mb-3">
            <Typography variant="body2" className="f-12">
              Titulo:
            </Typography>
            <TextField
              error={!!orderEditErrorDetails.title}
              id="title"
              name="title"
              fullWidth
              value={orderEditDetails.title}
              autoComplete="given-name"
              variant="standard"
              helperText={
                orderEditErrorDetails.title
                  ? (
                    <Typography variant="body2" className="f-14">
                      {orderEditErrorDetails.title || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("title", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className="p-0 mb-3">
            <Typography variant="body2" className="f-12">
              Descrição:
            </Typography>
            <TextField
              error={!!orderEditErrorDetails.description}
              id="description"
              name="description"
              fullWidth
              value={orderEditDetails.description}
              variant="outlined"
              helperText={
                orderEditErrorDetails.description
                  ? (
                    <Typography variant="body2" className="f-14">
                      {orderEditErrorDetails.description || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("description", e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid container item xs={12} className="p-0 mb-3">
            <Grid item xs={6} className="p-0 pe-2 mb-3">
              <Typography variant="body2" className="f-12">
                Preço:
              </Typography>
              <TextField
                error={!!orderEditErrorDetails.maxValue}
                id="maxValue"
                name="maxValue"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                value={orderEditDetails.maxValue}
                autoComplete="given-name"
                variant="standard"
                helperText={
                  orderEditErrorDetails.maxValue
                    ? (
                      <Typography variant="body2" className="f-14">
                        {orderEditErrorDetails.maxValue || " "}
                      </Typography>
                    )
                    : " "
                }
                onChange={(e) => setField("maxValue", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className="p-0 ps-2 mb-3">
              <Typography variant="body2" className="f-12">
                Prazo Dias:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  fullWidth
                  variant="standard"
                  value={orderEditDetails.expirationTime}
                  onChange={() => { }}
                  className="p-0"
                  slotProps={{
                    textField: {
                      helperText: orderEditErrorDetails.expirationTime ? (
                        <Typography variant="body2" className="f-14">
                          {orderEditErrorDetails.expirationTime}
                        </Typography>
                      ) : null
                    }
                  }}
                  format="DD"
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
        :
        order &&
        <Grid item lg={5} md={7} xs={12} className="ps-0 mb-3">
          <Grid item xs={12} className="p-0 mb-2">
            <span className="f-30 f-inter dark-contrast-color fw-bold">{order.title}</span>
          </Grid>
          <Grid item xs={12} className="p-0 mb-3">
            <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  bgcolor: "#274C77",
                }}
                alt={order.user.name}
                src={`data:image/png;base64,${order.user.profilePhoto}`}
              />
              <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span className="text-color fw-bold f-18 f-inter">{order.user.name}</span>
                  <Figure className="d-flex align-items-center m-0">
                    <Figure.Image
                      width='13px'
                      height='13px'
                      alt="dollar"
                      src="/assets/icons/star.svg"
                      className="m-0"
                    />
                    <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                      {order.user.rate}
                    </Figure.Caption>
                  </Figure>
                </div>
              </Figure.Caption>
            </Figure>
          </Grid>
          <Grid item xs={12} className="p-0 mb-3">
            <span className="py-3 f-poppings aditional-color f-16">
              "{order.description}"
            </span>
          </Grid>
          <Grid container item xs={12} className="p-0 mb-3">
            <Grid item xs={6} className="p-0 pe-2 mb-3">
              <Figure className="d-flex align-items-center gap-2 w-auto m-0">
                <Figure.Image
                  width='30px'
                  height='30px'
                  alt="calendario"
                  src="/assets/icons/calendar.svg"
                  className="m-0"
                />
                <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                  Orçamento:
                  <span className="f-roboto f-18 text-color fw-bold">{
                    order.maxValue.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </Figure.Caption>
              </Figure>
            </Grid>
            <Grid item xs={6} className="p-0 ps-2 mb-3">
              <Figure className="d-flex align-items-center gap-2 w-auto m-0">
                <Figure.Image
                  width='30px'
                  height='30px'
                  alt="calendario"
                  src="/assets/icons/calendar.svg"
                  className="m-0"
                />
                <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                  Prazo:
                  <span className="f-roboto f-18 text-color fw-bold">
                    {order.expirationTime}
                  </span>
                </Figure.Caption>
              </Figure>
            </Grid>
          </Grid>
          <Grid container item xs={12} className="p-0 mb-3">
            <Grid item xs={12} className="p-0 pe-2 mb-3">
              <h1 className="text-color f-18 f-inter fw-bold mt-2">Categorias</h1>
            </Grid>
            <Grid item xs={12} className="p-0 mb-3">
              <Box className="w-auto d-flex gap-2 ps-0">
                {order.subCategories.map((categories: any) => (
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
                        src={`data:image/png;base64,`}
                      />
                    </Box>
                  </HtmlTooltip>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      }
      {editing &&
        <Grid item xs={12} className="p-0 mb-3">
          <InterestForm formData={orderEditDetails} setFormData={setOrderEditDetails} errors={orderEditErrorDetails} setErrors={setOrderEditDetails} />
        </Grid>}
      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="f-inter f-22">Envie uma Proposta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardProposta handleCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </Grid>
  )
}


export default HeaderOrder
