import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Coupon from '../components/Coupon';
import { rewards } from '../data/rewards';

const RewardScreen = () => {
  return (
    <>
      <h2>All Coupons</h2>
      <Row>
        {rewards.map((reward) => (
          <Col key={reward.id} sm={12} md={6} lg={4} xl={4}>
            <Coupon reward={reward} userCoin={135} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RewardScreen;
