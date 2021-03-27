import React, { useState, useEffect } from 'react';
import { Image, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-spinners/PuffLoader';

import { getUserDetails, updateUserProfile } from '../actions/userActions';
import AlertMessage from '../components/AlertMessage';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = userUpdateProfile;

  const loadingCards = null;
  const errorCards = null;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.email || updateSuccess) {
        if (updateSuccess) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          setReadOnly(true);
        }
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, user, userInfo, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (error) {
      setMessage('');
    } else {
      console.log('Updated');
      dispatch(updateUserProfile({ name }));
    }
  };

  return (
    <>
      <Row>
        <Col md={5}>
          <div className="text-center">
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
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
            <Form onSubmit={submitHandler} style={{ padding: '20px' }}>
              <Form.Group as={Row} controlId="name">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    sm="10"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly={readOnly}
                  ></Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                  ></Form.Control>
                </Col>
              </Form.Group>

              {/* <Form.Group as={Row} controlId="password">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={readOnly}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="confirmPassword">
              <Form.Label column sm="2">
                Confirm Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  readOnly={readOnly}
                ></Form.Control>
              </Col>
            </Form.Group> */}

              <Button type="submit" variant="primary" disabled={readOnly}>
                Update
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={7}>
          <h2>My Cards</h2>
          {loadingCards ? (
            <Loader color={'#333940'} />
          ) : errorCards ? (
            <AlertMessage
              variant="danger"
              onCloseHandler={() => console.log('Close')}
            ></AlertMessage>
          ) : (
            <Table></Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
