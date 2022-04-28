/* eslint-disable react/display-name */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-cycle */
import React from 'react';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {currencyFormat} from '@utils/helper';

import IconChevronRightDark from '@images/icon/icon-chevron-right-dark.png';

const CircleSummary = () => {
  const {setModalStep, hideModal} = useActions();
  const {lootboxes} = useState();
  const summary = {
    sourceCurrency: 'USD',
    sourceAmountWithoutFees: lootboxes.selected.price,
  };
  
  const symbolFrom = summary?.sourceCurrency === 'USD' ? '$' : summary?.sourceCurrency;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="title">Buy Lootbox</div>
        <div className="price_usd">{currencyFormat(summary?.sourceAmountWithoutFees, symbolFrom, '')}</div>
      </div>

      <div className="flex justify-center items-center flex-col my-16">
        <img className="lootbox-badge" src={lootboxes.selected.assets.badge} />
        <h1 className="lootbox-name">{lootboxes.selected.name}</h1>
      </div>

      <div className="payment-methods">
        <div className="wrapper_single_card">
          <Button
            className="item_single"
            onClick={() => {
              setModalStep(2);
            }}
          >
            <div className="flex justify-center items-center gap-5">
              <img className="icon-cc" src="https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-cc.png" />
              <span>Pay with a credit card</span>
            </div>
            <img className="chevron-right" src={IconChevronRightDark} />
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <span className="subtitle_payment">We'll add more payment methods soon</span>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-transparent is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            hideModal();
          }}
        >
          <div>Cancel purchase</div>
        </Button>
      </div>
    </>
  );
};

export default CircleSummary;
