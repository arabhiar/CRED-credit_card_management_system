import React from 'react';
import { Formik } from 'formik';

import './styles.scss';
import { Form, Button } from 'react-bootstrap';

const initialValues = {
  email: '',
  password: '',
};

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!regex.test(values.email)) {
    errors.email = 'Invalid Email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'Password too short';
  }

  return errors;
};

const submitForm = (values) => {
  console.log(values);
  // alert(values);
};

const TempForm1 = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                // className={errors.email && touched.email ? 'input-error' : null}
              />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
              <br />
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                // className={
                //   errors.password && touched.password ? 'input-error' : null
                // }
              />
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}

              <Button
                type="submit"
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default TempForm1;
