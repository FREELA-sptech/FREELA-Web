import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";

function Footer() {
    return (
        <Container fluid className="footer-background d-flex justify-content-center align-items-center">
            <Container>
                <Row lg={12} className="d-flex justify-content-between align-items-center flex-wrap">
                    <Col sm={12} lg={6}>
                        <h1 className="logo">freela</h1>
                        <h1 className="subtitle">© 2023 FREELA Corp. - Todos os direitos reservados</h1>
                    </Col>
                    <Col sm={12} lg={6} className="container-social-media d-flex justify-content-center align-items-center flex-wrap">
                        <a href="" className="link-social-media"><img src="/assets/icons/instagram.svg" alt="" /></a>
                        <a href="" className="link-social-media"><img src="/assets/icons/twitter.svg" alt="" /></a>
                        <a href="" className="link-social-media"><img src="/assets/icons/github.svg" alt="" /></a>
                        <a href="" className="link-social-media"><img src="/assets/icons/linkedin.svg" alt="" /></a>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Footer;