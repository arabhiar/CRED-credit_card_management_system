import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Table,
  InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';

import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listCards } from '../actions/cardActions';
import AlertMessage from '../components/AlertMessage';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import Loader from 'react-spinners/PuffLoader';
import { LinkContainer } from 'react-router-bootstrap';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

const validationSchema = yup.object().shape({
  name: yup.string().required("Name can't be empty."),
  authCode: yup
    .string()
    .matches(
      passwordRegex,
      'Auth Code must be min 8 characters, have 1 special character[#?!@$%^&*-], 1 uppercase, 1 lowercase and 1 number.'
    ),
  email: yup.string().required("Email can't be empty"),
});

const initialValues = {
  name: '',
  authCode: '',
  email: '',
};

const ProfileScreen2 = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [readOnly, setReadOnly] = useState(true);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [cardAlert, setCardAlert] = useState(false);
  const [showAuthCode, setShowAuthCode] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: updateSuccess } = userUpdateProfile;

  const cardList = useSelector((state) => state.cardList);
  const { cards, error: errorCards, loading: loadingCards } = cardList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listCards());
      if (!user.email || updateSuccess) {
        if (updateSuccess) {
          setUpdateAlert(true);
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          setReadOnly(true);
        }
        dispatch(getUserDetails('profile'));
        // dispatch(listCards());
        setCardAlert(true);
      } else {
        initialValues.name = user.name;
        initialValues.authCode = user.authCode ? user.authCode : '';
        initialValues.email = user.email;
      }
    }
  }, [history, dispatch, user, userInfo, updateSuccess]);

  const submitForm = (values) => {
    const data = { name: values.name };
    if (values.authCode) {
      data.authCode = values.authCode;
    }
    dispatch(updateUserProfile(data));
  };

  const updateCloseHandler = () => {
    setUpdateAlert(false);
  };

  const cardCloseHandler = () => {
    setCardAlert(false);
  };

  const handleAuthCodeVisibility = () => {
    setShowAuthCode(!showAuthCode);
  };

  return (
    <>
      <Row>
        <Col md={5}>
          <div className="text-center">
            <h2>User Profile</h2>
            {updateAlert && (
              <AlertMessage
                onCloseHandler={updateCloseHandler}
                variant="success"
              >
                Profile updated.
              </AlertMessage>
            )}
            {loading ? (
              <Loader color={'#333940'} />
            ) : (
              <>
                <Image
                  style={{
                    maxWidth: '30%',
                    height: 'auto',
                    background: '#333940',
                    marginBottom: '15px',
                  }}
                  src="images/avatar7.png"
                  roundedCircle
                />
                <br />
                <Button onClick={() => setReadOnly(false)} disabled={!readOnly}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Formik
                  enableReinitialize
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
                    <Form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                      <Form.Group as={Row} controlId="name">
                        <Form.Label column sm="3" className="form-label">
                          Name
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.name}
                            readOnly={readOnly}
                          />
                          {errors.name && touched.name && (
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="authCode">
                        <Form.Label column sm="3" className="form-label">
                          Auth Code
                        </Form.Label>
                        <Col sm="9">
                          <InputGroup className="mb-3">
                            <Form.Control
                              type={showAuthCode ? 'text' : 'password'}
                              name="authCode"
                              placeholder="Enter authCode"
                              value={values.authCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={!!errors.authCode}
                              readOnly={readOnly}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text>
                                <i
                                  onClick={handleAuthCodeVisibility}
                                  className={
                                    showAuthCode
                                      ? 'fas fa-eye-slash authcode-hide'
                                      : 'fas fa-eye authcode-show'
                                  }
                                ></i>
                              </InputGroup.Text>
                            </InputGroup.Append>
                            {errors.authCode && touched.authCode && (
                              <Form.Control.Feedback type="invalid">
                                {errors.authCode}
                              </Form.Control.Feedback>
                            )}
                          </InputGroup>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="email">
                        <Form.Label column sm="3" className="form-label">
                          Email
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.email}
                            readOnly
                          />
                          {errors.email && touched.email && (
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={readOnly || !(dirty && isValid)}
                        className={
                          readOnly || !(dirty && isValid) ? 'disabled-btn' : ''
                        }
                      >
                        Update
                      </Button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </Col>
        <Col md={7}>
          <div className="text-center">
            <h2>My Cards</h2>
            <LinkContainer to="/cards/add/new" style={{ marginBottom: '15px' }}>
              <Button>
                <i className="fas fa-plus"></i> Add Card
              </Button>
            </LinkContainer>
            {loadingCards ? (
              <Loader color={'#333940'} />
            ) : errorCards && cardAlert ? (
              <AlertMessage variant="danger" onCloseHandler={cardCloseHandler}>
                {errorCards}
              </AlertMessage>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>S.NO.</th>
                    <th>CARD NO</th>
                    <th>HOLDER</th>
                    <th>OUTSTANDING AMOUNT</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card, index) => {
                    return (
                      <tr key={card.id}>
                        <td>{index + 1}</td>
                        <td>{card.cardNumber}</td>
                        <td>{card.cardOwnerName}</td>
                        <td>{card.outstandingAmount}</td>
                        <td>
                          <LinkContainer to={`/cards/${card.id}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen2;
