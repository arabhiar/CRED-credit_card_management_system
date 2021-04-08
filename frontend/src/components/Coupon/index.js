import React, { useState } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Modal,
} from 'react-bootstrap';

import './styles.scss';

const Coupon = (props) => {
  const { reward, userCoin } = props;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <Card style={{ width: '20rem' }} className="my-3 rounded">
      <div className="embed-responsive embed-responsive-1by1">
        <Card.Img
          className="embed-responsive-item rounded-circle"
          variant="top"
          src={reward.url}
        />
      </div>

      <Card.Body>
        <Card.Title>{reward.company}</Card.Title>
        <Card.Text style={{ height: '4rem' }}>{reward.description}</Card.Text>
        <Row>
          <Col>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip
                  id={`tooltip-bottom`}
                >{`Buy this coupon with ${reward.coin} coins.`}</Tooltip>
              }
            >
              <Button variant="outline-info" style={{ cursor: 'auto' }}>
                <i
                  style={{ paddingRight: '0.4rem' }}
                  class="fas fa-coins fa-lg"
                ></i>
                {reward.coin}
              </Button>
            </OverlayTrigger>
          </Col>
          <Col>
            <Button
              onClick={handleShowModal}
              className={
                reward.coin > userCoin
                  ? 'float-right disabled-btn'
                  : 'float-right'
              }
              variant="outline-success"
              disabled={reward.coin > userCoin}
            >
              Buy
            </Button>
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              backdrop="static"
              keyboard={true}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Are you sure to by this coupon?</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ paddingBottom: '0' }}>
                <h3 style={{ textTransform: 'none' }}>{reward.company}</h3>
                <br />
                <p className="normal-text">{reward.description}</p>
                <br />
                <p className="normal-text">{`You will concede ${reward.coin} coins after buying this coupon.`}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={handleCloseModal}
                  style={{ marginRight: '1.5rem' }}
                  className="float-left"
                >
                  Close
                </Button>
                <Button variant="success">Confirm</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Coupon;
