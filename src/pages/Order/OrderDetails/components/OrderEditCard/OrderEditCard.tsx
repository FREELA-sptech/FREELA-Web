import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { OrdersAPI } from "../../../../../api/ordersApi";
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Fab, Grid, InputAdornment, MobileStepper, Skeleton, TextField, Typography, useTheme } from '@mui/material';
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
import dayjs from 'dayjs';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export type Props = {
  handleHiddenEditOrder: () => void
  handleUpdateOrder: () => void
  setFormData: (data: any) => void
  setErrors: (data: any) => void
  formData: any
  errors: any
}

function OrderEditCard({
  handleHiddenEditOrder,
  handleUpdateOrder,
  setFormData,
  setErrors,
  formData,
  errors
}: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    step < formData.photos.length && setActiveStep(step);
  };

  const setField = (field: any, value: any) => {
    setFormData({
      ...formData, [field]: value
    })

    if (!!errors[field]) {
      setErrors({
        ...errors, [field]: null
      })
    }
  }

  const handleDeletePictures = (name: any) => {
    const currentFiles: any[] = [];

    formData.photos.forEach((file: any) => {
      if (file.name) {
        if (file.name !== name) {
          currentFiles.push(file);
        }
      } else {
        if (file !== name) {
          currentFiles.push(file);
        }
      }
    });

    setFormData({
      ...formData,
      photos: currentFiles,
      deletedPhotos: [...formData.deletedPhotos, name],
      newPhotos: formData.newPhotos.filter((file: any) => file.name !== name)
    })
  };


  const handleUploadPictures = (event: any) => {
    const files = Array.from(event.target.files);
    const newPhotos: any[] = formData.newPhotos || []
    const formDataPhotos: any[] = formData.photos || []

    files.forEach((fileData: any) => {
      if (fileData) {
        const reader = new FileReader();
        const readerUrl = new FileReader();

        reader.onloadend = () => {
          !formData.newPhotos.includes(fileData) && newPhotos.push(fileData)
          setField("newPhotos", newPhotos);
        };

        readerUrl.onloadend = () => {
          const fileObject = {
            name: fileData.name,
            data: readerUrl.result,
          };

          !formData.photos.includes(fileObject) && formDataPhotos.push(fileObject)
          setField("photos", formDataPhotos);
        }

        reader.readAsArrayBuffer(fileData);
        readerUrl.readAsDataURL(fileData);
      }
    });
  }

  return (
    <Grid container className="pt-4 px-0 d-flex gap-3" maxWidth={"100%"} position={"relative"}>
      <Box
        className="position-absolute"
        sx={{
          right: 0,
          cursor: 'pointer'
        }}
      >
        <ClearIcon onClick={handleHiddenEditOrder} sx={{ fontSize: '30px', marginRight: '5px' }} color="error" />
        <DoneIcon onClick={handleUpdateOrder} sx={{ fontSize: '30px' }} color="success" />
      </Box>
      <Grid item xs={12} className="p-0 mb-5">
        <h1 className="title">Edite seu Pedido</h1>
      </Grid>
      <Grid item container xs={12} spacing={4}>
        <Grid item md={5} xs={12} className="mb-5">
          {formData.photos &&
            <Box className="d-flex flex-column" sx={{ maxWidth: "100%", height: '100%', minHeight: '300px', flexGrow: 1, position: 'relative' }}>
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
                  onChange={(e) => { handleUploadPictures(e) }}
                />
                <AddIcon />
              </Fab>
              <Box style={{
                position: 'absolute',
                width: '100%',
                height: 'calc(100% - 50px)',
                display: formData.photos.length > 0 ? 'none' : 'flex',
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
                {formData.photos.map((step: any, index: any) => (
                  <div key={step.name || step} style={{ height: '100%', backgroundColor: 'var(--background-color)' }}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
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
                          onClick={() => { handleDeletePictures(step.name || step) }}
                        />
                        <Box
                          component="img"
                          sx={{
                            maxHeight: "100%",
                            display: 'block',
                            maxWidth: "100%",
                            overflow: 'hidden'
                          }}
                          src={step.data || `data:image/png;base64,${step}`}
                          alt={step.name || step}
                        />
                      </Box>
                    ) : null}
                  </div>
                )
                )}
              </AutoPlaySwipeableViews>
              <MobileStepper
                sx={{
                  height: 50,
                }}
                steps={formData.photos.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === formData.photos.length - 1 || formData.photos.length == 0}
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
        <Grid item md={7} xs={12}>
          <Grid item xs={12} className="p-0 mb-3">
            <Typography variant="body2" className="f-12">
              Titulo:
            </Typography>
            <TextField
              error={!!errors.title}
              id="title"
              name="title"
              fullWidth
              value={formData.title}
              autoComplete="given-name"
              variant="standard"
              helperText={
                errors.title
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.title || " "}
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
              error={!!errors.description}
              id="description"
              name="description"
              fullWidth
              value={formData.description}
              variant="outlined"
              helperText={
                errors.description
                  ? (
                    <Typography variant="body2" className="f-14">
                      {errors.description || " "}
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
                error={!!errors.maxValue}
                id="maxValue"
                name="maxValue"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                value={formData.maxValue}
                autoComplete="given-name"
                variant="standard"
                helperText={
                  errors.maxValue
                    ? (
                      <Typography variant="body2" className="f-14">
                        {errors.maxValue || " "}
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
                  value={dayjs(formData.expirationTime)}
                  onChange={(e) => {
                    setField('expirationTime', e.$d)
                  }}
                  className="p-0"
                  slotProps={{
                    textField: {
                      helperText: errors.expirationTime ? (
                        <Typography variant="body2" className="f-14">
                          {errors.expirationTime}
                        </Typography>
                      ) : null
                    }
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="p-0 mb-3">
        <InterestForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setFormData} />
      </Grid>
    </Grid>
  )
}


export default OrderEditCard
