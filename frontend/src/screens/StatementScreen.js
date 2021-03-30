import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getStatementsByMonth } from '../actions/statementActions';
import { getCardById } from '../actions/cardActions';
import TransactionTable from '../components/TransactionTable';
import Loader from 'react-spinners/PuffLoader';

const StatementScreen = (props) => {
  const { history, match } = props;

  const dispatch = useDispatch();

  const cardId = match.params.id;
  const year = match.params.year;
  const month = match.params.month;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cardDetails = useSelector((state) => state.cardDetails);
  const { card, error, loading } = cardDetails;

  const statementDetails = useSelector((state) => state.statementDetails);
  const {
    statements,
    loading: loadingStatements,
    error: errorStatements,
  } = statementDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!card) {
        dispatch(getCardById(cardId));
      } else {
        dispatch(getStatementsByMonth(card.cardNumber, year, month));
      }
    }
  }, [history, userInfo, card, cardId, dispatch, year, month]);

  return (
    <>
      <h2 style={{ marginTop: '1.5rem' }}>Statements</h2>
      {loadingStatements ? (
        <Loader color={'#333940'} />
      ) : (
        <TransactionTable transactions={statements} />
      )}
    </>
  );
};

export default StatementScreen;
