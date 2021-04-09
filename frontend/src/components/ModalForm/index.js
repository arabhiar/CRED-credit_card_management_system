import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Form, Modal, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

import './styles.scss';
import { payAmount } from '../../actions/paymnetActions';
import { getCardById } from '../../actions/cardActions';
import { getRewardPoints } from '../../actions/rewardActions';
import { PAYMENT_RESET } from '../../constants/paymentConstants';
import AlertMessage from '../AlertMessage';
import Loader from 'react-spinners/PuffLoader';

const ModalForm = (props) => {
  const { show, handleClose, card, cardId } = props;
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError('Amount must be positive integer')
      .moreThan(0, 'Amount must be greater than 0.')
      .max(
        card.outstandingAmount,
        `Amount must be less than ${card.outstandingAmount}.`
      )
      .required(),
  });

  const pay = useSelector((state) => state.pay);
  const { success: successPay, error: errorPay, loading } = pay;

  useEffect(() => {
    if (successPay) {
      dispatch({ type: PAYMENT_RESET });
      dispatch(getRewardPoints());
      dispatch(getCardById(cardId));
    }
  }, [successPay, dispatch, cardId]);

  const [showAlert, setShowAlert] = useState(false);

  const onCloseHandler = () => {
    setShowAlert(false);
  };

  const submitForm = (values) => {
    console.log(values);
    dispatch(payAmount(card.cardNumber, values.amount));
    setShowAlert(true);
    handleClose();
  };

  return (
    <>
      <Container></Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Formik
          validationSchema={validationSchema}
          onSubmit={submitForm}
          initialValues={{ amount: '' }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Make a payment.
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ paddingBottom: '0' }}>
                {showAlert && successPay && (
                  <AlertMessage
                    variant="success"
                    onCloseHandler={onCloseHandler}
                  >
                    Paid Successfully
                  </AlertMessage>
                )}
                {showAlert && errorPay && (
                  <AlertMessage
                    variant="danger"
                    onCloseHandler={onCloseHandler}
                  >
                    {errorPay}
                  </AlertMessage>
                )}
                {loading && <Loader color={'#333940'} />}
                {/* <Container> */}
                <Form.Group
                  as={Row}
                  controlId="amount"
                  style={{ margin: '1.5rem auto 2.5rem auto' }}
                >
                  <Form.Label column sm="2" className="form-label">
                    Amount
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      name="amount"
                      placeholder="Enter amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.amount}
                    ></Form.Control>
                    {errors.amount && touched.amount && (
                      <Form.Control.Feedback type="invalid">
                        {errors.amount}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>
                {/* </Container> */}
                <Modal.Footer style={{ paddingBottom: '0' }}>
                  <Button
                    variant="danger"
                    onClick={handleClose}
                    style={{ marginRight: '1.5rem' }}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                    disabled={!(dirty && isValid)}
                    className={!(dirty && isValid) && 'disabled-btn'}
                  >
                    Pay
                  </Button>
                </Modal.Footer>
              </Modal.Body>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalForm;
