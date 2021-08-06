import React from "react";

import { Button, Modal } from "react-bootstrap";

const ErrorModal = (props) => {
  return (
    <Modal show={!!props.error} onHide={props.onClear}>
      <Modal.Header closeButton>
        <Modal.Title>An Error Occurred!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.error}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onClear}>Okay</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
