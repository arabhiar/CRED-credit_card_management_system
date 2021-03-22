import React from 'react';
import './styles.scss';

const CreditCard = () => {
  return (
    <div class="credit-card">
      <div class="face front">
        <h3 class="debit">CSSScript</h3>
        <h3 class="bank">VISA</h3>
        <img class="chip" src="images/chip.png" alt="chip" />
        <h3 class="number">0000 0000 0000 0000</h3>
        <h5 class="valid">
          <span>
            VALID <br /> THRU
          </span>
          <span>10/28</span>
        </h5>
        <h5 class="card-holder">jQueryScript</h5>
      </div>
      <div class="face back">
        <div class="blackbar"></div>
        <div class="cvvtext">
          <div class="white-bar"></div>
          <div class="cvv">123</div>
        </div>
        <p class="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          quis ex nec nulla posuere sollicitudin. Proin nec orci at est
          pellentesque malesuada eu a neque. Maecenas quis porttitor odio.
          Praesent faucibus dui nisl, ac luctus mauris pulvinar in. Morbi vitae
          ante a nunc ullamcorper rutrum. Donec non interdum purus, gravida
          elementum mi.
        </p>
      </div>
    </div>
  );
};

export default CreditCard;
