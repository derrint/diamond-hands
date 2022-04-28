/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react';
import ReactLoading from 'react-loading';
import {useState} from '@overmind/index';
import TransferForm from './transferForm';
import TransferConfirmation from './transferConfirmation';
import TransferSuccess from './transferSuccess';
import TransDDIntroduction from './transferDDIntroduction';

const TransferWallet = () => {
  const {isLoading, modal} = useState();
  return (
    <div className="outside-wrapper">
      {isLoading ? (
        <div>
          <div className="loading-wrapper flex flex-col justify-center items-center">
            {modal.step === 3 && (
              <div className="title">Transfer Processing...</div>
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
        <div className="transfer-wrapper container mx-auto">
          <div>
            {modal.step === 0 && (
              <TransDDIntroduction />
            )}
            {modal.step === 1 && (
              <TransferForm />
            )}
            {modal.step === 2 && (
              <TransferConfirmation />
            )}
            {modal.step === 4 && (
              <TransferSuccess />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TransferWallet;
