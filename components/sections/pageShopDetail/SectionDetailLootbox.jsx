/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Countdown, {zeroPad} from 'react-countdown';
import {toast} from 'react-toastify';
import {Zoom} from 'react-reveal';
import ReactLoading from 'react-loading';

import {
  CardItem, LootboxContents, Payment, FormLogin,
} from '@templates';
import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {Modal} from '@modules';
import {currencyFormat} from '@utils/helper';
import {paymentMethods} from '@data';
import Style from '@styles/page/pageShopDetail/sectionDetail.module.scss';

/* import images */
import IconDD from '@images/icon/icon-dd.png';
import IconClock from '@images/icon/icon-clock.png';
import IconChevronRightBlue from '@images/icon/icon-chevron-right-blue.png';

const SectionDetail = () => {
  const {
    lootboxes, modal, payment, auth,
  } = useState();
  const {
    showModal,
    hideModal,
    setModalFullScreen,
    setModalNeedAction,
    getCardListByLootbox,
    buyLootbox,
    setModalStep,
    setLoading,
    getLootboxOrderStatus,
    setPaymentStatus,
    setPaymentMethod,
    setLoginAction,
    lootboxReserveRampNetwork,
    reserveMoonpay,

    // // ----- lootbox open using toast promise -----
    // openLootbox,
    // getPlayerProfile,
    
    // ----- lootbox open new flow -----
    openLootboxAsync,
  } = useActions();

  const [data, setData] = React.useState(null);
  const [possibleCards, setPossibleCards] = React.useState(null);

  React.useEffect(async () => {
    if (lootboxes.selected) {
      setData(lootboxes.selected);

      // ----- setting up possible cards
      const lootboxId = lootboxes.selected.id.toString();
      const {skins} = await getCardListByLootbox({lootboxId});

      const assets = skins
        .filter((x) => x.videoUrl !== '')
        .map((item) => {
          const images = [item.paperImgUrl, item.rockImgUrl, item.scissorImgUrl];
          // const asset = item.videoUrl;
          const asset = images[Math.floor(Math.random() * images.length)];
          return asset;
        });

      const possibleCards = {
        id: lootboxId,
        assets,
      };

      setPossibleCards(possibleCards);
    }

    return () => {};
  }, [lootboxes.selected]);

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

  const openLootboxAction = async () => {
    // ----- add FB Pixel tracking -----
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        const payload = {
          paymentMethod: payment.method,
          itemType: 'lootbox',
          itemId: data.id.toString(),
          itemName: data.name,
        };
        ReactPixel.track('Purchase', {
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
          currency: 'USD',
          num_items: 1,
          value: parseFloat(data.price),
        });
      });

    // // ----- lootbox open using toast promise -----
    // toast.promise(
    //   openLootbox({
    //     lootboxId: data.id.toString(),
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
    //       render({data}) {
    //         return data.error;
    //       },
    //       autoClose: false,
    //     },
    //   },
    // ).then(() => {
    //   setModalNeedAction(true);
    //   showModal('lootbox-content');
    // });
    
    // ----- lootbox open new flow -----
    openLootboxAsync({lootboxId: data.id.toString()})
      .catch((e) => {
        toast.error(e?.data?.error || 'Oops, please try again in a few moments.');
        showModal('open-lootbox-failed');
      });
  };

  const buyLootboxAction = async (method) => {
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
            itemType: 'lootbox',
            itemId: data.id.toString(),
            itemName: data.name,
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
            value: parseFloat(data.price),
          });
        });

      if (methodStr === 'circle') {
        setLoading(true);
        setPaymentMethod({method, module: 'shop'});
        setModalStep(1);
        setModalFullScreen(true);
        setModalNeedAction(false);
        showModal('payment');
        await setLoading(false);
      } else if (methodStr === 'ramp-network') {
        setLoading(true);
        setPaymentMethod({method, module: 'shop'});
        await lootboxReserveRampNetwork({
          lootboxId: data.id.toString(),
        });
        setModalStep(1);
        setModalFullScreen(true);
        setModalNeedAction(false);
        showModal('payment');
        await setLoading(false);
      } else if (methodStr === 'moonpay') {
        setLoading(true);
        setPaymentMethod({method, module: 'shop'});
        await reserveMoonpay({
          lootboxId: data.id.toString(),
        });
        setModalStep(2);
        setModalFullScreen(true);
        setModalNeedAction(false);
        showModal('payment');
        await setLoading(false);
      } else if (methodStr === 'wyre') {
        setLoading(true);
        setPaymentMethod({method, module: 'shop'});
        setModalStep(1);
        setModalFullScreen(true);
        showModal('payment');
        await setLoading(false);
      } else {
        showModal('loading');
        setLoading(true);
        await buyLootbox({
          method: methodStr,
          lootboxId: data.id.toString(),
        });
        setModalStep(1);
        setModalFullScreen(true);
        showModal('payment');
        await setLoading(false);
      }
    } catch (e) {
      toast.error(e.error || e);
    }
  };

  React.useEffect(() => {
    // ----- when payment COMPLETE and "lootbox-processing" loading modal is shown
    if (modal.type === 'lootbox-processing' && modal.isVisible && payment.status === 'COMPLETE') {
      hideModal();
      openLootboxAction();
    }

    return () => {};
  }, [payment.status]);

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      if (payment.method === 'wyre' && (payment.status === '' || payment.status === 'PROCESSING') && payment.responses.summary?.purchasesId) {
        getLootboxOrderStatus({purchasesId: payment.responses.summary.purchasesId});
      }
    },
    5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onPaymentModalClose = async () => {
    await hideModal();
    if (payment.method === 'wyre') {
      if (payment.status === 'PROCESSING') {
        // ----- when payment still PROCESSING, show "lootbox-processing" loading modal
        await showModal('lootbox-processing');
      } else if (payment.status === 'COMPLETE') {
        // ----- when payment COMPLETE, directly open lootbox
        await openLootboxAction();
        await setPaymentStatus('');
      } else {
        // ----- when payment OPEN, reset payment status
        await setPaymentStatus('');
      }
    } else if (payment.method === 'circle') {
      if (payment.status === 'confirmed') {
        // ----- when payment COMPLETE, directly open lootbox
        await openLootboxAction();
        await setPaymentStatus('');
      } else {
        // ----- when payment OPEN, reset payment status
        await setPaymentStatus('');
      }
    } else if (payment.method === 'moonpay') {
      if (payment.status === 'completed') {
        // ----- when payment COMPLETE, directly open lootbox
        await openLootboxAction();
        await setPaymentStatus('');
      } else {
        // ----- when payment OPEN, reset payment status
        await setPaymentStatus('');
      }
    } else if (payment.method === 'wallet') {
      if (payment.status === 'COMPLETE') {
        // ----- when payment COMPLETE, directly open lootbox
        await openLootboxAction();
        await setPaymentStatus('');
      } else {
        // ----- when payment OPEN, reset payment status
        await setPaymentStatus('');
      }
    }
  };

  // ----- show payment methods -----
  const showPaymentMethods = () => {
    if (auth.isLoggedIn) {
      setModalNeedAction(true);
      showModal('payment-methods');
    } else {
      setLoginAction({enable: true, action_text: 'Buy lootbox'});
      // toast.error('You need to login to purchase this lootbox');
      showModal('login');
    }
  };

  return (
    <section className={`mb-20 ${Style.section__detail}`}>
      <div className={`container mx-auto ${Style.container}`}>
        <div className={Style.wrapper}>
          {possibleCards && (
            <div>
              <Zoom duration={500} left delay={500}>
                <CardItem
                  data={possibleCards}
                  isAutoPlay
                  isLootbox
                  hasPagination
                  hasNavigation
                />
              </Zoom>
            </div>
          )}
          {data && (
            <Zoom duration={500} right cascade delay={500}>
              <div className={Style.block__right}>
                <img className={Style.badge} src={data.assets.badge} />
                <h1 className="mb-5">{data.name}</h1>

                {data.expiredAt !== 0 && (
                  <div className={Style.subtitle}>
                    <img className={Style.icon} src={IconClock} />
                    <Countdown
                      date={data.expiredAt * 1000}
                      renderer={renderer}
                    />
                  </div>
                )}
                <div className={`flex flex-col mb-5 ${Style.description}`}>
                  <span className={Style.description_label}>What you will get:</span>
                  <span className={Style.description_value}>
                    {data.cardsChance.length}
                    {' '}
                    Diamond Hands NFT Cards
                  </span>
                </div>

                <div className={`flex flex-col mb-5 ${Style.description}`}>
                  <span className={Style.description_label}>Card rarity chance:</span>
                  <span className={Style.description_value}>
                    For each card, you have the opportunity to get the following rarities:
                  </span>
                  <div className={`my-5 grid grid-cols-5 ${Style.grid_detail}`}>
                    <span> </span>
                    <span className={`${Style.grid_detail_header} flex justify-center items-center`}>Common</span>
                    <span className={`${Style.grid_detail_header} flex justify-center items-center`}>Rare</span>
                    <span className={`${Style.grid_detail_header} flex justify-center items-center`}>Super Rare</span>
                    <span className={`${Style.grid_detail_header} flex justify-center items-center`}>SSR</span>
                    {data.cardsChance.map((item, i) => (
                      <React.Fragment key={i}>
                        <span className={`${Style.grid_detail_body_start} flex justify-center items-center`}>
                          Card
                          {' '}
                          {i + 1}
                        </span>
                        <span className={`${Style.grid_detail_body} flex justify-center items-center`}>{item.common}</span>
                        <span className={`${Style.grid_detail_body} flex justify-center items-center`}>{item.rare}</span>
                        <span className={`${Style.grid_detail_body} flex justify-center items-center`}>{item.superRare}</span>
                        <span className={`${Style.grid_detail_body_end} flex justify-center items-center`}>{item.ssr}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {/* <p className="mb-10">{data.description}</p> */}

                <div className={Style.dd}>
                  <div className="flex items-center">
                    <img className={Style.dd_icon} src={IconDD} />
                    <span className={Style.dd_label}>DD minted</span>
                  </div>
                  <div className={Style.dd_value}>{currencyFormat(data.content.dd, 'DD')}</div>
                </div>
                <div className={`flex flex-col ${Style.stock}`}>
                  <span className={Style.stock_label}>Pack Remaining</span>
                  <span className={`${Style.stock_value} ${data.stock <= 10 ? Style.danger : ''}`}>
                    {currencyFormat(data.stock)}
                    {' '}
                    Packs
                  </span>
                  {data.stock <= 10 && (
                  <span className={Style.danger_text}>
                    (Hurry up! Once sold out, this lootbox will no longer available on the shop)
                  </span>
                  )}
                </div>

                {data.price !== '' && (
                  <div className="flex flex-row">
                    <div className="mt-10 mr-10">
                      <Button
                        className={`is-yellow is-small is-bold is-rounded is-nunito inline-flex flex-col items-center ${Style.button}`}
                        onClick={() => {
                          showPaymentMethods();
                        }}
                      >
                        <div className={Style.text}>Buy Now</div>
                        <div className={Style.price}>{currencyFormat(data.price, '$')}</div>
                      </Button>
                    </div>
                    {/* <div className="mt-10">
                      <Button
                        className={`is-yellow is-small is-bold is-rounded is-nunito inline-flex flex-col items-center ${Style.button}`}
                        onClick={() => buyLootboxAction('wallet')}
                      >
                        <div className={`text-center ${Style.text}`}>Buy with Wallet</div>
                        <div className={Style.price}>
                          {currencyFormat(data.price)}
                          {' '}
                          USDC
                        </div>
                      </Button>
                    </div> */}
                  </div>
                )}
              </div>
            </Zoom>
          )}
        </div>
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'payment-methods'}
        onClose={() => {
          hideModal();
        }}
        classNames="flex text-center justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="pt-14 font-semibold text-4xl">Buy Lootbox</div>
          <div className="pt-5 pb-10 font-thin text-2xl" style={{color: '#0C353B99'}}>
            Select one of decentralized application to purchase the lootbox
            <br />
            and let them convert your payment into MATIC
          </div>
        </div>
        <div className="flex flex-col gap-6 px-20 pb-10" style={{maxWidth: 800}}>
          {paymentMethods.map((item) => (
            <div key={item.id}>
              <Button
                className="is-rounded-md is-white is-nunito flex p-10"
                onClick={() => buyLootboxAction(item.id)}
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

      <Modal
        show={modal.isVisible && modal.type === 'payment'}
        classNames={modal.isFullScreen ? 'is-fullscreen' : ''}
        isUsingStep
        onClose={() => {
          onPaymentModalClose();
          // window.confirm('Cancel buy?');
        }}
      >
        <Payment type={payment.method} onPaymentModalClose={onPaymentModalClose} />
      </Modal>

      <Modal
        show={modal.isVisible && modal.type === 'lootbox-processing'}
        // onClose={() => {
        //   hideModal();
        // }}
        classNames="flex text-center justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="py-14 font-bold text-3xl">Processing lootbox...</div>
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

      <Modal
        show={modal.isVisible && modal.type === 'lootbox-content'}
        onClose={() => hideModal()}
      >
        <LootboxContents data={lootboxes.opened} buyLootboxAction={showPaymentMethods} />
      </Modal>

      <Modal
        show={modal.isVisible && modal.type === 'loading'}
        onClose={() => hideModal()}
      >
        <div className="loading-wrapper flex flex-col justify-center items-center" style={{height: 300}}>
          <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
        </div>
      </Modal>

      <Modal
        show={modal.isVisible && modal.type === 'login'}
        onClose={() => {
          setLoginAction({enable: false, action_text: ''});
          hideModal();
        }}
      >
        <FormLogin />
      </Modal>
    </section>
  );
};

export default SectionDetail;
