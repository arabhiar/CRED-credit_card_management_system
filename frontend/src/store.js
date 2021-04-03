import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import {
  cardAddReducer,
  cardListReducer,
  cardDetailsReducer,
} from './reducers/cardReducer';

import {
  statementDetailsReducer,
  recentStatementsReducer,
} from './reducers/statementReducer';

import { payReducer } from './reducers/paymentReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  cardAdd: cardAddReducer,
  cardList: cardListReducer,
  cardDetails: cardDetailsReducer,
  statementDetails: statementDetailsReducer,
  recentStatements: recentStatementsReducer,
  pay: payReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
