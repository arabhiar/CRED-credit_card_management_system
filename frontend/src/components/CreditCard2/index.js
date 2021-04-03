import React from 'react';
import $ from 'jquery';
import './styles.scss';

const getTransformValue = (v1, v2, value) => {
  return (((v1 / v2) * value - value / 2) * 1).toFixed(1);
};

document.addEventListener('mousemove', (event) => {
  let card_x = getTransformValue(event.clientX, window.innerWidth, 56);
  let card_y = getTransformValue(event.clientY, window.innerHeight, 56);
  let shadow_x = getTransformValue(event.clientX, window.innerWidth, 20);
  let shadow_y = getTransformValue(event.clientY, window.innerHeight, 20);
  let text_shadow_x = getTransformValue(event.clientX, window.innerWidth, 28);
  let text_shadow_y = getTransformValue(event.clientY, window.innerHeight, 28);
  $('.floating').css(
    'transform',
    'rotateX(' + card_y / 1 + 'deg) rotateY(' + card_x + 'deg)'
  );
  $('.floating').css(
    'box-shadow',
    -card_x + 'px ' + card_y / 1 + 'px 55px rgba(0, 0, 0, .55)'
  );
  $('.svg').css(
    'filter',
    'drop-shadow(' +
      -shadow_x +
      'px ' +
      shadow_y / 1 +
      'px 4px rgba(0, 0, 0, .6))'
  );
  $('.text').css(
    'text-shadow',
    -text_shadow_x + 'px ' + text_shadow_y / 1 + 'px 6px rgba(0, 0, 0, .8)'
  );
});

$(function () {
  setTimeout(function () {
    $('body').removeClass('active');
  }, 2200);
});

const CreditCard2 = (props) => {
  const { card } = props;
  return (
    <div className='active'>
      <div className="floating">
        <div className="thickness"></div>
        <div className="thickness"></div>
        <div className="thickness"></div>
        <div className="card_body">
          <div className="paypal_center svg"></div>
          <div className="logo svg"></div>
          <div className="paywave svg"></div>
          <div className="chips svg"></div>
          <div className="card_no text">{card.cardNumber}</div>
          <div className="valid text">
            VALID <br /> THUR
          </div>
          <div className="valid_date text">
            {card.expiryMonth
              ? `${card.expiryMonth.toString()}/${card.expiryYear.toString()}`
              : ''}
          </div>
          <div className="holder text">{card.cardOwnerName}</div>
          <div className="mastercard_icon svg"></div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard2;
