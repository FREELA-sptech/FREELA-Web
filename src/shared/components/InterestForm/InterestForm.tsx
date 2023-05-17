import "./style.scss";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Autocomplete, Box, Checkbox, TextField, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoriesAPI } from "../../../api/categoriesApi";
import { styled, lighten, darken } from '@mui/system';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export function InterestForm(props: any) {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([])

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    CategoriesAPI.getSubCategories()
    .then((res) => {
      console.log(res)
      setSubCategories(res.data)
    })
  }, [])

  return (
    <Box sx={{ gap: 0 }}>
      <Autocomplete
        fullWidth
        multiple
        renderTags={() => null}
        size="small"
        className="d-flex flex-column pt-3"
        id="checkboxes-tags-demo"
        options={subCategories}
        value={selectedItems}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        groupBy={(option) => option.category.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onChange={(event, newValue) => {
          setSelectedItems(newValue);
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selectedItems.some((item: any) => item.name === option.name)}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <Box>
            <Typography variant="body2" className="f-18">
              Busque as Categorias:
            </Typography>
            <TextField
              {...params}
            />
          </Box>
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
      <Box sx={{minHeight: '200px'}}>
        <Box sx={{ padding: '15px 0 0 0', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedItems.map((item: any) => (
            <Chip
              key={item.name}
              label={item.name}
              onDelete={() => {
                setSelectedItems(selectedItems.filter((itemFilter: any) => itemFilter.name !== item.name))
              }}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
