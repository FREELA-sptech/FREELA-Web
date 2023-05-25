import "./style.scss";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button, Fab, Input, InputAdornment, InputLabel, MobileStepper, useTheme } from "@mui/material";
import { InterestForm } from "../../../../../shared/components/InterestForm/InterestForm";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { File } from "../../../../../shared/components/File/File";
import { DateField } from '@mui/x-date-pickers/DateField';


export function InfoOrder(props: any) {
  const theme = useTheme();
  const updatedFormData = { ...props.formData };

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

  const handleDelete = (name: any) => {
    setField("photo", props.formData.photo.filter((file: any) => file.name !== name))
    props.setUploadedFiles(props.uploadedFiles.filter((file: any) => file.name !== name))
  }

  const handleImageChange = (file: any) => {
    props.formData.photo.includes(file);
  };

  const handleUpload = (event: any) => {
    const files = Array.from(event.target.files);

    const newFiles: any[] = props.uploadedFiles || []
    const newPhotos: any[] = props.formData.photo || []

    files.forEach((fileData: any) => {
      if (fileData) {
        const reader = new FileReader();
        const readerUrl = new FileReader();

        reader.onloadend = () => {
          !props.formData.photo.includes(fileData) && newPhotos.push(fileData)
          setField("photo", newPhotos);
        };

        readerUrl.onloadend = () => {
          const fileObject = {
            name: fileData.name,
            data: readerUrl.result,
          };

          !props.uploadedFiles.includes(fileObject) && newFiles.push(fileObject)
          props.setUploadedFiles(newFiles);
        }

        reader.readAsArrayBuffer(fileData);
        readerUrl.readAsDataURL(fileData);
      }
    });
  };

  return (
    <Grid container className="pt-4 px-0" maxWidth={"100%"}>
      <Grid item md={5} xs={12} className="p-0 mb-5">
        <File files={props.uploadedFiles} onDelete={handleDelete} onUpload={handleUpload} />
      </Grid>
      <Grid item md={7} xs={12} className="ps-0 mb-3">
        <Grid item xs={12} className="p-0 mb-3">
          <Typography variant="body2" className="f-12">
            Titulo:
          </Typography>
          <TextField
            error={!!props.errors.title}
            id="title"
            name="title"
            fullWidth
            value={props.formData.title}
            autoComplete="given-name"
            variant="standard"
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
          <Typography variant="body2" className="f-12">
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
        <Grid container item xs={12} className="p-0 mb-3">
          <Grid item xs={6} className="p-0 pe-2 mb-3">
            <Typography variant="body2" className="f-12">
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
              variant="standard"
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
            <Typography variant="body2" className="f-12">
              Prazo Dias:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                fullWidth
                variant="standard"
                value={props.formData.expirationTime}
                onChange={() => { }}
                className="p-0"
                slotProps={{
                  textField: {
                    helperText: props.errors.expirationTime ? (
                      <Typography variant="body2" className="f-14">
                        {props.errors.expirationTime}
                      </Typography>
                    ) : null
                  }
                }}
                format="DD"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="p-0 mb-3">
        <InterestForm formData={props.formData} setFormData={props.setFormData} errors={props.errors} setErrors={props.setErrors} />
      </Grid>
    </Grid>
  )
}

