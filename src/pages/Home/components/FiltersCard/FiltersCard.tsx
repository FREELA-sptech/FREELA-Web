import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import './style.scss'

function FiltersCard(props: any) {
  const {handleSelectDataByInterest} = props;
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-helper-label">Ordernar:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Ordernar:"
          onChange={(e) => handleSelectDataByInterest(e.target.value)}
        >
          <MenuItem value={"low-price"}>Menor Preço</MenuItem>
          <MenuItem value={"high-price"}>Maior Preço</MenuItem>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </>
  );
}

export default FiltersCard
