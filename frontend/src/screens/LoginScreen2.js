import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';

import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const phoneRegex = /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, 'Invalid email.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginScreen2 = (props) => {
  const [show, setShow] = useState(false);

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

  const submitForm = (values) => {
    dispatch(login(values.email, values.password));
    setShow(true);
    // console.log(values);
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
            <h1>Sign In</h1>
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

              <Button
                type="submit"
                disabled={!(dirty && isValid)}
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
              >
                Sign In
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                <div className="normal-text">
                  New Customer?{' '}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Register
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

export default LoginScreen2;
