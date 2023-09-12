import React from 'react';
import { Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';

interface EditProfileIconsProps {
  editing: boolean;
  userId?: string;
  handleCloseEdit: () => void;
  handleSendEdit: () => void;
  handleEdit: () => void;
}

const EditProfileIcons: React.FC<EditProfileIconsProps> = ({
  editing,
  userId,
  handleCloseEdit,
  handleSendEdit,
  handleEdit,
}) => {
  const { id } = useParams();

  return id == userId ? (
    <>
      {editing ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
          }}
        >
          <ClearIcon
            onClick={handleCloseEdit}
            color="error"
            sx={{
              fontSize: '30px',
              marginRight: '5px',
            }}
          />
          <DoneIcon
            onClick={handleSendEdit}
            sx={{ fontSize: '30px' }}
            color="success"
          />
        </Box>
      ) : (
        !userId && (
          <EditIcon
            onClick={handleEdit}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
          />
        )
      )}
    </>
  ) : null;
};

export default EditProfileIcons;
