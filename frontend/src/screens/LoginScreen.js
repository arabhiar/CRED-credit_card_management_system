import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const { location, history } = props;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      dispatch(login(email, password));
      setShow(true);
    }
    setValidated(true);
  };

  const onCloseHandler = () => {
    setShow(false);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {show && error && (
        <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
          {error}
        </AlertMessage>
      )}
      {loading && <Loader color={'#333940'} />}
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Email field can't be empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Email Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Password field can't be empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="sign-in" type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
