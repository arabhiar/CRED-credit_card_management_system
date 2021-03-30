import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-spinners/PuffLoader';
import { getCardById } from '../actions/cardActions';
import AlertMessage from '../components/AlertMessage';
import CreditCard2 from '../components/CreditCard2';
import ModalForm from '../components/ModalForm';
import Dropdown from '../components/Dropdown';

const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? '0' + month : month;
});

const getMonthsArr = (year) => {
  let d = new Date();
  let monthsArr = [];
  if (year === d.getFullYear().toString()) {
    const l = d.getMonth() + 1;
    monthsArr = Array.from({ length: l }, (x, i) => {
      const month = i + 1;
      return month <= 9 ? '0' + month : month;
    });
  } else if (!year) {
    monthsArr = [];
  } else {
    monthsArr = Array.from({ length: 12 }, (x, i) => {
      const month = i + 1;
      return month <= 9 ? '0' + month : month;
    });
  }
  return monthsArr;
};

const getYearsArr = () => {
  const currentYear = new Date().getFullYear();
  const yearsArr = Array.from({ length: 20 }, (_x, i) => currentYear - i);
  return yearsArr;
};

const CardScreen = (props) => {
  const { match, history } = props;

  const cardId = match.params.id;
  // console.log(cardId);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(0);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cardDetails = useSelector((state) => state.cardDetails);
  const { card, error, loading } = cardDetails;

  // console.log(userLogin);
  // console.log(card);

  useEffect(() => {
    if (!userInfo) {
      // console.log('Not Logged In');
      history.push('/login');
    } else {
      // console.log('Dispatch');
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
  const getStatementClickHandler = () => {
    console.log('Year:', year);
    console.log('Month:', month);
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
              <h2 style={{ marginTop: '2rem' }}>Statement By Month</h2>
              <Row style={{ width: '70%', margin: '1rem auto' }}>
                <Col md={4}>
                  <Dropdown
                    value={year}
                    handleChange={(e) => setYear(e.target.value)}
                    label="Year"
                    data={getYearsArr()}
                  />
                </Col>
                <Col md={4}>
                  <Dropdown
                    value={month}
                    handleChange={(e) => setMonth(e.target.value)}
                    label="Month"
                    data={getMonthsArr(year)}
                  />
                </Col>

                <Col md={4}>
                  <LinkContainer
                    to={`/cards/${cardId}/statements/${parseInt(
                      year
                    )}/${parseInt(month)}`}
                  >
                    <Button
                      className="btn btn-outline-info"
                      disabled={!month || !year ? true : false}
                    >
                      Get
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CardScreen;
