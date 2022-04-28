/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react';
import ReactLoading from 'react-loading';

import {useState} from '@overmind/index';

import WyreSelectCountry from './wyreSelectCountry';
// import WyreSummary from './wyreSummary';
import WyreWidget from './wyreWidget';
import WyreFormPayment from './wyreFormPayment';
import WyreAuthorize from './wyreAuthorize';
import WyrePaymentStatus from './wyrePaymentStatus';
import WyreTrackTransaction from './wyreTrackTransaction';

import CircleSummary from './circleSummary';
import CircleFormPayment from './circleFormPayment';
import CircleProcessing from './circleProcessing';
import CircleStatus from './circleStatus';

import RampSumary from './rampSummary';

import MoonpayProcessing from './moonpayProcessing';
import MoonpayStatus from './moonpayStatus';

import WalletSummary from './walletSummary';
import WalletPaymentStatus from './walletPaymentStatus';

const Payment = ({type, onPaymentModalClose}) => {
  const {isLoading, payment, modal} = useState();
  const {
    summary, authorize, order,
  } = payment.responses;

  const steps = [
    {
      number: 1,
      label: 'Select payment',
      isVisible: true,
    },
    {
      number: 2,
      label: 'Payment Information',
      isVisible: true,
    },
    {
      number: 2.5,
      label: 'Processing payment',
      isVisible: false,
    },
    {
      number: 3,
      label: 'Completed',
      isVisible: true,
    },
  ];

  const visibleSteps = steps.filter((s) => s.isVisible);

  return (
    <div key={type} className="outside-wrapper">
      {type === 'circle' && (
        <div className="stepper flex justify-center items-center">
          {visibleSteps.map((item) => (
            <div key={item.number} className={`flex justify-center items-center ${modal.step === item.number ? 'active' : modal.step > item.number ? 'previous' : ''}`}>
              {item.number > 1 && (
                <hr />
              )}
              <div className="number">{item.number}</div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {isLoading ? (
        <div>
          <div className={`loading-wrapper ${modal.isFullScreen ? 'is-full' : ''} flex flex-col justify-center items-center`}>
            {modal.step === 3 && (
              <div className="title">Sending verification code...</div>
            )}
            <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
            {modal.step === 3 && (
              <div className="subtitle">
                Please wait.
                <br />
                Sometime its take time to proceed
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="payment-wrapper container mx-auto">
          {type === 'wyre' && (
            <div>
              {modal.step === 1 && (
                <WyreSelectCountry />
              )}
              {modal.step === 2 && (
                <WyreWidget summary={summary} />
              )}
              {modal.step === 3 && (
                <WyreFormPayment summary={summary} />
              )}
              {modal.step === 4 && (
                <WyreAuthorize summary={summary} authorize={authorize} />
              )}
              {modal.step === 5 && (
                <WyrePaymentStatus summary={summary} onPaymentModalClose={onPaymentModalClose} />
              )}
              {modal.step === 6 && (
                <WyreTrackTransaction detail={order.detail} onPaymentModalClose={onPaymentModalClose} />
              )}
            </div>
          )}
          {type === 'circle' && (
            <div>
              {modal.step === 1 && (
                <CircleSummary />
              )}
              {modal.step === 2 && (
                <CircleFormPayment />
              )}
              {modal.step === 2.5 && (
                <CircleProcessing />
              )}
              {modal.step === 3 && (
                <CircleStatus onPaymentModalClose={onPaymentModalClose} />
              )}
            </div>
          )}
          {type === 'ramp-network' && (
            <div>
              {modal.step === 1 && (
                <RampSumary />
              )}
            </div>
          )}
          {type === 'moonpay' && (
            <div>
              {modal.step === 2 && (
                <MoonpayProcessing onPaymentModalClose={onPaymentModalClose} />
              )}
              {modal.step === 3 && (
                <MoonpayStatus onPaymentModalClose={onPaymentModalClose} />
              )}
            </div>
          )}
          {type === 'wallet' && (
            <div>
              {modal.step === 1 && (
                <WalletSummary summary={summary} />
              )}
              {modal.step === 5 && (
                <WalletPaymentStatus summary={summary} onPaymentModalClose={onPaymentModalClose} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
