import { Accordion, Col, Figure, Form, ListGroup } from "react-bootstrap";
import "./style.scss";
import { useEffect, useState } from "react";
import { CategoriesAPI } from "../../../api/categoriesApi";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Autocomplete, Box, Checkbox, InputLabel, TextField, Typography } from "@mui/material";

export function InterestForm(props: any) {

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];
  // const [searchTerm, setSearchTerm] = useState('');
  // const [items, setItems] = useState<[]>();

  // const getCategories = () => {
  //   CategoriesAPI.getCategories()
  //     .then((res) => {
  //       setItems(res.data)
  //     })
  // }

  // useEffect(() => {
  //   getCategories()
  // }, [])

  // const handleSearchChange = (event: any) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleCheckBoxChange = (event: any) => {
  //   const { value } = event.target;

  //   props.setDataCategory((dataSelected: any) => {
  //     console.log(dataSelected)
  //     if (dataSelected.includes(value)) {
  //       return dataSelected.filter((val: any) => val !== Number(value));
  //     } else {
  //       return [...props.dataCategory, Number(value)];
  //     }
  //   });
  // };

  // const filteredItems = items?.filter((item: any) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Autocomplete
      fullWidth
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <Box>
          <Typography variant="body2" className="f-18">
            Selecione as Categorias:
          </Typography>
          <TextField
            {...params}
            helperText=" "
          />
        </Box>
      )}
    />


    // <Col>
    //   <Col className="d-flex flex-column align-items-center justify-content-center gap-3">
    //     <Form.Control
    //       type="text"
    //       placeholder="Busque categorias"
    //       value={searchTerm}
    //       size="lg"
    //       onChange={handleSearchChange}
    //     />

    //     <Form.Group className="item-checkbox w-100">
    //       {filteredItems?.map((item: any) => (
    // <Form.Check
    //   className="checkbox d-flex align-items-center flex-row-reverse"
    //   key={item.id}
    //   type="checkbox"
    // >
    //           <Form.Check.Input type="checkbox" id={`checkbox-${item.id}`} value={item.id} className="checkbox-input" checked={props.dataCategory.includes(item.id)} onChange={handleCheckBoxChange} />
    //           <Form.Check.Label htmlFor={`checkbox-${item.id}`} className="w-100" title={"Clique para selecionar a categoria " + item.name}>{item.name}</Form.Check.Label>
    //         </Form.Check>
    //       ))}
    //     </Form.Group>
    //     <p>Categorias Selecionadas: {props.dataCategory.length}</p>
    //   </Col>
    // </Col >

  )
}
