import React, { useState, useCallback, useEffect } from "react";

import { Row, Col, Card, Container, Button, Form } from "react-bootstrap";
import Avatar from "../../shared/components/UIElements/Avatar";
import { useForm } from "../../shared/hooks/form-hook";
import AuthInput from "../components/AuthInput";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBERS,
} from "../../shared/util/validators";
import "./MyProfile.css";

export const USERS = [
  {
    userId: "u1",
    username: "guy_yablonka",
    email: "guy@gmail.com",
    password: "1234",
    adress: "Petah Tikva, Tor Azahav 35",
    phone: "0509845887",
    isDesiner: true,
    registerDate: "12/10/2020",
    image:
      "https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950",
  },
];
const MyProfile = () => {
  const user = USERS.find((user) => user.userId === "u1");
  const [changeInformationMode, setUserInformation] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      adress: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (user) {
      setFormData(
        {
          email: {
            value: user.email,
            isValid: true,
          },
          phone: {
            value: user.phone,
            isValid: true,
          },
          adress: {
            value: user.adress,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, user]);

  const openUpdate = useCallback(() => {
    setUserInformation(true);
  }, []);

  const userInformationHandler = () => {
    return changeInformationMode ? (
      <Col md={8} className="order-props">
        <h3>User Information</h3>
        <label>E-mail:</label>
        <AuthInput
          id={"email"}
          type={"text"}
          validators={[VALIDATOR_EMAIL()]}
          initialValue={formState.inputs.email.value}
          initialValid={formState.inputs.email.isValid}
          onInput={inputHandler}
          error={"incorrect E-mail"}
        />
        <label>Phone: </label>
        <AuthInput
          id={"phone"}
          type={"numbers"}
          validators={[VALIDATOR_NUMBERS()]}
          initialValue={formState.inputs.phone.value}
          initialValid={formState.inputs.phone.isValid}
          onInput={inputHandler}
          error={"incorrect Phone number"}
        />
        <label>Adress:</label>
        <AuthInput
          id={"adress"}
          type={"text"}
          validators={[VALIDATOR_REQUIRE()]}
          initialValue={formState.inputs.adress.value}
          initialValid={formState.inputs.adress.isValid}
          onInput={inputHandler}
          error={"incorrect Address"}
        />
        <label>Register Date: </label> <h4> {user.registerDate}</h4>
      </Col>
    ) : (
      <Col md={8} className="order-props">
        <h3>User Information</h3>
        <h4>E-mail: {formState.inputs.email.value}</h4>
        <h4>Phone:{formState.inputs.phone.value}</h4>
        <h4>Adress: {formState.inputs.adress.value}</h4>
        <h4>Register Date: {user.registerDate}</h4>
      </Col>
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    setUserInformation(false);
  };

  return (
    <React.Fragment>
      <Card className="profile">
        <Form onSubmit={submitHandler}>
          <Container>
            <Row className="white-space">
              {userInformationHandler()}

              <Col md={3}>
                <Row className="user-title">
                  <Card className="user-image">
                    <Avatar image={user.image} alt={user.username} />
                  </Card>
                </Row>
                <Row className="user-title">
                  <h2>{user.username}</h2>
                </Row>
              </Col>
            </Row>
          </Container>
          {changeInformationMode && (
            <Button
              variant="secondary"
              type="submit"
              className="update-profile-button"
            >
              Confirm Details
            </Button>
          )}
          {!changeInformationMode && (
            <Button
              variant="secondary"
              className="update-profile-button"
              onClick={openUpdate}
            >
              Change Details
            </Button>
          )}
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default MyProfile;
