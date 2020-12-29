import React, { useEffect, useReducer } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { validate } from "../../shared/util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
const AuthInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const validForm = () => {
    if (inputState.isValid || !inputState.isTouched) {
      return (
        <FormControl
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
    }

    return (
      <React.Fragment>
        <FormControl
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          isInvalid
        />
        <FormControl.Feedback type="invalid">
          {props.error}
        </FormControl.Feedback>
      </React.Fragment>
    );
  };

  return <InputGroup className="mb-3">{validForm()}</InputGroup>;
};

export default AuthInput;
