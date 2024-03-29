import { Button, Card, Figure, Modal, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";
import { ProposalDetails } from "./ProposalDetails/ProposalDetails";
import { useContext, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material'
import { ProposalUpdate } from "./ProposalUpdate/ProposalUpdate";
import { OrdersAPI } from "../../../api/ordersApi";
import SnackbarContext from "../../../hooks/useSnackbar";
import { notBlank } from "../../scripts/validators";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderDetailsCard from "../../../pages/Order/OrderDetails/components/OrderDetailsCard/OrderDetailsCard";
import { ChatApi } from "../../../api/chatApi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


function ProposalCard(props: any) {
  const [data, setData] = useState<any>();
  const [orderData, setOrderData] = useState<any>()
  const [showDetails, setShowDetails] = useState(false);
  const [editingProposal, setEditingProposal] = useState(false);
  const { aceptProposals, deleteProposals, updateProposals, getOrdersById, refuseProposal } = OrdersAPI();
  const { createChat } = ChatApi();
  const { showSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState({
    description: '',
    value: '',
    deadline: ''
  });

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

  const updateValues = (newValues: any) => {
    setData({ ...newValues, deadline: convertTime(newValues.deadline) })
    const date = new Date(newValues.deadline);
    setFormData({
      description: newValues.description,
      value: newValues.value,
      deadline: date
    })
    getOrderDetails()
  }

  const getOrderDetails = () => {
    getOrdersById(props.data.order.id)
      .then((res) => {
        const resposta: any = res.data;
        const deadline = convertTime(resposta.deadline);

        setOrderData({ ...resposta, deadline });
      })
  };

  useEffect(() => {
    updateValues(props.data)
  }, [])

  const validateForm = () => {
    const { value, deadline, description } = formData;
    const newErros = {
      description: '',
      value: '',
      deadline: ''
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

  const handleShowDetails = () => setShowDetails(true);
  const handleCloseDetails = () => {
    setShowDetails(false);
  }
  const handleShowEditProposals = () => setEditingProposal(true)
  const handleHiddenEditProposals = () => setEditingProposal(false)

  const handleAcceptProposals = () => {
    aceptProposals(props.data.destinedOrder, props.data.id)
      .then((res) => {
        const time = new Date()

        const request = {
          freelancerId: data.user.id,
          userId: orderData.user.id,
          orderId: orderData.id,
          lastUpdate: time
        }

        createChat(request)
          .then(() => {
            showSnackbar(false, "Proposta aceita com sucesso, combine com o freelancer!")
            navigate("/chat")
          })
          .catch(() => {
            showSnackbar(true, "Problemas para aceitar a proposta, Tente Novamente!")
          })
      })
      .catch(() => {
        showSnackbar(true, "Problemas para aceitar a proposta, Tente Novamente!")
      })
  }

  const handleDeleteProposals = () => {
    deleteProposals(props.data.id)
      .then((res) => {
        showSnackbar(false, "Proposta deletada com sucesso!")
        props.onClose()
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para deletar a proposta, Tente Novamente!")
      })
  }

  const handleUpdateProposals = () => {
    const errors = validateForm();
    const valores = Object.values(errors);
    const errorsValues = valores.every(valor => valor === "");

    if (!errorsValues) {
      setErrors(errors);
    } else {
      setFormData(formData);
      updateProposals(props.data.id, formData)
        .then((res: any) => {
          showSnackbar(false, "Proposta atualizada com sucesso")
          updateValues(res.data)
          setEditingProposal(false)
        })
        .catch(() => {
          showSnackbar(true, "Problemas para atualizar a proposta, tente novamente!")
        })
    }
  };

  const handleRefuseProposals = () => {
    refuseProposal(props.data.id)
      .then(() => {
        showSnackbar(false, "Proposta recusada com sucesso")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para recusar a proposta, tente novamente!")
      })
  }

  return data ? (
    <>
      <Card className="services-available-background b-radius position-relative overflow-hidden">
        <Card.Body className="mb-0">
          <Card.Title className="title">
            <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  bgcolor: "#274C77",
                }}
                alt={data.user.name}
                src={data.user.photo ? `data:image/png;base64, ${data.user.photo}` : "/assets/images/profile.png"}
              />
              <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column">
                  <span className="text-color fw-bold f-18 f-inter">{data.user.name}</span>
                  {/* <Figure className="d-flex align-items-center m-0">
                    <Figure.Image
                      width='13px'
                      height='13px'
                      alt="dollar"
                      src="/assets/icons/star.svg"
                      className="m-0"
                    />
                    <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                      {data.user.rate}
                    </Figure.Caption>
                  </Figure> */}
                </div>
              </Figure.Caption>
            </Figure>
          </Card.Title>
          <Row className="d-flex justify-content-start my-3 gap-2">
            <Figure className="d-flex align-items-center gap-2 w-auto m-0">
              <Figure.Image
                width='30px'
                height='30px'
                alt="calendario"
                src="/assets/icons/price.svg"
                className="m-0"
              />
              <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                Orçamento:
                <span className="f-roboto f-18 text-color fw-bold">{
                  data.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </Figure.Caption>
            </Figure>
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
                  {data.deadline}
                </span>
              </Figure.Caption>
            </Figure>
          </Row>
        </Card.Body>
        <ButtonBase onClick={() => handleShowDetails()} className="b-radius-button w-100 button-hidden" buttonType={"primary-standart"} label={"Ver detalhes"} ></ButtonBase>
      </Card>
      <Modal
        show={showDetails}
        onHide={handleCloseDetails}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="f-inter f-22">Detalhes da proposta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!editingProposal ? (
            <>
              <ProposalDetails
                user={data.user}
                handleAcceptProposals={handleAcceptProposals}
                handleRefuseProposals={handleRefuseProposals}
                handleDeleteProposals={handleDeleteProposals}
                handleShowEditProposals={handleShowEditProposals}
                data={data}
              />
              <Accordion disableGutters
                sx={{
                  border: 'none',
                  borderRadius: '16px !important',
                  boxShadow: 'none',
                  marginTop: '13px',
                  backgroundColor: 'var(--contrast-background-color)'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Detalhes do Pedido</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {orderData && <OrderDetailsCard data={orderData} user={orderData.user} />}
                </AccordionDetails>
              </Accordion>
            </>
          ) : (
            <ProposalUpdate
              data={data}
              user={data.user}
              setFormData={setFormData}
              setErrors={setErrors}
              formData={formData}
              errors={errors}
              handleHiddenEditProposals={handleHiddenEditProposals}
              handleUpdateProposals={handleUpdateProposals}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  ) : null;
}

export default ProposalCard
