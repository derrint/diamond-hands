/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Fade} from 'react-reveal';
import Unity, {UnityContext} from 'react-unity-webgl';
// import {ThirdwebBridgeSDK} from '@3rdweb/unity-bridge';
import {isDesktop, isMobile} from 'react-device-detect';
// import moment from 'moment';
import {ThirdwebBridgeSDK} from '@3rdweb/unity-bridge';
import {FiMaximize2, FiMinimize2, FiXSquare} from 'react-icons/fi';

import {useActions, useState} from '@overmind/index';
import {Config} from '@constant';
import {Modal} from '@modules';
import {SDKContext} from '@context/SDK';
import {Button} from '@elements';
import Style from '@styles/page/pagePlay/sectionGame.module.scss';

import BgGameLoading from '@images/bg/bg-game-loading.png';
import Logo from '@images/logo/logo-diamond-hands-2x.png';
import ImgLootboxContent from '@images/banner/img-lootbox-content.png';
import IconDesktop from '@images/icon/icon-desktop.png';

const SectionGame = () => {
  // ----- setting up bridge & signer -----
  const SDK = React.useContext(SDKContext);

  const {
    auth, modal, cards, game,
  } = useState();
  const {
    getCardListOwned, showModal, hideModal, setGameSetting,
  } = useActions();

  const [unityContext, setUnityContext] = React.useState(undefined);
  const [progression, setProgression] = React.useState(0);
  const {isFullScreen, isVisible} = game;

  // #region ----- setting up interval fact images change -----

  const factImages = [
    'https://derrint.sirv.com/Images/diamond-hands/play/fact-diamondhands.png',
    'https://derrint.sirv.com/Images/diamond-hands/play/fact-nft.png',
    'https://derrint.sirv.com/Images/diamond-hands/play/fact-blockchain.png',
  ];

  const [text, setText] = React.useState(factImages[Math.floor(Math.random() * 3)]);
  const [isTextShown, setIsTextShown] = React.useState(true);

  // ----- fact images interval -----
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      setIsTextShown(false);

      const randomNumber = Math.floor(Math.random() * 3);
      setText(factImages[randomNumber]);

      setTimeout(() => {
        setIsTextShown(true);
      }, 1000);
    },
    7000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // #endregion

  React.useEffect(() => {
    // ----- setting up unity content -----
    const context = new UnityContext({
      loaderUrl: '/static/game/Build-debug/jankenpon.loader.js',
      dataUrl: '/static/game/Build-debug/jankenpon.data',
      frameworkUrl: '/static/game/Build-debug/jankenpon.framework.js',
      codeUrl: '/static/game/Build-debug/jankenpon.wasm',
    });
    setUnityContext(context);

    if (isMobile) {
      setTimeout(() => {
        showModal('alert-desktop-only');
      }, 2000);
    }

    return () => {};
  }, []);

  // const canvasRef = React.useRef(null);

  let initialized = false;
  React.useEffect(() => {
    // ----- setting up loading -----
    if (unityContext) {
      unityContext.on('progress', (progress) => {
        setProgression(progress);
      });

      unityContext.on('canvas', (canvas) => {
        console.warn('[DEBUG] on "canvas" called | ', canvas);

        if (initialized) return;

        console.warn('[DEBUG] initialized = ', initialized);

        // // ----- METHOD A - temporary disabled due to flickering and double bgm issue
        // console.warn('[DEBUG] "createUnityInstance" called at ', moment().format('HH:mm:ss'));
        // window
        //   .createUnityInstance(canvas.current, unityContext.unityConfig)
        //   .then((unityInstance) => {
        //     window.unityInstance = unityInstance;

        //     // setTimeout(() => {
        //     //   unityInstance.Quit();
        //     //   console.warn('[DEBUG] unityInstance destroyed');
        //     // }, 1000);
        //   })
        //   .catch((e) => {
        //     console.error('[DEBUG] error = ', e);
        //   });

        // // ----- METHOD B - setting up unityInstance from unityContext -----
        // window.unityInstance = unityContext.unityInstance;
        // console.warn('[DEBUG] unityContext.unityInstance = ', unityContext.unityInstance);

        console.warn('[DEBUG] unityContext = ', unityContext);
        console.warn('[DEBUG] unityContext.send = ', unityContext.send);

        const callbackfn = (route, request, response) => unityContext.send('Thirdweb', 'Callback', response);

        if (SDK) {
          const {signer} = SDK;
          const bridge = new ThirdwebBridgeSDK(Config.magicRPCURL, {transactionRelayerUrl: Config.transactionRelayerUrl}, callbackfn);
          bridge.setProviderOrSigner(signer);
        }

        initialized = true;
      });
    }

    return () => {};
  }, [unityContext, SDK]);

  const progressPercentage = Math.round(((progression * 100) + Number.EPSILON) * 100) / 100;

  React.useEffect(() => {
    if (auth.isLoggedIn && isDesktop) {
      // bridge.current.setProviderOrSigner(signer);

      // ----- getting card owned
      getCardListOwned().then(() => {
        if (!cards.owned) {
          showModal('no-card');
        } else {
          setGameSetting({
            isFullScreen: true,
            isVisible: true,
          });
        }
      });
    }

    return () => {};
  }, [auth]);

  const handleOnClickFullscreen = () => {
    setGameSetting({isFullScreen: !isFullScreen});
  };

  const handleOnClickQuit = () => {
    setGameSetting({
      isFullScreen: false,
      isVisible: false,
    });
    hideModal();
  };

  return (
    <section className={Style.section__game}>
      <div className={'container mx-auto pt-10 pb-20 ' + Style.container}>
        {unityContext && cards.owned && isVisible && (
          <div className={`${Style.unityWrapper} ${isFullScreen ? Style.unityWrapper_fullscreen : null}`}>

            <div className={`${Style.topBar} ${isFullScreen ? Style.topBar_fullscreen : null}`}>
              <button className={Style.button} onClick={handleOnClickFullscreen}>
                {isFullScreen ? (
                  <FiMinimize2 size="16" color="white" />
                ) : (
                  <FiMaximize2 size="16" color="white" />
                )}
                <span className="mb-1">{isFullScreen ? 'Minimize' : 'Fullscreen' }</span>
              </button>

              <button className={Style.button} onClick={() => showModal('confirmation-quit')}>
                <FiXSquare size="16" color="white" />
                <span className="mb-1">Quit Game</span>
              </button>
            </div>

            <Fade duration={500} when={progression > 0 && progression < 1}>
              <div
                className={`${Style.loading} ${isFullScreen ? Style.loading_fullscreen : null}`}
                style={progression > 0 && progression < 1 ? {} : {visibility: 'hidden'}}
              >
                <img src={BgGameLoading} alt="Cloud" />
                <div className="absolute flex flex-col justify-center items-center">
                  {isDesktop ? (

                    <Fade duration={750} cascade when={isTextShown}>
                      <img className={Style.fact} src={text} alt="" />
                    </Fade>
                  ) : (
                    <img className={Style.logo} src={Logo} />
                  )}
                </div>
                <div className="absolute flex flex-col justify-center items-center bottom-5">
                  <div className={Style.progress}>
                    <div className={Style.progress_value} style={{width: progressPercentage + '%'}} />
                  </div>
                  <span>Loading ...</span>
                </div>
              </div>
            </Fade>

            <Unity
              unityContext={unityContext}
              style={{
                width: isFullScreen ? 'calc(100vh * 16 / 9)' : 'calc(100vh * 16 / 9 - 4rem)',
                height: isFullScreen ? 'calc(100vw * 9 / 16)' : 'calc(100vw * 9 / 16 - 4rem)',
                borderRadius: isFullScreen ? 0 : 10,
                maxWidth: '100%',
                maxHeight: isFullScreen ? '100vh' : 'calc(100vw * 9 / 16 - 4rem)',
                transition: 'all 0.5s',
                paddingTop: 40,
              }}
              className="unityGameCanvas"
            />
          </div>
        )}
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'no-card'}
        classNames="is-blue-75"
      >
        <div className={`${Style.NoCardContainer} container mx-auto`}>
          <div className="flex flex-row justify-center items-center gab-2 mb-5">
            <span className={`text-center ml-2 ${Style.title}`}>Get a Set of NFT Card to Play</span>
          </div>
          <div className="flex flex-row justify-center my-10">
            <img className={Style.image} src={ImgLootboxContent} />
          </div>
          <div className="flex flex-row justify-center items-center gab-2 mb-10">
            <span className={`text-center ml-2 ${Style.subtitle}`}>
              To begin your Diamond Hands journey and play the game, you required
              <br />
              at least 1 set of NFT Card. Get your first NFT card set from the Lootbox.
              <br />
              Buy our lootbox & claim your cards!
            </span>
          </div>
          <div className={`flex flex-row justify-center gab-2 mb-10 ${Style.button}`}>
            <Button
              className="is-blue-light px-8 py-4 is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
              href="/shop"
            >
              <div className="flex flex-row justify-center items-center">
                <span className={`text-center ml-2 ${Style.title}`}>Buy Lootbox Now</span>
              </div>
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        show={modal.isVisible && modal.type === 'confirmation-quit'}
        classNames=""
        bodyStyle={{minHeight: 'unset'}}
        // type="no-blur"
      >
        <div className={`${Style.confirmationModal} container mx-auto`}>
          <div className="flex flex-row justify-center items-center">
            <span className={`text-center ml-2 ${Style.title}`}>Quit game</span>
          </div>
          <div className="flex flex-row justify-center items-center">
            <span className={`text-center ml-2 ${Style.subtitle}`}>
              Are you sure to quit the game?
            </span>
          </div>
          <div className={`flex flex-row justify-center mt-4 gap-5 ${Style.button}`}>
            <Button
              className="is-blue is-small is-semibold is-rounded"
              onClick={() => hideModal()}
            >
              Cancel
            </Button>
            <Button
              className="is-blue is-small is-semibold is-rounded"
              onClick={() => handleOnClickQuit()}
            >
              Quit
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        show={modal.isVisible && modal.type === 'alert-desktop-only'}
        classNames="is-blue-75"
        onClose={() => hideModal()}
      >
        <div className={`${Style.desktopOnlyModal} py-4`}>
          <div className="flex flex-row justify-center">
            <img className={Style.image} src={IconDesktop} />
          </div>
          <div className="flex flex-row justify-center items-center mt-2 mb-4">
            <span className={`text-center ml-2 ${Style.title}`}>
              Rock Paper Scissors Battle
              <br />
              is Available on Desktop
            </span>
          </div>
          <div className="flex flex-row justify-center items-center">
            <span className={`text-center ${Style.subtitle}`}>
              Please head to : app.diamondhands.com/play from desktop browser to play. Don't worry, we're cooking the mobile version of Rock Paper Scissors Battle, follow our
              {' '}
              <Button
                onClick={() => {
                  window.open('https://twitter.com/DiamondHandsOFC', '_blank');
                }}
                className="is-text is-nunito is-semibold is-underlined"
              >
                Twitter
              </Button>
              {' '}
              & join our
              {' '}
              <Button
                onClick={() => {
                  window.open('https://discord.gg/G89yvGYefz', '_blank');
                }}
                className="is-text is-nunito is-semibold is-underlined"
              >
                Discord
              </Button>
              {' '}
              for updates.
            </span>
          </div>
          <div className="flex justify-center my-8">
            <div style={{
              opacity: 0.1,
              borderTop: '1px solid #FFFFFF',
              width: '80%',
            }}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <span className={`text-center ml-2 ${Style.subtitle}`}>
              Don' have a set of NFT card to play? Buy our lootbox & claim your cards!
            </span>
          </div>
          <div className={`flex flex-row justify-center mt-8 ${Style.button}`}>
            <Button
              className="is-blue-light is-semibold is-rounded is-extra-small"
              href="/shop"
            >
              <div className="px-4 py-1">
                See all lootboxes available
              </div>
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SectionGame;
