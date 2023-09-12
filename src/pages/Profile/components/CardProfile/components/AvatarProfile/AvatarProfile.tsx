import React from "react";
import {
  Box,
  Skeleton,
  Avatar,
  Fab,
  Input,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface UserDetailsProps {
  loading: boolean;
  editing: boolean;
  loadingImage: boolean;
  namePhoto: string;
  profilePhoto: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarProfile: React.FC<UserDetailsProps> = ({
  loading,
  editing,
  loadingImage,
  namePhoto,
  profilePhoto,
  handleImageChange,
}) => {
  return (
    <>
      {loading ? (
        <Box
          sx={{
            backgroundColor: "white",
            height: "158px",
            width: "158px",
            padding: "4px",
            borderRadius: "50%",
          }}
        >
          <Skeleton variant="circular" width={150} height={150} />
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
            src={`data:image/png;base64,${profilePhoto}`}
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
              left: '190px'
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
