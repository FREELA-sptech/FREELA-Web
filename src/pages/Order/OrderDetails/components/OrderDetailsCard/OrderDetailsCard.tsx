import "./style.scss";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { OrdersAPI } from "../../../../../api/ordersApi";
import { Avatar, AvatarGroup, Backdrop, Box, Button, CircularProgress, Container, Fab, Grid, InputAdornment, MobileStepper, Skeleton, TextField, Typography, useTheme } from '@mui/material';
import HtmlTooltip from "../../../../../shared/tools/MuiTooltipCustom";
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
import SnackbarContext from "../../../../../hooks/useSnackbar";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export type Props = {
  user: any
  handleShowEditOrder?: () => void
  handleDeleteOrder?: () => void
  handleShowSendProposalsModal?: () => void
  data: any
}

function OrderDetailsCard({
  user,
  handleShowEditOrder,
  handleDeleteOrder,
  handleShowSendProposalsModal,
  data
}: Props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    step < data.photos.length && setActiveStep(step);
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

  console.log(data)

  return (
    <Grid container className="pt-4 px-0 d-flex gap-3" maxWidth={"100%"} position={"relative"}>
      {user.id === UserStorage.getIdUserLocalStorage() ?
        handleShowEditOrder && data && (
          <Box
            className="position-absolute"
            sx={{
              right: 0,
              cursor: 'pointer'
            }}
          >
            <EditIcon onClick={handleShowEditOrder} className="me-2" />
            <DeleteIcon color='error' onClick={handleDeleteOrder} />
          </Box>
        ) : handleShowEditOrder && (
          <Box
            className="position-absolute"
            sx={{
              right: 0,
              cursor: 'pointer'
            }}
          >
            <button onClick={handleShowSendProposalsModal} className="primary-standart w-auto">enviar proposta</button>
          </Box>
        )}
      {handleShowEditOrder &&
        <Grid item xs={12} className="p-0 mb-5">
          <h1 className="title">Detalhes do Pedido</h1>
        </Grid>}
      <Grid item container xs={12} spacing={4}>
        {handleShowEditOrder &&
          <Grid item md={5} xs={12} className="mb-2">
            {data.photos &&
              <Box className="d-flex flex-column" sx={{ maxWidth: "100%", height: '100%', minHeight: '300px', flexGrow: 1, position: 'relative' }}>
                <Box style={{
                  position: 'absolute',
                  width: '100%',
                  height: 'calc(100% - 50px)',
                  display: data.photos.length > 0 ? 'none' : 'flex',
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
                  {data.photos.map((step: any, index: any) => (
                    <div key={step} style={{ height: '100%', backgroundColor: 'var(--background-color)' }}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
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
                  steps={data.photos.length}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === data.photos.length - 1 || data.photos.length == 0}
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
          </Grid>}
        <Grid item md={7} xs={12}>
          <Grid item xs={12} className="p-0 mb-2">
            <span className="f-30 f-inter dark-contrast-color fw-bold">{data.title}</span>
          </Grid>
          <Grid item xs={12} className="p-0 mb-3">
            <span className="py-3 f-poppings aditional-color f-16">
              "{data.description}"
            </span>
          </Grid>
          <Grid item xs={12} className="p-0 mb-3">
            <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
              <Avatar
                sx={{
                  width: "32px",
                  height: "32px",
                  bgcolor: "#274C77",
                }}
                alt={user.name}
                src={`data:image/png;base64,${user.profilePhoto}`}
              />
              <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span className="text-color fw-bold f-18 f-inter">{user.name}</span>
                  <Figure className="d-flex align-items-center m-0">
                    <Figure.Image
                      width='13px'
                      height='13px'
                      alt="dollar"
                      src="/assets/icons/star.svg"
                      className="m-0"
                    />
                    <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                      {user.rate}
                    </Figure.Caption>
                  </Figure>
                </div>
              </Figure.Caption>
            </Figure>
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
                    data.maxValue.toLocaleString('pt-BR', {
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
                    {convertTime(data.expirationTime)}
                  </span>
                </Figure.Caption>
              </Figure>
            </Grid>
          </Grid>
          <Grid container item xs={12} className="p-0 mb-3">
            <Grid item xs={12} className="p-0 pe-2 mb-1">
              <h1 className="text-color f-18 f-inter fw-bold mt-2">Categorias</h1>
            </Grid>
            <Grid item xs={12} className="p-0 mb-3">
              <Box className="w-auto d-flex gap-2 ps-0">
                <AvatarGroup max={500} className="flex-wrap">
                  {data.subCategories.map((categories: any) => (
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
                      <Avatar
                        sx={{
                          bgcolor: "#274C77",
                          border: '4px solid white'
                        }}
                        alt={categories.name}
                        src={`data:image/png;base64,asdasd`}
                      />
                    </HtmlTooltip>
                  ))}
                </ AvatarGroup>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  )
}


export default OrderDetailsCard
