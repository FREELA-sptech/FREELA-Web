import { Accordion, Col, Figure, Form, ListGroup } from "react-bootstrap";
import "./style.scss";
import { useEffect, useState } from "react";
import { getCategoriesService } from "../../../services/categoriesService";

export function InterestForm(props: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<[]>();

  const getCategories = () => {
    getCategoriesService()
      .then((res) => {
        setItems(res.data)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckBoxChange = (event: any) => {
    const { value } = event.target;

    props.setDataCategory((dataSelected: any) => {
      if (dataSelected.includes(value)) {
        return dataSelected.filter((val: any) => val !== value);
      } else {
        return [...props.dataCategory, value];
      }
    });

  };
  const filteredItems = items?.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          {filteredItems?.map((item: any) => (
            <Form.Check
              className="checkbox d-flex align-items-center flex-row-reverse"
              key={item.id}
              type="checkbox"
            >
              <Form.Check.Input type="checkbox" id={`checkbox-${item.id}`} value={item.id} className="checkbox-input" checked={props.dataCategory.includes(item.id)} onChange={handleCheckBoxChange} />
              <Form.Check.Label htmlFor={`checkbox-${item.id}`} className="w-100" title={"Clique para selecionar a categoria " + item.name}>{item.name}</Form.Check.Label>
            </Form.Check>
          ))}
        </Form.Group>
        <p>Categorias Selecionadas: {props.dataCategory.length}</p>
      </Col>
    </Col >

  )
}
