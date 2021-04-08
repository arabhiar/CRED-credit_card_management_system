import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Coupon from '../components/Coupon';
import { rewards } from '../data/rewards';

const RewardScreen = (props) => {
  const { history } = props;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  return (
    <>
      <h2>All Coupons</h2>
      {userInfo && (
        <Row>
          {rewards.map((reward) => (
            <Col key={reward.id} sm={12} md={6} lg={4} xl={4}>
              <Coupon reward={reward} userCoin={135} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default RewardScreen;
