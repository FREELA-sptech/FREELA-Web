import { useEffect, useState } from "react";

import { Col, Form, } from "react-bootstrap";
import "./style.scss";

import { getCategories } from "../../../services/userService";



export function InterestForm(props: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<any>();

  const getAllCategories = async () => {
    await getCategories()
      .then((res) => {
        setItems(res.data)
      })
  }

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckBoxChange = (event: any) => {
    const { value } = event.target;

    props.setDataCategory((dataSelected: any) => {
      return dataSelected.includes(value) ?
        dataSelected.filter((val: any) => val !== value) :
        [...props.dataCategory, value]
    });
  };

  const filteredItems = items && items.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    void getAllCategories()
  }, [])

  return (
    <Col>
      <Col className="d-flex flex-column align-items-center justify-content-center gap-3">
        <Form.Control
          type="text"
          placeholder="Busque categorias"
          value={searchTerm}
          size="lg"
          onChange={handleSearchChange}
        />
        <Form.Group className="item-checkbox w-100">
          {filteredItems && filteredItems.map((item: any) => (
            <Form.Check
              className="checkbox d-flex align-items-center flex-row-reverse"
              key={item.id}
              type="checkbox"
            >
              <Form.Check.Input type="checkbox" id={`checkbox-${item.id}`} value={item.name} className="checkbox-input" checked={props.dataCategory.includes(item.name)} onChange={handleCheckBoxChange} />
              <Form.Check.Label htmlFor={`checkbox-${item.id}`} className="w-100" title={"Clique para selecionar a categoria " + item.name}>{item.name}</Form.Check.Label>
            </Form.Check>
          ))}
        </Form.Group>
        <p>Categorias Selecionadas: {props.dataCategory.length}</p>
      </Col>
    </Col >
  )
}
