/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Zoom} from 'react-reveal';
import Router from 'next/router';
import {isDesktop} from 'react-device-detect';

import {useActions, useState} from '@overmind/index';

import {CardItem} from '@templates';
import {Button} from '@elements';
import {getSlug} from '@utils/helper';

import Style from '@styles/page/pageCards/sectionListCard.module.scss';

import IconChevronLeftWhite from '@images/icon/icon-chevron-left-white.png';
import IconChevronRightWhite from '@images/icon/icon-chevron-right-white.png';
import BgCloud from '@images/bg/bg-cloud.png';

import SectionFilter from './SectionFilter';

const SectionListCard = ({
  isMarketplace, pageName, isVideo,
}) => {
  const {
    auth, cards, filter, pagination, isFiltered, player,
  } = useState();
  const {
    getCardList,
    getMarketplaceCardList,
    getCardListOwned,
    setFilter,
    setPagination,
  } = useActions();

  const [windowDimensions, setWindowDimensions] = React.useState({});
  const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    return {
      width,
      height,
    };
  };
  const getList = (filter) => {
    if (pageName === 'marketplace' && isMarketplace) {
      getMarketplaceCardList(filter);
    } else if (pageName === 'card') {
      if (auth.isLoggedIn) {
        getCardListOwned({...filter, pageName});
      }
    } else {
      getCardList(filter);
    }
  };

  React.useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    getList(filter);
    
    return () => {};
  }, []);

  React.useEffect(() => {
    if (cards.owned === null && auth.isLoggedIn && pageName !== 'card') {
      getCardListOwned({...filter, pageName});
    }

    return () => {};
  }, [auth.isLoggedIn]);

  const goToPage = (n) => {
    const {current, total} = pagination;
    const {limit, offset} = filter;
    
    let page = n;
    let newOffset = 0;

    if (n === 'next') {
      page = current + 1;
      newOffset = offset + limit;
    } else if (n === 'prev') {
      page = current - 1;
      newOffset = offset - limit;
    }

    if (page <= total && page > 0) {
      window.scrollTo(
        {
          top: 0,
          behavior: 'smooth',
        },
      );
      setFilter({offset: newOffset});
      setPagination({current: page});
      getList({
        ...filter,
        offset: newOffset,
      });
    }
  };
  
  const items = pageName === 'marketplace' && isMarketplace ? cards.marketplace : pageName === 'card' ? cards.owned : cards.all;
  
  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={`mt-10 mb-20 ${Style.section__listCard}`}>
      <div className="container mx-auto">
        <div className={`${Style.container} ${pageName === 'card' ? Style.containerMyCard : ''}`}>
          <>
            {pageName === 'card' && (
            <SectionFilter pageName="card" />
            )}
          </>
          <Zoom duration={500} bottom delay={350}>
            <div>
              <div className={Style.bg_cloud}>
                <img src={BgCloud} alt="Cloud" />
              </div>
              {cards.all === null && isFiltered && pageName === 'cards' && (
                <div className={`flex flex-col justify-center items-center ${Style.emptyMarket}`}>
                  <span className={`${Style.subtitle} justify-center text-center mb-5`}>
                    There is no result. let's try another filter
                  </span>
                </div>
              )}
              {!cards.marketplace.length && isFiltered && pageName === 'marketplace' && (
                <div className={`flex flex-col justify-center items-center ${Style.emptyMarket}`}>
                  <span className={`${Style.subtitle} justify-center text-center mb-5`}>
                    There is no result. let's try another filter
                  </span>
                </div>
              )}
              {isMarketplace && cards.marketplace.length === 0 && !isFiltered && (
                <div className={`flex flex-col justify-center items-center ${Style.emptyMarket}`}>
                  <span className={`${Style.title} justify-center text-center`}>
                    Looks like no one wants to sell the card yet...
                    <br />
                    Try to check again later
                  </span>
                  <span className={`${Style.subtitle} justify-center text-center mb-5`}>
                    or maybe want to sell yours?
                  </span>
                  <Button
                    href="/card"
                    className="is-blue-light is-extra-small is-rounded is-semibold"
                  >
                    Open my cards
                  </Button>
                </div>
              )}

              {!cards.owned && pageName === 'card' && (
                <div className={`flex flex-col justify-center items-center ${Style.emptyMarket}`}>
                  <div className={Style.emptyState}>
                    <h3>You have no cards</h3>
                    <span>Get one now by opening our Lootbox</span>
      
                    <div className="flex justify-center">
                      <Button className="is-blue-light is-small is-semibold is-rounded" href="/shop">Buy Lootbox</Button>
                    </div>
                    
                  </div>
                </div>
              )}
            </div>
            <div className={Style.wrapperCards}>
              {items && items.map((item, index) => {
                const images = isMarketplace && item.cardDetail !== null
                  ? [item.cardDetail.paperImgUrl, item.cardDetail.rockImgUrl, item.cardDetail.scissorImgUrl]
                  : [item.paperImgUrl, item.rockImgUrl, item.scissorImgUrl];
                let assets = isMarketplace
                  ? [item.cardDetail !== null ? item?.cardDetail?.paperImgUrl : item.image]
                  : isVideo && isDesktop
                    ? [item.videoUrl]
                    : [images[Math.floor(Math.random() * images.length)]];
                if (pageName === 'card') {
                  assets = [images[Math.floor(Math.random() * images.length)]];
                }
                const card = {
                  ...item,
                  assets,
                };
                const delay = 150 + (index * 50);

                const openCardDetail = () => {
                  const cardId = pageName === 'marketplace'
                    ? card.tokenId
                    : pageName === 'card'
                      ? card.cardId
                      : pageName === 'cards' && filter.showOwnedOnly === true
                        ? card.cardId
                        : card.id;

                  const path = (pageName === 'cards' && filter.showOwnedOnly === true)
                    ? 'card'
                    : pageName;

                  const href = `/${path}/${cardId}/${getSlug(card.name)}`;
                  // console.log(href, pageName, filter.showOwnedOnly);
                  Router.push(href);
                };

                return (
                  <Zoom duration={500} bottom delay={delay} key={`card-${index}`}>
                    <Button
                      key={`card-${index}`}
                      className={pageName === 'marketplace' ? 'flex flex-col items-center' : ''}
                      onClick={() => {
                        openCardDetail();
                      }}
                    >
                      {pageName === 'marketplace' ? (
                        <div className={Style.itemUnique}>
                          {item.sellerId === player?.id && (
                          <div className={Style.listedBadge}>Owned by you</div>
                          )}
                          <CardItem
                            data={card}
                            isAutoPlay
                            className="mb-4"
                          />

                          {isMarketplace && (
                          <div className={`flex flex-row items-center justify-center sm:justify-between ${Style.price}`}>
                            <div className="flex flex-row gap-2">
                              <h3>{item.currency?.origin?.displayValue}</h3>
                              <span>{item.currency?.origin?.symbol}</span>
                            </div>
                            {/* <div className="flex flex-row items-baseline gap-2">
                              <span className={Style.prefix}>approx.</span>
                              <h3>{currencyFormat(item.currency?.usdc?.displayValue, '$')}</h3>
                            </div> */}
                          </div>
                          )}
                        
                          <div className={`flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 ${Style.status}`}>

                            <div className="flex flex-row gap-5 sm:gap-8">
                              <div className="flex flex-col items-center">
                                <div className={Style.status_label}>Level</div>
                                <div className={Style.status_value}>{isMarketplace ? card?.cardDetail?.level : card.level}</div>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={Style.status_label}>EXP</div>
                                <div className={Style.status_value}>{isMarketplace ? card?.cardDetail?.expPoint : card.expPoint}</div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className={Style.status_label}>Mint Strength</div>
                              <div className={Style.status_value}>{isMarketplace ? card?.cardDetail?.mintStrength || '-' : card.mintStrength || '-'}</div>
                            </div>
                        
                          </div>
                        </div>
                      ) : pageName === 'card' ? (
                        
                      // -----
                      // ----- MY CARD page -----
                      // -----

                        <div key={`list-card-${index}`} className="flex flex-col items-center">
                          <div className={Style.itemMycard}>
                            {item.listedOnMarketplace && (
                              <div className={Style.listedBadge}>On Sell</div>
                            )}
                            
                            <CardItem
                              data={card}
                              isAutoPlay
                              className="w-full mb-8"
                            />
                          
                            <div className={`flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-0 ${Style.status}`}>
  
                              <div className="flex flex-row gap-5">
                                <div className="flex flex-col items-center">
                                  <div className={Style.status_label}>Level</div>
                                  <div className={Style.status_value}>{card.level}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className={Style.status_label}>EXP</div>
                                  <div className={Style.status_value}>{card.expPoint}</div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={Style.status_label}>Mint Strength</div>
                                <div className={Style.status_value}>{card.mintStrength ? card.mintStrength : '-'}</div>
                              </div>
                          
                            </div>
  
                            <div className="flex justify-center mt-8">
                              <Button
                                onClick={() => {
                                  openCardDetail();
                                }}
                                className="is-transparent is-rounded is-extra-small is-semibold"
                              >
                                <div className={Style.button_text}>See Detail</div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <CardItem
                          data={card}
                          hasInformation
                          hasShadow
                          hasThumbnail={false}
                          isAutoPlay
                          className="p-8"
                        />
                      )}
                    </Button>
                  </Zoom>
                );
              })}
            </div>
          </Zoom>

          <Zoom cascade duration={500} delay={350}>
            <div className={`mt-20 ${Style.pagination}`}>
              {windowDimensions?.width >= 768 && (
                <div className={Style.empty} />
              )}
              <div className="flex justify-center">
                {pagination.current < pagination.total && (
                <Button
                  onClick={() => {
                    goToPage('next');
                  }}
                  className={`is-blue is-extra-small is-semibold is-rounded ${Style.nextCenter}`}
                >
                  Next Page
                  <img className="inline-flex" src={IconChevronRightWhite} alt="IconChevronRightWhite" />
                </Button>
                )}
              </div>
              {pagination.total > 0 && (
              <div className={`flex justify-end ${Style.paginationNav}`}>
                <div className="p-2">
                  Page
                  <span className={Style.current}>{pagination.current}</span>
                  of
                  &nbsp;
                  <span className={Style.total}>{pagination.total}</span>
                  &nbsp;
                  <Button
                    onClick={() => {
                      goToPage('prev');
                    }}
                    className={`is-blue is-extra-small is-semibold is-rounded ${Style.prev}`}
                  >
                    <img className="inline-flex" src={IconChevronLeftWhite} alt="IconChevronLeftWhite" />
                  </Button>
                  <Button
                    onClick={() => {
                      goToPage('next');
                    }}
                    className={`is-blue is-extra-small is-semibold is-rounded ${Style.next}`}
                  >
                    <img className="inline-flex" src={IconChevronRightWhite} alt="IconChevronRightWhite" />
                  </Button>
                </div>
              </div>
              )}
            </div>
          </Zoom>
        </div>

      </div>
    </section>
  );
};

export default SectionListCard;
