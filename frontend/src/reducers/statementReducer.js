import {
  STATEMENT_BY_DATE_FAIL,
  STATEMENT_BY_DATE_REQUEST,
  STATEMENT_BY_DATE_RESET,
  STATEMENT_BY_DATE_SUCCESS,
} from '../constants/statementConstants';

export const statementDetailsReducer = (
  state = { statements: [] },
  action
) => {
  switch (action.type) {
    case STATEMENT_BY_DATE_REQUEST:
      return { loading: true };
    case STATEMENT_BY_DATE_SUCCESS:
      return { loading: false, statements: action.payload };
    case STATEMENT_BY_DATE_FAIL:
      return { loading: false, error: action.payload };
    case STATEMENT_BY_DATE_RESET:
      return {};
    default:
      return state;
  }
};
