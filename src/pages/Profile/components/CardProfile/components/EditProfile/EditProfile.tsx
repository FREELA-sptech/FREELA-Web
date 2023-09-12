import React from "react";
import { Grid, Typography, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { InterestForm } from "../../../../../../shared/components/InterestForm/InterestForm";

interface EditProfileProps {
  editing: boolean;
  userId?: string;
  disableInputs: boolean;
  ufsData: string[];
  citysData: string[];
  userEditDetails: {
    name: string;
    uf: string;
    city: string;
    description: string;
  };
  userEditErrorDetails: {
    name?: string;
    uf?: string;
    city?: string;
    description?: string;
  };
  setField: (field: string, value: string) => void;
  getCitys: (selectedUF: string) => void;
  setUserEditDetails: React.Dispatch<React.SetStateAction<any>>;
  setUserEditErrorDetails: React.Dispatch<React.SetStateAction<any>>;
  isFreelancer: boolean;
  handleCloseEdit: () => void;
  handleSendEdit: () => void;
  handleEdit: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  editing,
  userId,
  disableInputs,
  ufsData,
  citysData,
  userEditDetails,
  userEditErrorDetails,
  setField,
  getCitys,
  setUserEditDetails,
  setUserEditErrorDetails,
  isFreelancer,
  handleCloseEdit,
  handleSendEdit,
  handleEdit,
}) => {
  return (
    <Grid
      item
      container
      spacing={3}
      xs={12}
      lg={12}
      className="px-5"
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        item
        container
        xs={12}
        md={6}
        lg={5}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
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
              userEditErrorDetails.name ? (
                <Typography variant="body2" className="f-14">
                  {userEditErrorDetails.name || " "}
                </Typography>
              ) : (
                " "
              )
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
                const selectedValue =
                  e.target.textContent || e.target.defaultValue;
                if (ufsData.includes(selectedValue) || selectedValue === "") {
                  getCitys(selectedValue);
                }
              }}
              onSelect={(e: any) => {
                const selectedValue =
                  e.target.textContent || e.target.defaultValue;
                if (ufsData.includes(selectedValue) || selectedValue === "") {
                  getCitys(selectedValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(userEditErrorDetails.uf)}
                  id="uf"
                  name="uf"
                  autoComplete="uf-autocomplete"
                  variant="standard"
                  helperText={
                    userEditErrorDetails.uf ? (
                      <Typography variant="body2" className="f-14">
                        {userEditErrorDetails.uf || " "}
                      </Typography>
                    ) : (
                      " "
                    )
                  }
                />
              )}
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
                const selectedValue =
                  e.target.textContent || e.target.defaultValue;
                if (citysData.includes(selectedValue) || selectedValue === "") {
                  setField("city", selectedValue);
                }
              }}
              onSelect={(e: any) => {
                const selectedValue =
                  e.target.textContent || e.target.defaultValue;
                if (citysData.includes(selectedValue) || selectedValue === "") {
                  setField("city", selectedValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(userEditErrorDetails.city)}
                  id="city"
                  name="city"
                  variant="standard"
                  helperText={
                    userEditErrorDetails.city ? (
                      <Typography variant="body2" className="f-14">
                        {userEditErrorDetails.city || " "}
                      </Typography>
                    ) : (
                      " "
                    )
                  }
                />
              )}
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
                userEditErrorDetails.description ? (
                  <Typography variant="body2" className="f-14">
                    {userEditErrorDetails.description || " "}
                  </Typography>
                ) : (
                  " "
                )
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
          <InterestForm
            formData={userEditDetails}
            setFormData={setUserEditDetails}
            errors={userEditErrorDetails}
            setErrors={setUserEditErrorDetails}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
