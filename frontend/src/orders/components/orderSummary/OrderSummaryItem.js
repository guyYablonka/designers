import React from "react";
import { Card, Row, Col } from "react-bootstrap";

import "./OrderSummaryItem.css";

const OrderSummaryItem = (props) => {
  return (
    <Card>
      <Row>
        <Col sm={4}>
          <img className="item-image" src={props.image} alt={props.name} />
        </Col>
        <Col>
          <Row>
            <Col>
              <h5>{props.name}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className="item-info">{"price: " + props.price + "$"}</h6>
            </Col>
            <Col>
              <h6 className="item-info">{"amount: " + props.amount}</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className="item-info">{"color: " + props.color}</h6>
            </Col>
            <Col>
              <h6 className="item-info">{"size: " + props.size}</h6>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderSummaryItem;
