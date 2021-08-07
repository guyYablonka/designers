import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  ToggleButton,
  ButtonGroup,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_CONFIRM_PASSWORD,
  VALIDATOR_NUMBERS,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import AuthInput from "../components/AuthInput";
import "./Authenticate.css";

const Authenticate = (props) => {
  const auth = useContext(AuthContext);
  let history = useHistory();
  const [modeValue, setModeValue] = useState("2");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const mode = [
    { name: "SIGN-UP", value: "1" },
    { name: "LOGIN", value: "2" },
  ];
  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },

      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formInputs = [
    {
      name: "username",
      type: "text",
      showOnLogin: true,
      validators: [VALIDATOR_MINLENGTH(5)],
      error: "username must have minimum 5 letters",
    },
    {
      name: "password",
      type: "password",
      showOnLogin: true,
      validators: [VALIDATOR_MINLENGTH(5)],
      error: "password must have minimum 5 letters",
    },
    {
      name: "confirmPassword",
      type: "password",
      showOnLogin: false,
      validators: [VALIDATOR_CONFIRM_PASSWORD(formState.inputs.password.value)],
      error: "the password confirmation must be equal to the original password",
    },
    {
      name: "email",
      type: "email",
      showOnLogin: false,
      validators: [VALIDATOR_EMAIL],
      error: "email is incorrect",
    },
    {
      name: "address",
      type: "text",
      showOnLogin: false,
      validators: [VALIDATOR_REQUIRE],
      error: "Address is incorrect",
    },
    {
      name: "phone",
      type: "text",
      showOnLogin: false,
      validators: [VALIDATOR_NUMBERS],
      error: "Phone is incorrect",
    },
  ];

  const isLoginMode = () => {
    return modeValue === "2";
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginMode()) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
        history.push("/");
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.confirmPassword.value,
            email: formState.inputs.email.value,
            address: formState.inputs.address.value,
            phone: formState.inputs.phone.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
        history.push("/");
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again");
      }
    }
  };

  const switchValidateModeHandler = (event) => {
    setModeValue(event.currentTarget.value);
    if (modeValue === "1") {
      setFormData(
        {
          ...formState.inputs,
          confirmPassword: undefined,
          email: undefined,
          address: undefined,
          phone: undefined,
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          confirmPassword: {
            value: "",
            isValid: false,
          },
          email: {
            value: "",
            isValid: false,
          },
          address: {
            value: "",
            isValid: false,
          },
          phone: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
  };

  const [progressHandler, setProgressHandler] = useState(0);

  useEffect(() => {
    if (modeValue === "1") {
      setProgressHandler(
        (Object.entries(formState.inputs).filter(
          (input) => input[1].isValid === true
        ).length /
          Object.entries(formState.inputs).length) *
          100
      );
    }
  }, [setProgressHandler, formState, modeValue]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner />}
        <ButtonGroup toggle className="switch-buttons">
          {mode.map((radio, idx) => (
            <ToggleButton
              className="switch-buttons"
              key={idx}
              type="radio"
              variant="secondary"
              value={radio.value}
              checked={modeValue === radio.value}
              onChange={switchValidateModeHandler}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <h2>{modeValue === "2" ? "LOGIN" : "SIGN-UP"}</h2>
        <hr />
        <Form onSubmit={authSubmitHandler}>
          <Container className="scroll-form">
            {formInputs.map(
              (input) =>
                (input.showOnLogin || modeValue === "1") && (
                  <AuthInput
                    key={input.name}
                    id={input.name}
                    type={input.type}
                    placeholder={input.name}
                    validators={input.validators}
                    onInput={inputHandler}
                    error={input.error}
                  />
                )
            )}
          </Container>
          <Button
            variant="secondary"
            className="add-cart-button"
            type="submit"
            disabled={!formState.isValid}
          >
            {modeValue === "2" ? "LOGIN" : "SIGN-UP"}
          </Button>
        </Form>
        {modeValue === "1" && (
          <ProgressBar striped variant="warning" now={progressHandler} />
        )}
      </Card>
    </React.Fragment>
  );
};

export default Authenticate;
