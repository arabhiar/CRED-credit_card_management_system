// component used to alert a message if something went wrong

import React from "react";

import { Alert } from "react-bootstrap";

const AlertMessage = (prop) => {
  const { variant, onCloseHandler, children } = prop;

  return (
    <Alert variant={variant} onClose={onCloseHandler} dismissible>
      <p>{children}</p>
    </Alert>
  );
};

export default AlertMessage;