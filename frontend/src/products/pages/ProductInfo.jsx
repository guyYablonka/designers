import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { Button, Alert, Card } from "react-bootstrap";
import { PRODUCTS } from "./FilteredProducts";
import DropDownDetail from "../components/DropDownDetail.jsx";
import "./ProductInfo.css";

const ProductInfo = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [size, setSize] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [gender, setGender] = useState(null);
  const productId = useParams().productId;
  console.log(productId);

  const [currentProduct, setProduct] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setProduct(responseData);
    };
    sendRequest();
  }, []);

  const details = [
    {
      detailName: "Size",
      options: currentProduct?.details?.availableSizes,
      chooseHandler: (index) => chooseSizeHandler(index),
      chosen: size,
    },
    {
      detailName: "Color",
      options: currentProduct?.details?.availableColors,
      chooseHandler: (index) => chooseColorHandler(index),
      chosen: productColor,
    },
    {
      detailName: "Gender",
      options: currentProduct?.details?.availableGender,
      chooseHandler: (index) => chooseGenderHandler(index),
      chosen: gender,
    },
  ];

  const selectedProduct = {
    id: productId,
    name: currentProduct?.name,
    details: {
      gender: gender,
      size: size,
      color: productColor,
    },
    price: currentProduct?.price,
    designer: currentProduct?.designer,
    image: currentProduct?.image,
    rank: currentProduct?.rank,
    productType: currentProduct?.productType,
  };

  const addToCartHandler = () => {
    setShowAlert(true);
    const itemAlreadyInCart = props.cart.find(
      (item) =>
        item.id === productId &&
        haveSameData(item.details, selectedProduct?.details)
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
    selectedProduct.size = currentProduct?.availableSizes[index || 0];
    setSize(selectedProduct.size);
  };

  const chooseColorHandler = (index) => {
    selectedProduct.color = currentProduct?.availableColors[index || 0];
    setProductColor(selectedProduct.color);
  };

  const chooseGenderHandler = (index) => {
    selectedProduct.gender = currentProduct?.availableGender[index || 0];
    setGender(selectedProduct.gender);
  };

  const validatePropertiesWereSelected = (details = {}) => {
    return Object.values(details).some((detail) => detail === null);
  };

  return (
    <div className="container">
      {showAlert && (
        <Alert variant="success">
          the product added succefuly to your cart!
        </Alert>
      )}
      <div className="row">
        <Card className="card-size">
          <img
            className="product-image"
            src={currentProduct?.image}
            alt={currentProduct?.name}
          />
          <Button
            variant="secondary"
            className="add-cart-button"
            onClick={addToCartHandler}
            disabled={validatePropertiesWereSelected(selectedProduct?.details)}
          >
            I want it!
          </Button>
        </Card>
        <div className="col">
          <h2>{currentProduct?.name?.toUpperCase()}</h2>
          <hr />
          <h3>{"Price: " + currentProduct?.price + "$"}</h3>
          <h3>
            {"Rank: "}
            <StarRatings
              rating={currentProduct?.rank}
              starRatedColor="#ffb266"
              starDimension="30px"
              starSpacing="1px"
            />
          </h3>
          <h3>{"designer: " + currentProduct?.designer}</h3>
          <div className="row center">
            {details.map((detail) => {
              return (
                <DropDownDetail
                  detailName={detail.detailName}
                  options={detail.options}
                  chooseHandler={detail.chooseHandler}
                  chosen={detail.chosen}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <hr />
        <h2 className="center">Description: {currentProduct?.description}</h2>
      </div>
    </div>
  );
};

export default ProductInfo;
