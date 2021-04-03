import {
  STATEMENT_BY_DATE_FAIL,
  STATEMENT_BY_DATE_REQUEST,
  STATEMENT_BY_DATE_RESET,
  STATEMENT_BY_DATE_SUCCESS,
  STATEMENT_RECENT_5_FAIL,
  STATEMENT_RECENT_5_REQUEST,
  STATEMENT_RECENT_5_RESET,
  STATEMENT_RECENT_5_SUCCESS,
} from '../constants/statementConstants';

export const statementDetailsReducer = (state = { statements: [] }, action) => {
  switch (action.type) {
    case STATEMENT_BY_DATE_REQUEST:
      return { loading: true };
    case STATEMENT_BY_DATE_SUCCESS:
      return {
        loading: false,
        statements: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case STATEMENT_BY_DATE_FAIL:
      return { loading: false, error: action.payload };
    case STATEMENT_BY_DATE_RESET:
      return {};
    default:
      return state;
  }
};

export const recentStatementsReducer = (state = { statements: [] }, action) => {
  switch (action.type) {
    case STATEMENT_RECENT_5_REQUEST:
      return { loading: true };
    case STATEMENT_RECENT_5_SUCCESS:
      return { loading: false, statements: action.payload };
    case STATEMENT_RECENT_5_FAIL:
      return { loading: false, error: action.payload };
    case STATEMENT_RECENT_5_RESET:
      return {};
    default:
      return state;
  }
};
