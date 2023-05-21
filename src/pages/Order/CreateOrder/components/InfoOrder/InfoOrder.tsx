import "./style.scss";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button, Fab, Input, InputAdornment, InputLabel, MobileStepper, useTheme } from "@mui/material";
import { InterestForm } from "../../../../../shared/components/InterestForm/InterestForm";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UploadImage } from "../UploadImage/UploadImage";
import { File } from "../File/File";
import { useState } from "react";
import { uniqueId } from 'lodash';
import { filesize } from "filesize";



export function InfoOrder(props: any) {
  const theme = useTheme();

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

  const handleDelete = id => {
    props.setUploadedFiles(props.uploadedFiles.filter(file => file.id !== id))
  }

  const handleImageChange = (file) => {
    props.formData.Foto.includes(file);
  };

  const handleUpload = files => {
    const filesUpload = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      preview: URL.createObjectURL(file),
      readableSize: filesize(file.size),
      uploaded: false,
      error: false,
      url: null,
    }))
    props.setUploadedFiles(props.uploadedFiles.concat(filesUpload));
    setField("Foto",filesUpload);
  };

  return (
    <Grid container className="pt-4 px-0" maxWidth={"100%"}>
      <Grid item xs={12} className="p-0 mb-3">
        <InterestForm formData={props.formData} setFormData={props.setFormData} errors={props.errors} setErrors={props.setErrors} />
      </Grid>
      <Grid item md={5} xs={12} className="p-0 mb-3">
        <Box>
          <UploadImage onUpload={handleUpload} />
          {!!props.uploadedFiles.length && (
            <File files={props.uploadedFiles} onDelete={handleDelete} />
          )}
        </Box>
      </Grid>
      <Grid item md={7} className="ps-4 mb-3">
        <Grid item xs={12} className="p-0 mb-3">
          <Typography variant="body2" className="f-18">
            Titulo:
          </Typography>
          <TextField
            error={!!props.errors.title}
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
            error={!!props.errors.description}
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
              error={!!props.errors.maxValue}
              id="maxValue"
              name="maxValue"
              fullWidth
              type="number"
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
}

