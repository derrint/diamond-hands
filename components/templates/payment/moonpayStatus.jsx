/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';

import IconSuccess from '@images/icon/icon-success.png';
import IconFailure from '@images/icon/icon-failed.png';

const CircleStatus = ({onPaymentModalClose}) => {
  const {payment} = useState();
  const {hideModal} = useActions();
  const paymentStatus = payment.status.toLowerCase();

  return (
    <div className="payment-status">
      <div className="flex flex-col justify-center items-center my-20">
        {paymentStatus === 'completed' && (
          <>
            <img className="icon" src={IconSuccess} />
            <div className="title">Payment completed</div>
            <div className="subtitle">You are done with your payment</div>
            <div className="flex flex-col items-center mt-5">
              <Button
                className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
                onClick={() => {
                  onPaymentModalClose();
                }}
              >
                {payment.module === 'marketplace' ? (
                  <div>Close this page to continue the process</div>
                ) : (
                  <div>Close this page to open your lootbox</div>
                )}
              </Button>
            </div>
          </>
        )}
        {paymentStatus === 'failed' && (
          <>
            <img className="icon" src={IconFailure} />
            <div className="title">Payment failed</div>
            <div className="subtitle">
              Something wrong happened
              <br />
              {/* <span style={{fontStyle: 'italic'}}>
                (
                {payment.responses.order.detail.errorCode}
                )
              </span> */}
            </div>
            <div className="flex flex-col items-center mt-5">
              {/* <Button
                className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
                onClick={() => {
                  setModalStep(2);
                }}
              >
                <div>Try again?</div>
              </Button> */}
              <Button
                className="is-transparent is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button mt-5"
                onClick={() => {
                  hideModal();
                }}
              >
                <div>Cancel purchase</div>
              </Button>
            </div>
          </>
        )}
        {paymentStatus === 'expired' && (
          <>
            <img className="icon" src={IconFailure} />
            <div className="title">Payment expired</div>
            <div className="subtitle">
              You've exceeded the payment time limit (15 minutes)
            </div>
            <div className="flex flex-col items-center mt-5">
              {/* <Button
                className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
                onClick={() => {
                  setModalStep(2);
                }}
              >
                <div>Try again?</div>
              </Button> */}
              <Button
                className="is-transparent is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button mt-5"
                onClick={() => {
                  hideModal();
                }}
              >
                <div>Cancel purchase</div>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CircleStatus;
