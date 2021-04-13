import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addCard } from '../actions/cardActions';
import CreditCard3 from '../components/CreditCard3';
import CreditCardForm from '../components/CreditCardForm';
import { CARD_ADD_RESET } from '../constants/cardConstants';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false,
};

const AddCardScreen = (props) => {
  const [state, setState] = useState(initialState);
  const [authCode, setAuthCode] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

  const { history } = props;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cardAdd = useSelector((state) => state.cardAdd);
  const { success, loading, error } = cardAdd;

  useEffect(() => {
    if (success) {
      dispatch({ type: CARD_ADD_RESET });
      history.push('/profile');
    } else {
      if (!userInfo) {
        history.push('/login');
      }
    }
  }, [userInfo, history, success, dispatch]);

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || initialState[keyName],
      });
    },
    [state]
  );

  // References for the Form Inputs used to focus corresponding inputs.
  let formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef(),
  };

  // eslint-disable-next-line
  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key].current.focus();
  });

  // This are the references for the Card DIV elements.
  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  let onCardFormInputFocus = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  let onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  let removeSpaces = (num) => {
    let arr = num.split(' ');
    let ans = '';
    // eslint-disable-next-line array-callback-return
    arr.map((it) => {
      ans += it;
    });
    return ans;
  };

  let onCardSubmit = (e) => {
    e.preventDefault();
    let data = {
      cardOwnerName: state.cardHolder,
      cardNumber: removeSpaces(state.cardNumber),
      expiryMonth: parseInt(state.cardMonth),
      expiryYear: parseInt(state.cardYear),
      cvv: parseInt(state.cardCvv),
    };
    if (authCode) {
      data.authCode = authCode;
    }
    // console.log(data);
    dispatch(addCard(data));
    setShowAlert(true);
  };

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  const onCloseHandler = () => {
    setShowAlert(false);
  };

  return (
    <>
      {loading ? (
        <Loader color={'#333940'} />
      ) : (
        <>
          {showAlert && error && (
            <div className="col-md-6 col-12" style={{ margin: 'auto' }}>
              <AlertMessage variant="danger" onCloseHandler={onCloseHandler}>
                {error}
              </AlertMessage>
            </div>
          )}
          <div className="wrapper">
            <CreditCardForm
              cardMonth={state.cardMonth}
              cardYear={state.cardYear}
              onUpdateState={updateStateValues}
              cardNumberRef={formFieldsRefObj.cardNumber}
              cardHolderRef={formFieldsRefObj.cardHolder}
              cardDateRef={formFieldsRefObj.cardDate}
              onCardInputFocus={onCardFormInputFocus}
              onCardInputBlur={onCardInputBlur}
              onCardSubmit={onCardSubmit}
              authCode={authCode}
              handleAuthCodeChange={handleAuthCodeChange}
            >
              <CreditCard3
                cardNumber={state.cardNumber}
                cardHolder={state.cardHolder}
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                cardCvv={state.cardCvv}
                isCardFlipped={state.isCardFlipped}
                currentFocusedElm={currentFocusedElm}
                onCardElementClick={focusFormFieldByKey}
                cardNumberRef={cardElementsRef.cardNumber}
                cardHolderRef={cardElementsRef.cardHolder}
                cardDateRef={cardElementsRef.cardDate}
              ></CreditCard3>
            </CreditCardForm>
          </div>
        </>
      )}
    </>
  );
};

export default AddCardScreen;
