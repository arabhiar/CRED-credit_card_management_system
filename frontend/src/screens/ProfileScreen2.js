import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Table,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from '../axios';

import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listCards } from '../actions/cardActions';
import AlertMessage from '../components/AlertMessage';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import Loader from 'react-spinners/PuffLoader';
import { LinkContainer } from 'react-router-bootstrap';
import { CARD_DETAILS_RESET } from '../constants/cardConstants';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
const phoneRegex = /^\d{10}$/g;

const validationSchema = yup.object().shape({
  name: yup.string().required("Name can't be empty."),
  authCode: yup
    .string()
    .matches(
      passwordRegex,
      'Auth Code must be min 8 characters, have 1 special character[#?!@$%^&*-], 1 uppercase, 1 lowercase and 1 number.'
    ),
  email: yup.string().required("Email can't be empty"),
  phoneNumber: yup
    .string()
    .nullable(true)
    .matches(phoneRegex, 'Phone no. must be of length 10'),
});

const initialValues = {
  name: '',
  authCode: '',
  email: '',
  phoneNumber: '',
};

const ProfileScreen2 = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [readOnly, setReadOnly] = useState(true);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [cardAlert, setCardAlert] = useState(false);
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [disableReminder, setDisableReminder] = useState(false);
  const [show, setShow] = useState(false);

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
      dispatch({ type: CARD_DETAILS_RESET });
      dispatch(listCards());
      if (!user.email || updateSuccess) {
        if (updateSuccess) {
          setUpdateAlert(true);
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          setReadOnly(true);
        }
        dispatch(getUserDetails('profile'));
        setShow(true);
        setCardAlert(true);
      } else {
        initialValues.name = user.name;
        initialValues.authCode = user.authCode ? user.authCode : '';
        initialValues.email = user.email;
        initialValues.phoneNumber = user.phoneNumber;
        setReminder(user.reminders);
      }
    }
  }, [history, dispatch, user, userInfo, updateSuccess]);

  const submitForm = (values) => {
    const data = { name: values.name };
    if (values.authCode) {
      data.authCode = values.authCode;
    }
    if (values.phoneNumber) {
      data.phoneNumber = values.phoneNumber;
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

  const handleReminderClick = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    setDisableReminder(true);
    const { data } = await axios.patch(
      '/api/user/profile',
      { reminders: !reminder },
      config
    );
    setDisableReminder(false);
    setReminder(data.reminders);
  };

  const handleCouponClick = () => {
    history.push('/rewards/coupons');
  };

  const onCloseHandler = () => {
    setShow(false);
  };

  return (
    <>
      {show && error && (
        <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
          {error}
        </AlertMessage>
      )}
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

                <OverlayTrigger
                  placement="left"
                  overlay={
                    readOnly ? (
                      <Tooltip id={`tooltip-left`}>Edit Profile</Tooltip>
                    ) : (
                      <></>
                    )
                  }
                >
                  <Button
                    className="btn-sm"
                    onClick={() => setReadOnly(false)}
                    disabled={!readOnly}
                    style={{ margin: '0.5rem 1rem' }}
                    variant="outline-primary"
                  >
                    <i className="far fa-edit"></i>
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      {reminder ? 'Turn off reminder.' : 'Turn on reminder.'}
                    </Tooltip>
                  }
                >
                  <Button
                    className="btn-sm"
                    variant="outline-primary"
                    style={{ margin: '0.5rem 1rem' }}
                    onClick={handleReminderClick}
                    disabled={disableReminder}
                  >
                    <i
                      className={
                        reminder
                          ? 'far fa-bell-slash fa-lg'
                          : 'far fa-bell fa-lg'
                      }
                    ></i>
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-right`}>View all coupons.</Tooltip>
                  }
                >
                  <Button
                    className="btn-sm"
                    variant="outline-primary"
                    style={{ margin: '0.5rem 1rem' }}
                    onClick={handleCouponClick}
                  >
                    <i className="fas fa-money-check-alt fa-lg"></i>
                  </Button>
                </OverlayTrigger>

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
                            // readOnly={readOnly}
                            disabled={readOnly}
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
                              // readOnly={readOnly}
                              disabled={readOnly}
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
                      <Form.Group as={Row} controlId="phoneNumber">
                        <Form.Label column sm="3" className="form-label">
                          Phone
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter phone no."
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.phoneNumber}
                            disabled={readOnly}
                          />
                          {errors.phoneNumber && touched.phoneNumber && (
                            <Form.Control.Feedback type="invalid">
                              {errors.phoneNumber}
                            </Form.Control.Feedback>
                          )}
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
                            // readOnly
                            disabled
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
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm table-dark"
              >
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
                            <Button
                              className="btn-sm btn btn-outline-info"
                              variant="light"
                            >
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
