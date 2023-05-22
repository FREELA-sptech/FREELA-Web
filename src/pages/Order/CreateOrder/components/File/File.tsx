import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import "./style.scss";
import { Chip, CircularProgress, Fab, Input } from '@mui/material';
import { UploadImage } from '../UploadImage/UploadImage';

export function File({ files, onDelete, onUpload }: any) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = files.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    step < files.length && setActiveStep(step);
  };

  return (
    <Box className="d-flex flex-column" sx={{ maxWidth: "100%", height: '100%', flexGrow: 1, position: 'relative' }}>
      <Fab
        component="label"
        className="position-absolute"
        size="small"
        color="primary"
        aria-label="add"
        sx={{
          top: '10px',
          left: '10px'
        }}
      // disabled={loadingImage}
      >
        <input
          type="file"
          multiple
          hidden
          onChange={onUpload}
        />
        {/* {loadingImage ? <CircularProgress color="secondary" size={20} /> : <AddIcon />} */}
        <AddIcon />
      </Fab>
      <Box style={{
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 50px)',
        display: maxSteps > 0 ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 6
      }}>
        <img
          style={{ height: 100, width: 100 }}
          src="/assets/images/no-picture.png"
          alt="Sem Foto" />
        <Typography>
          Nenhuma Foto Adicionada
        </Typography>
      </Box>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{
          height: 'auto',
          flexGrow: 1,
          position: 'relative'
        }}
      >
        {files.map((step: any, index: any) => (
          <div key={step.name} style={{ height: '100%', backgroundColor: 'var(--background-color)' }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box className="position-relative d-flex justify-content-center" sx={{ height: '100% !important' }}>
                <DeleteIcon
                  color='error'
                  className='position-absolute'
                  sx={{
                    right: 10,
                    top: 10,
                    height: 40,
                    width: 40,
                    cursor: 'pointer'
                  }}
                  onClick={() => {onDelete(step.name)}}
                />
                <Box
                  component="img"
                  sx={{
                    maxHeight: "100%",
                    display: 'block',
                    maxWidth: "100%",
                    overflow: 'hidden'
                  }}
                  src={step.data}
                  alt={step.name}
                />
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{
          height: 50,
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1 || maxSteps == 0}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
    // <Box className="container-files">
    //     {files.map(uploadedFile => (
    //         <li style={{ listStyle: 'none', display: "flex", padding: "20px", gap: "1rem" }}>
    //             <div className="preview">
    //                 <img className="img-preview" src={uploadedFile.preview} alt="" />
    //             </div>
    //             <div style={{
    //                 display: "flex",
    //                 flexDirection: "column",

    //             }}>
    //                 <h3 className="category">{uploadedFile.name}</h3>
    //                 <p>{uploadedFile.readableSize}
    //                 </p>
    //             </div>

    //             {!!uploadedFile.preview && !uploadedFile.error && (
    //                 <Chip label="Excluir" color="error" onClick={() => onDelete(uploadedFile.id)} />
    //             )}
    //             {uploadedFile.preview && !uploadedFile.error && (
    //                 <a href={uploadedFile.preview} target="_blank"><MdLink style={{ marginRight: 8 }} size={24} color="#222" /></a>
    //             )}
    //             {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
    //             {uploadedFile.error && <MdError size={24} color="#e57878" />}

    //         </li>
    //     ))}
    // </Box>
  );
}
