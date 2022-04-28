/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Button} from '@elements';
import moment from 'moment';
import IconSuccess from '@images/icon/icon-success.png';
import {currencyFormat} from '@utils/helper';
import {useState} from '@overmind/index';

const WyrePaymentStatus = ({summary, onPaymentModalClose}) => {
  const {payment} = useState();
  return (
    <div className="payment-status">
      <div className="flex flex-col items-center">
        <div className="title">Purchase Complete</div>
        <div>
          <img src={IconSuccess} />
        </div>
        <div className="title-md">
          {payment.module === 'shop' ? currencyFormat(summary.dest.displayValue, '', summary.dest.symbol) : currencyFormat(summary.dest.origin.displayValue, '', summary.dest.origin.symbol)}
          {' '}
          Sent
        </div>
        <div className="subtitle">
          Complete transaction with Wallet Payment,
          <br />
          Inc. at
          {' '}
          {moment().format('MM/DD/YYYY, HH:mm:ss A')}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="payment-result">
          <div className="title-section py-3">Payment method</div>
          <div className="payment-detail">
            <div className="payment-grid line-border-bottom mb-4">
              <span>Amount</span>
              <span className="text-right">
                {payment.module === 'shop' ? currencyFormat(summary.dest.displayValue, '', summary.dest.symbol) : currencyFormat(summary.dest.origin.displayValue, '', summary.dest.origin.symbol)}
              </span>
            </div>
            <div className="payment-grid">
              <span>Fees</span>
              <span className="text-right">
                {currencyFormat(summary.fees.USDC, '', 'USDC')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            onPaymentModalClose();
          }}
        >
          <div>Close</div>
        </Button>
      </div>
    </div>
  );
};
export default WyrePaymentStatus;
