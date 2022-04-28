/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
import React from 'react';
import {toast} from 'react-toastify';
import {ethers} from 'ethers';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {currencyFormat} from '@utils/helper';
import IconWallet from '@images/icon/icon-wallet-dark.png';
import IconUSDC from '@images/icon/icon-usdc-logo.png';
import IconMatic from '@images/icon/icon-matic-logo.png';

// import IconPlusBlue from '@images/icon/icon-plus-blue.png';
// import IconSwitch from '@images/icon/icon-switch.png';
import {SDKContext} from '@context/SDK';
import {Config} from '@constant';

const WalletSummary = ({summary}) => {
  const {
    setModalStep, purchaseLootboxWallet, buyCardOnMarketPlace, getPlayerProfile,
  } = useActions();
  const {
    payment, wallet, lootboxes, cards,
  } = useState();
  // const [approx, setApprox] = React.useState();
  const [isValidMatic, setIsvalidMatic] = React.useState(false);
  const [isWalletAuthorized, setIsWalletAuthorized] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const {nftlabs, nftlabsWithoutRelay} = React.useContext(SDKContext);

  const paymentSummaries = [
    {
      label: 'Price',
      value: payment.module === 'shop' ? summary?.dest.displayValue : summary?.sourceWithoutFees.origin.displayValue,
      symbol: payment.module === 'shop' ? summary?.dest.symbol : summary?.sourceWithoutFees.origin.symbol,
    },
    {
      label: 'Transaction fee ',
      value: summary?.fees.USDC,
      symbol: 'USDC',
    },
    {
      label: 'Purchase Total',
      value: payment.module === 'shop' ? summary?.dest.displayValue : summary?.dest.origin.displayValue,
      symbol: payment.module === 'shop' ? summary?.dest.symbol : summary?.dest.origin.symbol,
    },
  ];
  // React.useEffect(() => {
  //   exchangeRateCoin({currency: 'matic'}).then((res) => {
  //     const rateUSD = res.rates.USDC;
  //     const resMatic2Usd = summary?.sourceWithoutFees.origin.displayValue * rateUSD;
  //     setApprox(resMatic2Usd);
  //   });
  //   return () => {};
  // }, []);

  React.useEffect(() => {
    const checkBlance = parseFloat(wallet.usdc.value) >= parseFloat(payment.module === 'shop' ? summary?.dest.value : summary?.dest.origin.value);
    if (checkBlance && isValidMatic) {
      setIsWalletAuthorized(true);
    } else {
      setIsWalletAuthorized(false);
    }
  }, [isValidMatic]);
  // const switchPayment2USD = async (method) => {
  //   await hideModal();
  //   try {
  //     showModal('loading');
  //     setLoading(true);
  //     if (payment.module === 'shop') {
  //       await buyLootbox({
  //         method,
  //         lootboxId: payment.lootboxId.toString(),
  //       });
  //     } else {
  //       await buyCardOnMarketPlaceSummary({
  //         method,
  //         listingId: payment.listingId,
  //         card: cards.selected,
  //         tokenId: cards.selected.tokenId,
  //       });
  //     }
  //     setModalStep(1);
  //     setModalFullScreen(true);
  //     showModal('payment');
  //     await setLoading(false);
  //   } catch (e) {
  //     toast.error(e.error || e);
  //   }
  // };
  // const topUp = () => {
  //   setIsWalletAuthorized(true);
  // };
  const doBuyLootboox = async () => {
    try {
      const amountTmp = summary.dest.value;
      const amount = ethers.utils.parseUnits(amountTmp, Config.decimalValueUSDC); // if prod use 18 decimal
      const currencyUSDC = nftlabs.getCurrencyModule(Config.currencyAddressUSDC);

      // ----- set allowance -----
      await currencyUSDC.setAllowance(Config.minter1Address, amount).catch(() => Promise.reject('Blockchain Error'));
      const allowanceUSDC = await currencyUSDC.allowance(Config.adminAddress);
      console.log(`allowance USDC = ${allowanceUSDC}`);

      // // ----- transfer via SDK -----
      // const data = await currencyUSDC.transfer(Config.adminAddress, amount);
      // await purchaseLootboxWallet({lootboxId: payment.lootboxId, txnHash: data.transactionHash}).then(() => {
      //   setModalStep(5);
      // });

      // ----- transfer via BE -----
      await purchaseLootboxWallet({lootboxId: payment.lootboxId}).then(() => {
        setModalStep(5);
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  const doBuyCard = async () => {
    try {
      let transaction = {};
      await nftlabsWithoutRelay.event.on('transaction', (event) => {
        transaction = event;
        console.log('event', event);
      });
      // const data = await nftlabsWithoutRelay.getMarketModule(Config.marketplaceAddress).buy(payment.listingId, 1);
      // TODO: ==== Marketplace V2 start
      const {listingId} = payment;
      const quantityDesired = 1;

      await nftlabsWithoutRelay.getMarketplaceModule(Config.marketplaceAddress).buyoutDirectListing({listingId, quantityDesired}).catch(() => Promise.reject('Blockchain Error'));
      // TODO: ==== Marketplace V2 end

      await buyCardOnMarketPlace({
        tokenId: payment.responses.summary.tokenId,
        listingId: payment.listingId,
        price: payment.responses.summary.dest.origin.value,
        decimal: summary?.dest?.origin?.symbol === 'USDC' ? Config.decimalValueUSDC : Config.decimalValueMATIC, // if prod use 18 decimal
        currencySymbol: payment.responses.summary.dest.name,
        txnHash: transaction.transactionHash,
      }).then(() => {
        setModalStep(5);
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const submit = async () => {
    if (payment.module === 'shop') {
      setIsProcessing(true);
      toast.promise(
        doBuyLootboox(),
        {
          pending: {
            render() {
              return 'Processing...';
            },
          },
          success: {
            render() {
              setIsProcessing(false);
              getPlayerProfile();
              // hideModal();
              // showModal('buy-card-success');

              return 'Successfully buy lootbox';
            },
          },
          error: {
            render(e) {
              setIsProcessing(false);
              // console.log('data = ', data);
              return e.data.error || e.data.reason || 'Oops, please try again in a few moments.';
            },
            autoClose: false,
          },
        },
      );
    } else {
      if (parseFloat(wallet.matic.value) <= 0.1) {
        return toast.error('Minimum matic balance is 0.1');
      }
      setIsProcessing(true);
      toast.promise(
        doBuyCard(),
        {
          pending: {
            render() {
              return 'Processing...';
            },
          },
          success: {
            render() {
              setIsProcessing(false);
              getPlayerProfile();
              // hideModal();
              // showModal('buy-card-success');

              // ----- add FB Pixel tracking -----
              import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                  const payload = {
                    paymentMethod: payment.method,
                    itemType: 'card',
                    itemId: cards.selected.tokenId,
                    itemName: cards.selected.name,
                  };
                  ReactPixel.trackCustom('BuyCard', {
                    ...payload,
                    content_category: payload.itemType,
                    content_type: 'product',
                    content_ids: [payload.itemId],
                    content_name: payload.itemName,
                    contents: [{
                      id: payload.itemId,
                      quantity: 1,
                      name: payload.itemName,
                      payment: payment.method,
                    }],
                    currency: cards.selected.currency.origin.symbol,
                    num_items: 1,
                    value: parseFloat(cards.selected.currency.origin.value),
                  });
                });

              return 'Successfully buy card';
            },
          },
          error: {
            render(e) {
              setIsProcessing(false);
              // console.log('data = ', data);
              return e.data.error || e.data.reason || 'Oops, please try again in a few moments.';
            },
            autoClose: false,
          },
        },
      );
    }
  };
  const handleCheckboxMatic = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const {name} = target;

    setIsvalidMatic(value);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          {payment.module === 'shop' ? (
            <img className="lootbox-badge" src={lootboxes.selected.assets.badge} />
          ) : (
            <img className="card-badge" src={cards.selected.image} />
          )}
          <div className="wallet-title">
            Buy
            {' '}
            {payment.module === 'shop' ? lootboxes.selected.name : cards.selected.name + ' Card'}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="label-section">Detail</h3>
          {payment.module === 'shop' ? (
            <span>
              You'll get
              {' '}
              {lootboxes.selected.cardsChance.length}
              {' '}
              NFT and
              {' '}
              {currencyFormat(lootboxes.selected.content.dd, '', 'DD')}
            </span>
          ) : (
            <span>
              You'll get
              {' '}
              {cards.selected.name}
              {' '}
              Card level
              {' '}
              {cards.selected.cardDetail.level}
              {' '}
              from
              {' '}
              {cards.selected.sellerName}
            </span>
          )}
        </div>
      </div>
      <div className="payment-methods">
        <h3 className="title">Payment Summary</h3>
      </div>
      <div className="summary_wallet">
        {paymentSummaries.map((item, i) => (
          <div key={i} className="item">
            <span className="label">
              {item.label}
            </span>
            <span className="value">
              {currencyFormat(parseFloat(item.value).toFixed(2), '', item.symbol)}
            </span>
          </div>
        ))}
      </div>
      <div className="payment-wallet-info">
        <div className="flex flex-row items-center ">
          <img className="icon" src={IconWallet} />
          <h3 className="title">My Wallet</h3>
        </div>
        <div className="payment-wallet-info-wrapper">
          {payment.module === 'shop' ? (
            <div className="flex flex-row items-center ">
              <img className="icon" src={IconUSDC} />
              <span className="label">
                {wallet.usdc.symbol}
                {' '}
                Balance:
              </span>
              <span className="value">{currencyFormat(wallet.usdc.displayValue, '', wallet.usdc.symbol)}</span>
            </div>
          ) : (
            <div className="flex flex-row items-center ">
              <img className="icon" src={summary?.dest?.origin?.symbol === 'USDC' ? IconUSDC : IconMatic} />
              <span className="label">
                {summary?.dest?.origin?.symbol === 'USDC' ? wallet.usdc.symbol : wallet.matic.symbol}
                {' '}
                Balance:
              </span>
              {summary?.dest.origin.symbol === 'USDC' ? (
                <span className="value">{currencyFormat(wallet.usdc.displayValue, '', wallet.usdc.symbol)}</span>
              ) : (
                <span className="value">{currencyFormat(wallet.matic.displayValue, '', wallet.matic.symbol)}</span>
              )}
            </div>
          )}
          {parseFloat(wallet.usdc.value) < parseFloat(payment.module === 'shop' ? summary?.dest.value : summary?.dest.origin.value) && (
            <>
              <div className="flex flex-row items-center justify-between mt-4">
                <div className="insufficient-balance">
                  Insufficient balance, please top up your
                  {' '}
                  {summary?.dest?.origin?.symbol}
                </div>
                {/* <Button
                className="flex flex-row items-center is-nunito"
                onClick={() => {
                  topUp();
                }}
              >
                <img className="icon" src={IconPlusBlue} />
                <div>Top Up</div>
              </Button> */}
              </div>
              <div className="flex flex-row justify-between items-center topup-description">
                <span>
                  Top up the USDC from
                  {' '}
                  <br />
                  third party provider
                </span>
                <Button
                  onClick={() => {
                    window.open(Config.webURL + 'learn#usdc-coin', '_blank');
                  }}
                >
                  <span className="link_learn">Learn about this</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-start items-center mt-10">
        <div className="mr-5">
          <input type="checkbox" id="checkbox-authorize-matic" className="checkbox" checked={isValidMatic} onChange={handleCheckboxMatic} />
        </div>
        <span className="label" htmlFor="checkbox-authorize-matic">
          {payment.module === 'shop' ? (
            <>
              Permission to access my wallet for a gasless experience.
              <br />
              No MATIC required for this transaction.
            </>
          ) : (
            <>
              The gass fee will be taken from your MATIC, the transaction will
              <br />
              not be able to continue if the Matic is not sufficient.
            </>
            
          )}
        </span>
      </div>
      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            submit();
          }}
          isDisabled={isProcessing ? true : !isWalletAuthorized}
        >
          <div>Next</div>
        </Button>
      </div>
    </>
  );
};
export default WalletSummary;
