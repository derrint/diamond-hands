/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactLoading from 'react-loading';
import {toast} from 'react-toastify';
import {FiClock} from 'react-icons/fi';

import {useActions, useState} from '@overmind/index';
import {CardDetail, FormLogin, Payment} from '@templates';
import {Modal} from '@modules';
import {paymentMethods} from '@data';
import {Button} from '@elements';
import {SDKContext} from '@context/SDK';
import {Config} from '@constant';

import Style from '@styles/page/pageMarketPlaceDetail/sectionDetail.module.scss';

import IconChevronRightBlue from '@images/icon/icon-chevron-right-blue.png';

import IconSuccess from '@images/icon/icon-success.png';

import SectionSellCard from './SectionSellCard';
import SectionSellCardSuccess from './SectionSellCardSuccess';
import SectionBuyCardSuccess from './SectionBuyCardSuccess';

const SectionDetail = ({
  isMarketplace, pageName, isMyCard,
}) => {
  const SDK = React.useContext(SDKContext);
  const {
    cards, auth, modal, payment,
  } = useState();

  const {
    setLoginAction,
    setLoading,
    // modal related actions
    showModal,
    hideModal,
    setModalNeedAction,
    setModalStep,
    setModalFullScreen,
    // buy & payment actions
    setPaymentMethod,
    setPaymentStatus,
    reserveMoonpay,
    buyCardOnMarketPlace,
    buyCardOnMarketPlaceSummary,
    getCardOwnedDetail,
  } = useActions();
  const [isPriceProcessing, setIsPriceProcessing] = React.useState(false);
  React.useEffect(() => {
    if (cards.selected?.listedOnMarketplace && cards.selected?.price === null) {
      setIsPriceProcessing(true);
    } else {
      setIsPriceProcessing(false);
    }
    return () => {};
  }, [cards.selected]);
  const refreshCardDetail = () => {
    setLoading(true);
    getCardOwnedDetail({cardId: cards.selected.cardId}).then(() => {
      setLoading(false);
    });
  };
  // -----
  // ----- show payment methods -----
  // -----

  const showPaymentMethods = () => {
    hideModal();
    if (auth.isLoggedIn) {
      setModalNeedAction(true);
      showModal('payment-methods');
    } else {
      setLoginAction({enable: true, action_text: 'Buy Card'});
      // toast.error('You need to login to purchase this lootbox');
      showModal('login');
    }
  };

  // #region ----- Buy Card action -----

  const buyCardAction = async (method) => {
    try {
      let methodStr = method;
      if (typeof method === 'object') {
        methodStr = payment.method;
      }

      // ----- add FB Pixel tracking -----
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          const payload = {
            paymentMethod: methodStr,
            itemType: 'card',
            itemId: cards.selected.tokenId,
            itemName: cards.selected.name,
          };
          ReactPixel.track('InitiateCheckout', {
            ...payload,
            content_category: payload.itemType,
            content_type: 'product',
            content_ids: [payload.itemId],
            contents: [{
              id: payload.itemId,
              quantity: 1,
              name: payload.itemName,
              payment: payload.paymentMethod,
            }],
            currency: 'USD',
            num_items: 1,
            value: parseFloat(cards.selected.currency.origin.value),
          });
        });

      if (methodStr === 'circle') {
        setLoading(true);
        setPaymentMethod({method, module: 'marketplace'});
        setModalStep(1);
        setModalFullScreen(true);
        setModalNeedAction(false);
        showModal('payment');
        await setLoading(false);
      } else if (methodStr === 'moonpay') {
        setLoading(true);
        setPaymentMethod({method, module: 'marketplace'});
        await reserveMoonpay({
          listingId: cards.selected.listingId,
          tokenId: cards.selected.tokenId,
        });
        setModalStep(2);
        setModalFullScreen(true);
        setModalNeedAction(false);
        showModal('payment');
        await setLoading(false);
      } else if (methodStr === 'wyre') {
        setLoading(true);
        setPaymentMethod({method, module: 'marketplace'});
        setModalStep(1);
        setModalFullScreen(true);
        showModal('payment');
        await setLoading(false);
      } else {
        showModal('loading');
        setLoading(true);
        setModalNeedAction(true);
        await buyCardOnMarketPlaceSummary({
          method: methodStr,
          listingId: cards.selected.listingId,
          tokenId: cards.selected.tokenId,
          card: cards.selected,
        });
        setModalStep(1);
        setModalFullScreen(true);
        showModal('payment');
        await setLoading(false);
      }
    } catch (e) {
      hideModal();
      toast.error(e.error || e);
    }
  };

  // #endregion

  const doBuyCard = async () => {
    try {
      let payload = {
        tokenId: cards.selected.tokenId,
        listingId: cards.selected.listingId,
        price: cards.selected.currency.origin.value,
        decimal: cards.selected.currency.origin?.symbol === 'USDC' ? Config.decimalValueUSDC : Config.decimalValueMATIC, // if prod use 18 decimal
        currencySymbol: cards.selected.currency.origin.name,
      };
      if (payment.method !== 'wallet') {
        payload = {
          tokenId: cards.selected.tokenId,
          listingId: cards.selected.listingId,
          price: cards.selected.currency.origin.value,
          decimal: cards.selected.currency.origin?.symbol === 'USDC' ? Config.decimalValueUSDC : Config.decimalValueMATIC, // if prod use 18 decimal
          currencySymbol: cards.selected.currency.origin.name,
          purchasesId: payment.responses?.summary?.purchasesId,
        };
      }
      // await SDK.nftlabsWithoutRelay.getMarketModule(Config.marketplaceAddress).buy(cards.selected.listingId, 1);
      
      // TODO: ==== Marketplace V2 start
      const {listingId} = payment;
      const quantityDesired = 1;
      
      await SDK.nftlabsWithoutRelay.getMarketplaceModule(Config.marketplaceAddress).buyoutDirectListing({listingId, quantityDesired});
      // TODO: ==== Marketplace V2 end

      await buyCardOnMarketPlace(payload);
    } catch (error) {
      return Promise.reject(error);
    }
    return {};
  };

  const buyAction = async () => {
    showModal('buying-processing');
    toast.promise(
      doBuyCard(),
      {
        pending: {
          render() {
            return 'Processing....';
          },
        },
        success: {
          render() {
            hideModal();
            showModal('buy-card-success');
            // getMarketplaceCardList(filter);

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

            return 'Buy card success 🎉';
          },
        },
        error: {
          render(e) {
            hideModal();
            return e.data.error || 'Oops, please try again in a few moments.';
          },
          autoClose: false,
        },
      },
    );
  };

  const onCloseModalPaymentMarketplaceAction = async () => {
    await hideModal();
    if (payment.method === 'wallet' && modal.step === 5) {
      showModal('buy-card-success');
    } else if (payment.method === 'moonpay' && payment.status === 'completed') {
      buyAction();
      await setPaymentStatus('');
    } else {
      // ----- when payment OPEN, reset payment status
      await setPaymentStatus('');
    }
  };
  const onCloseSuccessBuy = async () => {
    await hideModal();
    // eslint-disable-next-line no-restricted-globals
    location.href = '/marketplace';
  };
  return (
    <>
      <section className={`mb-20 ${Style.section__detail}`}>
        <div className={`container mx-auto ${Style.container}`}>
          <CardDetail
            data={cards.selected}
            isAutoPlay
            hasThumbnail
            isMarketplace={isMarketplace}
            pageName={pageName}
            isMyCard={isMyCard}
            buyButtonAction={showPaymentMethods}
          />
        </div>
      </section>
      {/* ----- toast processing update price ----- */}
      {isPriceProcessing && (
        <div className={Style.toast__updating__price}>
          <div className={Style.container}>
            <div className={`flex flex-row gap-3" ${Style.wrapper}`}>
              <div className="flex flex-row justify-center items-center mx-5">
                <img src={IconSuccess} className={Style.image} />
              </div>
              <div className={`flex flex-row items-center mx-5 ${Style.description}`}>
                <span>
                  Successfully listed. Updating the price...
                  <br />
                  It will take about 1 minute
                </span>
              </div>
              <div className="flex flex-row justify-end items-end">
                <Button className={`is-small is-rounded ${Style.updating_button}`} onClick={() => setIsPriceProcessing(false)}>
                  <div className="flex flex-row">
                    <span className={Style.dismiss_text_button}>Dismiss</span>
                  </div>
                </Button>
                <Button className={`is-orange is-small is-rounded ${Style.updating_button}`} onClick={() => refreshCardDetail()}>
                  <div className="flex flex-row">
                    <span className={Style.reload_text_button}>Refresh</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----- PAYMENT METHODS modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'payment-methods'}
        onClose={() => {
          hideModal();
        }}
        classNames="flex text-center justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center px-20">
          <div className="pt-14 font-semibold text-4xl">Buy Card</div>
          <div className="pt-5 pb-10 font-thin text-2xl" style={{color: '#0C353B99'}}>
            Select one of decentralized application to purchase the lootbox
            <br />
            and let them convert your payment into MATIC
          </div>
          <div className="py-4 px-8 font-thin text-2xl flex flex-row items-center justify-center gap-5 mb-10" style={{backgroundColor: '#f3ebc3', borderRadius: 8}}>
            <div>
              <FiClock className="close_icon" color="#0C353B" size={24} />
            </div>
            <div className="text-left">
              The NFT ownership transfer might takes 5 mins - 1 hour
              <br />
              before you see the NFT in your digital wallet & your card collection
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 px-20 pb-10" style={{maxWidth: 800}}>
          {paymentMethods.map((item) => (
            <div key={item.id}>
              <Button
                className="is-rounded-md is-white is-nunito flex p-10"
                onClick={() => buyCardAction(item.id)}
                isDisabled={item.isDisabled}
              >
                <div className="flex items-center justify-between w-full gap-20">
                  <div className="flex flex-col w-2/3">
                    <div className="w-1/3">
                      <img className="max-h-16" src={item.image} style={item.isDisabled ? {filter: 'grayscale(1)  opacity(0.5)'} : {}} />
                    </div>
                    {!item.isDisabled && (
                      <div className="font-thin text-left mt-5">{item.description}</div>
                    )}
                  </div>
                  {!item.isDisabled ? (
                    <div className="flex items-center gap-3" style={{color: '#1FA3DC', whiteSpace: 'nowrap'}}>
                      Continue to
                      {' '}
                      {item.name}
                      <img style={{width: 16, height: 16}} src={IconChevronRightBlue} alt="" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3" style={{color: '#0C353B99'}}>
                      coming soon
                    </div>
                  )}
                </div>
              </Button>
            </div>
          ))}
        </div>
      </Modal>

      {/* ----- LOGIN modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'login'}
        onClose={() => {
          setLoginAction({enable: false, action_text: ''});
          hideModal();
        }}
      >
        <FormLogin />
      </Modal>

      {/* ----- PAYMENT modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'payment'}
        classNames={modal.isFullScreen ? 'is-fullscreen' : ''}
        isUsingStep
        onClose={() => {
          onCloseModalPaymentMarketplaceAction();
        }}
      >
        <Payment type={payment.method} onPaymentModalClose={onCloseModalPaymentMarketplaceAction} />
      </Modal>

      {/* ----- BUYING PROCESSING modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'buying-processing'}
        classNames="flex text-center justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="py-14 font-bold text-3xl">Processing buy...</div>
          <div className="flex justify-center">
            <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
          </div>
          <div className="py-14">
            Please wait,
            <br />
            sometimes it may take a while
          </div>
        </div>
      </Modal>

      {/* ----- LOADING modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'loading'}
      >
        <div className="loading-wrapper flex flex-col justify-center items-center" style={{height: 300}}>
          <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
        </div>
      </Modal>

      {/* ----- SELL CARD modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'sell-card'}
        onClose={() => hideModal()}
        classNames="is-blue-75"
      >
        <SectionSellCard />
      </Modal>

      {/* ----- SELL CARD SUCCESS modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'sell-card-success'}
        onClose={() => hideModal()}
        classNames="is-blue-75"
      >
        <SectionSellCardSuccess />
      </Modal>

      {/* ----- BUY CARD SUCCESS modal ----- */}
      <Modal
        show={modal.isVisible && modal.type === 'buy-card-success'}
        onClose={() => {
          onCloseSuccessBuy();
        }}
        classNames="is-blue-75"
      >
        <SectionBuyCardSuccess />
      </Modal>
    </>
  );
};

export default SectionDetail;
