import { Accordion, Card, Col, Container, Figure, Form, Modal, Row, useAccordionButton } from "react-bootstrap";
import './style.scss'
import { useState } from "react";
import ServicesAvailableCard from "../../shared/components/ServicesAvailableCard/ServicesAvailableCard";
import FreelancerProfileCard from "../../shared/components/FreelancerProfileCard/FreelancerProfileCard";
import CardProfile from "./components/CardProfile/CardProfile";
import { OrderUpdate } from "../Order/OrderUpdate/OrderUpdate";
import { Portfólio } from "./components/Portfolio/Portfolio";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ProposalCard from "../../shared/components/ProposalCard/ProposalCard";


function Profile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <section className="home-background">
      <Container>
        <Row className="d-flex py-3">
          <Col lg={12}>
            <CardProfile />
          </Col>
          <Col lg={12}>
            <Box
              className="px-5 pb-4"
              sx={{
                backgroundColor: 'white',
                borderRadius: '0 0 16px 16px'
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Propostas Enviadas" value="1" />
                    <Tab label="Meu Portifólio" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{backgroundColor: 'red'}}>
                  {/* <Col container xs={12}>
                    <Col item lg={3}>
                      <ProposalCard />
                    </Col>
                  </Col> */}
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
              </TabContext>
            </Box>
          </Col>

          {/* <Col lg={7} className="px-3 pt-lg-0 pt-4 d-flex flex-column gap-2">
            <button onClick={() => setShow(true)} className="buttonBase primary-standart">Adicionar Projeto</button>
            <Row className="d-flex">

            </Row>
          </Col> */}
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Projeto ao Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Portfólio />
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Profile
