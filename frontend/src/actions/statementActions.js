import axios from 'axios';
import {
  STATEMENT_BY_DATE_FAIL,
  STATEMENT_BY_DATE_REQUEST,
  STATEMENT_BY_DATE_SUCCESS,
} from '../constants/statementConstants';

export const getStatementsByDate = (cardNo, year, month) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: STATEMENT_BY_DATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/cards/${cardNo}/statements/${year}/${month}`,
      config
    );
    dispatch({ type: STATEMENT_BY_DATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STATEMENT_BY_DATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
