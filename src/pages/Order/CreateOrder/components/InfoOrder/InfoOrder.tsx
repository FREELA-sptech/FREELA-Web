import { Col, Form } from "react-bootstrap";
import "./style.scss";

export function InfoOrder(props: any) {
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
    return (
        <Col className="container-form-info-order">
            <Form.Group>
                <Form.Label>
                    Titulo
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("title", e.target.value)}
                    name="userName"
                    size="lg"
                    value={props.formData.title}
                    type="name"
                    isInvalid={!!props.errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.title}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Descrição
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("description", e.target.value)}
                    as="textarea"
                    name="description"
                    value={props.formData.description}
                    size="lg"
                    type="description"
                    isInvalid={!!props.errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.description}
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
    )
}