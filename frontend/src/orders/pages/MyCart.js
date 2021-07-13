import React from "react";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

import CartProductList from "../components/CartProductList";
import "./MyCart.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const MyCart = (props) => {
  return props.cart.length ? (
    <Container>
      <Row>
        <Col>
          <h3 className="title">Your Shopping Cart</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <CartProductList cartProducts={props.cart} />
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
