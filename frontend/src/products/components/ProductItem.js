import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./ProductItem.css";

const ProductItem = (props) => {
  const templateOfName =
    props.name.length > 15 ? props.name.substring(0, 12) + "..." : props.name;

  return (
    <li className="product-item">
      <Card>
        <Link to={`products/${props.id}`}>
          <div className="product-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{templateOfName}</h2>
            <StarRatings
              rating={props.rank}
              starRatedColor="#ffb266"
              starDimension="20px"
              starSpacing="1px"
            />
            <h3>{props.price + "$"}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default ProductItem;
