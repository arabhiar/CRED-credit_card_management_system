import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Coupon from '../components/Coupon';
import { rewards } from '../data/rewards';
import { getRewardPoints } from '../actions/rewardActions';
import Loader from '../components/Loader';

const RewardScreen = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const rewardPoints = useSelector((state) => state.rewardPoints);
  const { coins, loading } = rewardPoints;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getRewardPoints());
    }
  }, [userInfo, history, dispatch]);

  return (
    <>
      <h2>Buy Coupons</h2>
      {loading ? (
        <Loader color={'#333940'} />
      ) : (
        <Row>
          {rewards.map((reward) => (
            <Col key={reward.id} sm={12} md={6} lg={4} xl={4}>
              <Coupon reward={reward} userCoin={coins} />
            </Col>
          ))}
        </Row>
      )}
      {/* {userInfo && (
        <Row>
          {rewards.map((reward) => (
            <Col key={reward.id} sm={12} md={6} lg={4} xl={4}>
              <Coupon reward={reward} userCoin={135} />
            </Col>
          ))}
        </Row>
      )} */}
    </>
  );
};

export default RewardScreen;
