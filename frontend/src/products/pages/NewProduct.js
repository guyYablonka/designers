import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  Card,
  Container,
  Col,
  Row,
  InputGroup,
  Button,
  Dropdown,
} from "react-bootstrap";
import AuthInput from "../../users/components/AuthInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBERS,
} from "../../shared/util/validators";

import "./NewProduct.css";

const NewProduct = () => {
  const [productType, setProductType] = useState(null);
  const [productSizes] = useState(null);
  const [productColors] = useState(null);
  const [productGenders, setProductGenders] = useState(null);
  const productCategories = ["suits", "shirts", "shoes"];

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const newProduct = {
    name: formState.inputs.name.value,
    type: productType,
    availableGenders: productGenders,
    availableSizes: productSizes,
    availableColors: productColors,
    price: formState.inputs.price.value,
    designer: null,
    rank: null,
    image: null,
    description: formState.inputs.description.value,
    dateUploaded: null,
  };

  const chooseTypeHandler = (index) => {
    setProductType(productCategories[index || 0]);
  };

  const chooseMenHandler = () => {
    setProductGenders("M");
  };

  const chooseWomenHandler = () => {
    setProductGenders("W");
  };

  const dispathItem = () => {
    console.log(newProduct);
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className="card-image-size">
            <i className="fas fa-image image-icon"></i>
            <Button variant="secondary">Add Sketch or Prototype</Button>
          </Card>
        </Col>
        <Col>
          <Row>
            <Col md={5}>
              <h2>Product Name:</h2>
            </Col>
            <Col>
              <AuthInput
                id={"name"}
                type={"text"}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={formState.inputs.name.value}
                initialValid={formState.inputs.name.isValid}
                onInput={inputHandler}
                error={"the name of product is require."}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  Product Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {productCategories.map((type) => (
                    <Dropdown.Item
                      key={type}
                      eventKey={productCategories.indexOf(type)}
                      onSelect={(index) => chooseTypeHandler(index)}
                    >
                      {type}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <h2>{newProduct.type}</h2>
            </Col>
          </Row>

          <hr />
          <Row>
            <Col>
              <h3>Sizes:</h3>
            </Col>
            <Col>
              <h3>Colors:</h3>
            </Col>
            <Col>
              <h3>
                Genders:
                <i
                  className={
                    productGenders === "M"
                      ? "fas fa-male genders-picked"
                      : "fas fa-male genders-switch"
                  }
                  onClick={chooseMenHandler}
                ></i>
                <i
                  className={
                    productGenders === "W"
                      ? "fas fa-female genders-picked"
                      : "fas fa-female genders-switch"
                  }
                  onClick={chooseWomenHandler}
                ></i>
              </h3>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Price Offer:</InputGroup.Text>
                </InputGroup.Prepend>
                <AuthInput
                  id={"price"}
                  type={"number"}
                  validators={[VALIDATOR_NUMBERS()]}
                  initialValue={formState.inputs.price.value}
                  initialValid={formState.inputs.price.isValid}
                  onInput={inputHandler}
                  error={"the price of the product is require."}
                />
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h3>Description:</h3>
          <AuthInput
            id={"description"}
            type={"text"}
            validators={[]}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
            onInput={inputHandler}
          />
          <Button
            variant="secondary"
            className="button-done"
            onClick={dispathItem}
          >
            DONE!
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProduct;
