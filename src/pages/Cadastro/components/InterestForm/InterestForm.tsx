import { Accordion, Col, Figure, Form, ListGroup } from "react-bootstrap";
import "./style.scss";
export function InterestForm(props: any) {

    return (
        <Col>
            <Col>
                <h3 className="sub-title">Você é um:</h3>
                <Form.Check className="options-personas">
                    <Form.Check.Input type={"radio"} id={"cliente"} />
                    <Form.Check.Label>
                        Cliente
                    </Form.Check.Label>
                </Form.Check>
                <Form.Check className="options-personas">
                    <Form.Check.Input type={"radio"} id={"freelancer"} />
                    <Form.Check.Label>
                        Autônomo
                    </Form.Check.Label>
                </Form.Check>
            </Col>
            <Col>
                <button className="button-base primary-standart w-100">Selecione seus Interesses</button>
            </Col>
        </Col >

    )
}