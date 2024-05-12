import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import contact from "../image/contact.png";
import Map from "../contact/Location"; // Đảm bảo đường dẫn đến component Map đúng
import FormContainer from "./FormContainer";
import "./style.css";

const ContactScreen = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <img className="contact-img" src={contact} alt="contact-img" />
          <div className="contact-header">
            <h1>Liên hệ với chúng tôi</h1>
            <p>
              Những ý kiến đóng góp của các bạn sẽ giúp chúng tôi hoàn thiện hơn
              trong tương lai. Cảm ơn!
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormContainer>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>
                  <i className="fas fa-user"></i> Tên:
                </Form.Label>
                <Form.Control type="text" placeholder="Nhập tên của bạn..." />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>
                  <i className="fas fa-envelope"></i> Email:
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn..."
                />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Label>
                  <i className="fas fa-pen"></i> Lời nhắn:
                </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                className="signin-btn"
                block
              >
                Gửi
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col md={6}>
          <Map
            type="text/javascript"
            src="https://www.bing.com/api/maps/mapcontrol?key=YOUR_BING_MAPS_API_KEY&callback=loadMapScenario"
            async
            defer
          />
        </Col>
      </Row>
    </div>
  );
};

export default ContactScreen;
