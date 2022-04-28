/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React from 'react';
import {toast} from 'react-toastify';
import {ethers} from 'ethers';

import {useState, useActions} from '@overmind/index';
import IconUSDC from '@images/icon/icon-usdc-logo.png';
import IconMatic from '@images/icon/icon-matic-logo.png';
import IconChecked from '@images/icon/icon-check.png';
import {currencyFormat, truncateMiddle} from '@utils/helper';
import {Button} from '@elements';

import {Config} from '@constant';
import {SDKContext} from '@context/SDK';
import WAValidator from 'multicoin-address-validator';

const TransferConfirmation = () => {
  const {transfer, wallet} = useState();
  const {
    setModalStep, getPlayerProfile, setLoading, setTransferResponse, exchangeRateCoin, transferToken,
  } = useActions();
  const [isValidAddress, setIsValidAddress] = React.useState(false);
  const [approx, setApprox] = React.useState(0);
  const {nftlabsWithoutRelay} = React.useContext(SDKContext);
  React.useEffect(() => {
    if (transfer.form?.addressTo) {
      const valid = WAValidator.validate(transfer.form?.addressTo, 'matic', 'both');
      if (valid) {
        setIsValidAddress(true);
      } else {
        setIsValidAddress(false);
      }
    } else {
      setIsValidAddress(false);
    }
    if (transfer.currency !== 'USDC') {
      exchangeRateCoin({currency: 'matic'}).then((res) => {
        const rateUSD = res.rates.USDC;
        const resMatic2Usd = transfer.form.amount * rateUSD;
        setApprox(parseFloat(resMatic2Usd >= 0.1 ? resMatic2Usd.toFixed(2) : resMatic2Usd.toFixed(12)));
      });
    } else {
      setApprox(transfer.form.amount);
    }
    return () => {};
  }, []);

  const getCurrencyAddress = (symbol) => {
    switch (symbol) {
      case 'MATIC':
        return Config.currencyAddressMatic;
      case 'USDC':
        return Config.currencyAddressUSDC;
      case 'DD':
        return Config.currencyAddressDD;
      default:
        break;
    }
    return '';
  };
  const getCurrencyDecimal = (symbol) => {
    switch (symbol) {
      case 'MATIC':
        return Config.decimalValueMATIC;
      case 'USDC':
        return Config.decimalValueUSDC;
      case 'DD':
        return Config.decimalValueDD;
      default:
        break;
    }
    return '';
  };

  const doTransfer = async () => {
    //! old
    // try {
    //   // const amount = ethers.utils.parseUnits(transfer.form.amount.toString(), 18);
    //   // ----- set allowance -----
    //   // const currencyUSDC = SDK.nftlabs.getCurrencyModule(Config.currencyAddressUSDC);
    //   // await currencyUSDC.setAllowance(Config.minter1Address, amount);
    //   // const allowanceUSDC = await currencyUSDC.allowance(Config.adminAddress);
    //   // console.log(`allowance USDC = ${allowanceUSDC}`);

    //   const currencyAddress = transfer.currency === 'USDC' ? Config.currencyAddressUSDC : Config.currencyAddressMatic;
    //   const to = transfer.form.addressTo;
    //   const amount = parseFloat(transfer.form.amount);
    //   console.log(currencyAddress, to, amount);
    //   const response = await nftlabsWithoutRelay.getTokenModule(currencyAddress).transfer(to, amount);
    //   // const response = await SDK.nftlabsWithoutRelay.getTokenModule(currencyAddress).transferFrom(player.walletId, transfer.form.addressTo, amount);
    //   await setTransferResponse(response);
    //   console.log('response', response);
    // } catch (error) {
    //   console.log(error);
    //   return Promise.reject(error);
    // }
    try {
      const currencyAddress = await getCurrencyAddress(transfer.currency);
      const to = transfer.form.addressTo;
      // const amount = parseFloat(transfer.form.amount);
      const amount = ethers.utils.parseUnits(transfer.form.amount.toString(), getCurrencyDecimal(transfer.currency));
      const module = await nftlabsWithoutRelay.getTokenModule(currencyAddress);
      // console.log('set module currency = ', currencyAddress);
      // await module.setAllowance(player.walletId, allowanceAmount);
      // const allowanceToken = await module.allowance(player.walletId);
      // console.log(`allowance Token= ${allowanceToken}`);
      console.log('transfering :to =', to);
      let payload = {
        to: transfer.form.addressTo,
        currency: transfer.currency,
        amount: transfer.form.amount,
        fee: '0',
      };
      if (transfer.currency === 'DD' || transfer.currency === 'USDC') {
        console.log('use endpoint : transfer');
        const response = await module.transfer(to, amount);
        await setTransferResponse(response);
        console.log('response', response);
        payload = {...payload, txnHash: response?.transactionHash};
      } else if (transfer.currency === 'MATIC') {
        console.log('use endpoint : sendTransaction');
        const response = await nftlabsWithoutRelay.signer.sendTransaction({to, value: amount});
        await setTransferResponse({...response, transactionHash: response.hash});
        console.log('response', response);
        payload = {...payload, txnHash: response?.hash};
      }
      // ethers.utils.formatEther();
      console.log(payload);
      await transferToken(payload);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  const submit = () => {
    if (parseFloat(wallet.matic.value) <= 0.1) {
      return toast.error('Minimum matic balance is 0.1');
    }
    setLoading(true);
    setModalStep(3);
    toast.promise(
      doTransfer(),
      {
        pending: {
          render() {
            return 'Transfering...';
          },
        },
        success: {
          render() {
            setLoading(false);
            setModalStep(4);
            getPlayerProfile();
            return 'Successfully transfer token';
          },
        },
        error: {
          render({data}) {
            setLoading(false);
            setModalStep(2);
            return data.error || data.reason || 'Oops, please try again in a few moments.';
          },
          autoClose: false,
        },
      },
    );
  };

  return (
    <>
      {transfer.currency === 'DD' ? (
        <div className="flex flex-col trx-confirmation">
          <h1 className="mb-5">
            Confirm your wallet addres
          </h1>
          <div className="flex flex-col my-5 py-3">
            <span className="label pb-2">Your wallet address</span>
            <div className="flex flex-row mx-5 items-center">
              {isValidAddress && (
                <div className="mr-2">
                  <img src={IconChecked} />
                </div>
              )}
              <span className="value">{truncateMiddle(transfer.form.addressTo, 25)}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center my-3">
            <Button
              className="is-blue-light is-small is-semibold is-rounded inline-flex flex-col items-center confirm-button w-full"
              onClick={() => {
                submit();
              }}
            >
              <div>Yes, I'm sure</div>
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center my-3">
            <Button
              className="is-small is-semibold is-rounded inline-flex flex-col items-center edit-button w-full"
              onClick={() => {
                setModalStep(1);
              }}
            >
              <div>Edit my address</div>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-16 trx-confirmation">
          <h1 className="mb-5">
            Confirmation
          </h1>
          <div className="flex flex-col my-3">
            <div>
              <span className="tag-confirm">Transfer</span>
            </div>
          </div>
          <div className="flex flex-row my-3 items-center">
            <div className="icon-container">
              <img className="icon" src={transfer.currency === 'USDC' ? IconUSDC : IconMatic} />
            </div>
            <span className="amount-confirmation">
              {parseFloat(transfer.form.amount) > 1
                ? currencyFormat(transfer.form.amount, '', transfer.currency)
                : `${transfer.form.amount} ${transfer.currency}`}
            </span>
          </div>
          <div className="flex flex-col my-3">
            <span className="label pb-2">Transfer to</span>
            <span className="value">{truncateMiddle(transfer.form.addressTo, 12)}</span>
          </div>
          <div className="flex flex-col my-3">
            <span className="label pb-2">Details</span>
            <div className="flex flex-row justify-between items-center details-container">
              <span className="label">Total</span>
              <div className="flex flex-row gap-2">
                <span className="approx">
                  {approx > 1 ? currencyFormat(approx, '$') : `$ ${approx}`}
                  {' '}
                  ≈
                  {' '}
                </span>
                <span className="total">
                  {parseFloat(transfer.form.amount) > 1
                    ? currencyFormat(transfer.form.amount, '', transfer.currency)
                    : `${transfer.form.amount} ${transfer.currency}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-3">
            <span className="disclamer">Disclaimer: This inquired matic token. If because your transaction sucessful, so your token balance will automatically decreased</span>
          </div>
          <div className="flex flex-col justify-center items-center my-3">
            <Button
              className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center confirm-button w-full"
              onClick={() => {
                submit();
              }}
            >
              <div>Confirm</div>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default TransferConfirmation;
