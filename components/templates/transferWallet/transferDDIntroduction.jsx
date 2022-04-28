import React from 'react';
import Cookies from 'js-cookie';

import {useState, useActions} from '@overmind/index';
import {truncateMiddle, copyToClipboard} from '@utils/helper';
import {Button} from '@elements';
import IconCopy from '@images/icon/icon-copy.png';
import {Config} from '@constant';

const TransferDDIntroduction = () => {
  const {player} = useState();
  const [isValid, setIsValid] = React.useState(false);
  const {setModalStep} = useActions();

  const handleCheckbox = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const {name} = target;

    setIsValid(value);
  };
  const next = () => {
    Cookies.set('wallet-dd-transfer-intro', true);
    setModalStep(1);
  };
  return (
    <div className="flex flex-col">
      <h1 className="mb-5">
        Connect your Polygon wallet
      </h1>
      <div className="flex flex-col my-3">
        <span className="description pb-2">
          GM Fam! Right now DD is still in the process to get listed officially. In order to see DD balance in your preferred
          {' '}
          <b>Polygon wallet</b>
          , please import this token address before confirming the transfer:
        </span>
      </div>
      <div className="flex flex-col my-3 wallet-info">
        <span className="label bold pb-2">Diamond Hands wallet address</span>
        <div className="flex justify-between items-center ">
          <div>
            <span className="my-address">
              {truncateMiddle(player.walletId, 20)}
            </span>
          </div>
          <img className="btn__copy" onClick={() => copyToClipboard(player.walletId)} src={IconCopy} />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-10">
        <Button
          onClick={() => {
            window.open(`${Config.webURL}learn#dd-coin`, '_blank');
          }}
          className="inline-flex flex-col items-center urltxt"
        >
          Learn how to connect your wallet
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center my-10">
        <div className="mr-5">
          <input type="checkbox" id="checkbox-authorize-matic" className="checkbox" checked={isValid} onChange={handleCheckbox} />
        </div>
        <span className="description">
          Already connected, never show this again
        </span>
      </div>
      <div className="flex flex-col justify-center items-center my-3">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button w-full"
          onClick={() => {
            next();
          }}
          isDisabled={!isValid}
        >
          <div>Next, transfer my DD</div>
        </Button>
      </div>
    </div>
  );
};
export default TransferDDIntroduction;
