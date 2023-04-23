import { Container, Figure, Row } from "react-bootstrap";

export function ProposalDetails() {
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
            <Row className="d-flex flex-column justify-content-start my-3 gap-3">
                <Figure className="d-flex align-items-center gap-2 w-auto m-0">
                    <Figure.Image
                        width='30px'
                        height='30px'
                        alt="calendario"
                        src="/assets/icons/price.svg"
                        className="m-0"
                    />
                    <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                        Orçamento: <span className="f-roboto f-18 text-color fw-bold">R$: 200,00</span>
                    </Figure.Caption>
                </Figure>
                <Figure className="d-flex align-items-center gap-2 w-auto m-0">
                    <Figure.Image
                        width='30px'
                        height='30px'
                        alt="calendario"
                        src="/assets/icons/calendar.svg"
                        className="m-0"
                    />
                    <Figure.Caption className="d-flex flex-column f-12 f-poppings">
                        Prazo: <span className="f-roboto f-18 text-color fw-bold">7 dias</span>
                    </Figure.Caption>
                </Figure>
            </Row>
            <Row>
                <h4>Descrição</h4>
                <p>Com base em sua descrição, acredito que posso criar um site moderno e profissional que atenda às suas necessidades. Eu tenho ampla experiência em desenvolvimento de sites para empresas de diferentes segmentos, incluindo petshops. Eu posso garantir que o site será fácil de usar e acessível em todos os dispositivos.</p>
            </Row>
            <Row className="d-flex justify-content-between my-3 gap-2">
                <button className="success-standart w-auto d-flex align-items-center">
                    aceitar
                    <Figure.Image
                        width='20px'
                        height='15px'
                        alt="calendario"
                        src="/assets/icons/check.svg"
                        className="m-0 ms-1"
                    />
                </button>
                <button className="error-standart w-auto d-flex align-items-center">
                    recusar
                    <Figure.Image
                        width='20px'
                        height='15px'
                        alt="calendario"
                        src="/assets/icons/close-white.svg"
                        className="m-0 ms-1"
                    />
                </button>
            </Row>
        </Container>
    )
}