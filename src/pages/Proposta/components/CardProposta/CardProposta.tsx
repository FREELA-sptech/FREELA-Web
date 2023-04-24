
import { Form, InputGroup } from "react-bootstrap";
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import "./style.scss"
import { useEffect, useState } from "react";
import { notBlank } from "../../../../shared/scripts/validators";
import { MdAttachMoney, MdDescription } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CardProposta(props: any) {

  const { setShow } = props;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    maxValue: '',
    deadline: ''
  });
  const [errors, setErrors] = useState({
    description: '',
    maxValue: '',
    deadline: ''
  });
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

  const validateForm = () => {
    const { maxValue, deadline, description, } = formData;
    const newErros = {
      description: '',
      maxValue: '',
      deadline: ''
    }

    if (notBlank(description)) {
      newErros.description = "O campo descrição não pode estar vazio";
    } else if (description.length < 30) {
      newErros.description = "O campo descrição deve ter pelo menos 30 caracteres";
    }
    if (notBlank(maxValue)) {
      newErros.maxValue = "O campo Valor máximo não pode estar vazio";
    }
    if (notBlank(deadline)) {
      newErros.deadline = "O campo prazo não pode estar vazio";
    }

    return newErros;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const errors = validateForm();
      const valores = Object.values(errors);
      const errorsValues = valores.every(valor => valor === "");
      if (!errorsValues) {
        setErrors(errors);
      } else {
        setFormData(formData);
        setShow(true);
        const timeoutId = setTimeout(() => {
          setShow(false);
          navigate('/home');
        }, 1500);
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column align-self-start">
        <div>
          <h4>Orçamento</h4>
        </div>
        <div className="d-flex justify-content-start gap-lg-3 flex-wrap">
          <Form.Group>
            <Form.Label>
              Valor que você deseja receber
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend"><MdAttachMoney /></InputGroup.Text>
              <Form.Control
                onChange={(e) => setField("maxValue", e.target.value)}
                name="maxValue"
                size="lg"
                value={formData.maxValue}
                type="number"
                isInvalid={!!errors.maxValue}
              />
              <Form.Control.Feedback type="invalid">
                {errors.maxValue}
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
              value={formData.deadline}
              size="lg"
              type="date"
              isInvalid={!!errors.deadline}
            />
            <Form.Control.Feedback type="invalid">
              {errors.deadline}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="info-line">
          <h4>Detalhes</h4>
          <Form.Group>
            <Form.Label>
              Descrição
            </Form.Label>
            <Form.Control
              onChange={(e) => setField("description", e.target.value)}
              as="textarea"
              name="description"
              value={formData.description}
              size="lg"
              type="description"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="p-2">
            <button type="submit" className="primary-standart">
              Confirmar
            </button>
            <button onClick={() => navigate('/home')} type="button" className="primary-text">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}


export default CardProposta