import {
  CARD_ADD_FAIL,
  CARD_ADD_REQUEST,
  CARD_ADD_RESET,
  CARD_ADD_SUCCESS,
  CARD_DETAILS_FAIL,
  CARD_DETAILS_REQUEST,
  CARD_DETAILS_RESET,
  CARD_DETAILS_SUCCESS,
  CARD_LIST_FAIL,
  CARD_LIST_REQUEST,
  CARD_LIST_SUCCESS,
} from '../constants/cardConstants';

export const cardAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CARD_ADD_REQUEST:
      return { loading: true };
    case CARD_ADD_SUCCESS:
      return { loading: false, card: action.payload, success: true };
    case CARD_ADD_FAIL:
      return { loading: false, error: action.payload, success: false };
    case CARD_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const cardListReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case CARD_LIST_REQUEST:
      return { ...state, loading: true };
    case CARD_LIST_SUCCESS:
      return { loading: false, cards: action.payload };
    case CARD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cardDetailsReducer = (state = { card: {} }, action) => {
  switch (action.type) {
    case CARD_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CARD_DETAILS_SUCCESS:
      return { loading: false, card: action.payload };
    case CARD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CARD_DETAILS_RESET:
      return { card: {} };
    default:
      return state;
  }
};
