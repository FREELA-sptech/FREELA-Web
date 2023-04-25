import { Container, Figure, Form, InputGroup, Row } from "react-bootstrap";
import { MdAttachMoney } from "react-icons/md";

export function ProposalUpdate() {
    return (
        <Container>
            <Row>
                <Figure className="d-flex align-items-center gap-2" style={{ padding: '1px' }}>
                    <Row style={{
                        borderRadius: '99%',
                        padding: '3px',
                        margin: 0,
                        width: '50px',
                        height: '43px',
                        backgroundColor: 'var(--contrast-background-color)',
                        overflow: 'hidden'
                    }}>
                        <Figure.Image
                            width='100%'
                            height='100%'
                            style={{ padding: 0 }}
                            alt="dollar"
                            src="https://www.ogol.com.br/img/jogadores/58/976658_med__20230131161334_cassio.png"
                            className="m-0"
                        />
                    </Row>
                    <Figure.Caption className="w-100 d-flex align-items-center justify-content-between">
                        <div className="d-flex flex-column">
                            <span className="text-color fw-bold f-16 f-inter">Cassio Ramos</span>
                            <span className="f-12 f-roboto fw-semibold">Design</span>
                        </div>
                        <Figure className="d-flex align-items-center m-0">
                            <Figure.Image
                                width='15px'
                                height='15px'
                                alt="dollar"
                                src="/assets/icons/star.svg"
                                className="m-0"
                            />
                            <Figure.Caption className="f-14 f-inter">
                                4.9
                            </Figure.Caption>
                        </Figure>
                    </Figure.Caption>
                </Figure>
            </Row>
            <Row>
                <Form className="d-flex flex-column gap-3">
                    <Form.Group>
                        <Form.Label>
                            Valor que você espera receber
                        </Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend"><MdAttachMoney /></InputGroup.Text>
                            <Form.Control
                                name="maxValue"
                                size="lg"
                                type="number"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Prazo de entrega
                        </Form.Label>
                        <Form.Control
                            name="deadline"
                            size="lg"
                            type="date"
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

                    <button type="submit" className="buttonBase primary-standart">Atualizar</button>
                </Form>
            </Row>
        </Container>
    )
}