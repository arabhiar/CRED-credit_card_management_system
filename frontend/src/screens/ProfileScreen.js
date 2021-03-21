import React, { useState } from 'react';
import { Image, Form, Button, Row, Col } from 'react-bootstrap';

import Message from '../components/Message';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Profile updated');
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
          </div>

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
                Email Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={readOnly}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="password">
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
            </Form.Group>

            <Button type="submit" variant="primary" disabled={readOnly}>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
