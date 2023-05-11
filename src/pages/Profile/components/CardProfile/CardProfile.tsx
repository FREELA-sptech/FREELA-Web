import { Button, Card, Figure, OverlayTrigger, Popover, Row } from "react-bootstrap";
import "./style.scss"
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import { Avatar, Box, Skeleton, Tooltip } from "@mui/material";
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { deepOrange, deepPurple } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { UserAPI } from "../../../../api/userApi";
import CodeIcon from '@mui/icons-material/Code';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    margin: '5px !important',
    padding: 0
  },
}));

function CardProfile() {
  const [userDetails, setUserDetails] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserAPI.userDetails(4)
      .then((res) => {
        setUserDetails(res.data)
        setLoading(false)
        console.log(res.data)
      })
  }, [])

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const blob = new Blob([reader.result as ArrayBuffer], { type: file.type })
        const formData = new FormData();
        formData.append('image', file);

        UserAPI.uploadPicture(4, formData)
          .then((res) => {
            console.log(res)
            setSelectedImage(res.data.profilePhoto);
          })
          .catch((error) => {
            console.log(error)
          })
      };
      reader.readAsArrayBuffer(file);

      console.log(reader)
    }
  };

  return (
    <Box className="pb-4 overflow-hidden"
      sx={{
        backgroundColor: 'white',
        borderRadius: '16px 16px 0 0'
      }}
    >
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && <img src={`data:image/png;base64,${selectedImage}`} alt="Selected" />}
      </div>
      <Box className="position-relative d-flex flex-row gap-4" sx={{ height: '200px', backgroundColor: 'blue' }}>
        {loading
          ? (
            <Box
              className="position-absolute"
              sx={{
                bottom: '-75px',
                left: '50px',
                backgroundColor: 'white',
                height: '158px',
                width: '158px',
                padding: '4px',
                borderRadius: '50%'
              }}
            >
              <Skeleton
                variant="circular"
                width={150}
                height={150}
              />
            </Box>
          ) : (
            <Avatar
              className="position-absolute"
              sx={{
                width: 150,
                height: 150,
                bgcolor: deepOrange[500],
                border: '4px solid white',
                bottom: '-75px',
                left: '50px'
              }}
              alt="Remy Sharp"
              src="https://www.ogol.com.br/img/jogadores/58/976658_med__20230131161334_cassio.png"
            />
          )}

        <EditIcon
          className="position-absolute"
          sx={{
            bottom: '-125px',
            cursor: 'pointer',
            right: '50px'
          }}
        />
      </Box>
      <Box className="d-flex flex-column ps-5" sx={{ paddingTop: '100px' }}>
        {loading
          ? (
            <>
              <Skeleton width={200} height={50} />
              <Skeleton width={150} height={20} />
              <Skeleton width={650} height={30} />
              <h1 className="text-color f-18 f-inter fw-bold mt-2">Minhas Especialidades</h1>
              <Skeleton width={350} height={60} />
            </>
          )
          : (
            <>
              <Box className="d-flex align-items-end gap-2">
                <span className="f-30 f-inter dark-contrast-color fw-bold">{userDetails.name}</span>
                <Box className="h-100 d-flex flex-row align-items-center pb-2">
                  <span className="aditional-color f-16">{userDetails.rate}</span>
                  <StarIcon color="primary" sx={{ fontSize: '12px' }} />
                </Box>
              </Box>
              <span className="text-color fw-normal f-16 f-inter">{userDetails.city}, {userDetails.uf}</span>
              <span className="py-3 f-poppings aditional-color f-16">"{userDetails.description}"</span>
              <h1 className="text-color f-18 f-inter fw-bold mt-2">Minhas Especialidades</h1>
              <Box className="w-auto d-flex gap-2">
                {userDetails &&
                  userDetails.categories.map((categories: any) => (
                    <HtmlTooltip
                      title={
                        <h1 style={{ borderRadius: '10px' }} className="px-3 m-0 tooltip fw-bold">{categories.name}</h1>
                      }
                      placement="top"
                      PopperProps={{
                        sx: {
                          padding: 0
                        },
                        disablePortal: true,
                      }}
                    >
                      <Box>
                        <Figure.Image
                          width='40px'
                          height='40px'
                          alt="dollar"
                          src="/assets/icons/tradution.svg"
                          className=""
                        />
                      </Box>
                    </HtmlTooltip>
                  ))

                }

              </Box>
            </>
          )}

      </Box>
    </Box >
    // <Card className="card-profile-background b-radius overflow-hidden">
    //   <Card.Body className="px-4 py-4">
    //     <Figure className="d-flex flex-column align-items-center gap-2 m-0" style={{ padding: '1px' }}>
    //       <Row style={{
    //         borderRadius: '99%',
    //         padding: '3px',
    //         margin: 0,
    //         width: '150px',
    //         height: '150px',
    //         backgroundColor: 'var(--contrast-background-color)',
    //         overflow: 'hidden'
    //       }}>
    //         <Figure.Image
    //           width='100%'
    //           height='100%'
    //           style={{ padding: 0 }}
    //           alt="dollar"
    //           src="https://www.ogol.com.br/img/jogadores/58/976658_med__20230131161334_cassio.png"
    //           className="m-0"
    //         />
    //       </Row>
    //       <Figure.Caption className="w-100 d-flex align-items-center justify-content-center pt-3">
    //         <span className="f-30 f-inter dark-contrast-color fw-bold">Cassio Ramos</span>
    //       </Figure.Caption>
    //     </Figure>
    //     <Row className="d-flex justify-content-center mt-1 text-center">
    //       <Figure className="d-flex align-items-center justify-content-center m-0">
    //         <Figure.Image
    //           width='15px'
    //           height='15px'
    //           alt="dollar"
    //           src="/assets/icons/location.svg"
    //           className="m-0 me-2"
    //         />
    //         <Figure.Caption className="text-color fw-semibold f-16 f-inter">
    //           São Paulo, SP
    //         </Figure.Caption>
    //       </Figure>
    //     </Row>
    //     <Row className="d-flex justify-content-between my-3 text-center">
    //       <span className="f-poppings aditional-color f-16">"Sou um jogador que está sempre buscando evoluir e aprimorar minhas habilidades, seja através de treinos específicos ou análise de jogos."</span>
    //     </Row>
    //     <Row className="d-flex justify-content-between my-3 text-center">
    //       <h1 className="text-color f-18 f-inter fw-bold mt-2">Minhas Especialidades</h1>
    //       <div className="d-flex justify-content-center gap-2 pt-1">
    //         <OverlayTrigger
    //           trigger={["hover", "focus"]}
    //           key='teste'
    //           placement='top'
    //           overlay={
    //             <h1 className="tooltip b-radius px-3 mb-1 fw-bold">Tradução</h1>
    //           }
    //         >
    //           <Figure.Image
    //             width='40px'
    //             height='40px'
    //             alt="dollar"
    //             src="/assets/icons/tradution.svg"
    //             className=""
    //           />
    //         </OverlayTrigger>
    //       </div>
    //     </Row>
    //     <Row className="d-flex justify-content-between px-5 w-100 m-0">
    //     <Row className="d-flex w-auto justify-content-start align-items-start text-start flex-column">
    //         <h2 className="aditional-color f-poppings f-14 fw-normal w-auto">Avalição:</h2>
    //         <Figure className="d-flex align-items-center gap-2 w-auto m-0 p-0">
    //           <Figure.Image
    //             width='30px'
    //             height='30px'
    //             alt="calendario"
    //             src="/assets/icons/star.svg"
    //             className="m-0"
    //           />
    //           <Figure.Caption className="d-flex flex-column">
    //             <span className="f-roboto f-22 text-color fw-bold">4.9</span>
    //           </Figure.Caption>
    //         </Figure>
    //       </Row>
    //       <Row className="d-flex w-auto justify-content-start align-items-start text-start flex-column">
    //         <h2 className="aditional-color f-poppings f-14 fw-normal w-auto">Negócios:</h2>
    //         <Figure className="d-flex align-items-center gap-2 w-auto m-0 p-0">
    //           <Figure.Image
    //             width='30px'
    //             height='30px'
    //             alt="calendario"
    //             src="/assets/icons/handshake.svg"
    //             className="m-0"
    //           />
    //           <Figure.Caption className="d-flex flex-column">
    //             <span className="f-roboto f-22 text-color fw-bold">300</span>
    //           </Figure.Caption>
    //         </Figure>
    //       </Row>
    //     </Row>
    //   </Card.Body>
    // </Card>
  );
}

export default CardProfile
