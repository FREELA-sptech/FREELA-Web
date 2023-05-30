import { Button, Card, Figure, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../ButtonBase/ButtonBase";
import Chip from '@mui/material/Chip';
import { Avatar, AvatarGroup, Box } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import HtmlTooltip from "../../tools/MuiTooltipCustom";
import { useNavigate } from "react-router-dom";


function FreelancerProfileCard(props: any) {
  const navigate = useNavigate()
  const {
    id,
    name,
    description,
    rate,
    subCategories,
    profilePhoto
  } = props.data

  return (
    <Card className="services-available-background b-radius position-relative overflow-hidden">
      <Card.Body>
        <Card.Title className="title">
          <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
            <Avatar
              sx={{
                width: "50px",
                height: "50px",
                bgcolor: "#274C77",
              }}
              alt={name}
              src={`data:image/png;base64,${profilePhoto}`}
            />
            <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column">
                <span className="text-color fw-bold f-18 f-inter">{name}</span>
                <Figure className="d-flex align-items-center m-0">
                  <Figure.Image
                    width='13px'
                    height='13px'
                    alt="dollar"
                    src="/assets/icons/star.svg"
                    className="m-0"
                  />
                  <Figure.Caption className="fw-bold f-roboto aditional-color f-14" style={{ paddingLeft: '2px' }}>
                    {rate}
                  </Figure.Caption>
                </Figure>
              </div>
            </Figure.Caption>
          </Figure>
        </Card.Title>
        <Row className="d-flex justify-content-between my-1 text-start">
          <span className="f-14 aditional-color">
            "{description}"
          </span>
        </Row>
        <Box>
          <Box className="my-2 d-flex justify-content-start">
            <span className="f-14">Expecialidades</span>
          </Box>
          <Box className="d-flex justify-content-start gap-2 w-100 flex-wrap">
            <AvatarGroup max={5}>
              {subCategories.map((item: any) => (
                <HtmlTooltip
                  key={item.name}
                  title={
                    <h1 key={item.name} style={{ borderRadius: '10px' }} className="px-3 m-0 tooltip fw-bold">{item.name}</h1>
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
                      alt={item.name}
                      src={`data:image/png;base64,asdasd`}
                    />
                </HtmlTooltip>
              ))}
            </AvatarGroup>
          </Box>
        </Box>
      </Card.Body>
      <ButtonBase onClick={() => navigate(`/perfil/${id}`)} className="b-radius-button z-index-2 w-100 button-hidden" buttonType={"primary-standart"} label={"Ver Portfólio"} ></ButtonBase>
    </Card>
  );
}

export default FreelancerProfileCard
