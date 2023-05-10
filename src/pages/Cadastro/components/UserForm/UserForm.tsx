import { Col, Form, InputGroup } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai"
import { BsFillPersonVcardFill, BsFillPersonFill } from "react-icons/bs"

export function UserForm(props: any) {
  const [showPassword, setShowPassword] = useState(false);

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
        <Form.Label className="f-roboto fw-bold">
          Nome:
        </Form.Label>
        <InputGroup>
          <AiOutlineUser
            className="position-absolute ms-2 h-100"
            style={{ zIndex: 99 }}
            fill="#274C77"
            size={"20px"}
          />
          <Form.Control
            className="rounded"
            style={{
              paddingLeft: "35px"
            }}
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
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label className="f-roboto fw-bold">
          CPF:
        </Form.Label>
        <InputGroup hasValidation>
          <BsFillPersonVcardFill
            className="position-absolute ms-2 h-100"
            style={{ zIndex: 99 }}
            fill="#274C77"
            size={"20px"}
          />
          <Form.Control
            className="rounded"
            style={{
              paddingLeft: "35px"
            }}
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
        <Form.Label className="f-roboto fw-bold">
          Usuario:
        </Form.Label>
        <InputGroup>
          <BsFillPersonFill
            className="position-absolute ms-2 h-100"
            style={{ zIndex: 99 }}
            fill="#274C77"
            size={"20px"}
          />
          <Form.Control
            className="rounded"
            style={{
              paddingLeft: "35px"
            }}
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
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label className="f-roboto fw-bold">
          Email:
        </Form.Label>
        <InputGroup hasValidation>
          <MdAlternateEmail
            className="position-absolute ms-2 h-100"
            style={{ zIndex: 99 }}
            fill="#274C77"
            size={"20px"}
          />
          <Form.Control
            className="rounded"
            style={{
              paddingLeft: "35px"
            }}
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
        <Form.Label className="f-roboto fw-bold">
          Senha:
        </Form.Label>
        <InputGroup>
          {showPassword ? (
            <AiFillEyeInvisible
              className="position-absolute ms-2 h-100"
              style={{ zIndex: 99 }}
              fill="#274C77"
              size={"20px"}
              onClick={() => { setShowPassword(false) }}
            />
          ) : (
            <AiFillEye
              className="position-absolute ms-2 h-100"
              style={{ zIndex: 99 }}
              fill="#274C77"
              size={"20px"}
              onClick={() => { setShowPassword(true) }}
            />
          )}
          <Form.Control
            className="rounded"
            style={{
              paddingLeft: "35px"
            }}
            onChange={(e) => setField("password", e.target.value)}
            size="lg"
            type={showPassword ? "text" :"password"}
            name="password"
            value={props.formData.password}
            isInvalid={!!props.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {props.errors.password}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Col>

  )
}
