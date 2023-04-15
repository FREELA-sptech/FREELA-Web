import { useState } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { createUser } from "../../../services/userService";
import { object } from "prop-types";

export function FirstStep() {
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        cpf: '',
        password: ''
      });
    const [errors, setErrors] = useState({});

    const isValidCPF = (cpf: string): boolean=> {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove tudo que não é número
        if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos
      
        // Calcula o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let remainder = sum % 11;
        let digit = remainder < 2 ? 0 : 11 - remainder;
      
        if (parseInt(cpf.charAt(9)) !== digit) return false;
      
        // Calcula o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
          sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        remainder = sum % 11;
        digit = remainder < 2 ? 0 : 11 - remainder;
      
        return parseInt(cpf.charAt(10)) === digit;
      }

    const setField = (field: any, value: any) => {
        setFormData({
            ...formData, [field]: value
        })
        if (!!errors[field]) {
            setErrors({
                ...errors, [field]: null
            })
        }

    }

    const validateForm = ()=>{
        const {name,userName, email, cpf, password} = formData;
        const newErros = {
            name: '',
            userName: '',
            email: '',
            cpf: '',
            password: ''
          }

        if(!name || name === ""){
            newErros.name = "O campo nome não pode estar vazio";         
        }

        if(!userName || userName === ""){
            newErros.userName = "O campo usuário não pode estar vazio";         
        }

        const regex = /\S+@\S+\.\S+/;
        if(!email || email === ""){
            newErros.email = "O campo email não pode estar vazio";
        }else if(!regex.test(email)){
            newErros.email = "Email inválido";
        }

        if(!cpf || cpf === ""){
            newErros.cpf = "O campo CPF não pode estar vazio";
        }else if(!isValidCPF(cpf)){
            newErros.cpf = "CPF inválido";
        }

        if(!password || password === ""){
            newErros.password = "O campo senha não pode estar vazio";
        }else if(password.length < 8){
            newErros.password = "Senha muito curta";
        }

        return newErros;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const errors = validateForm();
            const valores = Object.values(errors);
            const errorsValues = valores.every(valor => valor === "");
            if(!errorsValues){
                setErrors(errors);
            }else{
                console.log(formData)
                const response = await createUser(formData);
            }
        } catch (error) {
            alert(error)
        }

    };
    return (
        <Col xs={12} md={12} lg={6} className="container-form d-flex flex-column justify-content-center align-items-center">
            <h1 className="title text-center">Cadastre-se ainda hoje</h1>
            <Form onSubmit={handleSubmit} className="form d-flex flex-column col-md-10 col-lg-8">
                <Form.Group>
                    <Form.Label>
                        Usuario
                    </Form.Label>
                    <Form.Control
                        onChange={(e)=> setField("userName",e.target.value)}
                        name="userName"
                        size="lg"
                        type="name"
                        isInvalid={!!errors.userName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.userName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Nome
                    </Form.Label>
                    <Form.Control
                        onChange={(e)=> setField("name",e.target.value)}
                        name="name"
                        size="lg"
                        type="name"
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.nome}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            onChange={(e)=> setField("email",e.target.value)}
                            name="email"
                            size="lg"
                            type="text"
                            placeholder=""
                            aria-describedby="inputGroupPrepend"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        CPF
                    </Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={(e)=> setField("cpf",e.target.value)}
                            name="cpf"
                            size="lg"
                            type="text"
                            placeholder=""
                            aria-describedby="inputGroupPrepend"
                            isInvalid={!!errors.cpf}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.cpf}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Senha
                    </Form.Label>
                    <Form.Control
                        onChange={(e)=> setField("password",e.target.value)}
                        size="lg"
                        type="password"
                        name="password"
                        isInvalid={!!errors.senha}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.senha}
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Concordo com os termos" required />
                </Form.Group>
                <button className="button-base primary-standart" type="submit">Criar conta</button>
            </Form>
        </Col>
    )
}