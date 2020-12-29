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

const ProductInfo = () => {
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
    gender: gender,
    size: size,
    color: productColor,
    price: currentProduct.price,
    designer: currentProduct.designer,
    image: currentProduct.image,
    rank: currentProduct.rank,
    productType: currentProduct.productType,
  };
  const addToCartHandler = () => {
    console.log(selectedProduct);
    setShowAlert(true);
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
