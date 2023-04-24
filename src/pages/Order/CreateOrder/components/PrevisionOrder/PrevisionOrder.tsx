import { Col, Form, InputGroup } from "react-bootstrap"
import { MdAttachMoney } from "react-icons/md"

export function PrevisionOrder(props: any) {
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
                    Valor maximo que você deseja pagar
                </Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend"><MdAttachMoney /></InputGroup.Text>
                    <Form.Control
                        onChange={(e) => setField("maxValue", e.target.value)}
                        name="maxValue"
                        size="lg"
                        value={props.formData.maxValue}
                        type="number"
                        isInvalid={!!props.errors.maxValue}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.errors.maxValue}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Prazo
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("deadline", e.target.value)}
                    name="deadline"
                    value={props.formData.deadline}
                    size="lg"
                    type="date"
                    isInvalid={!!props.errors.deadline}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.deadline}
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
    )
}