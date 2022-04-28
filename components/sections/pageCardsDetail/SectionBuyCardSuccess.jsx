import React from 'react';
import {Button} from '@elements';
import {useState} from '@overmind/index';

import Style from '@styles/page/pageCards/sectionBuyCardSuccess.module.scss';
import BgLight from '@images/bg/bg-light.png';
// import BadgeCardSuccessfullyListed from '@images/badge/badge-card-successful-listed.png';
import {currencyFormat} from '@utils/helper';

const SectionBuyCardSuccess = () => {
  const {cards, player} = useState();
  return (
    <div className={`${Style.sellWrapper} container mx-auto`}>
      <div className="flex flex-row justify-center items-center gab-2 mb-10">
        <span className={`text-center ml-2 ${Style.title}`}>Card succesfully purchased</span>
      </div>
      <div className="flex flex-row justify-center gab-2 mb-5 mx-5 p-14" style={{backgroundImage: `url(${BgLight})`, backgroundSize: 'cover' }}>
        <div className={Style.cardItem}>
          <img src={cards.selected?.image} className={Style.imageCard} />
          {/* <img src={cards.selected?.assets ? cards.selected?.assets[0] : cards.selected?.paperImgUrl} className={Style.imageCard} /> */}
        </div>
      </div>
      <div className="flex flex-col justify-center mb-5">
        <span className={`text-center ml-2 ${Style.subtitle}`}>
          Congratulations, you have succesfully bought
          {' '}
          <span className={`text-center ml-2 ${Style.subtitle2}`}>
            {cards.selected?.name}
          </span>
        </span>
        <span className={`text-center ml-2 ${Style.subtitle}`}>
          You bought it
          {' '}
          <span className={`text-center ml-2 ${Style.subtitle2}`}>
            {currencyFormat(cards.selected.currency.origin.displayValue, '', cards.selected.currency.origin.symbol)}
          </span>
          {' from '}
          <span className={`text-center ml-2 ${Style.subtitle2}`}>
            {cards.selected?.sellerName}
          </span>
        </span>
      </div>
      <div className={`flex flex-row justify-center gab-2 mb-10 ${Style.buttonConfirm}`}>
        {/* <span className={Style.awarness}>
          Once your card has been successfully listed,
          <br />
          we will send information to your inbox.
        </span> */}
        <Button
          className="is-blue-light px-3 py-1 is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          href="/card"
        >
          <div className="flex flex-row justify-center items-center">
            <span className={`text-center ml-2 ${Style.title}`}>Check now in card library</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
export default SectionBuyCardSuccess;
