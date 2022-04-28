/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

// import ReactTooltip from 'react-tooltip';
import Cookies from 'js-cookie';

import Router, {useRouter} from 'next/router';
import _ from 'lodash';
import {toast} from 'react-toastify';
import {Fade} from 'react-reveal';
// import {Magic} from 'magic-sdk';

// import {Config} from '@constant';
import {useState, useActions} from '@overmind/index';
import {truncateMiddle, copyToClipboard} from '@utils/helper';
import {mainMenu} from '@data';
import {Button} from '@elements';
import {Modal, DropDown, SideBar} from '@modules';
import {
  FormLogin, FormRegister, PopUpOnBoarding, PopUpAlertOpenLootbox, PopUpCookies, LootboxContents, TransferWallet, Footer,
} from '@templates';
import {Config} from '@constant';
// import {currencyFormat} from '@utils/helper';

/* import images */
import Logo from '@images/logo/logo-diamond-hands-2x.png';
import IconHamburger from '@images/icon/icon-hamburger.png';
import IconCloseHamburger from '@images/icon/icon-close-hamburger.png';
import IconDD from '@images/icon/icon-dd.png';
import IconPlusGreen from '@images/icon/icon-plus-green.png';
import IconMenuLogout from '@images/icon/icon-menu-logout-white.png';
import IconMenuProfile from '@images/icon/icon-menu-profile-white.png';
import IconMenuInbox from '@images/icon/icon-inbox-white.png';
import IconMenuWallet from '@images/icon/icon-wallet-white.png';
import IconMenuCards from '@images/icon/icon-menu-cards-white.png';
// import IconWallet from '@images/icon/icon-wallet-dark.png';
import IconChevronRightDouble from '@images/icon/icon-chevron-right-double.png';
import IconLootbox from '@images/icon/icon-lootbox.png';
import IconHand from '@images/icon/icon-hand.png';
import IconCopy from '@images/icon/icon-copy.png';
import IconMail from '@images/icon/icon-mail-blue.png';
import IconMyWallet from '@images/icon/icon-my-wallet.png';
import IconArrowDown from '@images/icon/icon-arrow-down-filled-blue.png';
import DiamondLoader from '@images/loader/diamond-loader.gif';

import WalletAccordion from './wallet-info-accordion';
// import ImageDefault from '@images/dummy/default-profile.png';

const Header = () => {
  const router = useRouter();
  const {
    auth, modal, player, wallet, inbox, lootboxes,
  } = useState();
  const {
    logout,
    showModal,
    hideModal,
    getLootboxOwned,
    setLoginAction,
    setWalletShowing,
    setModalNeedAction,

    getPlayerProfile,

    // // ----- lootbox open using toast promise -----
    // openLootbox,
    
    // ----- lootbox open new flow -----
    openLootboxAsync,
    openLootboxStatus,
    setLootboxOpening,
  } = useActions();

  const [navbar, setNavbar] = React.useState(false);
  const [activeMenuMobile, setActiveMenuMobile] = React.useState(false);
  const [activeAccorrdionWallet, setActiveAccorrdionWallet] = React.useState('DD');

  const mainMenuFiltered = mainMenu.filter((item) => {
    if (auth.isLoggedIn) {
      return item.isVisible;
    }
    return item.isVisible && !item.isAuth;
  });

  const topNavigasiSorted = _.sortBy(mainMenuFiltered, ['order']);

  React.useEffect(() => {
    const isCookieAccepted = Cookies.get('accept-cookies');
    if (auth.isLoggedIn === undefined && !isCookieAccepted) {
      setTimeout(() => {
        showModal('cookies-agreement');
      }, 2000);
    }
    if (auth.isLoggedIn) {
      getLootboxOwned().then((res) => {
        if (res.count > 0) {
          showModal('open-lootbox-owned');
        }
      });
    }
  }, [auth.isLoggedIn]);
  
  const buyLootboxAction = () => {
    hideModal();
    // eslint-disable-next-line no-restricted-globals
    location.href = '/shop';
  };
  
  const openRetryLootboxAction = () => {
    hideModal();

    // // ----- lootbox open using toast promise -----
    // toast.promise(
    //   openLootbox({id: lootboxes?.error_openlootbox?.lootbox?.Id}),
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
    //         showModal('open-lootbox-failed');
    //         return data.error;
    //       },
    //       autoClose: false,
    //     },
    //   },
    // ).then(() => {
    //   showModal('lootbox-content-global');
    // });

    // ----- lootbox open new flow -----
    openLootboxAsync({id: lootboxes?.error_openlootbox?.lootbox?.Id})
      .catch((e) => {
        toast.error(e?.data?.error || 'Oops, please try again in a few moments.');
        showModal('open-lootbox-failed');
      });
  };
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const openMenuMobile = () => {
    setActiveMenuMobile(!activeMenuMobile);
  };

  // // ----- MAGIC LINK -----

  // /* Configure Ethereum provider */
  // const customNodeOptions = {
  //   rpcUrl: Config.magicRPCURL, // Polygon RPC URL
  //   chainId: Config.magicChainId, // Polygon chain id
  // };

  // // Setting network to Polygon
  // const magic = new Magic(Config.magicAPIKEY, {
  //   network: customNodeOptions,
  // });

  // // ----- end of MAGIC LINK -----

  const handleLogout = async () => {
    // await magic.user.logout();
    await logout().then(() => {
      // eslint-disable-next-line no-restricted-globals
      location.href = '/';
    });
  };

  const doLogout = async () => {
    toast.promise(
      handleLogout(),
      {
        pending: {
          render() {
            return 'Logging you out';
          },
        },
        success: {
          render() {
            hideModal();
            return 'See you... 👋🏻';
          },
        },
        error: {
          render({data}) {
            return data.error;
          },
          autoClose: false,
        },
      },
    );
    hideModal();
  };

  const walletTriggerRef = React.createRef();
  
  const showWalletSidebar = () => {
    walletTriggerRef.current.click();
  };

  const userMenu = [
    {
      id: 1,
      value: 'My Profile',
      icon: IconMenuProfile,
      navigate: '/profile',
    },
    {
      id: 2,
      value: 'Inbox',
      icon: IconMenuInbox,
      navigate: '/inbox',
      // onClick: () => {},
    },
    {
      id: 3,
      value: 'My Card',
      icon: IconMenuCards,
      navigate: '/card',
    },
    {
      id: 4,
      value: 'My Wallet',
      icon: IconMenuWallet,
      // navigate: '/profile',
      onClick: () => {
        showWalletSidebar();
        setWalletShowing(true);
      },
    },
    {
      id: 5,
      value: 'Log Out',
      icon: IconMenuLogout,
      onClick: doLogout,
    },
  ];

  const ddMenu = [
    {
      id: 1,
      value: 'Open Lootbox',
      icon: IconLootbox,
      navigate: '/shop',
    },
    {
      id: 2,
      value: 'Play Game',
      icon: IconHand,
      navigate: '/play',
      // highlight: 'Coming soon',
      // disabled: true,
    },
  ];

  React.useEffect(() => {
    changeBackground();
    window.addEventListener('scroll', changeBackground);

    return () => {};
  }, []);

  // const getSymbol = (symbol) => {
  //   switch (symbol) {
  //     case 'MATIC':
  //       return IconMatic;
  //     case 'USDC':
  //       return IconUSDC;
  //     default:
  //       break;
  //   }
  //   return '';
  // };
  // const currentDD = currencyFormat(wallet?.diad?.value);
  const currentDD = wallet?.diad?.displayValue;

  const wallets = wallet ? Object.keys(wallet).map((key) => wallet[key]) : [];
  // const walletsFiltered = wallets.filter((x) => x.symbol !== 'DD');

  const acceptAction = () => {
    Cookies.set('accept-cookies', true);
    hideModal();
  };

  // ----- checking lootbox opening status every X seconds -----
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      if (lootboxes.opening?.status === 'on-progress') {
        openLootboxStatus({
          trxId: lootboxes.opening?.trxId,
        })
          .then(async (res) => {
            console.log('result openLootboxStatus', res);
          })
          .catch((e) => {
            setLootboxOpening({
              ...lootboxes.opening,
              status: e,
            });
          });
      }
    },
    5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lootboxes.opening?.status]);

  React.useEffect(() => {
    if (lootboxes.opening?.status === 'success') {
      getPlayerProfile();
      setModalNeedAction(true);
      showModal('lootbox-content-global');
    }

    return () => {};
  }, [lootboxes.opening?.status]);

  return (
    <>
      <Fade duration={500} top>
        <header className={`header fixed w-full z-10 ${navbar || router.pathname === '/' ? 'on-scroll' : 'on-top'}`}>
          <nav className="container mx-auto flex justify-between items-center py-2">
            <Fade duration={500} top cascade>
              <div className="flex flex-row items-center md:gap-10">
                <div className="logo">
                  <Button
                    href="/"
                  >
                    <img src={Logo} />
                  </Button>
                </div>
                <div className={`menu flex ${activeMenuMobile ? 'menu-mobile-expanded' : ''} ${navbar ? 'on-scroll' : 'on-top'}`}>
                  {
                    topNavigasiSorted.map((item) => {
                      let activeClassName = '';
                      let {icon} = item;

                      if (router.pathname === item.href) {
                        activeClassName = 'active';
                        icon = item.iconActive;
                      }

                      return (
                        <Button
                          key={`top-navigasi-${item.id}`}
                          className={`menu--link ${activeClassName}`}
                          href={item.href}
                        >
                          <img className="image" src={icon} />
                          <div className="label">
                            {item.label}
                          </div>
                          
                          <div className={`${item.highlight ? 'highlight' : ''}`}>
                            {item.highlight}
                          </div>
                        
                        </Button>
                      );
                    })
                  }
                  
                  <div className="mobile-only" />
                  {!auth.isLoggedIn && (
                    <div>
                      <Button
                        className="signup-btn is-rounded is-bold mobile-only text-center"
                        onClick={() => showModal('register')}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                  <div>
                    <Button
                      className="login-btn is-blue is-rounded is-bold mobile-only text-center"
                      onClick={() => {
                        if (!auth.isLoggedIn) {
                          showModal('login');
                        } else {
                          doLogout();
                        }
                      }}
                    >
                      {!auth.isLoggedIn ? 'Log in' : 'Log out'}
                    </Button>
                  </div>
                  <div className="mobile-only" />
                  <Footer isSubmenu />

                </div>
              </div>
            </Fade>
            
            <div className="flex flex-row items-center gap-2 lg:gap-5">
              {!auth.isLoggedIn
                ? (
                  <>
                    <Button
                      className="signup-btn is-rounded is-semibold desktop-only"
                      onClick={() => showModal('register')}
                    >
                      Sign up
                    </Button>
                    <Button
                      className="login-btn is-blue is-rounded is-semibold desktop-only"
                      onClick={() => showModal('login')}
                    >
                      Log in
                    </Button>
                  </>
                )
                : (
                  <Fade duration={500} top cascade>
                    <div className="flex flex-row">
                      <div className="dd-info">
                        <img className="icon-dd" src={IconDD} />
                        <div className="dd-amount">{currentDD}</div>
                        <DropDown
                          title=""
                          items={ddMenu}
                          type="link"
                          alignContent="right"
                          isShowingArrow={false}
                          component={(
                            <div className="icon-plus">
                              <img src={IconPlusGreen} />
                            </div>
                          )}
                        >
                          <ul className="dropdown-content__list">
                            {ddMenu.length > 0
                              && ddMenu.map((item, index) => {
                                const highlightClass = item.highlight ? 'mb-10' : '';
                                const disabledClass = item.disabled ? 'disabled' : '';
                                return (
                                  <li className={`dropdown-content__list__item ${highlightClass} ${disabledClass}`} key={`dd-${index}`}>
                                    <a
                                      className="menu-profile--link"
                                      onClick={(e) => {
                                        e.preventDefault();

                                        if (!item.disabled) {
                                          if (item.onClick !== undefined) {
                                            item.onClick();
                                          } else {
                                            Router.push(item.navigate);
                                          }
                                        }
                                      }}
                                    >
                                      <img className="icon" src={item.icon} />
                                      <span>{item.value}</span>
                                    </a>
                                    {item.highlight && (
                                      <div className="menu-profile--highlight">
                                        {item.highlight}
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                          </ul>
                        </DropDown>
                      </div>
                      
                      <div className="profile">
                        <DropDown
                          title=""
                          items={userMenu}
                          type="link"
                          alignContent="right"
                          isShowingArrow={false}
                          component={(
                            <>
                              <div className="image">
                                <div className="image-cover">
                                  <img src={Config.baseURL + player?.avatarUrl} />
                                  {inbox.unread_count > 0 && (
                                    <span className="badge">{inbox.unread_count}</span>
                                  )}
                                </div>
                              </div>
                              <div className="mobile-only icon ml-2">
                                <img src={IconArrowDown} width="12px" />
                              </div>
                              <span className="username">
                                {player?.userName}
                              </span>
                            </>
                          )}
                        >
                          <ul className="dropdown-content__list">
                            {userMenu.length > 0
                              && userMenu.map((item, index) => (
                                <li className="dropdown-content__list__item" key={`dd-${index}`}>
                                  <a
                                    className="menu-profile--link"
                                    onClick={(e) => {
                                      e.preventDefault();

                                      if (item.onClick !== undefined) {
                                        item.onClick();
                                      } else {
                                        Router.push(item.navigate);
                                      }
                                    }}
                                  >
                                    <div className="icon-section">
                                      <img className="icon" src={item.icon} />
                                      {item.value === 'Inbox' && inbox.unread_count > 0 && (
                                        <span className="badge">{inbox.unread_count}</span>
                                      )}
                                    </div>
                                    <span>{item.value}</span>
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </DropDown>
                      </div>
                    </div>
                  </Fade>
                )}

              <Button
                className={`mobile-only ${activeMenuMobile ? 'hide' : 'show'} burger-menu`}
                onClick={() => openMenuMobile()}
              >
                <img src={IconHamburger} width={20} />
              </Button>
              <Button
                className={`mobile-only ${activeMenuMobile ? 'show' : 'hide'} burger-menu`}
                onClick={() => openMenuMobile()}
              >
                <img src={IconCloseHamburger} width={20} />
              </Button>
            
              <Modal
                show={modal.isVisible && modal.type === 'login'}
                onClose={() => {
                  setLoginAction({enable: false, action_text: ''});
                  hideModal();
                }}
              >
                <FormLogin />
              </Modal>
              <Modal
                show={modal.isVisible && modal.type === 'register'}
                onClose={() => hideModal()}
              >
                <FormRegister />
              </Modal>
              <Modal
                show={modal.isVisible && modal.type === 'onboarding-popup'}
                onClose={() => hideModal()}
                noCloseButton
              >
                <PopUpOnBoarding />
              </Modal>
              <Modal
                show={modal.isVisible && modal.type === 'open-lootbox-owned'}
                onClose={() => hideModal()}
                noCloseButton
                type="toast-dialog"
              >
                <PopUpAlertOpenLootbox />
              </Modal>

              <Modal
                show={modal.isVisible && modal.type === 'cookies-agreement'}
                noCloseButton
                type="toast-cookies"
                onClose={() => {
                  acceptAction();
                }}
                classNames="mx-10"
              >
                <PopUpCookies acceptAction={acceptAction} />
              </Modal>

              <Modal
                show={modal.isVisible && modal.type === 'lootbox-content-global'}
                modalStyle={{backgroundColor: 'transparent'}}
                onClose={() => {
                  hideModal();
                  getLootboxOwned().then((res) => {
                    if (res.count > 0) {
                      showModal('open-lootbox-owned');
                    }
                  });
                }}
              >
                <LootboxContents data={lootboxes.opened} buyLootboxAction={buyLootboxAction} />
              </Modal>
              
              <Modal
                show={modal.isVisible && modal.type === 'open-lootbox-failed'}
                onClose={() => hideModal()}
              >
                <div className="modal-failed-open-lootbox">
                  <div className="flex flex-col justify-center items-center my-5">
                    <img width={150} src={lootboxes?.error_openlootbox?.lootbox?.badge} />
                    <span className="lootbox-name mt-5">{lootboxes?.error_openlootbox?.lootbox?.name}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center my-10">
                    {lootboxes?.error_openlootbox?.error === 'OnProgress' ? (
                      <span className="message mt-5">
                        Please wait, your another lootbox
                        {' '}
                        <br />
                        {' '}
                        is being minted in our system.
                        {' '}
                        <br />
                        <br />
                        <br />
                        {' '}
                        You may
                        {' '}
                        <b>retry</b>
                        ,
                        <br />
                        {' '}
                        or
                        {' '}
                        <b>close</b>
                        {' '}
                        this modal & check your
                        {' '}
                        <b>inbox</b>
                        {' '}
                        for further notification.
                      </span>
                    ) : (
                      <span className="message mt-5">
                        Failed to open the Box.
                        {' '}
                        <br />
                        {' '}
                        Don’t worry! It happens sometimes
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center my-10">
                    <Button
                      className="is-red is-small is-rounded is-semibold"
                      onClick={() => openRetryLootboxAction()}
                    >
                      Retry
                    </Button>
                  </div>
                  <div className="flex flex-row justify-center items-center mt-20">
                    <Button
                      className="flex flex-row justify-center items-center gap-3"
                      href="/learn"
                    >
                      <img width="100%" src={IconMail} />
                      <span className="help">
                        Help
                      </span>
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </nav>
        </header>
      </Fade>

      {auth.isLoggedIn && (
        <div className={`wallet ${navbar ? '' : 'mt-10'}`}>
          <SideBar
            title=""
            items={userMenu}
            type="link"
            alignContent="right"
            isShowingArrow={false}
            component={(
              <div
                className="wallet-trigger"
                ref={walletTriggerRef}
              >
                <img className="icon-wallet" src={IconMyWallet} />
              </div>
            )}
          >
            <div className="wallet-wrapper">
              <div className="flex justify-between align-center">
                <div className="flex gap-5">
                  <img className="icon-wallet" src={IconMyWallet} />
                  <h2>My Wallet</h2>
                </div>
                <img className="icon-chevron" src={IconChevronRightDouble} />
              </div>
              <div className="flex flex-col align-center mt-5">
                <div className="flex gap-5">
                  <span className="address-label">Diamond Hands wallet address</span>
                </div>
                <div className="flex gap-5">
                  <h3>
                    {truncateMiddle(player.walletId, 11)}
                    <img className="btn__copy" onClick={() => copyToClipboard(player.walletId)} src={IconCopy} />
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-6 mt-6">
                {wallets.map((item, i) => (
                  <WalletAccordion key={i} data={item} setActiveAccordion={setActiveAccorrdionWallet} activeAccordion={activeAccorrdionWallet} />
                  // <div className="wallet-info" key={i}>
                  //   <span className="wallet-info--label">
                  //     {item.symbol}
                  //     {' '}
                  //     balance
                  //   </span>
                  //   <div className="flex items-center gap-4 mt-1 mb-5">
                  //     <img className="wallet-info--icon" src={getSymbol(item.symbol)} />
                  //     <span className="wallet-info--value">
                  //       {item.value}
                  //     </span>
                  //     <span className="wallet-info--symbol">
                  //       {item.symbol}
                  //     </span>
                  //   </div>
                  //   <div className="wallet-info--action">
                  //     <div data-tip data-for={`top-up-${i}`}>
                  //       <Button
                  //         onClick={() => window.open('https://www.moonpay.com/buy/matic', '_blank')}
                  //       >
                  //         <img src={IconPlusBlue} />
                  //         <span>Top Up</span>
                  //       </Button>
                  //     </div>
                  //     {/* <ReactTooltip id={`top-up-${i}`} place="right" backgroundColor="#1C5D79" effect="solid">
                  //       <span className="w-full">Feature is not ready yet</span>
                  //     </ReactTooltip> */}
                  //     <div data-tip data-for={`tf-${i}`}>
                  //       <Button
                  //         onClick={() => transferWalletAction(item)}
                  //       >
                  //         <img src={IconSendBlue} />
                  //         <span>Transfer to another account</span>
                  //       </Button>
                  //     </div>
                  //     {/* <ReactTooltip id={`tf-${i}`} place="right" backgroundColor="#1C5D79" effect="solid">
                  //       <span className="w-full">Feature is not ready yet</span>
                  //     </ReactTooltip> */}
                  //     <Button onClick={() => window.open(urlHistory, '_blank')}>
                  //       <img src={IconHistoryBlue} />
                  //       <span>Transaction history</span>
                  //     </Button>
                  //   </div>
                  // </div>
                ))}
                <div className="wallet-links flex flex-col gap-4">
                  <Button
                    onClick={() => window.open(`https://polygonscan.com/address/${player.walletId}`, '_blank')}
                    className="is-text is-semibold is-extra-small"
                  >
                    <span>See details</span>
                  </Button>
                  <Button
                    href="/learn#usdc-coin"
                    className="is-text is-semibold is-extra-small"
                  >
                    <span>Learn how to Top Up</span>
                  </Button>
                </div>
              </div>
            </div>
          </SideBar>
        </div>
      )}
      
      <Modal
        show={modal.isVisible && modal.type === 'transfer-wallet'}
        isUsingStep
        noCloseButton
        onClose={() => {
          hideModal();
        }}
      >
        <TransferWallet />
      </Modal>

      <Modal
        show={modal.isVisible && modal.type === 'diamond-loader'}
        noCloseButton
        modalStyle={{minWidth: 'unset', backgroundColor: 'transparent'}}
        bodyStyle={{padding: 0, minHeight: 'unset'}}
      >
        <div className="flex flex-col justify-center items-center">
          <img src={DiamondLoader} width={120} />
          <div className="font-bold text-white">Opening Lootbox...</div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
