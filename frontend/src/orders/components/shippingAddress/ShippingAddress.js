import React, { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "../../../shared/hooks/form-hook";
import AuthInput from "../../../users/components/AuthInput";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBERS,
} from "../../../shared/util/validators";
import { AuthContext } from "../../../shared/context/auth-context";

import "./ShippingAddress.css";
const ShippingAddress = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      adress: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userConnectedPropeties = () => {
    if (auth.isLoggedIn) {
      return (
        <React.Fragment>
          <div className="scroll-data">
            <label>Address:</label>
            <AuthInput
              id={"adress-to-deliver"}
              type={"text"}
              validators={[VALIDATOR_REQUIRE()]}
              initialValue={props.userData.adress}
              initialValid={true}
              onInput={inputHandler}
              error={"incorrect Address"}
            />
            <label>Phone:</label>
            <AuthInput
              id={"phone-to-deliver"}
              type={"numbers"}
              validators={[VALIDATOR_NUMBERS()]}
              initialValue={props.userData.phone}
              initialValid={true}
              onInput={inputHandler}
              error={"incorrect Phone number"}
            />
            <label>E-Mail:</label>
            <AuthInput
              id={"email-to-deliver"}
              type={"text"}
              validators={[VALIDATOR_EMAIL()]}
              initialValue={props.userData.email}
              initialValid={true}
              onInput={inputHandler}
              error={"incorrect E-mail"}
            />
          </div>
          <div className="connected-user">
            <img
              src={props.userData.image}
              alt={props.userData.username}
              className="profile-image"
            />
            <h2 className="center-text">{props.userData.username}</h2>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="scroll-data">
          <label>Address:</label>
          <AuthInput
            id={"adress-to-deliver"}
            type={"text"}
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={formState.inputs.adress.value}
            initialValid={formState.inputs.adress.isValid}
            onInput={inputHandler}
            error={"incorrect Address"}
          />
          <label>Phone:</label>
          <AuthInput
            id={"phone-to-deliver"}
            type={"numbers"}
            validators={[VALIDATOR_NUMBERS()]}
            initialValue={formState.inputs.phone.value}
            initialValid={formState.inputs.phone.isValid}
            onInput={inputHandler}
            error={"incorrect Phone number"}
          />
          <label>E-Mail:</label>
          <AuthInput
            id={"email-to-deliver"}
            type={"text"}
            validators={[VALIDATOR_EMAIL()]}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
            onInput={inputHandler}
            error={"incorrect E-mail"}
          />
        </div>
        <OverlayTrigger
          overlay={<Tooltip id={`tooltip-top`}>not connected yet.</Tooltip>}
        >
          <i className="fas fa-user connect-user"></i>
        </OverlayTrigger>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <h2>Shipping Address</h2>
      {userConnectedPropeties()}
    </React.Fragment>
  );
};

export default ShippingAddress;
