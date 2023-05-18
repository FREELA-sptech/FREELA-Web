import "./style.scss";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Autocomplete, Box, Checkbox, TextField, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoriesAPI } from "../../../api/categoriesApi";
import { styled, lighten, darken } from '@mui/system';
import useSnackbar from "../../../hooks/useSnackbar";

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
  const [SnackbarComponent, showSnackbar] = useSnackbar();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const setField = (field: any, value: any) => {
    props.setFormData({
      ...props.formData, [field]: value
    })

    if (!!props.errors[field]) {
      props.setErrors({
        ...props.errors, [field]: null
      })
    }
  }

  useEffect(() => {
    props.errors.subCategoryId && showSnackbar(true, props.errors.subCategoryId)
  }, [props.errors])

  useEffect(() => {
    CategoriesAPI.getSubCategories()
      .then((res) => {
        setSubCategories(res.data)
        setSelectedItems(props.formData.subCategoryId)
      })
      .catch((error) => {
        showSnackbar(true, error.response.data);
      })
  }, [])


  return (
    <Box>
      <SnackbarComponent />
      <Box sx={{ gap: 0 }}>
        <Typography variant="body2" className="f-12">
          Busque as Categorias:
        </Typography>
        <Autocomplete
          multiple
          renderTags={() => null}
          className="d-flex flex-column"
          id="checkboxes-tags-demo"
          options={subCategories}
          value={selectedItems}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          groupBy={(option) => option.category.name}
          noOptionsText="Nenhuma Categoria"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, newValue) => {
            const ids = newValue.map((value: any) => {
              return value.id
            })
            setField("subCategoryId", ids)
            setSelectedItems(newValue)
          }}
          renderOption={(props, option) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selectedItems.some((item: any) => item.id === option.id)}
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              helperText={
                props.errors.subCategoryId
                  ? (
                    <Typography variant="body2" className="f-14">
                      {props.errors.subCategoryId || " "}
                    </Typography>
                  )
                  : " "
              }
            />
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
        />
        <Box sx={{ minHeight: '200px' }}>
          <Box sx={{ padding: '15px 0 0 0', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {selectedItems.map((item: any) => (
              <Chip
                key={item.id}
                label={item.name}
                onDelete={() => {
                  const newItems = selectedItems.filter((itemFilter: any) => itemFilter.name !== item.name)

                  const ids = newItems.map((value: any) => {
                    return value.id
                  })

                  setField("subCategoryId", ids)
                  setSelectedItems(newItems)
                }}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
