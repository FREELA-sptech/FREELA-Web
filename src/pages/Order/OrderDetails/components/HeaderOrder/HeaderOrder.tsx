import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { OrdersAPI } from "../../../../../api/ordersApi";
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Grid, MobileStepper, Skeleton, TextField, Typography, useTheme } from '@mui/material';
import HtmlTooltip from "../../../../../shared/tools/MuiTooltipCustom";
import useSnackbar from "../../../../../hooks/useSnackbar";
import { InterestForm } from "../../../../../shared/components/InterestForm/InterestForm";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { File } from "../../../../../shared/components/File/File";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export function HeaderOrder() {
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
    const [order, setOrder] = useState({})
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
                    console.log(res.data)
                    setOrder(res.data);
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


        return (
            <Box className="pb-4 position-relative"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '16px 16px 0 0'
                }}
            >
                <SnackbarComponent />
                {!editing ? (
                    <Box className="d-flex flex-column px-5" sx={{ paddingTop: '100px' }}>
                        <EditIcon
                            onClick={handleEdit}
                            className="position-absolute"
                            sx={{
                                top: "5rem",
                                cursor: 'pointer',
                                right: '50px'
                            }}
                        />
                        {isLoading ? (
                            <>
                                <Skeleton width={"100%"} height={300} />
                                <Skeleton width={200} height={50} />
                                <Skeleton width={150} height={20} />
                                <Skeleton width={650} height={30} />
                                <h1 className="text-color f-18 f-inter fw-bold mt-2">Categorias</h1>
                                <Skeleton width={350} height={60} />
                            </>
                        ) : (
                            <>
                                <Box sx={{ height: '300px' }}>
                                    {order.photos.length == 0 && (
                                        <Box style={{
                                            width: '100%',
                                            height: 'calc(100% - 50px)',
                                            display: order.photo > 0 ? 'none' : 'flex',
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
                                    <AutoPlaySwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={activeStep}
                                        onChangeIndex={handleStepChange}
                                        enableMouseEvents
                                        style={{
                                            height: 'calc(100% - 30px)',
                                            flexGrow: 1,
                                            position: 'relative'
                                        }}
                                    >
                                        {order.photos.map((step: any, index: any) => (
                                            <div key={step.name} style={{ height: '100%', backgroundColor: '#fff' }}>
                                                {Math.abs(activeStep - index) <= 2 ? (
                                                    <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                width: "100%",
                                                                maxHeight: "100%",
                                                                display: 'block',
                                                                maxWidth: "100%",
                                                                objectFit: "cover",
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
                                        steps={order.photos.length}
                                        position="static"
                                        activeStep={activeStep}
                                        nextButton={
                                            <Button
                                                size="small"
                                                onClick={handleNext}
                                                disabled={activeStep === order.photos.length - 1 || order.photos.length == 0}
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
                                <Box className="d-flex align-items-end gap-2">
                                    <span className="f-30 f-inter dark-contrast-color fw-bold">{order.title}</span>
                                </Box>
                                <span className="py-3 f-poppings aditional-color f-16">
                                    Criado por
                                    <Box>
                                        {/* <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            bgcolor: "#6096BA",
                                        }}
                                        alt={user.name}
                                        src={`data:image/png;base64,${user.profilePhoto}`}
                                    /> */}
                                        {/* {order.user.name} */}
                                    </Box>
                                </span>
                                <span className="py-3 f-poppings aditional-color f-16">
                                    {order.description}
                                </span>
                                <h1 className="text-color f-18 f-inter fw-bold mt-3">
                                    Categorias
                                </h1>
                                <Box className="w-auto d-flex gap-2">
                                    {order.subcategories &&
                                        order.subcategories.map((categories: any) => (
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
                                                        src={`data:image/png;base64,${order.photos[0]}`}
                                                    />
                                                </Box>
                                            </HtmlTooltip>
                                        ))
                                    }
                                </Box>
                            </>
                        )}
                    </Box>
                ) : (
                    <>
                        <Box
                            className="position-absolute"
                            sx={{
                                top: "5rem",
                                cursor: 'pointer',
                                right: '50px'
                            }}
                        >
                            <ClearIcon onClick={handleCloseEdit} sx={{ fontSize: '30px', marginRight: '5px' }} color="error" />
                            <DoneIcon onClick={handleSendEdit} sx={{ fontSize: '30px' }} color="success" />
                        </Box>
                        <Grid
                            item
                            container
                            spacing={3} xs={12} lg={12}
                            className="px-5"
                            sx={{ paddingTop: '100px' }}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                            <Grid
                                item
                                container
                                xs={12} md={6} lg={5}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start">
                                <Grid item xs={12} lg={12} className="p-0">
                                    <File files={uploadedFiles} onDelete={handleDelete} onUpload={handleUpload} />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12} md={6} lg={5}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start">
                                <Grid item xs={12} lg={12} className="p-0">
                                    <Typography variant="body2" className="f-12">
                                        Titulo:
                                    </Typography>
                                    <TextField
                                        error={Boolean(orderEditDetails.title)}
                                        id="name"
                                        name="name"
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
                                <Grid item xs={12} lg={12} className="p-0">
                                    <Typography variant="body2" className="f-12">
                                        Descrição:
                                    </Typography>
                                    <TextField
                                        error={Boolean(orderEditDetails.description)}
                                        id="name"
                                        name="name"
                                        fullWidth
                                        value={orderEditDetails.description}
                                        autoComplete="given-name"
                                        variant="standard"
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
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} md={6} lg={5}>
                                <Grid item xs={12}>
                                    <InterestForm formData={orderEditDetails} setFormData={setOrderEditDetails} errors={orderEditErrorDetails} setErrors={setOrderEditErrorDetails} />
                                </Grid>
                                <Grid item xs={12} lg={12} className="p-0">
                                    <Typography variant="body2" className="f-12">
                                        Prazo:
                                    </Typography>
                                    <TextField
                                        error={Boolean(orderEditDetails.expirationTime)}
                                        id="name"
                                        name="name"
                                        type="date"
                                        fullWidth
                                        value={orderEditDetails.expirationTime}
                                        autoComplete="given-name"
                                        variant="standard"
                                        helperText={
                                            orderEditErrorDetails.expirationTime
                                                ? (
                                                    <Typography variant="body2" className="f-14">
                                                        {orderEditErrorDetails.expirationTime || " "}
                                                    </Typography>
                                                )
                                                : " "
                                        }
                                        onChange={(e) => setField("expirationTime", e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12} className="p-0">
                                    <Typography variant="body2" className="f-12">
                                        Valor:
                                    </Typography>
                                    <TextField
                                        error={Boolean(orderEditDetails.maxValue)}
                                        id="name"
                                        name="name"
                                        fullWidth
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
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
        )
    }
}