/* eslint-disable prefer-template */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Countdown, {zeroPad} from 'react-countdown';
import {Zoom} from 'react-reveal';
import {isDesktop} from 'react-device-detect';

import {Button} from '@elements';
import {currencyFormat} from '@utils/helper';

const CardLootbox = ({
  data, className, buttonAction, cardContentClassName,
}) => {
  // Random component
  const Completionist = () => <span>Event ended :(</span>;

  // Renderer callback with condition
  const renderer = ({
    days, hours, minutes, seconds, completed,
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    }
    // Render a countdown
    return (
      <span>
        {`${days} days ${hours}:${zeroPad(minutes)}:${zeroPad(seconds)} left`}
      </span>
    );
  };

  const expiredDate = data.expiredAt * 1000;
  const specialClassName = data.expiredAt ? 'special' : '';

  const content = (item = '') => {
    const card = `${data.cardsChance.length}x NFT cards `;
    const dd = `${currencyFormat(data.content.dd, 'DD')}`;

    let lootboxContent = '';
    if (item === 'card') {
      lootboxContent = card;
    } else if (item === 'dd') {
      lootboxContent = dd;
    } else {
      lootboxContent = card + ' + ' + dd;
    }
    return lootboxContent;
  };
  
  const buttonText = data.price === ''
    ? 'View Details'
    : className && className.includes('small')
      ? `Buy for $${currencyFormat(parseFloat(data.price))}`
      : `$${currencyFormat(parseFloat(data.price))}`;

  const cardElem = () => (
    <Button
      onClick={buttonAction}
    >
      <div className={`card ${className}`}>
        <div className={`card-image ${specialClassName}`}>
          <img src={data.assets.image} alt={`${data.name} lootbox`} />
        </div>
        
        <div className={`card-content p-10 ${cardContentClassName}`}>

          <div>
            <div className="flex flex-col items-center">
              <div className={`title ${specialClassName}`}>
                {data.name}
              </div>

              {data.expiredAt !== 0 && (
              <div className="subtitle">
                <Countdown
                  date={expiredDate}
                  renderer={renderer}
                />
              </div>
              )}
            </div>
          
            <div className="description">
              {data.expiredAt
                ? data.description
                : className && className.includes('small')
                  ? (
                    <>
                      {content('card')}
                      <br />
                      +
                      {' '}
                      {content('dd')}
                    </>
                  )
                  : (
                    <>
                      Every box opened you will mint
                      <b>{content()}</b>
                    </>
                  )}
            </div>
          </div>

          <div className="cta flex flex-col items-center">
            <Button
              className="is-yellow is-small is-bold is-rounded is-nunito"
              onClick={buttonAction}
            >
              {buttonText}
            </Button>
          </div>
        </div>

      </div>
    </Button>
  );

  return (
    <>
      {isDesktop ? (
        <Zoom duration={500} bottom>
          {cardElem()}
        </Zoom>
      ) : (
        cardElem()
      )}
    </>
  );
};

export default CardLootbox;
