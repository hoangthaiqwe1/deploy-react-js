import { Col, Container, Row } from "react-bootstrap";
import "../../../public/contact.css";
import "../../../public/style.css";
function ContactComponent() {
  return (
    <>
      <Container fluid>
        <div className="box-contact">
          <div className="map-contact">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2660681654643!2d106.65356757486913!3d10.79092235892653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed189fa855d%3A0xf63e15bfce46baef!2sC%C3%B4ng%20ty%20TNHH%20-%20MONA%20MEDIA!5e0!3m2!1svi!2s!4v1701504294367!5m2!1svi!2s"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-us">
            <Row>
              <Col md={6} lg={4}>
                <div className="infor-contact">
                  <div className="icon-contact">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="content-contact">
                    <h3>Địa chỉ:</h3>
                    <p>319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM</p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="infor-contact">
                  <div className="icon-contact">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="content-contact">
                    <h3>Điện thoại:</h3>
                    <p>+84-347389536</p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="infor-contact">
                  <div className="icon-contact">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="content-contact">
                    <h3>Email:</h3>
                    <p>mona@mona.media</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ContactComponent;
