/* eslint-disable prefer-template */
/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {useRouter} from 'next/router';
import ReactLoading from 'react-loading';

// import ReactTooltip from 'react-tooltip';
import {toast} from 'react-toastify';
import moment from 'moment';
import {isDesktop} from 'react-device-detect';
import {FaUserAlt} from 'react-icons/fa';

import {useState, useActions} from '@overmind/index';
import {Modal} from '@modules';
import {Button} from '@elements';
import {stripHTML, currencyFormat} from '@utils/helper';
import {cardRarities, cardElements} from '@data';

import IconHistory from '@images/icon/icon-history-primary.png';
import IconSell from '@images/icon/icon-sell.png';
// import IconUser from '@images/icon/icon-user-blue.png';
import IconUnlisted from '@images/icon/icon-unlisted.png';
import IconUnlistedWhite from '@images/icon/icon-unlisted-white.png';
import IconMaticYellow from '@images/icon/icon-matic-yellow.png';
import IconUSDC from '@images/icon/icon-usdc-logo.png';

import {SDKContext} from '@context/SDK';
import {Config} from '@constant';
import CardItem from './cardItem';

const cardDetail = ({
  data, hasShadow, hasThumbnail, isAutoPlay, isMarketplace, isMyCard, pageName, buyButtonAction,
}) => {
  const [modalUnlisted, setModalUnlisted] = React.useState(false);
  const [isValidMatic, setIsvalidMatic] = React.useState(false);
  const {
    cards, player, filter, wallet, isLoading,
  } = useState();
  const {
    showModal,
    hideModal,
    unlistingCardOnMarketPlace,
    getCardListOwned,
    getCardOwnedDetail,
  } = useActions();
  const router = useRouter();
  const SDK = React.useContext(SDKContext);

  let winRate = Math.round((data?.totalWins / data?.totalPlayed) * 100);
  winRate = winRate > 0 ? winRate : 0;

  const badgeRarity = cardRarities.find((x) => x.name === data?.cardDetail?.rarity)?.image || cardRarities.find((x) => x.name === data?.rarity)?.image;
  const badgeElement = cardElements.find((x) => x.name === data?.cardDetail?.element)?.image || cardElements.find((x) => x.name === data?.element)?.image;
  const assets = [
    data?.cardDetail?.rockImgUrl || data?.rockImgUrl,
    data?.cardDetail?.paperImgUrl || data?.paperImgUrl,
    data?.cardDetail?.scissorImgUrl || data?.scissorImgUrl,
  ];
  if (isDesktop) {
    assets.unshift(data?.cardDetail?.videoUrl || data?.videoUrl);
  }

  const descrHtml = data?.cardDetail?.descrHtml || data?.descrHtml;
  const card = {
    ...data,
    element: data?.cardDetail?.element || data?.element,
    rarity: data?.cardDetail?.rarity || data?.rarity,
    series: data?.cardDetail?.series || data?.series,
    descrHtml,
    assets,
  };
  const paths = {
    buyLootboxButton: ['/cards', '/cards/[...id]'],
  };

  const isCardOwned = !!(cards.owned !== null && cards.owned.find((x) => x.skinId === data?.id));
  
  const handleCheckboxMatic = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const {name} = target;

    setIsvalidMatic(value);
  };

  // methods listing
  const sellCard = () => {
    showModal('sell-card');
  };

  // method unlisting
  const [isUnlistingOnProgress, setIsUnlistingOnProgress] = React.useState(false);

  const doUnlisting = async () => {
    try {
      setIsUnlistingOnProgress(true);
      // await SDK.nftlabsWithoutRelay.getMarketModule(Config.marketplaceAddress).unlist(card.listingId, 1);
      // TODO: ==== Marketplace V2 start
      await SDK.nftlabsWithoutRelay.getMarketplaceModule(Config.marketplaceAddress).cancelDirectListing(card.listingId);
      // TODO: ==== Marketplace V2 end
      
      // console.log(unlistRes);
      await unlistingCardOnMarketPlace({tokenId: card.cardId, listingId: card.listingId});
      await getCardListOwned({...filter, pageName: 'card'});
      await getCardOwnedDetail({cardId: card.cardId});
      // return 'OK';
      setIsUnlistingOnProgress(false);
    } catch (error) {
      // console.log(error);
      setIsUnlistingOnProgress(false);
      return Promise.reject(error);
    }
    return '';
  };

  const unlisted = () => {
    if (parseFloat(wallet.matic.value) <= 0.1) {
      toast.error('Minimum matic balance is 0.1');
    } else {
      toast.promise(
        doUnlisting(),
        {
          pending: {
            render() {
              return 'Processing...';
            },
          },
          success: {
            render() {
              setModalUnlisted(false);
              hideModal();
              return 'Successfully unlisting card';
            },
          },
          error: {
            render(e) {
              // console.log('data = ', data);
              return e.data.error || e.data.reason || 'Oops, please try again in a few moments.';
            },
            autoClose: false,
          },
        },
      );
    }
  };
  const dialogConfirmUnlisted = () => {
    const date = new Date(data.unlistableAt * 1000);
    if (moment().isAfter(date)) {
      setIsvalidMatic(false);
      setModalUnlisted(true);
    } else {
      toast.error('you can\'t unlisted it before 48 hours');
    }
  };

  // section component
  const statusCardSection = () => (
    <div className="status inline-flex flex-row items-center p-6 gap-10">
      <div className="flex flex-col">
        <div className="status_label">Level</div>
        <div className="status_value">{data?.cardDetail?.level || data.level || '~'}</div>
      </div>
      <div className="flex flex-col">
        <div className="status_label">EXP</div>
        <div className="status_value">{data?.cardDetail?.expPoint || data.expPoint || '~'}</div>
      </div>
      <div className="flex flex-col">
        <div className="status_label">Mint Strength</div>
        <div className="status_value">{data?.cardDetail?.mintStrength || data.mintStrength || '~'}</div>
      </div>
    </div>
  );

  const statusCardSectionMarketplace = () => (
    <div className="status-marketplace inline-flex flex-col sm:flex-row items-center p-6 gap-5 sm:gap-10 w-full sm:w-auto">
      <div className="flex flex-row gap-10 justify-between w-full sm:w-auto">
        <div className="flex flex-col">
          <div className="status-marketplace_label">Level</div>
          <div className="status-marketplace_value">{data?.cardDetail?.level || data.level || '~'}</div>
        </div>
        <div className="flex flex-col pl-2 sm:pl-0">
          <div className="status-marketplace_label">EXP</div>
          <div className="status-marketplace_value">{data?.cardDetail?.expPoint || data.expPoint || '~'}</div>
        </div>
        <div className="flex flex-col pr-3 sm:pr-0">
          <div className="status-marketplace_label">Mint Strength</div>
          <div className="status-marketplace_value">{data?.cardDetail?.mintStrength || data.mintStrength || '~'}</div>
        </div>
      </div>
      <div className="flex flex-row gap-10 justify-between w-full sm:w-auto">
        <div className="flex flex-col">
          <div className="status-marketplace_label">Total Played</div>
          <div className="status-marketplace_value">{data.totalPlayed || data.playCount || '~'}</div>
        </div>
        <div className="flex flex-col">
          <div className="status-marketplace_label">Total Wins</div>
          <div className="status-marketplace_value">
            {data.totalWins ? (
              <>
                {data.totalWins}
                {' '}
                <span className="status-marketplace_value2">
                  (
                  {winRate}
                  %)
                </span>
              </>
            ) : '~'}

          </div>
        </div>
        <div className="flex flex-col">
          <div className="status-marketplace_label">Total DD Minted</div>
          <div className="status-marketplace_value">{data.totalDiadMinted || '~'}</div>
        </div>
      </div>
    </div>
  );

  const priceAndBuyCardSection = () => (
    <div className="inline-flex flex-row items-center gap-8 priceBuy w-full sm:w-auto justify-between">
      <div className="flex flex-col">
        <div className="priceBuy_label mb-2">For sale</div>
        <div className="flex flex-row items-center">
          <img className="icon-currency" src={data?.currency?.origin?.symbol === 'MATIC' ? IconMaticYellow : IconUSDC} />
          <div className="priceBuy_value">{currencyFormat((data?.currency?.origin?.displayValue || 0), '', data?.currency?.origin?.symbol)}</div>
        </div>
      </div>
      {/* <div className="flex flex-col ml-5">
        <div className="priceBuy_labelapprox">approx.</div>
        <div className="flex flex-row items-center">
          <div className="priceBuy_valueapprox">{currencyFormat((data?.currency?.usdc?.displayValue || 0), '', data?.currency?.usdc?.symbol)}</div>
        </div>
      </div> */}
      {data.sellerName !== player?.userName && (
        <>
          <div className="flex flex-col">
            <Button
              onClick={() => {
                buyButtonAction();
              }}
              className="button-buy is-orange is-small is-semibold is-rounded"
            >
              Buy
            </Button>
          </div>
          {/* <div
            className="flex flex-col"
            data-tip
            data-for="buy-wallet-button"
          >
            <Button
              onClick={() => { buyCardMarketPlace('wallet'); }}
              className="button-buy-wallet is-extra-small is-semibold is-rounded"
            >
              <div className="flex flex-col justify-center">
                <span className="text-center">Purchase with wallet</span>
                <span className="text-center font-bold">{currencyFormat((data?.currency?.displayValue || 0), '~', 'USDC')}</span>
              </div>
            </Button>
          </div>
          <ReactTooltip id="buy-wallet-button" place="top" backgroundColor="#1C5D79" effect="solid">
            <div className="flex justify-center items-center">
              <span className="w-full text-center">
                The gas fee will be taken from your MATIC, the transaction
                {' '}
                <br />
                will not be able to continue if the MATIC is not sufficient.
              </span>
            </div>
          </ReactTooltip> */}
        </>
      )}
    </div>
  );

  const playingStatisticSection = () => {
    if (data.totalPlayed && data.totalWins && data.totalDiadMinted) {
      return (
        <div className="flex flex-row items-center gap-10 mb-10">
          <div className="flex flex-col">
            <div className="status_label">Total Played</div>
            <div className="status_value">{data.totalPlayed || '~'}</div>
          </div>
          <div className="flex flex-col">
            <div className="status_label">Total Wins</div>
            <div className="status_value">
              {data.totalWins ? (
                <>
                  {data.totalWins}
                  {' '}
                  <span className="status_value2">
                    (
                    {winRate}
                    %)
                  </span>
                </>
              ) : '~'}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="status_label">Total DD Minted</div>
            <div className="status_value">{data.totalDiadMinted || '-'}</div>
          </div>
        </div>
      );
    }
    return null;
  };
   
  return (
    <>
      {data && (
        <div className="wrapper container">
          <div>
            <CardItem
              data={card}
              hasInformation={false}
              hasShadow={hasShadow}
              hasThumbnail={hasThumbnail}
              isAutoPlay={isAutoPlay}
            />
          </div>
          <div className="block__right">
            <div className="flex flex-col">
              <h1 className="mb-5">{data.name}</h1>
              {data?.sellerName && (
                <div className="mb-8">
                  <div className="inline-flex flex-row items-center gap-3 seller_section">
                    <FaUserAlt color="#1C5D79" size="12" />
                    <span className="seller_label">Owner</span>
                    <span className="seller_value mb-1">
                      {data?.sellerName}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="mb-10">{stripHTML(data.description || data.descrHtml)}</p>
            <div className="info">
              <div>
                <div className="info_label">Pack</div>
                <div className="info_value">{card.series}</div>
              </div>

              <div className="flex flex-row items-center">
                <img className="info_image" src={badgeRarity} />
                <div>
                  <div className="info_label">Rarity</div>
                  <div className="info_value">{card.rarity}</div>
                </div>
              </div>

              <div className="flex flex-row items-center">
                <img className="info_image" src={badgeElement} />
                <div>
                  <div className="info_label">Element</div>
                  <div className="info_value">{card.element}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-8">
              {isMarketplace ? statusCardSectionMarketplace() : statusCardSection()}
              {isMyCard && !data?.listedOnMarketplace && (
                <div className="sell inline-flex flex-row items-center gap-10">
                  <Button
                    onClick={() => sellCard()}
                    isDisabled={data.isOnListingProgress}
                    className="is-red is-extra-small is-semibold is-rounded"
                  >
                    <div className="flex flex-row p-3">
                      <img src={IconSell} />
                      <span className="text-center ml-2">Sell card</span>
                    </div>
                  </Button>
                </div>
              )}
              {isMyCard && data?.listedOnMarketplace && (
                <div className="flex flex-row gap-8">
                  <div className="onsell inline-flex flex-row items-center p-4 gap-10">
                    <div className="flex flex-col px-4">
                      <span className="onsell_label">On Sell</span>
                      {isLoading ? (
                        <ReactLoading className="loading" type="spin" color="#ffffff" height={30} width={30} />
                      ) : (
                        <>
                          {data.price !== null ? (
                            <span className="onsell_value">{data.price !== null ? currencyFormat(data.price.origin.displayValue, data.price.origin.symbol === 'USDC' ? '$' : data.price.origin.symbol) : 0}</span>
                          ) : (
                            <span className="onsell_value">Processing...</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="unlisted inline-flex flex-row items-center">
                    <Button
                      onClick={() => dialogConfirmUnlisted()}
                    >
                      <div className="flex flex-row items-center">
                        <img src={IconUnlisted} />
                        <span className="unlisted_label mx-2">Unlisted</span>
                      </div>
                    </Button>
                    
                  </div>
                </div>
              )}
              {isMarketplace ? playingStatisticSection() : null}
            </div>
            {isMarketplace ? (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {priceAndBuyCardSection()}
                  <div className="flex flex-col mx-5 learn-wording">
                    <span className="label">Don't have any USDC?</span>
                    <Button
                      onClick={() => {
                        window.open(Config.webURL + 'learn#usdc-coin', '_blank');
                      }}
                      className="urltxt"
                    >
                      Learn how to top up USDC
                    </Button>
                  </div>
                </div>
              </>
            ) : playingStatisticSection()}

            {data.history ? (
              <>
                <div className="history_label flex flex-row items-center mb-3">
                  <img className="history_icon" src={IconHistory} />
                  Card history
                </div>
                <ul className="history_list">
                  {data.history && data.history.map((h, i) => {
                    const log = `${h.message} (${h.date})`;
                    return (
                      <li key={i}>{log}</li>
                    );
                  })}
                </ul>
              </>
            ) : null}

            {!isCardOwned && !isMarketplace && (pageName === 'cards' || pageName === 'cards-detail') && (
              <div className="card-ownership mt-10">You don't have this card yet, want it? Push your luck!</div>
            )}

            {paths.buyLootboxButton.includes(router.pathname) ? (
              <div className="mt-10">
                <Button href="/shop" className="button-lootbox is-orange is-extra-small is-semibold is-rounded">Open the lootbox</Button>
              </div>
            ) : null}
          </div>

          <Modal
            show={modalUnlisted}
            onClose={() => setModalUnlisted(false)}
            classNames="is-blue-75"
            bodyStyle={{minHeight: '10px'}}
          >
            <div className="unlist-dialog container mx-auto">
              <div className="flex flex-row justify-center gab-2 mb-10">
                <span className="text-center ml-2 label">Are you sure to unlist this card from Marketplace?</span>
              </div>
              <div className="agreement items-center">
                <div className="flex flex-row justify-start items-center">
                  <div>
                    <input type="checkbox" id="checkbox-authorize-matic" className="checkbox" checked={isValidMatic} onChange={handleCheckboxMatic} />
                  </div>
                  <span className="label" htmlFor="checkbox-authorize">
                    The gass fee will be taken from your MATIC, the transaction will
                    <br />
                    not be able to continue if the Matic is not sufficient.
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-center gab-2">
                <Button
                  className="is-transparent px-8 py-4 mx-5 is-semibold is-rounded is-nunito inline-flex flex-col items-center cancel-button"
                  onClick={() => {
                    setModalUnlisted(false);
                  }}
                >
                  <div className="flex flex-row justify-center items-center">
                    <span className="text-center ml-2 label">Cancel</span>
                  </div>
                </Button>
                <Button
                  className="is-red px-8 py-4 mx-5 is-semibold is-rounded is-nunito inline-flex flex-col items-center confirm-button"
                  isDisabled={!isValidMatic || isUnlistingOnProgress}
                  onClick={() => {
                    unlisted();
                  }}
                >
                  <div className="flex flex-row justify-center items-center">
                    {!isUnlistingOnProgress && <img src={IconUnlistedWhite} />}
                    <span className="text-center ml-2 label">{isUnlistingOnProgress ? 'Processing...' : 'Unlisted'}</span>
                  </div>
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default cardDetail;
