import { Col, Form, InputGroup } from "react-bootstrap";

export function UserForm(props: any) {
    // console.log(props.formData)
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
        <Col className="container-form d-flex flex-column justify-content-center align-items-stretch">
            <Form.Group>
                <Form.Label>
                    Usuario
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("userName", e.target.value)}
                    name="userName"
                    size="lg"
                    value={props.formData.userName}
                    type="name"
                    isInvalid={!!props.errors.userName}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.userName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Nome
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("name", e.target.value)}
                    name="name"
                    value={props.formData.name}
                    size="lg"
                    type="name"
                    isInvalid={!!props.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Email
                </Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                        onChange={(e) => setField("email", e.target.value)}
                        name="email"
                        size="lg"
                        type="text"
                        value={props.formData.email}
                        placeholder=""
                        aria-describedby="inputGroupPrepend"
                        isInvalid={!!props.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.errors.email}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    CPF
                </Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        onChange={(e) => setField("cpf", e.target.value)}
                        name="cpf"
                        size="lg"
                        type="text"
                        placeholder=""
                        value={props.formData.cpf}
                        aria-describedby="inputGroupPrepend"
                        isInvalid={!!props.errors.cpf}
                    />
                    <Form.Control.Feedback type="invalid">
                        {props.errors.cpf}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Senha
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("password", e.target.value)}
                    size="lg"
                    type="password"
                    name="password"
                    value={props.formData.password}
                    isInvalid={!!props.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.password}
                </Form.Control.Feedback>
            </Form.Group>
        </Col>

    )
}