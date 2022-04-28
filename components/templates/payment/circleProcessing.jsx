/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useActions, useState} from '@overmind/index';
import ReactLoading from 'react-loading';

const CircleProcessing = () => {
  const {payment} = useState();
  
  const {
    getOrderStatusCircle,
    setModalStep,
  } = useActions();
  
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      if ((payment.status === '' || payment.status === 'action_required') && payment.responses?.summary?.id) {
        getOrderStatusCircle({paymentId: payment.responses.summary.id});
      } else if (payment.status === 'confirmed' || payment.status === 'failed') {
        setModalStep(3);
      }
    },
    5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="payment-processing">
      <div className="loading-wrapper flex flex-col justify-center items-center">
        <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
        <div className="subtitle">Processing payment...</div>
      </div>
    </div>
  );
};
export default CircleProcessing;
