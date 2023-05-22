import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";
import { Avatar, Typography, Box } from "@mui/material"
import HtmlTooltip from "../../../shared/tools/MuiTooltipCustom";
import { useNavigate } from "react-router";


function ServicesAvailableCard(data: any) {
  const navigate = useNavigate();
  const localData = data.data
  console.log(localData)

  return (
    <Card className="services-available-background b-radius position-relative overflow-hidden">
      <Card.Img style={{ borderRadius: '16px 16px 0 0' }} width='100%' height='45%' variant="top" src="https://focalizando.com.br/sites/default/files/2023-03/ideias-de-tatuagens-no-antebraco-masculina-e-feminina.jpg" />
      <Card.Body className="mb-0">
        <Card.Title className="text-color f-20 fw-semibold">{localData.title}</Card.Title>
        <Row className="d-flex justify-content-between my-3 pe-3 gap-2">
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
                localData.maxValue.toLocaleString('pt-BR', {
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
              Prazo: <span className="f-roboto f-18 text-color fw-bold">{localData.deadline}</span>
            </Figure.Caption>
          </Figure>
        </Row>
        <Row>
          <Typography variant="body2" className="f-14">
            Categorias:
          </Typography>
          <Box className="d-flex">
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
                      width: 40,
                      height: 40,
                      bgcolor: "#274C77",
                      border: '4px solid white'
                    }}
                    alt={subCategory.name}
                    src={`data:image/png;base64,asdasd`}
                  />
                </HtmlTooltip>
              )
            })}
          </Box>
        </Row>
      </Card.Body>
      <ButtonBase onClick={() => navigate(`/order-details/${localData.id}`)} className="b-radius-button w-100 button-hidden" buttonType={"primary-standart"} label={"Ver detalhes"} ></ButtonBase>
    </Card>
  );
}

export default ServicesAvailableCard
