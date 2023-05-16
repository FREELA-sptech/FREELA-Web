import { Col, Form, Row } from "react-bootstrap";
import "./style.scss";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Fab, Input, InputAdornment, InputLabel, MobileStepper, useTheme } from "@mui/material";
import { InterestForm } from "../../../../../shared/components/InterestForm/InterestForm";
import { KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { styled } from "@mui/system";


export function InfoOrder(props: any) {
  const setField = (field: any, value: any) => {
    props.setFormData({
      ...props.formData, [field]: value
    });
    if (!!props.errors[field]) {
      props.setErrors({
        ...props.errors, [field]: null
      });
    }
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState<any>([]);
  const maxSteps = images.length;

  const handleDragOver = (event : any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const DragAndDropContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    border: "2px dashed #ccc",
    borderRadius: 4,
    cursor: "pointer",
  });

  const handleDrop = (event : any) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImages((prevImages : any) => [
        ...prevImages,
        { imgPath: reader.result, label: file.name },
      ]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleImage = (event : any) => {
    const file = event.target.files[0];
    setImages(file);
  };

  return (
    <Grid container className="pt-4 px-0" maxWidth={"100%"}>
      <Grid item xs={12} className="p-0 mb-3">
        <InterestForm />
      </Grid>
      <Grid item xs={5} className="p-0 mb-3">
      <Box>
      <DragAndDropContainer
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Typography variant="body2" className="f-18">
          Arraste e solte um arquivo aqui
          <input
          id="file-upload"
          type="file"
          hidden
          onChange={handleImage}
        />
        </Typography>
      </DragAndDropContainer>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
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
      {images.length > 0 && (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            // onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step : any, index : any) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: 'block',
                      maxWidth: 400,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
      )}
    </Box>
      </Grid>
      <Grid item xs={7} className="ps-4 mb-3">
        <Grid item xs={12} className="p-0 mb-3">
          <Typography variant="body2" className="f-18">
            Titulo:
          </Typography>
          <TextField
            error={Boolean(props.errors.title)}
            id="title"
            name="title"
            fullWidth
            value={props.formData.title}
            autoComplete="given-name"
            variant="outlined"
            helperText={
              props.errors.title
                ? (
                  <Typography variant="body2" className="f-14">
                    {props.errors.title || " "}
                  </Typography>
                )
                : " "
            }
            onChange={(e) => setField("title", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className="p-0 mb-3">
          <Typography variant="body2" className="f-18">
            Descrição:
          </Typography>
          <TextField
            error={Boolean(props.errors.description)}
            id="description"
            name="description"
            fullWidth
            value={props.formData.description}
            variant="outlined"
            helperText={
              props.errors.description
                ? (
                  <Typography variant="body2" className="f-14">
                    {props.errors.description || " "}
                  </Typography>
                )
                : " "
            }
            onChange={(e) => setField("description", e.target.value)}
            multiline
            rows={4}
          />
        </Grid>
        <Grid container xs={12} className="p-0 mb-3">
          <Grid item xs={6} className="p-0 pe-2 mb-3">
            <Typography variant="body2" className="f-18">
              Preço:
            </Typography>
            <TextField
              error={Boolean(props.errors.maxValue)}
              id="maxValue"
              name="maxValue"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={props.formData.maxValue}
              autoComplete="given-name"
              variant="outlined"
              helperText={
                props.errors.maxValue
                  ? (
                    <Typography variant="body2" className="f-14">
                      {props.errors.maxValue || " "}
                    </Typography>
                  )
                  : " "
              }
              onChange={(e) => setField("maxValue", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className="p-0 ps-2 mb-3">
            <Typography variant="body2" className="f-18">
              Prazo:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%' }}
                value={props.formData.deadline}
                onChange={(e) => setField("deadline", e.target.value)}
                className="p-0"
                slotProps={{
                  textField: {
                    helperText: props.errors.deadline ? (
                      <Typography variant="body2" className="f-14">
                        {props.errors.deadline}
                      </Typography>
                    ) : null
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

  // const setField = (field: any, value: any) => {
  //     props.setFormData({
  //         ...props.formData, [field]: value
  //     })
  //     if (!!props.errors[field]) {
  //         props.setErrors({
  //             ...props.errors, [field]: null
  //         })
  //     }

  // }
  // return (
  //     <Col className="container-form-info-order">
  //         <Form.Group>
  //             <Form.Label>
  //                 Titulo
  //             </Form.Label>
  //             <Form.Control
  //                 onChange={(e) => setField("title", e.target.value)}
  //                 name="userName"
  //                 size="lg"
  //                 value={props.formData.title}
  //                 type="name"
  //                 isInvalid={!!props.errors.title}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //                 {props.errors.title}
  //             </Form.Control.Feedback>
  //         </Form.Group>
  //         <Form.Group>
  //             <Form.Label>
  //                 Descrição
  //             </Form.Label>
  //             <Form.Control
  //                 onChange={(e) => setField("description", e.target.value)}
  //                 as="textarea"
  //                 name="description"
  //                 value={props.formData.description}
  //                 size="lg"
  //                 type="description"
  //                 isInvalid={!!props.errors.description}
  //             />
  //             <Form.Control.Feedback type="invalid">
  //                 {props.errors.description}
  //             </Form.Control.Feedback>
  //         </Form.Group>
  //     </Col>
  // )
}
