import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { OrdersAPI } from "../../../../../api/ordersApi";
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Grid, InputAdornment, MobileStepper, Skeleton, TextField, Typography, useTheme } from '@mui/material';
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
import { Figure } from "react-bootstrap";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function HeaderOrder(props: any) {
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const { id } = params;
  const { editOrder, deleteOrder } = OrdersAPI();

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
      subCategoryId: order.subCategoryId,
      maxValue: order.maxValue,
      expirationTime: order.expirationTime,
      photos: order.photo
    }
    setOrderEditDetails(initalEditingValues)
  }

  useEffect(() => {
    console.log(id);
    const timer = setTimeout(() => {
      editOrder(id)
        .then((res) => {
          setOrder(res.data);
          props.setProposals(res.data.proposals)
          updateOrderData(res.data);
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          console.log(order)
          setIsLoading(false)
        })
    }, 1200);
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
  }
  const handleDeleteOrder = () => {
    deleteOrder(id)
      .then((res) => {
        console.log(res.data);
        navigate("/home")
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const handleDelete = (name: any) => {
    setField("photo", orderEditDetails.photo.filter((file: any) => file.name !== name))
    setOrderEditDetails(uploadedFiles.filter((file: any) => file.name !== name))
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
          !orderEditDetails.photo.includes(fileData) && newPhotos.push(fileData)
          setField("photo", newPhotos);
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
    <Grid container className="pt-4 px-0" maxWidth={"100%"}>
      <Grid item xs={12} className="p-0 mb-5">
        <h1 className="title">Detalhes um Pedido</h1>
      </Grid>
      <Grid item md={5} xs={12} className="p-0 mb-5">
        {order && <File files={order.photos} onDelete={handleDelete} onUpload={handleUpload} />}
      </Grid>
      {editing ?
        <Grid item md={7} xs={12} className="ps-0 mb-3">
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
        <Grid item md={7} xs={12} className="ps-0 mb-3">
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
      <Grid item xs={12} className="p-0 mb-3">
        {editing && <InterestForm formData={orderEditDetails} setFormData={setOrderEditDetails} errors={orderEditErrorDetails} setErrors={setOrderEditDetails} />}
      </Grid>
    </Grid>
    // <Box className="pb-4 position-relative"
      // sx={{
      //   backgroundColor: 'white',
      //   borderRadius: '16px 16px 0 0'
      // }}
    // >
    //   <SnackbarComponent />
    //   {!editing ? (
    //     <Box className="d-flex flex-column px-5" sx={{ paddingTop: '100px' }}>
    //       <EditIcon
    //         onClick={handleEdit}
    //         className="position-absolute"
    //         sx={{
    //           top: "5rem",
    //           cursor: 'pointer',
    //           right: '50px'
    //         }}
    //       />
    //       {isLoading ? (
    //         <>
    //           <Skeleton width={"100%"} height={300} />
    //           <Skeleton width={200} height={50} />
    //           <Skeleton width={150} height={20} />
    //           <Skeleton width={650} height={30} />
    //           <h1 className="text-color f-18 f-inter fw-bold mt-2">Categorias</h1>
    //           <Skeleton width={350} height={60} />
    //         </>
    //       ) : (
    //         <>
    //           <Box sx={{ height: '200px' }}>
    //             {order.photos.length == 0 && (
    //               <Box style={{
    //                 width: '100%',
    //                 height: 'calc(100% - 50px)',
    //                 display: order.photos > 0 ? 'none' : 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 flexDirection: 'column',
    //                 gap: 6
    //               }}>
    //                 <img
    //                   style={{ height: 100, width: 100 }}
    //                   src="/assets/images/no-picture.png"
    //                   alt="Sem Foto" />
    //                 <Typography>
    //                   Nenhuma Foto Adicionada
    //                 </Typography>
    //               </Box>
    //             )}
    //             <AutoPlaySwipeableViews
    //               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    //               index={activeStep}
    //               onChangeIndex={handleStepChange}
    //               enableMouseEvents
    //               style={{
    //                 height: 'calc(100% - 30px)',
    //                 flexGrow: 1,
    //                 position: 'relative'
    //               }}
    //             >
    //               {order.photos.map((step: any, index: any) => (
    //                 <div key={step.name} style={{ height: '100%', backgroundColor: 'var(--background-color)' }}>
    //                   {Math.abs(activeStep - index) <= 2 ? (
    //                     <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
    //                       <Box
    //                         component="img"
    //                         sx={{
    //                           maxHeight: "100%",
    //                           display: 'block',
    //                           maxWidth: "100%",
    //                           overflow: 'hidden'
    //                         }}
    //                         src={`data:image/png;base64,${step}`}
    //                         alt={step}
    //                       />
    //                     </Box>
    //                   ) : null}
    //                 </div>
    //               ))}
    //             </AutoPlaySwipeableViews>
    //             <MobileStepper
    //               sx={{
    //                 height: 50,
    //               }}
    //               steps={order.photos.length}
    //               position="static"
    //               activeStep={activeStep}
    //               nextButton={
    //                 <Button
    //                   size="small"
    //                   onClick={handleNext}
    //                   disabled={activeStep === order.photos.length - 1 || order.photos.length == 0}
    //                 >
    //                   Next
    //                   {theme.direction === 'rtl' ? (
    //                     <KeyboardArrowLeft />
    //                   ) : (
    //                     <KeyboardArrowRight />
    //                   )}
    //                 </Button>
    //               }
    //               backButton={
    //                 <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
    //                   {theme.direction === 'rtl' ? (
    //                     <KeyboardArrowRight />
    //                   ) : (
    //                     <KeyboardArrowLeft />
    //                   )}
    //                   Back
    //                 </Button>
    //               }
    //             />
    //           </Box>
    //           <Box className="d-flex align-items-end gap-2">
    //             <span className="f-30 f-inter dark-contrast-color fw-bold">{order.title}</span>
    //           </Box>
    //           <span className="py-3 f-poppings aditional-color f-16">
    //             Criado por
    //             <Box>
    //               <Avatar
    //                 sx={{
    //                   width: 40,
    //                   height: 40,
    //                   bgcolor: "#6096BA",
    //                 }}
    //                 alt={order.user.name}
    //                 src={`data:image/png;base64,${order.user.profilePhoto}`}
    //               />
    //               {order.user.name}
    //             </Box>
    //           </span>
    //           <span className="py-3 f-poppings aditional-color f-16">
    //             {order.description}
    //           </span>
    //           <h1 className="text-color f-18 f-inter fw-bold mt-3">
    //             Categorias
    //           </h1>
    //           <Box className="w-auto d-flex gap-2">
    //             {order.subCategories &&
    //               order.subCategories.map((categories: any) => (
    //                 <HtmlTooltip
    //                   key={categories.name}
    //                   title={
    //                     <h1 key={categories.name} style={{ borderRadius: '10px' }} className="px-3 m-0 tooltip fw-bold">{categories.name}</h1>
    //                   }
    //                   placement="top"
    //                   PopperProps={{
    //                     sx: {
    //                       padding: 0
    //                     },
    //                     disablePortal: true,
    //                   }}
    //                 >
    //                   <Box >
    //                     <Avatar
    //                       sx={{
    //                         width: 40,
    //                         height: 40,
    //                         bgcolor: "#6096BA",
    //                       }}
    //                       alt={categories.name}
    //                       src={`data:image/png;base64,`}
    //                     />
    //                   </Box>
    //                 </HtmlTooltip>
    //               ))
    //             }
    //           </Box>
    //         </>
    //       )}
    //     </Box>
    //   ) : (
    //     <>
    //       <Box
    //         className="position-absolute"
    //         sx={{
    //           top: "5rem",
    //           cursor: 'pointer',
    //           right: '50px'
    //         }}
    //       >
    //         <ClearIcon onClick={handleCloseEdit} sx={{ fontSize: '30px', marginRight: '5px' }} color="error" />
    //         <DoneIcon onClick={handleSendEdit} sx={{ fontSize: '30px' }} color="success" />
    //       </Box>
    //       <Grid
    //         item
    //         container
    //         spacing={3} xs={12} lg={12}
    //         className="px-5"
    //         sx={{ paddingTop: '100px' }}
    //         direction="row"
    //         justifyContent="flex-start"
    //         alignItems="flex-start">
    //         <Grid
    //           item
    //           container
    //           xs={12} md={6} lg={5}
    //           direction="row"
    //           justifyContent="flex-start"
    //           alignItems="flex-start">
    //           <Grid item xs={12} lg={12} className="p-0">
    //             <File files={uploadedFiles} onDelete={handleDelete} onUpload={handleUpload} />
    //           </Grid>
    //         </Grid>
    //         <Grid
    //           item
    //           container
    //           xs={12} md={6} lg={5}
    //           direction="row"
    //           justifyContent="flex-start"
    //           alignItems="flex-start">
    //           <Grid item xs={12} lg={12} className="p-0">
    //             <Typography variant="body2" className="f-12">
    //               Titulo:
    //             </Typography>
    //             <TextField
    //               error={Boolean(orderEditDetails.title)}
    //               id="name"
    //               name="name"
    //               fullWidth
    //               value={orderEditDetails.title}
    //               autoComplete="given-name"
    //               variant="standard"
    //               helperText={
    //                 orderEditErrorDetails.title
    //                   ? (
    //                     <Typography variant="body2" className="f-14">
    //                       {orderEditErrorDetails.title || " "}
    //                     </Typography>
    //                   )
    //                   : " "
    //               }
    //               onChange={(e) => setField("title", e.target.value)}
    //             />
    //           </Grid>
    //           <Grid item xs={12} lg={12} className="p-0">
    //             <Typography variant="body2" className="f-12">
    //               Descrição:
    //             </Typography>
    //             <TextField
    //               error={Boolean(orderEditDetails.description)}
    //               id="name"
    //               name="name"
    //               fullWidth
    //               value={orderEditDetails.description}
    //               autoComplete="given-name"
    //               variant="standard"
    //               helperText={
    //                 orderEditErrorDetails.description
    //                   ? (
    //                     <Typography variant="body2" className="f-14">
    //                       {orderEditErrorDetails.description || " "}
    //                     </Typography>
    //                   )
    //                   : " "
    //               }
    //               onChange={(e) => setField("description", e.target.value)}
    //             />
    //           </Grid>
    //         </Grid>
    //         <Grid item container xs={12} md={6} lg={5}>
    //           <Grid item xs={12}>
    //             <InterestForm formData={orderEditDetails} setFormData={setOrderEditDetails} errors={orderEditErrorDetails} setErrors={setOrderEditErrorDetails} />
    //           </Grid>
    //           <Grid item xs={12} lg={12} className="p-0">
    //             <Typography variant="body2" className="f-12">
    //               Prazo:
    //             </Typography>
    //             <TextField
    //               error={Boolean(orderEditDetails.expirationTime)}
    //               id="name"
    //               name="name"
    //               type="date"
    //               fullWidth
    //               value={orderEditDetails.expirationTime}
    //               autoComplete="given-name"
    //               variant="standard"
    //               helperText={
    //                 orderEditErrorDetails.expirationTime
    //                   ? (
    //                     <Typography variant="body2" className="f-14">
    //                       {orderEditErrorDetails.expirationTime || " "}
    //                     </Typography>
    //                   )
    //                   : " "
    //               }
    //               onChange={(e) => setField("expirationTime", e.target.value)}
    //             />
    //           </Grid>
    //           <Grid item xs={12} lg={12} className="p-0">
    //             <Typography variant="body2" className="f-12">
    //               Valor:
    //             </Typography>
    //             <TextField
    //               error={Boolean(orderEditDetails.maxValue)}
    //               id="name"
    //               name="name"
    //               fullWidth
    //               value={orderEditDetails.maxValue}
    //               autoComplete="given-name"
    //               variant="standard"
    //               helperText={
    //                 orderEditErrorDetails.maxValue
    //                   ? (
    //                     <Typography variant="body2" className="f-14">
    //                       {orderEditErrorDetails.maxValue || " "}
    //                     </Typography>
    //                   )
    //                   : " "
    //               }
    //               onChange={(e) => setField("maxValue", e.target.value)}
    //             />
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </>
    //   )}
    // </Box>
  )
}


export default HeaderOrder
