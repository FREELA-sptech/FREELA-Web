import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { OrdersAPI } from "../../../api/ordersApi";
import { Avatar, Backdrop, Box, Breadcrumbs, Button, CircularProgress, Container, Grid, MobileStepper, Skeleton, Tab, TextField, Typography, useTheme } from '@mui/material';
import HtmlTooltip from "../../../shared/tools/MuiTooltipCustom";
import useSnackbar from "../../../hooks/useSnackbar";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ServicesAvailableCard from "../../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import { Col, Row } from "react-bootstrap";
import { HeaderOrder } from "./components/HeaderOrder/HeaderOrder";

function OrderDetails() {
    const params = useParams();
    const { id } = params;
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setIsLoading(false);
    const handleCloseModal = () => setShow(false);
    const handleShow = () => setIsLoading(false);

    return (
        <section className="home-background">
            <Container>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                        Home
                    </Link>
                    <Typography color="text.primary">Detalhes do Pedido</Typography>
                </Breadcrumbs>
                <Row className="d-flex py-3">
                    <Col lg={12}>
                        <HeaderOrder />
                    </Col>
                    <Col lg={12}>
                        <Box
                            className="px-5 pb-4"
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '0 0 16px 16px'
                            }}
                        >
                            {/* {data.map((localData: any) => (
                                <Grid item xs={12} md={6} lg={4}>
                                    <ServicesAvailableCard data={localData} />
                                </Grid>
                            ))} */}
                        </Box>
                    </Col>
                </Row>
            </Container>
        </section>
    )


}

export default OrderDetails;