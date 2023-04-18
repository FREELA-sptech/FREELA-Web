import { Accordion, Figure, Form, ListGroup } from "react-bootstrap";
import './style.scss'

function FiltersCard() {
  return (
    <Accordion className="d-flex flex-column gap-2" alwaysOpen>
      <Accordion.Item eventKey="0" className="filters-card-background">
        <Accordion.Header className="filters-card-header">
          <Figure.Image
            width='40px'
            height='40px'
            alt="icone filtro"
            src="assets/icons/ordenation.svg"
            className="m-0"
          />
          Ordenar
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="filters-card-background">
        <Accordion.Header className="filters-card-header">
          <Figure.Image
            width='40px'
            height='40px'
            alt="icone filtro"
            src="assets/icons/ordenation.svg"
            className="m-0"
          />
          Ordenar
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
              Mais Recente
              <Form.Check className="checkbox" aria-label="option 1" />
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FiltersCard
