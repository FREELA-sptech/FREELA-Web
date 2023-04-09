import { Container, Row, Col, Figure } from "react-bootstrap";
import "./style.scss";

function MobileBanner() {
  return (
    <section className="ad-background">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} className="d-flex flex-column justify-content-center align-items-center">
            <Row className="w-100 content-background d-flex flex-column justify-content-center align-items-center">
              <Col lg={8} className="d-flex flex-column justify-content-center align-items-center" >
                <h1 className="text-uppercase category text-center">Tenha tudo isso em suas mãos</h1>
                <h1 className="big-title text-uppercase text-center">EM BREVE NO MOBILE</h1>
                <p className="summary text-center">Embora nossa plataforma já seja totalmente responsiva em aparelhos mobile, com a versão exclusiva para dispositivos móveis poderemos oferecer recursos e funcionalidades ainda mais aprimorados, garantindo que a navegação seja mais rápida e intuitiva.</p>
              </Col>
              <Col lg={12}>
                <Figure className="figure-container justify-self-end w-100">
                  <Figure.Image
                    width={"100%"}
                    height={180}
                    alt="171x180"
                    src="assets/images/mockup-smartphone.svg"
                  />
                </Figure>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default MobileBanner;
