import React from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import FormControl from "react-bootstrap/esm/FormControl";

import "./FilterInput.css";

const FilteredInput = (props) => {
  return (
    <InputGroup className="filter-input">
      <InputGroup.Prepend>
        <InputGroup.Text
          id="inputGroup-sizing-default"
          className="search-icon__background"
        >
          <i className="fas fa-search search-icon"></i>
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        name="productName"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={props.onChange}
      />
    </InputGroup>
  );
};

export default FilteredInput;
