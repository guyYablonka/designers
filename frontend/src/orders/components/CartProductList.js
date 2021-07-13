import React from "react";
import CartProductItem from "./CartProductItem";

import "./CartProductList.css";

const CartProductList = (props) => {
  const cartItemsView = props.cartProducts.map(
    (product) =>
      product.amount && (
        <CartProductItem
          className="procuts-cart"
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          rank={product.rank}
          details={product.details}
          amount={product.amount}
        />
      )
  );

  return cartItemsView;
};

export default CartProductList;
