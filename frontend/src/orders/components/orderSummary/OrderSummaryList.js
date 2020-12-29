import React from "react";

import OrderSummaryItem from "./OrderSummaryItem";
import "./OrderSummaryList.css";

const OrderSummaryList = (props) => {
  const totalPrice = props.cart
    .map((item) => item.price * item.amount)
    .reduce((a, b) => a + b);

  return props.cart.map((item) => (
    <React.Fragment>
      <div className="scroll-products">
        <OrderSummaryItem
          name={item.name}
          price={item.price}
          image={item.image}
          amount={item.amount}
          color={item.color}
          size={item.size}
          gender={item.gender}
        />
      </div>
      <h2 className="total-price">{"TOTAL: " + totalPrice + "$"}</h2>
    </React.Fragment>
  ));
};

export default OrderSummaryList;
