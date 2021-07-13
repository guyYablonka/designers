import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import {
  Button,
  Alert,
  Dropdown,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { PRODUCTS } from "./FilteredProducts";
import "./ProductInfo.css";

const ProductInfo = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [size, setSize] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [gender, setGender] = useState(null);
  const productId = useParams().productId;
  const currentProduct = PRODUCTS.find(
    (product) => product.id === Number(productId)
  );

  const selectedProduct = {
    id: currentProduct.id,
    name: currentProduct.name,
    details: {
      gender: gender,
      size: size,
      color: productColor,
    },
    price: currentProduct.price,
    designer: currentProduct.designer,
    image: currentProduct.image,
    rank: currentProduct.rank,
    productType: currentProduct.productType,
  };

  const addToCartHandler = () => {
    setShowAlert(true);
    const itemAlreadyInCart = props.cart.find(
      (item) =>
        item.id === selectedProduct.id &&
        haveSameData(item.details, selectedProduct.details)
    );
    if (itemAlreadyInCart) {
      itemAlreadyInCart.amount++;
    } else {
      props.cart.push({ ...selectedProduct, amount: 1 });
    }
  };

  const haveSameData = (obj1, obj2) => {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
      return Object.keys(obj1).every(
        (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
      );
    }
    return false;
  };

  const chooseSizeHandler = (index) => {
    selectedProduct.size = currentProduct.availableSizes[index || 0];
    setSize(selectedProduct.size);
  };

  const chooseColorHandler = (index) => {
    selectedProduct.color = currentProduct.availableColors[index || 0];
    setProductColor(selectedProduct.color);
  };

  const chooseMenHandler = () => {
    selectedProduct.gender = "M";
    setGender("Men");
  };

  const chooseWomenHandler = () => {
    selectedProduct.gender = "W";
    setGender("Women");
  };

  const validatePropertiesWereSelected = (details = {}) => {
    return Object.values(details).some((detail) => detail === null);
  };

  return (
    <Container>
      {showAlert && (
        <Alert variant="success">
          the product added succefuly to your cart!
        </Alert>
      )}
      <Row>
        <Col md={4}>
          <Card className="card-size">
            <img
              className="product-image"
              src={currentProduct.image}
              alt={currentProduct.name}
            />
            <Button
              variant="secondary"
              className="add-cart-button"
              onClick={addToCartHandler}
              disabled={validatePropertiesWereSelected(selectedProduct.details)}
            >
              I want it!
            </Button>
          </Card>
        </Col>
        <Col md={8}>
          <h2>{currentProduct.name.toUpperCase()}</h2>
          <hr />
          <h3>{"Price: " + currentProduct.price + "$"}</h3>
          <h3>
            {"Rank: "}
            <StarRatings
              rating={currentProduct.rank}
              starRatedColor="#ffb266"
              starDimension="30px"
              starSpacing="1px"
            />
          </h3>
          <h3>{"designer: " + currentProduct.designer}</h3>
          <hr />
          <Row>
            <Col>
              <Row>
                <Dropdown>
                  <Dropdown.Toggle className="dropdown" variant="secondary">
                    Size
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {currentProduct.availableSizes.map((size) => (
                      <Dropdown.Item
                        key={size}
                        eventKey={currentProduct.availableSizes.indexOf(size)}
                        onSelect={(index) => chooseSizeHandler(index)}
                      >
                        {size}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <h2 className="center">{size}</h2>
            </Col>
            <Col>
              <Row>
                <Dropdown>
                  <Dropdown.Toggle className="dropdown" variant="secondary">
                    Color
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {currentProduct.availableColors.map((color) => (
                      <Dropdown.Item
                        key={color}
                        eventKey={currentProduct.availableColors.indexOf(color)}
                        onSelect={(index) => chooseColorHandler(index)}
                      >
                        {color}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <h2 className="center">{productColor}</h2>
            </Col>
            <Col>
              <Row>
                <Dropdown>
                  <Dropdown.Toggle className="dropdown" variant="secondary">
                    Gender
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {currentProduct.availableGender.Men && (
                      <Dropdown.Item onClick={chooseMenHandler}>
                        Men
                      </Dropdown.Item>
                    )}
                    {currentProduct.availableGender.Women && (
                      <Dropdown.Item onClick={chooseWomenHandler}>
                        Women
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <h2 className="center">{gender}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <h2 className="center">Description: {currentProduct.description}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
