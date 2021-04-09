import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { getAllCoupons, getRewardPoints } from '../actions/rewardActions';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

const AllCouponsScreen = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allCoupons = useSelector((state) => state.allCoupons);
  const { coupons, loading, error } = allCoupons;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getRewardPoints());
      dispatch(getAllCoupons());
      setShow(true);
    }
  }, [dispatch, userInfo, history]);

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
      {loading ? (
        <Loader color={'#333940'} />
      ) : coupons.length === 0 ? (
        <>
          <h2>All Coupons</h2>
          <p className="normal-text">No coupons to show.</p>
        </>
      ) : (
        <Row>
          <h2 style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            All Coupons
          </h2>
          <ListGroup variant="flush">
            {coupons.map((coupon, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs={4} sm={2} md={1}>
                    <Image
                      className="align-middle text-center"
                      src={coupon.imageUrl}
                      alt={coupon.companyName}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <p className="align-middle text-center normal-text">
                      {coupon.companyName}
                    </p>
                  </Col>
                  <Col ms={3}>
                    <p className="align-middle text-center normal-text">
                      {coupon.description}
                    </p>
                  </Col>
                  <Col md={2}>
                    <p className="align-middle text-center normal-text">
                      -{coupon.coinsNeeded}
                    </p>
                  </Col>
                  <Col md={3}>
                    <p className="align-middle text-center normal-text">
                      {coupon.promocode}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      )}
    </>
  );
};

export default AllCouponsScreen;
