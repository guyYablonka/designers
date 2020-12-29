import React from "react";
import Container from "react-bootstrap/esm/Container";

import TypeFilter from "./TypeFilter";
import "./Categories.css";

const Categories = (props) => {
  return (
    <Container>
      <ul className="order-categories">
        <TypeFilter
          type="shirts"
          icon="tshirt"
          categoryHandler={props.categoryHandler}
          productCategory={props.productCategory}
        ></TypeFilter>
        <TypeFilter
          type="shoes"
          icon="shoe-prints"
          categoryHandler={props.categoryHandler}
          productCategory={props.productCategory}
        ></TypeFilter>
        <TypeFilter
          type="suits"
          icon="user-tie"
          categoryHandler={props.categoryHandler}
          productCategory={props.productCategory}
        ></TypeFilter>
      </ul>
    </Container>
  );
};

export default Categories;
