import { Form } from "react-bootstrap";
import { InterestForm } from "../../../../shared/components/InterestForm/InterestForm";
import { useState } from "react";

export function Portfólio(props: any) {
    const { project } = props;
    const [dataCategory, setDataCategory] = useState([]);

    if (project) return (
        <Form className="container-form-update d-flex flex-column ">
            <Form.Group>
                <Form.Label>
                    Titulo
                </Form.Label>
                <Form.Control
                    name="title"
                    size="lg"
                    type="name"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Descrição
                </Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    size="lg"
                    type="description"
                />
            </Form.Group>
            <h4>Categorias</h4>
            <InterestForm dataCategory={dataCategory} setDataCategory={setDataCategory} />
            <Form.Group>
                <Form.Label>
                    Capa ( png / jpeg )
                </Form.Label>
                <Form.Control
                    name="deadline"
                    size="lg"
                    type="date"
                />
            </Form.Group>
            <button type="submit" className="buttonBase primary-standart">Atualizar</button>
        </Form>
    )
    else return (
        <Form className="container-form-update d-flex flex-column ">
            <Form.Group>
                <Form.Label>
                    Titulo
                </Form.Label>
                <Form.Control
                    name="title"
                    size="lg"
                    type="name"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Descrição
                </Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    size="lg"
                    type="description"
                />
            </Form.Group>
            <h4>Categorias</h4>
            <InterestForm dataCategory={dataCategory} setDataCategory={setDataCategory} />
            <Form.Group>
                <Form.Label>
                    Capa ( png / jpeg )
                </Form.Label>
                <Form.Control
                    name="deadline"
                    size="lg"
                    type="date"
                />
            </Form.Group>
            <button type="submit" className="buttonBase primary-standart">Atualizar</button>
        </Form>
    )

}