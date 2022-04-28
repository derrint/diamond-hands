import React from 'react';
// import {Button} from '@elements';
import {useState} from '@overmind/index';

import Style from '@styles/page/pageProfile/sectionSellCardSuccess.module.scss';
import IconSellProcessing from '@images/icon/icon-sell-processing.png';
import BadgeCardSuccessfullyListed from '@images/badge/badge-card-successful-listed.png';
import {currencyFormat} from '@utils/helper';

const SectionSellCardSuccess = () => {
  const {cards} = useState();
  return (
    <div className={`${Style.sellWrapper} container mx-auto`}>
      <div className="flex flex-row justify-center items-center gab-2 mb-10">
        <img src={IconSellProcessing} />
        <span className={`text-center ml-2 ${Style.title}`}>Listing in progress</span>
      </div>
      <div className="flex flex-row justify-center gab-2 mb-5">
        <span className={`text-center ml-2 ${Style.subtitle}`}>Your </span>
        <span className={`text-center ml-2 ${Style.subtitle2}`}>
          {cards.selected?.name}
        </span>
        <span className={`text-center ml-2 ${Style.subtitle}`}> being processed to list to the marketplace for </span>
        <span className={`text-center ml-2 ${Style.subtitle2}`}>
          {currencyFormat(cards?.listing?.payload?.price, '$USDC')}
        </span>
      </div>
      <div className="flex flex-row justify-center gab-2 mb-5">
        <div className={Style.cardItem}>
          <img src={cards.selected?.assets ? cards.selected?.assets[0] : cards.selected?.paperImgUrl} className={Style.imageCard} />
          <img src={BadgeCardSuccessfullyListed} className={Style.badge} />
        </div>
      </div>
      <div className={`flex flex-row justify-center gab-2 mb-10 ${Style.buttonConfirm}`}>
        <span className={Style.awarness}>
          Successfully listed! Your card will appear shortly.
          <br />
          We will send information to your inbox.
        </span>
        {/* <Button
          className="is-blue-light px-3 py-1 is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          href="/marketplace"
        >
          <div className="flex flex-row justify-center items-center">
            <span className={`text-center ml-2 ${Style.title}`}>See it in the Marketplace</span>
          </div>
        </Button> */}
      </div>
    </div>
  );
};
export default SectionSellCardSuccess;
