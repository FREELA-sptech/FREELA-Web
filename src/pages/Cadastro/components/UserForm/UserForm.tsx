import { useState } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { createUser } from "../../../../services/userService";
import { object } from "prop-types";
import { notBlank, isValidCPF, emailValidation, passwordValidation } from "../../../../shared/scripts/validators";

export function UserForm(props: any) {
    console.log(props.formData);
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
        <Col>
            <Form.Group>
                <Form.Label>
                    Usuario
                </Form.Label>
                <Form.Control
                    onChange={(e) => setField("userName", e.target.value)}
                    name="userName"
                    size="lg"
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
                    isInvalid={!!props.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {props.errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" label="Concordo com os termos" required />
            </Form.Group>
        </Col>

    )
}