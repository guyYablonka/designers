import React from "react";

import ProductItem from "./ProductItem";
import "./ProductsList.css";

const ProductsList = (props) => {
  return (
    <ul className="products-list">
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          rank={product.rank}
        />
      ))}
    </ul>
  );
};

export default ProductsList;
