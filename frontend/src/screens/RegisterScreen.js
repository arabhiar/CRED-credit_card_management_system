import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import AlertMessage from '../components/AlertMessage';

// (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$  regex for strong password

const RegisterScreen = (props) => {
  //   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const { location, history } = props;

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

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
      if (password !== confirmPassword) {
        setMessage("Password don't match.");
      } else {
        if (error) {
          setMessage('');
        } else {
          dispatch(register(email, password));
        }
        setShow(true);
      }
    }
    setValidated(true);

    // e.preventDefault();
    // if (password !== confirmPassword) {
    //   setMessage("Passwords don't match.");
    // } else {
    //   if (error) {
    //     setMessage('');
    //   } else {
    //     //DISPATCH REGISTER
    //     dispatch(register(email, password));
    //   }
    // }
  };

  const onCloseHandler = () => {
    setShow(false);
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {show && error && (
        <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
          {error}
        </AlertMessage>
      )}
      {loading && <Loader />}
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        {/* <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

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

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Password field can't be empty.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
