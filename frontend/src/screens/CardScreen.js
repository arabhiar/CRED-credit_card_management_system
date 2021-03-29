import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-spinners/PuffLoader';
import { getCardById } from '../actions/cardActions';
import AlertMessage from '../components/AlertMessage';
import CreditCard2 from '../components/CreditCard2';
import ModalForm from '../components/ModalForm';

const CardScreen = (props) => {
  const { match, history } = props;

  const cardId = match.params.id;
  console.log(cardId);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cardDetails = useSelector((state) => state.cardDetails);
  const { card, error, loading } = cardDetails;

  console.log(userLogin);
  console.log(card);

  useEffect(() => {
    if (!userInfo) {
      console.log('Not Logged In');
      history.push('/login');
    } else {
      console.log('Dispatch');
      dispatch(getCardById(cardId));
    }
  }, [userInfo, history, cardId, dispatch]);

  const parseAmount = (amount) => {
    if (amount || amount === 0) {
      let temp = amount.toString();
      if (temp.indexOf('.') === -1) {
        // no precision
        temp += '.00';
      }
      return temp;
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {loading ? (
        <Loader color={'#333940'} />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        <Row>
          <Col md={5}>
            <h2 className="text-center" style={{ marginTop: '2rem' }}>
              Card Details
            </h2>
            <div style={{ marginTop: '2rem' }}>
              <CreditCard2 card={card} />
            </div>
            <Card
              bg="dark"
              text="white"
              style={{
                width: '18rem',
                alignSelf: 'center',
                marginTop: '3rem',
                borderRadius: '20px',
                // margin: '0 auto',
                // float: 'none',
              }}
              className="mx-auto text-center"
            >
              <Card.Body>
                <Card.Title> Outstanding Amount </Card.Title>
                <Card.Text style={{ fontSize: '2.8rem' }}>
                  {`₹ ${parseAmount(card.outstandingAmount)}`}
                </Card.Text>
                <Button
                  className="btn btn-outline-success"
                  style={
                    card.outstandingAmount === 0
                      ? { cursor: 'not-allowed' }
                      : {}
                  }
                  disabled={card.outstandingAmount === 0}
                  onClick={handleShowModal}
                >
                  Pay Now
                </Button>
                <ModalForm
                  handleClose={handleCloseModal}
                  show={showModal}
                  card={card}
                  cardId={cardId}
                ></ModalForm>
              </Card.Body>
            </Card>
          </Col>
          <Col md={7}>
            <div className="text-center">
              <h2 style={{ marginTop: '2rem' }}>Recent Transactions</h2>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CardScreen;
