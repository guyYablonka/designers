import React from "react";
import Container from "react-bootstrap/esm/Container";

import TypeFilter from "./TypeFilter";
import "./Categories.css";

const Categories = (props) => {
  const fetchTypeFilters = () => {
    return [
      {
        type: "shirts",
        icon: "tshirt",
      },
      {
        type: "shoes",
        icon: "shoe-prints",
      },
      {
        type: "suits",
        icon: "user-tie",
      },
    ];
  };

  return (
    <Container>
      <ul className="order-categories">
        {fetchTypeFilters().map((typeFilter) => {
          return (
            <TypeFilter
              type={typeFilter.type}
              icon={typeFilter.icon}
              categoryHandler={props.categoryHandler}
              productCategory={props.productCategory}
            />
          );
        })}
      </ul>
    </Container>
  );
};

export default Categories;
