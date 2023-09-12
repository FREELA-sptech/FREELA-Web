import { Figure } from "react-bootstrap";
import "./style.scss";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserAPI } from "../../../../api/userApi";
import { ExternalAPI } from "../../../../api/externalApi";
import { UserStorage } from "../../../../store/userStorage";
import SnackbarContext from "../../../../hooks/useSnackbar";
import AvatarProfile from "./components/AvatarProfile/AvatarProfile";
import DetailsProfile from "./components/DetailsProfile/DetailsProfile";
import EditProfileIcons from "./components/EditProfileIcons/EditProfileIcons";
import EditProfile from "./components/EditProfile/EditProfile";

function CardProfile(props: any) {
  const [userDetailsData, setUserDetailsData] = useState<any>({});
  const [userEditDetails, setUserEditDetails] = useState<any>({});
  const [userEditErrorDetails, setUserEditErrorDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [editing, setEditing] = useState(false);
  const [disableInputs, setDisableInputs] = useState(false);
  const [ufsData, setUfsData] = useState<any>([]);
  const [citysData, setCitysData] = useState<any>([]);
  const { showSnackbar } = useContext(SnackbarContext);
  const { userDetails, uploadPicture, updateUser, userDetailsById } = UserAPI();
  const { setIsFreelancer, isFreelancer, userId } = props;

  useEffect(() => {
    if (userId) {
      userDetailsById(userId)
        .then((res) => {
          updateUserData(res.data);
          setIsFreelancer(res.data.closedOrders != undefined);
          setLoading(false);
        })
        .catch((error) => {
          showSnackbar(true, error.response.data);
        });
    } else {
      setIsFreelancer(UserStorage.getIsFreelancerLocalStorage());
      userDetails()
        .then((res) => {
          updateUserData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          showSnackbar(true, error.response.data);
        });
    }
  }, []);

  const setField = (field: any, value: any) => {
    setUserEditDetails({
      ...userEditDetails,
      [field]: value,
    });

    if (!!userEditErrorDetails[field]) {
      setUserEditErrorDetails({
        ...userEditErrorDetails,
        [field]: null,
      });
    }
  };

  const updateUserData = (user: any) => {
    const initalEditingValues = {
      name: user.name,
      city: user.city,
      uf: user.uf,
      description: user.description,
      subCategoryId: user.subCategories,
    };

    setUserEditDetails(initalEditingValues);
    setUserDetailsData(user);
  };

  const getUFS = () => {
    getCitys(userEditDetails.uf);
    ExternalAPI.getUFS()
      .then((res) => {
        const ufs = res.data.map((response: any) => {
          return response.sigla;
        });

        setUfsData(ufs);
        setDisableInputs(false);
      })
      .catch(() => {
        showSnackbar(true, "Problemas para buscar as UFS");
      });
  };

  const getCitys = (uf: string) => {
    uf !== userEditDetails.uf && (userEditDetails.city = "");
    setField("uf", uf);
    ExternalAPI.getCitys(uf)
      .then((res) => {
        const citys = res.data.map((response: any) => {
          return response.nome;
        });

        setCitysData(citys);
        setDisableInputs(false);
      })
      .catch(() => {
        showSnackbar(true, "Problemas para buscar as Cidades");
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true);
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const formData = new FormData();
        formData.append("image", file);
        uploadPicture(formData)
          .then((res) => {
            userDetailsData.profilePhoto = res.data.profilePhoto;
            setUserDetailsData(userDetailsData);
            showSnackbar(false, "Imagem atualizada com sucesso");
          })
          .catch((error) => {
            showSnackbar(true, error.response.data);
          })
          .finally(() => {
            setLoadingImage(false);
          });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEdit = () => {
    getUFS();
    setDisableInputs(true);
    setEditing(true);
  };

  const handleCloseEdit = () => {
    setEditing(false);
  };

  const handleSendEdit = () => {
    const isArrayOfNumbers = userEditDetails.subCategoryId.every(
      (element: any) => typeof element === "number"
    );

    if (!isArrayOfNumbers) {
      userEditDetails.subCategoryId = userEditDetails.subCategoryId.map(
        (value: any) => {
          return value.id;
        }
      );
    }

    updateUser(userEditDetails)
      .then((res) => {
        updateUserData(res.data);
        setEditing(false);
        showSnackbar(false, "Informações atualizadas com sucesso!");
      })
      .catch((error) => {
        showSnackbar(true, error.response.data);
      });
  };

  return (
    <Box
      className="pb-4 overflow-hidden"
      sx={{
        backgroundColor: "white",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <Box className="d-flex flex-column px-5 py-4">
        <Box display="flex" position="relative" paddingTop='20px'>
          <AvatarProfile
            loading={loading}
            editing={editing}
            loadingImage={loadingImage}
            namePhoto={userDetailsData.name}
            profilePhoto={userDetailsData.profilePhoto}
            handleImageChange={handleImageChange}
          />

          <Box paddingLeft='30px'>
            {!editing ? (
              <DetailsProfile
                loading={loading}
                name={userDetailsData.name}
                city={userDetailsData.city}
                uf={userDetailsData.uf}
                description={userDetailsData.description}
                subCategories={userDetailsData.subCategories}
                isFreelancer={isFreelancer}
              />
            ) : (
              <EditProfile
                editing={editing}
                disableInputs={disableInputs}
                ufsData={ufsData}
                citysData={citysData}
                userEditDetails={userEditDetails}
                userEditErrorDetails={userEditErrorDetails}
                setField={setField}
                getCitys={getCitys}
                setUserEditDetails={setUserEditDetails}
                setUserEditErrorDetails={setUserEditErrorDetails}
                isFreelancer={isFreelancer}
                handleCloseEdit={handleCloseEdit}
                handleSendEdit={handleSendEdit}
                handleEdit={handleEdit}
              />
            )}
          </Box>

          <EditProfileIcons
            editing={editing}
            handleCloseEdit={handleCloseEdit}
            handleSendEdit={handleSendEdit}
            handleEdit={handleEdit}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CardProfile;
