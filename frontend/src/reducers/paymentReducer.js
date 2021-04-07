import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_RESET,
  PAYMENT_SUCCESS,
  REWARD_POINTS_FAIL,
  REWARD_POINTS_REQUEST,
  REWARD_POINTS_SUCCESS,
} from '../constants/paymentConstants';

export const payReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return { loading: true };
    case PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const rewardPointsReducer = (state = {}, action) => {
  switch (action.type) {
    case REWARD_POINTS_REQUEST:
      return { loading: true };
    case REWARD_POINTS_SUCCESS:
      return { loading: false, coins: action.payload };
    case REWARD_POINTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
