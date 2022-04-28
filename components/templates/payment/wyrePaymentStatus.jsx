/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import moment from 'moment';
import IconSuccess from '@images/icon/icon-success.png';
import {currencyFormat} from '@utils/helper';

const WyrePaymentStatus = ({summary, onPaymentModalClose}) => {
  const {payment} = useState();
  const {
    setModalStep,
    getLootboxOrderStatus,
    getLootboxOrderDetail,
    getMarketplaceOrderStatus,
    getMarketplaceOrderDetail,
  } = useActions();
  // const {payment} = useState();
  const [orderDetail, setOrderDetail] = React.useState({});

  React.useEffect(() => {
    if (payment.module === 'marketplace') {
      getMarketplaceOrderStatus({purchasesId: summary.purchasesId});
      getMarketplaceOrderDetail({purchasesId: summary.purchasesId}).then((res) => {
        setOrderDetail(res);
      });
    } else {
      getLootboxOrderStatus({purchasesId: summary.purchasesId});
      getLootboxOrderDetail({purchasesId: summary.purchasesId}).then((res) => {
        setOrderDetail(res);
      });
    }

    return () => {};
  }, []);

  const openTrackTransaction = () => {
    if (payment.module === 'marketplace') {
      getMarketplaceOrderDetail({purchasesId: summary.purchasesId}).then(() => {
        setModalStep(6);
      });
    } else {
      getLootboxOrderDetail({purchasesId: summary.purchasesId}).then(() => {
        setModalStep(6);
      });
    }
  };
  const contractAddressShorter = (str) => {
    const text1 = str.substring(0, 4);
    const text2 = str.substring(str.length - 4, str.length);
    return `${text1}...${text2}`;
  };
  return (
    <div className="payment-status">
      <div className="flex flex-col items-center">
        <div className="title">Purchase Complete</div>
        <div>
          <img src={IconSuccess} />
        </div>
        <div className="title-md">
          {currencyFormat(summary.destAmount, '', summary.destCurrency)}
          {' '}
          Sent
        </div>
        <div className="subtitle">
          Complete transaction with Wyre Payment,
          <br />
          Inc. at
          {' '}
          {moment().format('MM/DD/YYYY, HH:mm:ss A')}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="payment-result">
          <div className="title-section py-3">Payment method</div>
          <div className="payment-detail">
            <div className="payment-grid">
              <span>
                {currencyFormat(orderDetail.destAmount, '', orderDetail.sourceCurrency)}
                {' '}
                @ 1.00 USD
              </span>
              <span className="text-right">
                {currencyFormat(orderDetail.destAmount, '', orderDetail.sourceCurrency)}
              </span>
            </div>
            <div className="payment-grid line-border-bottom mb-4">
              <span>Fees</span>
              <span className="text-right">
                {currencyFormat(orderDetail.fee, '', orderDetail.sourceCurrency)}
              </span>
            </div>
            <div className="payment-grid line-border-bottom mb-4">
              <span>Total USD Paid</span>
              <span className="text-right">
                {currencyFormat(orderDetail.sourceAmount, '', orderDetail.sourceCurrency)}
              </span>
            </div>
            <div className="payment-grid">
              <span>USDC Received</span>
              <span className="text-right">
                {currencyFormat(orderDetail.destAmount, '', orderDetail.destCurrency)}
              </span>
            </div>
            <div className="payment-grid">
              <span>USDC Sent to</span>
              <span className="text-right">{contractAddressShorter(summary.dest.replace('ethereum:', ''))}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            openTrackTransaction();
          }}
        >
          <div>Track USDC Transaction</div>
        </Button>
      </div>
      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            onPaymentModalClose();
          }}
        >
          <div>Close</div>
        </Button>
      </div>
    </div>
  );
};
export default WyrePaymentStatus;
