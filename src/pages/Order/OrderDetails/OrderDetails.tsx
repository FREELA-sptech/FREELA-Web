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
import HeaderOrder from "./components/HeaderOrder/HeaderOrder";
import ProposalCard from "../../../shared/components/ProposalCard/ProposalCard";

function OrderDetails() {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [proposals, setProposals] = useState<any>();
  const handleClose = () => setIsLoading(false);
  const handleCloseModal = () => setShow(false);
  const handleShow = () => setIsLoading(false);
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <section className="home-background">
      <Container>
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            Home
          </Link>
          <Typography color="text.primary">Detalhes do Pedido</Typography>
        </Breadcrumbs>
        <Row className="d-flex px-3"
          style={{
            backgroundColor: 'white',
            borderRadius: '16px 16px'
          }}>
          <Col lg={12}>
            <HeaderOrder setProposals={(data: any) => { setProposals(data) }} />
          </Col>
          <Grid container lg={12} className="pb-4" flexDirection="column">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label={"Propostas Recebidas"} value="1" />
                </TabList>
              </Box>
              <TabPanel value="1" className="px-0">
                <Grid container spacing={4} xs={12}>
                  {proposals && proposals.map((localData: any) => (
                    <Grid item xs={12} md={6} lg={3} key={localData.id}>
                      <ProposalCard data={localData} />
                    </Grid>))}
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
        </Row>
      </Container>
    </section>
  )


}


export default OrderDetails;
