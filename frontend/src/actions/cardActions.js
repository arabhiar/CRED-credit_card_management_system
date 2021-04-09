import axios from '../axios';

import {
  CARD_ADD_REQUEST,
  CARD_ADD_SUCCESS,
  CARD_ADD_FAIL,
  CARD_LIST_FAIL,
  CARD_LIST_REQUEST,
  CARD_LIST_SUCCESS,
  CARD_DETAILS_REQUEST,
  CARD_DETAILS_SUCCESS,
  CARD_DETAILS_FAIL,
} from '../constants/cardConstants';

export const addCard = (card) => async (dispatch, getState) => {
  try {
    dispatch({ type: CARD_ADD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/cards`, card, config);
    dispatch({ type: CARD_ADD_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CARD_ADD_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listCards = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CARD_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/cards`, config);
    dispatch({ type: CARD_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CARD_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getCardById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CARD_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log('URL is: ', `/api/cards/${id}`);
    const { data } = await axios.get(`/api/cards/${id}`, config);
    console.log('Card Details', data);
    dispatch({ type: CARD_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CARD_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
