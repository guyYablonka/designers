import React from "react";
import { Dropdown } from "react-bootstrap";
import "./DropDownDetail.css";

const DropDownDetail = (props) => {
  const { detailName, options, chooseHandler, chosen } = props;
  return (
    <div className="col">
      <Dropdown>
        <Dropdown.Toggle className="dropdown" variant="secondary">
          {detailName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item
              key={option}
              eventKey={options.indexOf(option)}
              onSelect={(index) => chooseHandler(index)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <h2>{chosen}</h2>
    </div>
  );
};

export default DropDownDetail;
