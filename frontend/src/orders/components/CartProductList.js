import React from "react";
import CartProductItem from "./CartProductItem";

import "./CartProductList.css";

const CartProductList = (props) => {
  return props.cartProducts.map((product) => (
    <CartProductItem
      className="procuts-cart"
      key={product.id}
      id={product.id}
      image={product.image}
      name={product.name}
      price={product.price}
      rank={product.rank}
      size={product.size}
      gender={product.gender}
      color={product.color}
      amount={product.amount}
    />
  ));
};

export default CartProductList;
