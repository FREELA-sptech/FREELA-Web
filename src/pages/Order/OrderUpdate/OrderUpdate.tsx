import { Form, InputGroup } from "react-bootstrap";
import { InterestForm } from "../../../shared/components/InterestForm/InterestForm";
import { useState } from "react";
import "./style.scss";
import { MdAttachMoney } from "react-icons/md";

export function OrderUpdate(props:any) {
    const {order} = props;
    const [dataCategory, setDataCategory] = useState([]);
    return (
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
            <Form.Group>
                <Form.Label>
                    Valor maximo que você deseja pagar
                </Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend"><MdAttachMoney /></InputGroup.Text>
                    <Form.Control
                        name="value"
                        size="lg"
                        type="number"
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Prazo
                </Form.Label>
                <Form.Control
                    name="deadline"
                    size="lg"
                    type="date"
                />
            </Form.Group>
            <h4>Categorias</h4>
            <InterestForm dataCategory={dataCategory} setDataCategory={setDataCategory} />
            <button type="submit" className="buttonBase primary-standart">Atualizar</button>
        </Form>
    )
}