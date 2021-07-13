import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./CartProductItem.css";

const CartProductItem = (props) => {
  const detailView = (detail) => {
    return <h4>{detail}</h4>;
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <img
            src={props.image}
            alt={props.name}
            className="image-of-product"
          />
        </Col>
        <Col>
          <Row>
            <h2>{props.name}</h2>
          </Row>
          <Row md={4}>
            <Col>
              {detailView(`price: ${props.price}$`)}
              {detailView(`size: ${props.details.size}`)}
            </Col>
            <Col>
              {detailView(
                `gender: ${props.details.gender === "M" ? "Men" : "Women"}`
              )}
              {detailView(`color: ${props.details.color}`)}
            </Col>
            <Col>{detailView(`amount: ${props.amount}`)}</Col>
          </Row>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default CartProductItem;
