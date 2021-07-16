import React from "react";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

import "./TypeFilter.css";

const TypeFilter = (props) => {
  const changeCategory = () => {
    if (props.productCategory === props.type) {
      props.categoryHandler("");
    } else {
      props.categoryHandler(props.type);
    }
  };

  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${props.type}`}>
          <strong>{props.type}</strong>
        </Tooltip>
      }
    >
      <li onClick={changeCategory}>
        <i className={`fas fa-${props.icon} category-style`}></i>
      </li>
    </OverlayTrigger>
  );
};

export default TypeFilter;
