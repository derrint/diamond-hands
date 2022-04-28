import React from 'react';
import {useState, useActions} from '@overmind/index';
import IconUSDC from '@images/icon/icon-usdc-logo.png';
import IconMatic from '@images/icon/icon-matic-logo.png';
import IconChecked from '@images/icon/icon-check.png';
import IconUnchecked from '@images/icon/icon-invalid.png';
import {currencyFormat} from '@utils/helper';
import {Button} from '@elements';
import {RiCloseLine} from 'react-icons/ri';
import IconDD from '@images/icon/icon-dd.png';
import WAValidator from 'multicoin-address-validator';

const TransferForm = () => {
  const {transfer, wallet} = useState();
  const {setTransferForm, setModalStep, exchangeRateCoin} = useActions();
  const [isValid, setIsValid] = React.useState(false);
  const [isValidAddress, setIsValidAddress] = React.useState(false);
  const [isValidMaticBalance, setIsValidMaticBalance] = React.useState(true);
  const [selectedToken, setSeletedToken] = React.useState({});
  const [rate, setRate] = React.useState(0);
  const [approx, setApprox] = React.useState(0);

  const getSymbol = (symbol) => {
    switch (symbol) {
      case 'MATIC':
        return IconMatic;
      case 'USDC':
        return IconUSDC;
      case 'DD':
        return IconDD;
      default:
        break;
    }
    return '';
  };
  React.useEffect(() => {
    switch (transfer.currency) {
      case 'USDC':
        setSeletedToken(wallet.usdc);
        break;
      case 'MATIC':
        setSeletedToken(wallet.matic);
        if (wallet.matic.value < 0.1) {
          setIsValidMaticBalance(false);
        }
        break;
      case 'DD':
        setSeletedToken(wallet.diad);
        break;
    
      default:
        break;
    }
  }, []);
  React.useEffect(() => {
    if (transfer.currency === 'MATIC') {
      exchangeRateCoin({currency: 'matic'}).then((res) => {
        const rateUSD = res.rates.USDC;
        setRate(rateUSD);
      });
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    if (parseFloat(transfer.form?.amount)) {
      setIsValid(true);
      if (transfer.currency === 'MATIC') {
        const resMatic2Usd = transfer.form.amount * rate;
        setApprox(parseFloat(resMatic2Usd >= 0.1 ? resMatic2Usd.toFixed(2) : resMatic2Usd.toFixed(12)));
      }
      if (transfer.currency === 'USDC') {
        setApprox(transfer.form.amount);
      }
    } else {
      setIsValid(false);
      setApprox(0);
    }
    return () => {};
  }, [transfer.form]);
  React.useEffect(() => {
    if (transfer.form?.addressTo) {
      const valid = WAValidator.validate(transfer.form?.addressTo, 'matic', 'both');
      if (valid) {
        console.log('This is a valid address');
        setIsValidAddress(true);
      } else {
        setIsValidAddress(false);
        console.log('Address INVALID');
      }
    } else {
      setIsValidAddress(false);
    }
    return () => {};
  }, [transfer.form?.addressTo]);
  const next = () => {
    setModalStep(2);
  };
  return (
    <div className="flex flex-col">
      <h1 className="mb-5">
        Transfer
        {' '}
        {transfer.currency}
        {' '}
        to another account
      </h1>
      <div className="flex flex-col my-3">
        <span className="label pb-2">Transfer to</span>
        <div className="flex flex-row items-center">
          {isValidAddress && (
            <div className="valid-icon">
              <img src={IconChecked} />
            </div>
          )}
          {!isValidAddress && transfer.form?.addressTo && (
            <div className="valid-icon">
              <img src={IconUnchecked} />
            </div>
          )}
          <input
            className={`outline-none address-input ${transfer.form?.addressTo ? 'address-valid' : ''}`}
            type="text"
            value={transfer.form?.addressTo}
            name="addressto"
            placeholder="Input wallet address (e.g 0xa1d...4f6e)"
            onChange={(e) => setTransferForm({...transfer.form, addressTo: e.target.value})}
          />
          {transfer.form?.addressTo && transfer.form?.addressTo !== '' && (
            <RiCloseLine className="close_icon" size={25} color="#1C5D79" onClick={() => setTransferForm({...transfer.form, addressTo: ''})} />
          )}
        </div>
        {!isValidAddress && transfer.form?.addressTo && (
          <span className="invalid-error-info">Invalid wallet address</span>
        )}
      </div>
      <div className="flex flex-col my-3">
        <span className="label pb-2">Asset</span>
        <input disabled className="outline-none" type="text" value={transfer.currency} name="currency" />
      </div>
      <div className="flex flex-col my-3 wallet-info">
        <div className="flex flex-row items-center ">
          <img className="icon" src={getSymbol(selectedToken?.symbol)} />
          <span className="label">
            Your
            {' '}
            {selectedToken?.symbol}
            {' '}
            Balance:
          </span>
          <span className="value">{currencyFormat(selectedToken?.displayValue, '', selectedToken?.symbol)}</span>
          {/* {transfer.currency === 'USDC' ? (
            <span className="value">{currencyFormat(wallet.usdc.displayValue, '', wallet.usdc.symbol)}</span>
          ) : (
            <span className="value">{currencyFormat(wallet.matic.displayValue, '', wallet.matic.symbol)}</span>
          )} */}
        </div>
      </div>
      {!isValidMaticBalance && transfer.currency === 'MATIC' && (
        <span className="invalid-error-info">Insufficient Matic balance</span>
      )}
      <div className="flex flex-col my-3">
        <span className="label pb-2">Amount</span>
        <div className="flex flex-row items-center">
          <input
            className="outline-none"
            type="number"
            value={transfer.form?.amount}
            placeholder="Insert amount"
            name="amount"
            disabled={transfer.currency === 'MATIC' ? !isValidMaticBalance : false}
            onChange={(e) => {
              if (transfer.currency === 'MATIC') {
                if (e.target.value > parseFloat(selectedToken?.value) - 0.1) {
                  setTransferForm({...transfer.form, amount: parseFloat(selectedToken?.value) - 0.1});
                } else {
                  setTransferForm({...transfer.form, amount: e.target.value});
                }
              } else if (e.target.value > parseFloat(selectedToken?.value)) {
                setTransferForm({...transfer.form, amount: parseFloat(selectedToken?.value)});
              } else {
                setTransferForm({...transfer.form, amount: e.target.value});
              }
            }}
          />
          {transfer.currency !== 'DD' && (
            <span className="approx-input">
              ≈
              {' '}
              {approx > 1 ? currencyFormat(approx, '$') : `$ ${approx}`}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col my-3">
        <span className="disclamer">There's a need to keep a minimum number of 0.1 MATIC on your wallet, to pay the gas price.</span>
      </div>
      <div className="flex flex-col justify-center items-center my-3">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito flex flex-col items-center next-button w-full"
          onClick={() => {
            next();
          }}
          isDisabled={!(isValid && isValidAddress)}
        >
          <div>Next</div>
        </Button>
      </div>
    </div>
  );
};
export default TransferForm;
