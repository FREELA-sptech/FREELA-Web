import { Container, Figure, Row } from "react-bootstrap";
import { ProposalUpdate } from "../ProposalUpdate/ProposalUpdate";
import { Avatar, Box, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { OrdersAPI } from "../../../../api/ordersApi";
import { UserStorage } from "../../../../store/userStorage";
import SnackbarContext from "../../../../hooks/useSnackbar";

export type Props = {
  originUser: any
  handleAcceptProposals: () => void
  handleRefuseProposals: () => void
  handleDeleteProposals: () => void
  handleShowEditProposals: () => void
  data: any
}

export function ProposalDetails({
  originUser,
  handleAcceptProposals,
  handleRefuseProposals,
  handleDeleteProposals,
  handleShowEditProposals,
  data
}: Props) {
  return (
    <Grid container className="pt-0 px-3" maxWidth={"100%"}>
      <Grid item container xs={12} className="position-relative">
        <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
          <Avatar
            sx={{
              width: "50px",
              height: "50px",
              bgcolor: "#274C77",
            }}
            alt={originUser.name}
            src={`data:image/png;base64,${originUser.profilePhoto}`}
          />
          <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="text-color fw-bold f-18 f-inter">{originUser.name}</span>
              <Figure className="d-flex align-items-center m-0">
                <Figure.Image
                  width='13px'
                  height='13px'
                  alt="dollar"
                  src="/assets/icons/star.svg"
                  className="m-0"
                />
                <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                  {originUser.rate}
                </Figure.Caption>
              </Figure>
            </div>
          </Figure.Caption>
        </Figure>
        {originUser.id === UserStorage.getIdUserLocalStorage() && !data.isAccepted && (
          <Box
            className="position-absolute"
            sx={{
              right: 0,
              cursor: 'pointer'
            }}
          >
            <EditIcon onClick={handleShowEditProposals} className="me-2" />
            <DeleteIcon color='error' onClick={handleDeleteProposals} />
          </Box>
        )}
      </Grid>
      <Grid item container xs={12}>
        <Grid item container lg={5} md={12} className="d-flex justify-content-start my-3">
          <Grid item xs={6}>
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
                  data.proposalValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </Figure.Caption>
            </Figure>
          </Grid>
          <Grid item xs={6}>
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
                  {data.expirationTime}
                </span>
              </Figure.Caption>
            </Figure>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h4 className="f-20 f-inter">Descrição</h4>
          <p className="f-16 aditional-color f-roboto">
            {data.description}
          </p>
        </Grid>
        {originUser.id !== UserStorage.getIdUserLocalStorage() && !data.isAccepted &&
          <Grid item xs={12} className="d-flex justify-content-between my-3 gap-2">
            <button className="primary-outline w-auto" onClick={handleRefuseProposals}>Recusar</button>
            <button className="primary-standart w-auto" onClick={handleAcceptProposals}>Aceitar</button>
          </Grid>}
      </Grid>
    </Grid>
  )
}
