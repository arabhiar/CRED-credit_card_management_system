import axios from '../axios';

import {
  SMART_STATEMENT_BY_MONTH_FAIL,
  SMART_STATEMENT_BY_MONTH_REQUEST,
  SMART_STATEMENT_BY_MONTH_SUCCESS,
  STATEMENT_BY_DATE_FAIL,
  STATEMENT_BY_DATE_REQUEST,
  STATEMENT_BY_DATE_SUCCESS,
  STATEMENT_RECENT_5_FAIL,
  STATEMENT_RECENT_5_REQUEST,
  STATEMENT_RECENT_5_SUCCESS,
} from '../constants/statementConstants';

export const getStatementsByMonth = (
  cardNo,
  year,
  month,
  pageNumber = ''
) => async (dispatch, getState) => {
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
      `/api/cards/${cardNo}/statements/${year}/${month}?pageNumber=${pageNumber}`,
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

export const getRecentStatements = (cardNo, count = 3) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: STATEMENT_RECENT_5_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let { data } = await axios.get(`/api/cards/${cardNo}/statements`, config);
    data.reverse();
    if (data.length > count) {
      data = data.slice(0, count);
    }
    dispatch({ type: STATEMENT_RECENT_5_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: STATEMENT_RECENT_5_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getSmartStatementsByMonth = (cardNo, year, month) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SMART_STATEMENT_BY_MONTH_REQUEST });
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
      `/api/cards/${cardNo}/smartStatement/${year}/${month}`,
      config
    );
    dispatch({ type: SMART_STATEMENT_BY_MONTH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SMART_STATEMENT_BY_MONTH_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
