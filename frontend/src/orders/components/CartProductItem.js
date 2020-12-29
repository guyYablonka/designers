import React from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { Container, Row, Col } from "react-bootstrap";
import AuthInput from "../../users/components/AuthInput";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./CartProductItem.css";

const CartProductItem = (props) => {
  const [formState, inputHandler] = useForm(
    {
      amount: {
        value: props.amount,
        isValid: true,
      },
    },
    false
  );
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
              <h4>{"price: " + props.price + "$"}</h4>

              <h4>{"size: " + props.size}</h4>
            </Col>
            <Col>
              <h4>{"gender: " + (props.gender === "M" ? "Men" : "Women")}</h4>
              <h4>{"color: " + props.color}</h4>
            </Col>
            <Col>
              <h4>amount:</h4>
              <AuthInput
                id={"amount"}
                type={"number"}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={formState.inputs.amount.value}
                initialValid={formState.inputs.amount.isValid}
                onInput={inputHandler}
                error={"amount is not available"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default CartProductItem;
