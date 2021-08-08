import React from "react";

import ProductItem from "./ProductItem";
import "./ProductsList.css";

const ProductsList = ({ items }) => {
  console.log(items);
  return (
    <ul className="products-list">
      {items.map((product) => (
        <ProductItem
          key={product._id}
          id={product._id}
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
