import { Figure } from "react-bootstrap";
import "./style.scss"
import { Alert, Autocomplete, Avatar, Box, CircularProgress, Dialog, Grid, Input, Skeleton, TextField, Typography } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { UserAPI } from "../../../../api/userApi";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HtmlTooltip from "../../../../shared/tools/MuiTooltipCustom";
import uf from "../../../../shared/tools/StateBrazilJSON";
import Snackbar from '@mui/material/Snackbar';



function CardProfile() {
  const [userDetails, setUserDetails] = useState<any>({})
  const [userEditDetails, setUserEditDetails] = useState<any>({})
  const [userEditErrorDetails, setUserEditErrorDetails] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [loadingImage, setLoadingImage] = useState(false)
  const [editing, setEditing] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertData, setAlertData] = useState<any>({})

  useEffect(() => {
    UserAPI.userDetails(4)
      .then((res) => {
        updateUserData(res.data)
        setLoading(false)
      })
      .catch((res) => {
        setOpenAlert(true)
        setAlertData({
          isError: true,
          message: res.response.data
        })
      })
  }, [])

  const setField = (field: any, value: any) => {
    setUserEditDetails({
      ...userEditDetails, [field]: value
    })

    if (!!userEditErrorDetails[field]) {
      setUserEditErrorDetails({
        ...userEditErrorDetails, [field]: null
      })
    }
  }

  const updateUserData = (user: any) => {
    const initalEditingValues = {
      name: user.name,
      city: user.city,
      uf: user.uf,
      description: user.description
    }

    setUserEditDetails(initalEditingValues)
    setUserDetails(user)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true)
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const formData = new FormData();
        formData.append('image', file);

        UserAPI.uploadPicture(4, formData)
          .then((res) => {
            userDetails.profilePhoto = res.data.profilePhoto
            setUserDetails(userDetails)
            setOpenAlert(true)
            setAlertData({
              isError: false,
              message: "Imagem atualizada com sucesso"
            })
          })
          .catch((error) => {
            setOpenAlert(true)
            setAlertData({
              isError: true,
              message: res.response.data
            })
          })
          .finally(() => {
            setLoadingImage(false)
          })
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCloseEdit = () => {
    setEditing(false)
  }

  const handleSendEdit = () => {
    UserAPI.updateUser(4, userEditDetails)
      .then((res) => {
        updateUserData(res.data)
        setEditing(false)
        setOpenAlert(true)
        setAlertData({
          isError: false,
          message: "Informações atualizadas com sucesso!"
        })
      })
      .catch((res) => {
        setOpenAlert(true)
        setAlertData({
          isError: true,
          message: res.response.data
        })
      })
  }

  return (
    <Box className="pb-4 overflow-hidden"
      sx={{
        backgroundColor: 'white',
        borderRadius: '16px 16px 0 0'
      }}
    >
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => {setOpenAlert(false)}}>
        <Alert onClose={() => {setOpenAlert(false)}} severity={alertData.isError ? "error" : "success"} sx={{ width: '100%' }}>
          {alertData.message}
        </Alert>
      </Snackbar>
      <Box className="position-relative d-flex flex-row gap-4" sx={{ height: '200px', backgroundColor: 'blue' }}>
        {loading ? (
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
          <>
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
              src={`data:image/png;base64,${userDetails.profilePhoto}`}
            />
            {editing && (
              <Fab
                component="label"
                className="position-absolute"
                size="small"
                color="primary"
                aria-label="add"
                sx={{
                  bottom: '-75px',
                  left: '150px'
                }}
                disabled={loadingImage}
              >
                <Input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
                {loadingImage ? <CircularProgress color="secondary" size={20} /> : <AddIcon />}
              </Fab>
            )}
          </>
        )}
        {editing ? (
          <Box
            className="position-absolute"
            sx={{
              bottom: '-55px',
              cursor: 'pointer',
              right: '50px'
            }}
          >
            <ClearIcon onClick={handleCloseEdit} sx={{ fontSize: '30px', marginRight: '5px' }} color="error" />
            <DoneIcon onClick={handleSendEdit} sx={{ fontSize: '30px' }} color="success" />
          </Box>
        ) : (
          <EditIcon
            onClick={handleEdit}
            className="position-absolute"
            sx={{
              bottom: '-55px',
              cursor: 'pointer',
              right: '50px'
            }}
          />
        )}
      </Box>
      {!editing ? (
        <Box className="d-flex flex-column px-5" sx={{ paddingTop: '100px' }}>
          {loading ? (
            <>
              <Skeleton width={200} height={50} />
              <Skeleton width={150} height={20} />
              <Skeleton width={650} height={30} />
              <h1 className="text-color f-18 f-inter fw-bold mt-2">Minhas Especialidades</h1>
              <Skeleton width={350} height={60} />
            </>
          ) : (
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
      ) : (
        <Grid container xs={12} lg={12} className="d-flex flex-column px-5" sx={{ paddingTop: '100px' }}>
          <Grid item lg={5} className="p-0 mb-3">
            <Typography variant="body2" className="f-12">
              Nome:
            </Typography>
            <TextField
              error={Boolean(userEditErrorDetails.name)}
              id="name"
              name="name"
              fullWidth
              value={userEditDetails.name}
              autoComplete="given-name"
              variant="outlined"
              helperText={
                userEditErrorDetails.name
                  ? (
                    <Typography variant="body2" className="f-14">
                      {userEditErrorDetails.name || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("name", e.target.value)}
            />
          </Grid>
          <Grid container spacing={2} lg={5} className="ms-0">
            <Grid item lg={8} className="pt-0 ps-0">
              <Typography variant="body2" className="f-12">
                Cidade:
              </Typography>
              <TextField
                error={Boolean(userEditErrorDetails.city)}
                id="city"
                name="city"
                fullWidth
                value={userEditDetails.city}
                autoComplete="given-name"
                variant="standard"
                helperText={
                  userEditErrorDetails.city
                    ? (
                      <Typography variant="body2" className="f-14">
                        {userEditErrorDetails.city || " "}
                      </Typography>
                    )
                    : " "
                }
                onChange={(e) => setField("city", e.target.value)}
              />
            </Grid>
            <Grid item lg={4} className="pt-0">
              <Typography variant="body2" className="f-12">
                UF:
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={uf}
                value={userEditDetails.uf}
                onChange={(e) => {
                  setField("uf", e.target.textContent)
                }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    error={Boolean(userEditErrorDetails.uf)}
                    id="uf"
                    name="uf"
                    autoComplete="given-name"
                    variant="standard"
                    helperText={
                      userEditErrorDetails.uf
                        ? (
                          <Typography variant="body2" className="f-14">
                            {userEditErrorDetails.uf || " "}
                          </Typography>
                        )
                        : " "
                    }
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="body2" className="f-12">
              Descrição:
            </Typography>
            <TextField
              error={Boolean(userEditErrorDetails.description)}
              id="description"
              name="description"
              fullWidth
              value={userEditDetails.description}
              variant="outlined"
              helperText={
                userEditErrorDetails.description
                  ? (
                    <Typography variant="body2" className="f-14">
                      {userEditErrorDetails.description || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("description", e.target.value)}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      )}
    </Box >
  );
}

export default CardProfile
