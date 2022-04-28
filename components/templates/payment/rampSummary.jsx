/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import {ethers} from 'ethers';
import {RampInstantSDK} from '@ramp-network/ramp-instant-sdk';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {currencyFormat} from '@utils/helper';
import {Config} from '@constant';

import IconChevronRightDark from '@images/icon/icon-chevron-right-dark.png';

const CircleSummary = () => {
  const {setModalStep, hideModal} = useActions();
  const {lootboxes, payment} = useState();
  const summary = {
    sourceCurrency: 'USD',
    sourceAmountWithoutFees: lootboxes.selected.price,
  };
  
  const symbolFrom = summary?.sourceCurrency === 'USD' ? '$' : summary?.sourceCurrency;

  React.useEffect(() => {
    if (payment.responses.summary) {
      const {purchasesId, price} = payment.responses.summary;
      // const purchasesId = 'xxx';
      // const price = '10';
      const swapAsset = 'USDC';
      const swapAmount = ethers.utils.parseUnits(price, 6);

      // window.open(`${Config.rampNetworkUrl}?userAddress=${Config.adminAddress}&hostApiKey=${Config.rampNetworkApiKey}&swapAsset=${swapAsset}&swapAmount=${swapAmount}&hostAppName=Diamond+Hands&selectedCountryCode=US&webhookStatusUrl=https://api-dev.diamondhands.com/v1/RNPaymentWebhookLootbox?purchasesId=${purchasesId}`, '_blank', 'toolbar=0,location=0,menubar=0,width=700,height=700');

      new RampInstantSDK({
        url: Config.rampNetworkUrl,
        userAddress: Config.adminAddress,
        hostApiKey: Config.rampNetworkApiKey,
        swapAsset,
        swapAmount,
        selectedCountryCode: 'US',
        webhookStatusUrl: Config.apiURL + 'RNPaymentWebhookLootbox?purchasesId=' + purchasesId,
        hostAppName: 'Diamond Hands',
        hostLogoUrl: Config.webURL + '_next/static/images/logo-diamond-hands-2x-40cece33f93e38315efc3cf37d10bf5c.png',
      })
        .on('*', (event) => console.log(event))
        .show();
    }
  }, [payment]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="title">Buy Lootbox</div>
        <div className="price_usd">{currencyFormat(summary?.sourceAmountWithoutFees, symbolFrom, '')}</div>
      </div>

      <div className="flex justify-center items-center flex-col my-16">
        <img className="lootbox-badge" src={lootboxes.selected.assets.badge} />
        <h1 className="lootbox-name">{lootboxes.selected.name}</h1>
      </div>

      <div className="payment-methods">
        <div className="wrapper_single_card">
          <Button
            className="item_single"
            onClick={() => {
              setModalStep(2);
            }}
          >
            <div className="flex justify-center items-center gap-5">
              <img className="icon-cc" src="https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-cc.png" />
              <span>Pay with a credit card</span>
            </div>
            <img className="chevron-right" src={IconChevronRightDark} />
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <span className="subtitle_payment">We'll add more payment methods soon</span>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-transparent is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            hideModal();
          }}
        >
          <div>Cancel purchase</div>
        </Button>
      </div>
    </>
  );
};

export default CircleSummary;
