import React from 'react';
import IconSuccess from '@images/icon/icon-success-transfer.png';
import {Button} from '@elements';
import {useState, useActions} from '@overmind/index';
import {Config} from '@constant';

const TransferSuccess = () => {
  const {hideModal} = useActions();
  const {transfer} = useState();
  
  // const urlTransaction = transfer.currency === 'USDC' ? `${Config.polygonscanURL}token/0xCe8271Ad06e8CB0EE47d1486947313b7c1290D14?a=${player.walletId}`
  //   : `${Config.polygonscanURL}token/0xCe8271Ad06e8CB0EE47d1486947313b7c1290D14?a=${player.walletId}`;
  const urlTransaction = `${Config.polygonscanURL}/tx/${transfer.response?.transactionHash}`;
  return (
    <div className="flex flex-col justify-center items-center trx-success">
      <img src={IconSuccess} width={80} />
      <div className="flex flex-col justify-center items-center mt-3">
        <h1 className="mb-5">
          Transaction Submited
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mb-3">
        <Button
          className="inline-flex flex-col items-center"
          onClick={() => window.open(urlTransaction, '_blank').focus()}
        >
          <span className="view-on-explorer">View on explorer</span>
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center my-3">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center confirm-button"
          onClick={() => {
            hideModal();
          }}
        >
          <div>Dismiss</div>
        </Button>
      </div>
    </div>
  );
};
export default TransferSuccess;
