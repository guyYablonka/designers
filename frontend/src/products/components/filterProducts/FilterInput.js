import React from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Container from "react-bootstrap/esm/Container";
import FormControl from "react-bootstrap/esm/FormControl";

import "./FilterInput.css";

const FilteredInput = (props) => {
  return (
    <Container>
      <InputGroup className="mb-3 filter-input">
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
    </Container>
  );
};

export default FilteredInput;
