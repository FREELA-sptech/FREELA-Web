import React, { useEffect } from "react";
import {
  Box,
  Skeleton,
  Avatar,
  Fab,
  Input,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { UserStorage } from "../../../../../../store/userStorage";

interface UserDetailsProps {
  loading: boolean;
  editing: boolean;
  loadingImage: boolean;
  namePhoto: string;
  photo: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarProfile: React.FC<UserDetailsProps> = ({
  loading,
  editing,
  loadingImage,
  namePhoto,
  photo,
  handleImageChange,
}) => {
  useEffect(() => {
    photo && UserStorage.setPhotoUserLocalStorage(photo)
  }, [photo])

  return (
    <>
      {loading ? (
        <Box
          sx={{
            backgroundColor: "white",
            height: "258px",
            width: "258px",
            padding: "4px",
            borderRadius: "50%",
          }}
        >
          <Skeleton variant="circular" width={250} height={250} />
        </Box>
      ) : (
        <Box position='relative' height='auto'>
          <Avatar
            sx={{
              width: 250,
              height: 250,
              bgcolor: "#274C77",
              border: "4px solid white",
            }}
            alt={namePhoto}
            src={photo ? `data:image/png;base64, ${photo}` : "/assets/images/profile.png"}
          />
          <Fab
            component="label"
            size="medium"
            color="primary"
            aria-label="add"
            disabled={loadingImage}
            sx={{
              position: 'absolute',
              top: '190px',
              left: '190px',
              zIndex: 1
            }}
          >
            <Input type="file" hidden onChange={handleImageChange} />
            {loadingImage ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <AddIcon />
            )}
          </Fab>
        </Box>
      )}
    </>
  );
};

export default AvatarProfile;
