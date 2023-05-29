import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import './style.scss'

function FiltersCard(props: any) {
  const {handleSelectDataByInterest} = props;
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Filtrar:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Seus Interesses"
          onChange={(e) => handleSelectDataByInterest(e.target.value)}
        >
          <MenuItem value={"interest"}>Seus Interesses</MenuItem>
          <MenuItem value={"all"}>Todos</MenuItem>
        </Select>
        <FormHelperText>Selecione aqui como deseja listar os pedidos</FormHelperText>
      </FormControl>
    </>
  );
}

export default FiltersCard
