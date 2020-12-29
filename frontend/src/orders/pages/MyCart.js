import React from "react";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

import CartProductList from "../components/CartProductList";
import "./MyCart.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export const CART = [
  {
    id: "1",
    image: `https://m.media-amazon.com/images/I/A1vJUKBjc2L._AC_CLa%7C2140%2C2000%7C413ulahCjeL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_SX425._SX._UX._SY._UY_.png`,
    name: "blue nice shirt",
    price: 10.99,
    rank: 4.5,
    size: "S",
    gender: "M",
    color: "blue",
    amount: 2,
  },
];

const MyCart = () => {
  return CART.length ? (
    <Container>
      <Row>
        <Col>
          <h3 className="title">Your Shopping Cart</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <CartProductList cartProducts={CART} />
      </Row>
      <Row className="bottom">
        <Col md={{ span: 2, offset: 4 }}>
          <Button variant="secondary" className="go-shopping">
            <NavLink to="/" exact className="link-shopping">
              Keep Shopping!
            </NavLink>
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" className="go-shopping">
            <NavLink to="/payment" exact className="link-shopping">
              i would like to pay
            </NavLink>
          </Button>
        </Col>
      </Row>
    </Container>
  ) : (
    <Card className="no-products">
      <h2>you haven't add products to your cart yet.</h2>
      <Button variant="secondary" className="go-shopping">
        <NavLink to="/" exact className="link-shopping">
          Go Shopping!
        </NavLink>
      </Button>
    </Card>
  );
};

export default MyCart;
