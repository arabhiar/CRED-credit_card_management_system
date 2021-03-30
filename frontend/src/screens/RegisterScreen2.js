import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';

import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
// const phoneRegex = /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email.')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .matches(
      passwordRegex,
      'Password must be min 8 characters, have 1 special character[#?!@$%^&*-], 1 uppercase, 1 lowercase and 1 number.'
    ),
  confirmPassword: yup
    .string()
    .test('password-match', 'Passwords must match.', function (value) {
      return this.parent.password === value;
    }),
});

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterScreen2 = (props) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { location, history } = props;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitForm = (values) => {
    dispatch(register(values.email, values.password));
    setShow(true);
  };

  const onCloseHandler = () => {
    setShow(false);
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={submitForm}
        initialValues={initialValues}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        }) => (
          <FormContainer>
            <h1>Sign Up</h1>
            {show && error && (
              <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
                {error}
              </AlertMessage>
            )}
            {loading && <Loader color={'#333940'} />}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email}
                  placeholder="Enter email"
                />
                {errors.email && touched.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password}
                  placeholder="Enter password"
                />
                {errors.password && touched.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.confirmPassword}
                ></Form.Control>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button
                type="submit"
                disabled={!(dirty && isValid)}
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
              >
                Register
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                <div className="normal-text">
                  Already have an account?{' '}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  >
                    Sign In
                  </Link>
                </div>
              </Col>
            </Row>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default RegisterScreen2;
