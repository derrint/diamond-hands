/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactLoading from 'react-loading';
import {toast} from 'react-toastify';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';

const MoonpayProcessing = () => {
  const {
    setModalStep,
    getPaymentStatusMoonpay,
    setPaymentStatus,
    hideModal,
  } = useActions();
  const {payment} = useState();
  const checkInterval = 5000; // in miliseconds

  const [isExpired, setIsExpired] = React.useState(false);
  const [windowComponent, setWindowComponent] = React.useState(null);
  
  React.useEffect(() => {
    if (payment.responses.summary) {
      const {widgetUrl, purchasesId} = payment.responses.summary;
      const expiryTime = 15; // in minutes
      const expiryTimeMs = (expiryTime * 60 * 1000) - checkInterval;

      const w = window.open(widgetUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=700,height=700');

      setWindowComponent(w);

      setTimeout(() => {
        getPaymentStatusMoonpay({purchasesId}).then(({status}) => {
          if (status === '') {
            setIsExpired(true);
            w.close();
          }
        });
      }, expiryTimeMs);
    }

    return () => {};
  }, [payment]);

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!isExpired) {
        const paymentStatus = payment.status.toLowerCase();
        if ((paymentStatus === '' || paymentStatus === 'pending') && payment.responses?.summary?.purchasesId) {
          const {purchasesId} = payment.responses?.summary;
          getPaymentStatusMoonpay({purchasesId});
        } else if (paymentStatus === 'completed' || paymentStatus === 'failed') {
          setModalStep(3);
        }
      } else {
        setModalStep(3);
        setPaymentStatus('expired');
      }
    },
    checkInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [isExpired]);

  return (
    <>
      <div className="payment-processing flex flex-col justify-center items-center gap-20">
        <div className="flex flex-col note">
          <span className="title">Do not leave this page until the payment process is complete</span>
          <span className="subtitle">
            Diamond Hands is directing you to the selected payment window.
          </span>
        </div>
        <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
        <div className="mb-10">
          <div className="title">Didn't see the payment window?</div>
          <div className="subtitle mt-5">
            Make sure you have
            {' '}
            <b>disabled the AdBlocker</b>
            {' '}
            to access the payment page
            <br />
            or
            {' '}
            <Button
              onClick={() => {
                if (payment.responses.summary && payment.status === '') {
                  const {widgetUrl} = payment.responses.summary;
                  windowComponent.close();
                  const w = window.open(widgetUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=700,height=700');
                  setWindowComponent(w);
                } else {
                  toast.error('Payment widget cannot be reopened');
                }
              }}
              className="is-text is-nunito is-semibold"
            >
              click here
            </Button>
            {' '}
            to reopen the payment window
          </div>
        </div>
      </div>

      <div className="bottom-action flex w-100 justify-center text-center">
        <div>
          <div className="label">Did you change your mind?</div>
          <Button
            onClick={() => {
              hideModal();
              windowComponent.close();
            }}
            className="is-text-dark is-nunito is-semiboldx2"
          >
            Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default MoonpayProcessing;
