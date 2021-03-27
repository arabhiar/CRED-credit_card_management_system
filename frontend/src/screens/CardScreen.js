import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

import CreditCard2 from '../components/CreditCard2';

const CardScreen = () => {
  return (
    <>
      <Row>
        <Col md={5}>
          <div style={{ marginTop: '2rem' }}>
            <CreditCard2 />
          </div>
          <Card
            bg="dark"
            text="white"
            style={{
              width: '18rem',
              alignSelf: 'center',
              marginTop: '3rem',
              borderRadius: '20px',
            }}
            className="mx-auto text-center"
          >
            <Card.Body>
              <Card.Title> Outstanding Amount </Card.Title>
              <Card.Text style={{ fontSize: '2.8rem' }}>
                {'₹ '}5000.00
              </Card.Text>
              <Button className="btn btn-outline-success">Pay Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CardScreen;
