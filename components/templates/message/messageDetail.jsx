/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {toast} from 'react-toastify';
import moment from 'moment';
import {useState, useActions} from '@overmind';
import {Button} from '@elements';
import {getSlug, currencyFormat, truncateMiddle} from '@utils/helper';

import IconInbox from '@images/icon/icon-inbox-dark-blue.png';
import IconDown from '@images/icon/icon-down.png';
import IconSuccess from '@images/icon/icon-success.png';
import BadgeCardSuccessfullyListed from '@images/badge/badge-card-successful-listed.png';
import {Config} from '@constant';
import DetailPaymentMoonpay from './detailPaymentMoonpay';
import DetailPaymentWallet from './detailPaymentWallet';
import DetailSeasonStarted from './detailSeasonStarted';
import DetailSeasonMidWeek from './detailSeasonMidWeek';
import DetailSeasonWinner from './detailSeasonWinner';

const messageDetail = ({
  message, data, category,
}) => {
  // console.log('data', data);
  const {player, inbox} = useState();
  const {
    hideModal,
    showModal,
    setWalletShowing,

    // // ----- lootbox open using toast promise -----
    // openLootbox,
    // getPlayerProfile,
    
    // ----- lootbox open new flow -----
    openLootboxAsync,
  } = useActions();
  const openLootboxAction = async () => {
    hideModal();

    // // ----- lootbox open using toast promise -----
    // toast.promise(
    //   openLootbox({
    //     lootboxId: data.lootboxId.toString(),
    //   }),
    //   {
    //     pending: {
    //       render() {
    //         return 'Opening Lootbox';
    //       },
    //     },
    //     success: {
    //       render() {
    //         getPlayerProfile();
    //         return 'Lootbox Opened 🎉';
    //       },
    //     },
    //     error: {
    //       render(e) {
    //         if (e.data.error !== 'OnProgress') {
    //           showModal('open-lootbox-failed');
    //         }
    //         return e.data.error;
    //       },
    //       autoClose: false,
    //     },
    //   },
    // ).then(() => {
    //   showModal('lootbox-content');
    // });

    // ----- lootbox open new flow -----
    openLootboxAsync({lootboxId: data.lootboxId.toString()})
      .catch((e) => {
        toast.error(e?.data?.error || 'Oops, please try again in a few moments.');
        showModal('open-lootbox-failed');
      });
  };
  const href = `/marketplace/${inbox?.selected?.res?.detail?.card?.tokenId}/${getSlug(inbox?.selected?.res?.detail?.card?.name)}`;
  const hrefCard = `/card/${data?.card?.cardId}/${getSlug(data?.card?.name)}`;

  return (
    <div className="message-content-wrapper">
      {category !== 'payment' && (
        <div className="flex flex-row items-center gab-10">
          <img src={IconInbox} />
          <span className="px-2 icon-title">Inbox</span>
          <span className="px-2 subtitle ml-10">{moment(message.timestamp * 1000).format('MM/DD/YYYY - hh:mm A')}</span>
        </div>
      )}
      {category === 'general' && message.extraType === 'card-listed' && (
        <div className="message-default">
          {/* <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-10">{data.title}</p>
          </div> */}
          <div className="img-section">
            <div className="img-wrapper">
              {inbox.selected.res?.onListing ? (
                <img className="img-card" src={inbox.selected.res?.detail?.card?.image} />
              ) : (
                <img className="img-card" src={inbox.selected.res?.skin?.paperImgUrl} />
              )}
              {inbox.selected.res?.onListing && (
                <img className="badge" src={BadgeCardSuccessfullyListed} />
              )}
            </div>
          </div>
          <div className="flex justify-center items-center gab-5 py-10">
            {inbox.selected.res?.onListing ? (
              <p className="mb-10">
                Congratulations! Your
                {' '}
                <b>{inbox.selected.res?.detail?.card?.name}</b>
                {' '}
                has successfully listed in the marketplace for $
                <b>{inbox.selected.res?.detail?.card?.currency?.origin?.displayValue}</b>
                .
                <br />
                You can cancel it manually if you want to.
              </p>
            ) : (
              <p className="mb-10">
                Your card is already sold. Please check your owned card.
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center action-section">
            <div>
              <Button isDisabled={!inbox.selected.res?.onListing} href={href} className="is-orange is-small is-semibold is-rounded flex text-center">See in the Marketplace</Button>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'card-unlisted' && (
        <div className="message-default">
          {/* <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-10">{data.title}</p>
          </div> */}
          <div className="img-section">
            <div className="img-wrapper">
              <img className="img-card" src={inbox.selected.res?.skin?.paperImgUrl} />
            </div>
          </div>
          <div className="flex justify-center items-center gab-5 py-10">
            <p className="mb-10">
              Your card is already unlisted. Please check your owned card.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center action-section">
            <div>
              <Button href="/card" className="is-orange is-small is-semibold is-rounded flex text-center">Check now in card library</Button>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'card-listed-sold' && (
        <div className="message-default">
          {/* <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-10">{data.title}</p>
          </div> */}
          <div className="img-section">
            <div className="img-wrapper">
              <img className="img-card" src={inbox.selected.res?.card?.paperImgUrl} />
              {/* <img className="badge" src={BadgeCardSuccessfullyListed} /> */}
            </div>
          </div>
          <div className="flex justify-center items-center gab-5 py-10">
            <p className="mb-10">
              Congratulations, your
              <b>
                {' '}
                {inbox.selected.res?.card.name}
                {' '}
              </b>
              is sold
              <br />
              <b>
                {inbox.selected.res?.buyer?.userName}
                {' '}
              </b>
              bought it for
              {' '}
              <b>{currencyFormat(inbox.selected.res?.purchases?.destAmount)}</b>
              {' '}
              USDC
            </p>
          </div>
          <div className="flex flex-col justify-center items-center action-section">
            <div>
              <Button
                onClick={() => {
                  hideModal();
                  setWalletShowing(true);
                }}
                className="is-orange is-small is-semibold is-rounded flex text-center"
              >
                Yay! Check my wallet
              </Button>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'card-listed-bought' && (
        <div className="message-default lg:w-[800px]">
          <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-5">Successfully bought a card</p>
          </div>
          <div className="flex justify-center items-center gab-5 py-10">
            <p className="mb-5">
              Congratulations, you have succesfully bought
              {' '}
              <b>{inbox.selected.res?.card.name}</b>
              <br />
              You bought it
              {' '}
              <b>{currencyFormat(inbox.selected.res?.purchases?.destAmount)}</b>
              {' '}
              USDC from
              <b>
                {' '}
                {inbox.selected.res?.seller?.userName}
              </b>
            </p>
          </div>
          <div className="img-section mb-10">
            <div className="img-wrapper">
              <img className="img-card" src={inbox.selected.res?.card?.paperImgUrl} />
              {/* <img className="badge" src={BadgeCardSuccessfullyListed} /> */}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center action-section mb-10">
            <div>
              <Button href="/card" className="is-orange is-small is-semibold is-rounded flex text-center">See in My Card</Button>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="label container-detail-title">Detail Transaction</span>
            <div className="flex flex-col container-detail">
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Item Name</span>
                <span className="value">
                  {inbox.selected.res?.card.name}
                </span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Bought from</span>
                <span className="value">
                  {inbox.selected.res?.seller?.userName}
                </span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Date/ Time</span>
                <span className="value">{moment(message.timestamp * 1000).format('ddd, DD MMM, YYYY - hh:mm A')}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Payment method</span>
                <span className="value">{inbox.selected.res?.paymentMethod}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Price</span>
                <span className="value">{inbox.selected.res?.price}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Transaction Fee</span>
                <span className="value">{inbox.selected.res?.fees}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row no-border">
                <span className="label">Purchase Total</span>
                <span className="value">{inbox.selected.res?.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'lootbox-purchase-reminder' && (
        <div className="message-default">
          <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-10">{data.title}</p>
          </div>
          <div className="flex justify-center items-center mb-10">
            <img src="https://derrint.sirv.com/Images/diamond-hands/home/banner-illustration.png" width="500" alt="" />
          </div>
          <div className="flex justify-center items-center gab-5 py-5">
            <p className="mb-10">{data.description}</p>
          </div>
          <div className="flex flex-col justify-center items-center action-section">
            <div>
              <Button href="/shop" className="is-blue-light is-small is-semibold is-rounded">Buy Lootbox</Button>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'lootbox-open-reminder' && (
        <div className="message-default lg:w-[800px]">
          <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-10">{message.title}</p>
          </div>
          <div className="flex justify-center items-center gab-5 py-5">
            <p className="mb-10 text-center">
              Hey
              {' '}
              {player.userName}
              , you have successfully bought a
              {' '}
              {data.name}
              {' '}
              <br />
              Open your lootbox and see what's inside
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mb-10">
            <img src={data.image} width="200" />
            <p className="text-center nameLootbox mb-10">{data.name}</p>
          </div>
          <div className="flex flex-col justify-center items-center action-section mb-10">
            <div>
              <Button isDisabled={data.isOpened} onClick={() => openLootboxAction()} className="is-orange is-small is-semibold is-rounded flex text-center">Open Lootbox</Button>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="label container-detail-title">Detail Transaction</span>
            <div className="flex flex-col container-detail">
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Item Name</span>
                <span className="value">
                  {data.name}
                  {' '}
                  <br />
                  {`(${inbox.selected.res?.content?.cards} NFT Card and ${inbox.selected.res?.content?.dd} DD)`}
                </span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Date/ Time</span>
                <span className="value">{moment(message.timestamp * 1000).format('ddd, DD MMM, YYYY - hh:mm A')}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Payment method</span>
                <span className="value">{inbox.selected.res?.paymentMethod}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Price</span>
                <span className="value">{inbox.selected.res?.price}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Transaction Fee</span>
                <span className="value">{inbox.selected.res?.fees}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row no-border">
                <span className="label">Purchase Total</span>
                <span className="value">{inbox.selected.res?.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'cash-out' && (
        <div className="message-default lg:w-[800px]">
          <div className="flex justify-center items-center gab-5 message-section">
            <p className="message-title mb-10">{message.title}</p>
          </div>
          <div className="flex flex-col justify-center items-center mb-10">
            <img src={IconSuccess} width="100" />
            <p className="text-center subtitle my-10">{`${currencyFormat(inbox.selected.res?.amount, '', inbox.selected.res?.currency)} sent`}</p>
          </div>
          <div className="flex flex-col mb-10">
            <span className="label container-detail-title">Detail Transaction</span>
            <div className="flex flex-col container-detail">
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Date/ Time</span>
                <span className="value">{moment(message.timestamp * 1000).format('ddd, DD MMM, YYYY - hh:mm A')}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Transfer to</span>
                <span className="value">{truncateMiddle(inbox.selected.res?.to, 20)}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Amount</span>
                <span className="value">{currencyFormat(inbox.selected.res?.amount, '', inbox.selected.res?.currency)}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Transaction Fee</span>
                <span className="value">{currencyFormat(inbox.selected.res?.fee, '', inbox.selected.res?.currency)}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row">
                <span className="label">Total amount transfered</span>
                <span className="value">{currencyFormat(inbox.selected.res?.amount, '', inbox.selected.res?.currency)}</span>
              </div>
              <div className="flex flex-row justify-between py-5 detail-row no-border">
                <span className="label">Transfer Hash:</span>
                <div className="link-container">
                  <span className="value-link">{inbox.selected.res?.transactionHash}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center action-section">
            <div>
              <Button
                isDisabled={data.isOpened}
                onClick={() => window.open(`${Config.polygonscanURL}/tx/${inbox.selected.res?.transactionHash}`, '_blank').focus()}
                className="is-blue-light is-small is-semibold is-rounded flex text-center"
              >
                View on explorer
              </Button>
            </div>
          </div>
        </div>
      )}
      {category === 'card-updates' && (
        <div className="message-default">
          <div className="img-section">
            {data.card && (
            <div className="img-wrapper">
              <img className="img-card" src={data.card.paperImgUrl} />
              {data.effect === 'exp-down' && (
                <div className="badge-exp">
                  <div className="flex flex-row justify-center items-center badge-exp-down">
                    <span className="pr-2">EXP</span>
                    <img src={IconDown} />
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
          <div className="flex justify-center items-center gab-10 message-section">
            <p className="mb-10">{data.description}</p>
          </div>
          <div className="flex flex-col justify-center items-center gab-10 action-section">
            <div className="mt-10">
              <Button href="/play" className="is-orange is-extra-small is-semibold is-rounded">Play now</Button>
            </div>
            <div className="mt-10">
              <Button href={hrefCard} className="is-extra-small is-semibold text-blue">See card detail</Button>
            </div>
          </div>
        </div>
      )}
      {category === 'general' && message.extraType === 'season-announcement' && (
        <div className="message-default">
          <DetailSeasonStarted message={message} data={inbox.selected} />
        </div>
      )}
      {category === 'general' && message.extraType === 'current-leaderboard' && (
        <div className="message-default">
          <DetailSeasonMidWeek message={message} data={inbox.selected} />
        </div>
      )}
      {category === 'general' && message.extraType === 'claim-leaderboard' && (
        <div className="message-default">
          <DetailSeasonWinner message={message} data={inbox.selected} />
        </div>
      )}
      {category === 'payment' && (
        <div className="message-payment">
          {message.extraType === 'payment-moonpay' && (
            <DetailPaymentMoonpay message data={data} />
          )}
          {message.extraType === 'payment-crypto' && (
            <DetailPaymentWallet message={message} data={data} />
          )}
        </div>
      )}
    </div>
  );
};
export default messageDetail;
