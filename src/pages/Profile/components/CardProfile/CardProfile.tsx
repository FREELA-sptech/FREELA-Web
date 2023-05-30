import { Figure } from "react-bootstrap";
import "./style.scss"
import { Alert, Autocomplete, Avatar, AvatarGroup, Box, Chip, CircularProgress, Dialog, Grid, Input, Skeleton, TextField, Typography } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { UserAPI } from "../../../../api/userApi";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HtmlTooltip from "../../../../shared/tools/MuiTooltipCustom";
import Snackbar from '@mui/material/Snackbar';
import { ExternalAPI } from "../../../../api/externalApi";
import { InterestForm } from "../../../../shared/components/InterestForm/InterestForm";
import { UserStorage } from "../../../../store/userStorage";
import SnackbarContext from "../../../../hooks/useSnackbar";



function CardProfile(props: any) {
  const [userDetailsData, setUserDetailsData] = useState<any>({})
  const [userEditDetails, setUserEditDetails] = useState<any>({})
  const [userEditErrorDetails, setUserEditErrorDetails] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [loadingImage, setLoadingImage] = useState(false)
  const [editing, setEditing] = useState(false)
  const [disableInputs, setDisableInputs] = useState(false)
  const [ufsData, setUfsData] = useState<any>([])
  const [citysData, setCitysData] = useState<any>([])
  const { showSnackbar } = useContext(SnackbarContext);
  const { userDetails, uploadPicture, updateUser, userDetailsById } = UserAPI();
  const { setIsFreelancer, isFreelancer, userId } = props;

  useEffect(() => {
    if (userId) {
      userDetailsById(userId)
        .then((res) => {
          updateUserData(res.data)
          setIsFreelancer(res.data.closedOrders != undefined)
          setLoading(false)
        })
        .catch((error) => {
          showSnackbar(true, error.response.data);
        })
    } else {
      setIsFreelancer(UserStorage.getIsFreelancerLocalStorage())
      userDetails()
        .then((res) => {
          updateUserData(res.data)
          setLoading(false)
        })
        .catch((error) => {
          showSnackbar(true, error.response.data);
        })
    }
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
      description: user.description,
      subCategoryId: user.subCategories
    }

    setUserEditDetails(initalEditingValues)
    setUserDetailsData(user)
  }

  const getUFS = () => {
    getCitys(userEditDetails.uf)
    ExternalAPI.getUFS()
      .then((res) => {
        const ufs = res.data.map((response: any) => {
          return response.sigla
        })

        setUfsData(ufs)
        setDisableInputs(false)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para buscar as UFS");
      })
  }

  const getCitys = (uf: string) => {
    uf !== userEditDetails.uf && (userEditDetails.city = "")
    setField("uf", uf)
    ExternalAPI.getCitys(uf)
      .then((res) => {
        const citys = res.data.map((response: any) => {
          return response.nome
        })

        setCitysData(citys)
        setDisableInputs(false)
      })
      .catch(() => {
        showSnackbar(true, "Problemas para buscar as Cidades");
      })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true)
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const formData = new FormData();
        formData.append('image', file);
        uploadPicture(formData)
          .then((res) => {
            userDetailsData.profilePhoto = res.data.profilePhoto
            setUserDetailsData(userDetailsData)
            showSnackbar(false, "Imagem atualizada com sucesso");
          })
          .catch((error) => {
            showSnackbar(true, error.response.data);
          })
          .finally(() => {
            setLoadingImage(false)
          })
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEdit = () => {
    getUFS()
    setDisableInputs(true)
    setEditing(true)
  }

  const handleCloseEdit = () => {
    setEditing(false)
  }

  const handleSendEdit = () => {
    const isArrayOfNumbers = userEditDetails.subCategoryId.every(
      (element: any) => typeof element === "number"
    );

    if (!isArrayOfNumbers) {
      userEditDetails.subCategoryId = userEditDetails.subCategoryId.map((value: any) => {
        return value.id
      })
    }


    updateUser(userEditDetails)
      .then((res) => {
        updateUserData(res.data)
        setEditing(false)
        showSnackbar(false, "Informações atualizadas com sucesso!");
      })
      .catch((error) => {
        showSnackbar(true, error.response.data);
      })
  }

  return (
    <Box className="pb-4 overflow-hidden"
      sx={{
        backgroundColor: 'white',
        borderRadius: '16px 16px 0 0'
      }}
    >
      <Box className="position-relative d-flex flex-row gap-4"
        sx={{
          height: '200px',
          background: 'var(--ligth-contrast-color)'
        }}>
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
                bgcolor: "#274C77",
                border: '4px solid white',
                bottom: '-75px',
                left: '50px'
              }}
              alt={userDetailsData.name}
              src={`data:image/png;base64,${userDetailsData.profilePhoto}`}
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
        ) : !userId && (
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
                <span className="f-30 f-inter dark-contrast-color fw-bold">{userDetailsData.name}</span>
                <Box className="h-100 d-flex flex-row align-items-center pb-2">
                  <span className="aditional-color f-16">{userDetailsData.rate}</span>
                  <StarIcon color="primary" sx={{ fontSize: '12px' }} />
                </Box>
              </Box>
              <span className="text-color fw-normal f-poppings aditional-color">{userDetailsData.city}, {userDetailsData.uf}</span>
              {isFreelancer ? (
                <span className="py-3 f-poppings aditional-color f-16">
                  "{userDetailsData.description}"
                </span>
              ) : null}
              <h1 className="text-color f-18 f-inter fw-bold mt-3">
                {isFreelancer ? "Minhas Especialidades" : "Meus Interesses"}
              </h1>
              <Box className="w-auto d-flex flex-wrap gap-2">
                <AvatarGroup max={500} className="d-flex">
                  {userDetailsData &&
                    userDetailsData.subCategories.map((categories: any) => (
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
                        <Avatar
                          sx={{
                            bgcolor: "#274C77",
                            border: '4px solid white'
                          }}
                          alt={categories.name}
                          src={`data:image/png;base64,asdasd`}
                        />
                      </HtmlTooltip>
                    ))
                  }
                </AvatarGroup>
              </Box>
            </>
          )}
        </Box>
      ) : (
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
                variant="standard"
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
            <Grid item container spacing={2} lg={12} className="ms-0 p-0">
              <Grid item lg={3} xs={3} className="ps-0">
                <Typography variant="body2" className="f-12">
                  UF:
                </Typography>
                <Autocomplete
                  id="uf-autocomplete"
                  options={ufsData}
                  value={userEditDetails.uf}
                  disabled={disableInputs}
                  noOptionsText="Não Encontrado"
                  onKeyUp={(e: any) => {
                    const selectedValue = e.target.textContent || e.target.defaultValue
                    if (ufsData.includes(selectedValue) || selectedValue === '') {
                      getCitys(selectedValue)
                    }
                  }}
                  onSelect={(e: any) => {
                    const selectedValue = e.target.textContent || e.target.defaultValue
                    if (ufsData.includes(selectedValue) || selectedValue === '') {
                      getCitys(selectedValue)
                    }
                  }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      error={Boolean(userEditErrorDetails.uf)}
                      id="uf"
                      name="uf"
                      autoComplete="uf-autocomplete"
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
              <Grid item lg={9} xs={9}>
                <Typography variant="body2" className="f-12">
                  Cidade:
                </Typography>
                <Autocomplete
                  id="city-autocomplete"
                  options={citysData}
                  value={userEditDetails.city}
                  disabled={disableInputs || !userEditDetails.uf}
                  onKeyUp={(e: any) => {
                    const selectedValue = e.target.textContent || e.target.defaultValue
                    if (citysData.includes(selectedValue) || selectedValue === '') {
                      setField("city", selectedValue)
                    }
                  }}
                  onSelect={(e: any) => {
                    const selectedValue = e.target.textContent || e.target.defaultValue
                    if (citysData.includes(selectedValue) || selectedValue === '') {
                      setField("city", selectedValue)
                    }
                  }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      error={Boolean(userEditErrorDetails.city)}
                      id="city"
                      name="city"
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
                    />
                  }
                />
              </Grid>
            </Grid>
            {isFreelancer ? (
              <Grid item xs={12} lg={12}>
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
            ) : null}
          </Grid>
          <Grid item container xs={12} md={6} lg={5}>
            <Grid item xs={12}>
              <InterestForm formData={userEditDetails} setFormData={setUserEditDetails} errors={userEditErrorDetails} setErrors={setUserEditErrorDetails} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box >
  );
}

export default CardProfile
