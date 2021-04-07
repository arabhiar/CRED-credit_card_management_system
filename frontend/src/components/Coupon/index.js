import React from 'react';
import { Card, Image } from 'react-bootstrap';

import './styles.scss';

const Coupon = () => {
  return (
    <div>
      <h2>All Coupons</h2>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          as="img"
          variant="bottom"
          style={{ width: '100%', height: 'auto' }}
          src="https://cdn.iconscout.com/icon/free/png-512/zomato-1937646-1637644.png"
        >
            <Image src="https://cdn.iconscout.com/icon/free/png-512/zomato-1937646-1637644.png" roundedCircle />
        </Card.Img>
        <Card.Body>
          <Card.Title>20% instant discount on Zomato</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Coupon;
