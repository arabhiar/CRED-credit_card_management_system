import axios from '../axios';

import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from '../constants/paymentConstants';

export const payAmount = (cardNo, amount) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/cards/${cardNo}/pay`,
      { amount },
      config
    );

    dispatch({ type: PAYMENT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PAYMENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
