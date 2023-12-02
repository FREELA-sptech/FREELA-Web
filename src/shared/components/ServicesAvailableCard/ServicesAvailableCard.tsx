import { Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";
import { Avatar, Typography, Box, useTheme, MobileStepper, Button, AvatarGroup } from "@mui/material"
import HtmlTooltip from "../../../shared/tools/MuiTooltipCustom";
import { useNavigate } from "react-router";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useState } from "react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function ServicesAvailableCard(data: any) {
  const theme = useTheme();
  const navigate = useNavigate()
  const localData = data.data
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    step < localData.photos.length && setActiveStep(step);
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

  return (
    <Card style={{ cursor: "pointer" }} title="Ver detalhes do pedido" onClick={() => navigate(`/order-details/${localData.id}`)} className="services-available-background b-radius position-relative overflow-hidden">
      <Box sx={{ height: '230px' }}>
        {localData.photos.length == 0 && (
          <Box style={{
            width: '100%',
            height: 'calc(100% - 50px)',
            display: localData.photos > 0 ? 'none' : 'flex',
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
        )}
        {localData.photos.length > 0 &&
          <AutoPlaySwipeableViews
            className="custom-swipeable-views"
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            style={{
              height: '100%',
              flexGrow: 1,
              position: 'relative'
            }}
          >
            {localData.photos.map((step: any, index: any) => (
              <div key={step.name} style={{ height: '100%', backgroundColor: 'var(--background-color)' }}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
                    <Box
                      component="img"
                      sx={{
                        maxHeight: "100%",
                        display: 'block',
                        objectFit: "cover",
                        overflow: 'hidden'
                      }}
                      src={`data:image/png;base64,${step.photo}`}
                      alt={step.photo}
                    />
                  </Box>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>}
      </Box>
      <Card.Body className="mb-0">
        <Card.Title className="dark-contrast-color f-22 fw-semibold pb-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%"
          }}
        >{localData.title}</Card.Title>
        <Row className="d-flex justify-content-between my-3 pe-3 gap-2">
          <Figure className="d-flex align-items-center gap-2 w-auto m-0">
            <Figure.Caption className="d-flex flex-column f-12 f-poppings">
              Orçamento:
              <span className="f-roboto f-18 text-color fw-bold">{
                localData.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </Figure.Caption>
          </Figure>
          <Figure className="d-flex align-items-center gap-2 w-auto m-0">
            <Figure.Caption className="d-flex flex-column f-12 f-poppings">
              Prazo: <span className="f-roboto f-18 text-color fw-bold">{convertTime(localData.deadline)}</span>
            </Figure.Caption>
          </Figure>
        </Row>
        <Row>
          <Typography variant="body2" className="f-14">
            Categorias:
          </Typography>
          <Box className="d-flex">
            <AvatarGroup max={5} className="d-flex w-100">
              {localData.subCategories.map((subCategory: any) => {
                return (
                  <HtmlTooltip
                    key={subCategory.name}
                    title={
                      <h1 key={subCategory.name} style={{ borderRadius: '10px' }} className="px-3 m-0 tooltip fw-bold">{subCategory.name}</h1>
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
                      alt={subCategory.name}
                      src={`data:image/png;base64,asdasd`}
                    />
                  </HtmlTooltip>
                )
              })}
            </AvatarGroup>
          </Box>
        </Row>
      </Card.Body>
      <ButtonBase className="b-radius-button w-100 button-hidden" buttonType={"primary-standart"} label={"Ver detalhes"} onClick={() => { }} ></ButtonBase>
    </Card >
  );
}

export default ServicesAvailableCard
