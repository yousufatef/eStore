import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Elagamy &copy; {currentYear} || Powered by Youssef Atef</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
