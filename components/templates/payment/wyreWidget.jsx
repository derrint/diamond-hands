/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import ReactLoading from 'react-loading';

import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';

const WyreWidget = ({summary}) => {
  const {payment} = useState();
  const {
    // lootboxPurchaseWithWidget,
    // marketplacePurchaseWithWidget,
    getLootboxOrderStatus,
    getMarketplaceOrderStatus,
    hideModal,
  } = useActions();
  const {reservationUrl, purchasesId} = summary;

  React.useEffect(() => {
    if (payment.module === 'shop') {
      getLootboxOrderStatus({purchasesId});
    } else {
      getMarketplaceOrderStatus({purchasesId});
    }

    window.open(reservationUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=700,height=700');
  }, []);

  return (
    <div className="payment-authorize">
      <div className="flex flex-col items-center">
        <div className="flex flex-col note">
          <span className="title">Do not leave this page until the payment process is complete</span>
          <span className="subtitle">
            Diamond Hands is directing you to payment window.
            Make sure you have disabled the AdBlocker.
          </span>
        </div>
      </div>
      {/* {isloading && ( */}
      <div className="loading-wrapper flex flex-col justify-center items-center">
        <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
        <Button
          onClick={() => {
            window.open(reservationUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=700,height=700');
          }}
          className="is-orange is-medium is-rounded is-semiboldx2"
        >
          <div className="flex flex-row items-center gap-4 px-8">
            Re-open payment window
          </div>
        </Button>

        <Button
          onClick={() => {
            hideModal();
          }}
          className="is-blue is-medium is-rounded is-semiboldx2 mt-10"
        >
          <div className="flex flex-row items-center gap-4 px-8">
            Done with your payment? Close this modal
          </div>
        </Button>
      </div>
      {/* )} */}
    </div>
  );
};

export default WyreWidget;
