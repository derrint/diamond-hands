/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import IconUSDC from '@images/icon/icon-usdc-logo.png';
import moment from 'moment';
import {currencyFormat} from '@utils/helper';
import {Config} from '@constant';
import {Button} from '@elements';

const messageDetail = ({
  message, data,
}) => {
  console.log(message);
  return (
    <div className="payment-wallet">
      <div className="flex justify-center items-center title">
        Crypto Transaction
      </div>
      <div className="flex flex-row justify-center items-center mt-5">
        <img src={IconUSDC} width="24px" />
        <span className="title-amount ml-2">{currencyFormat(data?.DestAmount, '', 'USDC')}</span>
      </div>
      <div className="flex justify-center items-center sub-title mb-5">
        {data?.PurchaseType ? 'Buy NFT Card' : 'Buy Lootbox'}
      </div>
      <div className="flex flex-col justify-center container-detail">
        <div className="flex flex-row justify-between py-5 detail-row">
          <span className="label">Date & Time</span>
          <span className="value">{moment(message.timestamp * 1000).format('ddd, DD MMM, YYYY - hh:mm A')}</span>
        </div>
        <div className="flex flex-row justify-between py-5 detail-row">
          <span className="label">Amount:</span>
          <span className="value">{currencyFormat(data?.DestAmount, '', 'USDC')}</span>
        </div>
        <div className="flex flex-row justify-between py-5 detail-row">
          <span className="label">Fee:</span>
          <span className="value">{currencyFormat(data?.Fee, '', 'USDC')}</span>
        </div>
        <div className="flex flex-row justify-between py-5 detail-row">
          <span className="label">Transfer ID:</span>
          <span className="value">{data?.TransferId}</span>
        </div>
        <div className="flex flex-row justify-between py-5 detail-row">
          <span className="label">Rate:</span>
          <span className="value">
            1 USD =
            {' '}
            {data?.Rate}
            {' '}
            USDC
          </span>
        </div>
        <div className="flex flex-row justify-between py-5 detail-row no-border">
          <span className="label">Transfer Hash:</span>
          <div className="link-container">
            {/* <span className="value-link">{data?.TransactionHash}</span> */}
            <Button
              onClick={() => window.open(`${Config.polygonscanURL}/tx/${data?.TransactionHash}`, '_blank').focus()}
            >
              <span className="value-link">{data?.TransactionHash}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default messageDetail;
