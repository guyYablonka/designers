import React from "react";
import { USERS } from "../../users/pages/MyProfile";
import OrderSummaryList from "../components/orderSummary/OrderSummaryList";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ShippingAddress from "../components/shippingAddress/ShippingAddress";
import "./Payment.css";

const Payment = (props) => {
  const user = USERS.find((user) => user.userId === "u1");

  const placeOrder = () => {};

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Card className="full-screen">
            <Container className="space-properties">
              <ShippingAddress userData={user} />
            </Container>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="half-screen">
            <Container>
              <h3 className="might-like">Products you might like</h3>
            </Container>
          </Card>
          <Card className="half-screen">
            <Container>
              <h2>Payment</h2>
            </Container>
          </Card>
        </Col>
        <Col sm={4}>
          <Card border="secondary" className="three-quarters-screen">
            <Card.Header>
              <h2>Order Summary</h2>
            </Card.Header>
            <Container>
              <OrderSummaryList cart={props.cart} />
            </Container>
          </Card>
          <Button
            variant="secondary"
            onClick={placeOrder}
            className="order-place"
            size="lg"
            block
          >
            PLACE ORDER
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
