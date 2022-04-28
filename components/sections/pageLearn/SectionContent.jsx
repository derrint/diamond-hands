/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import {Fade, Zoom} from 'react-reveal';
import ReactTooltip from 'react-tooltip';
import {
  Link,
  Element,
  Events,
  scroller,
} from 'react-scroll';
import {IoWalletOutline} from 'react-icons/io5';

import {Button} from '@elements';
import Style from '@styles/page/pageLearn/sectionContent.module.scss';

import IconDiscordWhite from '@images/icon/icon-discord-white.png';
import IconDD from '@images/icon/icon-dd.png';
import IconCopy from '@images/icon/icon-copy.png';
import {useState, useActions} from '@overmind';
import {currencyFormat, copyToClipboard} from '@utils/helper';
import {Config} from '@constant';


const SectionContent = () => {
  const {lootboxes} = useState();
  const {getLootboxList} = useActions();

  React.useEffect(() => {
    getLootboxList({sorted: false});
    Events.scrollEvent.register('begin', () => {
      // console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', () => {
      // console.log('end', arguments);
    });
    return () => {};
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      if (window.location.hash) {
        console.log(window.location)
        const hash = window.location.hash.replace('#', '')
        setActiveSidebarMenu(hash);
        scroller.scrollTo(hash, {
          duration: 100,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }
    }, 1000);
    return () => {};
  }, []);
  // const scrollTo = (e, id) => {
  //   // console.log(e);
  //   const top = id.current.offsetTop - 15;

  //   window.scrollTo(
  //     {
  //       top,
  //       behavior: 'smooth',
  //     },
  //   );
  // };

  const [activeSidebarMenu, setActiveSidebarMenu] = React.useState('getting-started');

  const sidebarMenus = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      // ref: idGettingStarted,
    },
    {
      id: 'nft-card',
      name: 'NFT Card',
      // ref: idNftCard,
    },
    {
      id: 'buy-lootbox',
      name: 'Buy Lootbox',
      // ref: idBuyLootbox,
    },
    {
      id: 'wallet',
      name: 'Wallet',
      // ref: idWallet,
    },
    {
      id: 'dd-coin',
      name: 'DD Coin',
      // ref: idDDCoin,
    },
    {
      id: 'usdc-coin',
      name: 'USDC',
      // ref: idUSDC,
    },
    {
      id: 'swap-usdc2dd',
      name: 'Swap USDC to DD',
      // ref: idUSDC,
    },
    {
      id: 'matic-coin',
      name: 'Matic',
      // ref: idMatic,
    },
    {
      id: 'faq',
      name: 'FAQ',
      // ref: idFAQ,
    },
  ];

  const imageStyle = {
    width: 310,
    paddingTop: 10,
    paddingBottom: 20,
  };

  const discordComponent = () => (
    <div className={Style.discordWrapper}>
      <div className="flex flex-col gap-3">
        <h4>Any inquiries?</h4>
        <span>Our community will be happy to help and share.</span>
      </div>
      <Button
        onClick={() => {
          window.open('https://discord.gg/G89yvGYefz', '_blank');
        }}
        className="is-blue-light is-extra-small is-rounded is-semibold"
      >
        <div className="flex flex-row items-center gap-4 py-2 px-8">
          <img width="22" height="22" src={IconDiscordWhite} />
          Join Discord
        </div>
      </Button>
    </div>
  );

  return (
    <section className={`pb-20 ${Style.section__content}`}>
      <div className={`container mx-auto ${Style.container}`}>
        <div className={Style.wrapper}>
          <Zoom duration={500} delay={250}>
            <div className={Style.image}>
              <img src="https://derrint.sirv.com/Images/diamond-hands/banner/banner-learn-v2.png" />
            </div>
          </Zoom>
          <div className={Style.content}>
            <div className={Style.sideMenu}>
              <Fade duration={500} left delay={250}>
                <ul>
                  {sidebarMenus.map((item, index) => {
                    // const spanClass = item.id === activeSidebarMenu ? Style.active : '';
                    const activeClass = item.id === activeSidebarMenu ? Style.active : '';
                    return (
                      // <li
                      //   key={index}
                      //   onClick={(e) => {
                      //     setActiveSidebarMenu(item.id);
                      //     scrollTo(e, item.ref);
                      //   }}
                      // >
                      //   <span className={spanClass}>{item.name}</span>
                      // </li>
                      <li key={index}>
                        <Link
                          // activeClass={Style.active}
                          className={Style.sectionMenu}
                          to={item.id}
                          spy
                          smooth
                          duration={500}
                          offset={-100}
                          onSetActive={() => setActiveSidebarMenu(item.id)}
                        >
                          <span className={activeClass}>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Fade>
            </div>
            <div className={Style.description}>
              <Element name="getting-started">
                <div id="getting-started" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h2 className="pt-20">Begin your journey in Diamond Hands</h2>
                    {/* <p>Diamond Hands will bring Rock, Paper, Scissors to the next level!</p> */}
                    <br />
                    <p>A few step to get you started:</p>
                    <br />
                    <ol>
                      <li>Hit the ”Log In” button on the top menu. If you don't have any account, create one by clicking “Sign Up”.</li>
                      <li>Create a unique username and your e-email.</li>
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-register-form.png" style={{paddingTop: 10, paddingBottom: 20}} width={500} />
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-login-form-new.png" style={{paddingTop: 10, paddingBottom: 20}} width={500} />

                      <li>We will send you a confirmation link right to your registered e-mail.</li>
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-popup-confirm.png" style={imageStyle} />
                    
                      <li>You’ll find “Log in to Diamond Hands” in your inbox, click the button to log in.</li>
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-login-button-email.png" style={imageStyle} />

                      <li>After you see this success page, go back to your previous app.diamondhands.com tab and you’re successfully logged in.</li>
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-login-success.png" style={imageStyle} />

                      <li>Now, to complete your experience and begin your journey, You can obtain an NFT card buy purchasing a lootbox. Simply access the “Shop” from the top menu.</li>
                    </ol>

                    <h2 className="pt-10">Diamond Hands Lootbox</h2>
                    <div className={Style.lootboxesContainer}>
                      <div className={Style.lootboxes}>
                        {lootboxes?.all?.map((item, i) => (
                          <React.Fragment key={i}>
                            <div
                              className="flex flex-col justify-center items-center"
                              key={i}
                              data-tip
                              data-for={`lootbox- ${item.id}`}
                            >
                              <img
                                src={item.assets.image}
                                width="150px"
                              />
                              <span>{item.name}</span>
                            </div>
                            <ReactTooltip id={`lootbox- ${item.id}`} place="top" backgroundColor="rgb(40 135 177 / 92%);" effect="solid" className={Style.tooltipCustom}>
                              <div className={Style.tooltip}>
                                <span className={Style.tooltipTitle}>
                                  {item.name}
                                </span>
                                <span className={Style.tooltipDesc}>
                                  Get {item?.cardsChance?.length} cards and minted {currencyFormat(item.content.dd, '', 'DD')}. With rarity chance:
                                </span>
                                {item?.cardsChance?.map((ch, ii) => (
                                  <div className="flex flex-row pt-2" key={ii}>
                                    <span className={`${Style.tooltipDesc} flex justify-center items-center`}>
                                      Card &nbsp;
                                      {ii + 1} {':'} &nbsp;
                                    </span>
                                    <span className={`${Style.tooltipDesc} flex justify-center items-center`}>
                                      {ch.common} Common,&nbsp;
                                    </span>
                                    <span className={`${Style.tooltipDesc} flex justify-center items-center`}>
                                      {ch.rare} Rare,&nbsp;
                                    </span>
                                    <span className={`${Style.tooltipDesc} flex justify-center items-center`}>
                                      {ch.superRare} Super Rare,&nbsp;
                                    </span>
                                    <span className={`${Style.tooltipDesc} flex justify-center items-center`}>
                                      {ch.ssr} SSR&nbsp;
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </ReactTooltip>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    {/* <img
                      src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-lootboxes.png"
                      style={{
                        width: 800,
                        paddingTop: 10,
                        paddingBottom: 30,
                      }}
                    /> */}
                    
                    <p>
                      We sell 9,800 Loot-boxes in our Pre-sale period. Each Loot-box contain $DD and NFT Cards.
                      <br />
                      We have 5 tiers Loot-boxes that differ in quantity and rarity of the NFT Cards and DD Token inside:
                      <br />
                      <br />

                      <b>Alpha Box</b>
                      {' '}
                      = 2 Cards + 950 DD
                      <br />
                      <b>Beta Box</b>
                      {' '}
                      =  2 Cards + 2,000 DD
                      <br />
                      <b>Theta Box</b>
                      {' '}
                      = 3 Cards + 3,500 DD
                      <br />
                      <b>Sigma Box</b>
                      {' '}
                      = 3 Cards + 5,400 DD
                      <br />
                      <b>Omega Box</b>
                      = 3 Cards + 10,000 DD
                      <br />
                    </p>
                    <div className="mt-20">
                      <Button
                        href="/shop"
                        className="is-orange is-medium is-rounded is-semibold is-white-shadow"
                      >
                        Lootbox Shop
                      </Button>
                    </div>
                  </Fade>
                </div>
              </Element>
              <Element name="nft-card">
                <div id="nft-card" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">Card Packs</h1>
                    <h2 className="pt-10">Explore our library of packs!</h2>
                    <p>We now have 15 NFT Packs inside our lootbox. Buy, Collect & Battle! More to packs to come!</p>
                    <br />
                    <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-card-packs-2.png" />
                    
                    <h2 className="pt-20">Card Properties</h2>
                    <img className="mb-10" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-card-properties.png" />
                    <div className="pt-20">
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-line.png" />
                    </div>
                    <div className="text-center">
                      <h3 className="pt-20">Get yours now!</h3>
                      <div className="mt-20 mb-10">
                        <Button
                          href="/shop"
                          className="is-orange is-medium is-rounded is-semibold is-white-shadow"
                        >
                          Lootbox Store
                        </Button>
                      </div>
                    </div>
                    <div className="pt-20">
                      <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-line.png" />
                    </div>
                    <div className="text-center">
                      <p className="pt-20">Check out the entire Diamond Hands NFT cards collection!</p>
                      <div className="mt-20 mb-10">
                        <Button
                          href="/cards"
                          className="inline-flex is-blue-light is-medium is-rounded is-semibold"
                        >
                          Diamond Hand's Card Collection
                        </Button>
                      </div>
                    </div>
                  </Fade>
                </div>
              </Element>
              <Element name="buy-lootbox">
                <div id="buy-lootbox" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">How to Buy Lootbox</h1>
                    <br />
                    <br />
                    <ol>
                      <li>
                        Go to our
                        {' '}
                        <Button
                          href="/shop"
                          className="is-text-white is-nunito is-semibold is-underlined"
                        >
                          Shop
                        </Button>
                        {' '}
                        and choose the Lootbox you are going to buy.

                      </li>
                      <li>You can buy the lootbox using credit / debit card or your Diamond Hands Wallet. Make sure you have enough USDC & MATIC to buy lootbox with the Diamond Hands wallet.</li>
                    </ol>
                    <h2 className="pt-20">Buy with card (credit & debit)</h2>
                    <br />
                    <ol>
                      <li>Hit “Buy Now” button on the card page and choose Moonpay.</li>
                      <img className="p-10" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-buylootbox-moonpay-1.png" />
                      <li>We will redirect you to the Moonpay payment window. Please don’t close the original Diamond Hands window. Fill in all the payment forms and enter your info as it appers on your card. If you are using the debit card, make sure your card can make online payment.</li>
                      <img className="p-10" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-buylootbox-moonpay-2.png" />
                      <li>The lootbox will open as soon as you are done with the payment. If not, please check your e-mail or inbox to open the lootbox.</li>
                    </ol>
                    <br />
                    <h2 className="pt-20">Buy with wallet</h2>
                    <br />
                    <ol>
                      <li>Hit “Buy Now” button on the card page and choose My Wallet</li>
                      <img className="p-10" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-buylootbox-wallet-1.png" />
                      <li>You will get the payment summary just like this. For a gasless experience, we need to access your wallet, it’s secured. Otherwise, you need to pay certain amount of gas fee with MATIC if you uncheck the permission below the payment summary.</li>
                      <img className="p-10" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-buylootbox-wallet-2.png" alt="" />
                      <li>You need USDC to complete the purchase. If you run out of USDC you can read how to top it up here. Your screen should look like this once the payment is complete. Close this screen and you’ll receive the receipt on your inbox as well as the NFT cards & DD coin from the lootbox.</li>
                      <img className="p-10" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-buylootbox-wallet-3.png" alt="" />
                    </ol>
                    
                  </Fade>
                </div>
              </Element>
              <Element name="wallet">
                <div id="wallet" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">Diamond Hands Wallet</h1>
                    <br />
                    <h2 className="pt-20">How to use your wallet</h2>
                    <br />
                    <p>
                      The Diamond Hands wallet is powered by the
                      {' '}
                      <Button
                        onClick={() => {
                          window.open('https://polygon.technology/', '_blank');
                        }}
                        className="is-text-white is-underlined is-nunito is-semibold"
                      >
                        Matic Network (Polygon)
                      </Button>
                      , which is a decentralized platform that provides faster and gas-less transactions with the security and safety of the blockchain. The Matic Network is one of the world’s leading and most trusted ethereum Layer 2 solutions that substantially improves the user experience in Diamond Hands.
                    </p>
                    <br />
                    <p className="">
                      You can access your wallet through My Profile’s dropdown or from the wallet icon
                      {' '}
                      <IoWalletOutline size="24" className="inline" />
                      {' '}
                      on the right of your screen.
                    </p>
                    <br />
                    <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-wallet-step.png" />
                  </Fade>
                </div>
              </Element>
              <Element name="dd-coin">
                <div id="dd-coin" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">About DD Coin</h1>
                    <br />
                    <h2 className="flex flex-row items-center pt-20">
                      Diamond Dollars - DD
                      {' '}
                      <img className="px-5" src={IconDD} width="60" />
                    </h2>
                    <br />
                    <p>
                      Diamond Dollars (DD) are an ERC-20 governance token for Diamond Hands. $DD is the currency used for placing wagers in game. The standard means this kind of token will always hold same value (e.g 10 DD will always equal 10 DD) and we can also transact them in fraction (e.g. transfer 0.0000123 DD). We're currently using 18 decimal points like majority of ERC-20 Tokens, it means 1 DD is actually 1 x 10^18 digits.
                    </p>
                    <br />
                    <p className={Style.pbold}>
                      You can use DD Token for the following in-game activities:
                    </p>
                    <ol>
                      <li>To place wagers in game, as core play-to-earn mechanism.</li>
                      <li>To reward users from Leaderboard and any other events.</li>
                      <li>DD is minted for each Daily quest completed.</li>
                      <li>To purchase Energy, so users can continue playing.</li>
                    </ol>
                    <p className="pt-20">
                      Learn more about DD in our
                      {' '}
                      <Button className="is-text-white is-underlined is-nunito is-semibold" href="/token">Token</Button>
                      {' '}
                      page.
                    </p>
                    <h2 className="flex flex-row items-center pt-20">
                      How to Transfer DD to Polygon Wallet
                    </h2>
                    <br />
                    <p>
                      Right now DD is still in the process to get listed officially. In order to see DD balance in your preferred Polygon wallet follow these steps:, please import this token address:
                    </p>
                    <br />
                    <ol>
                      <li>
                        <p> Make sure your Metamask wallet or your preferred Polygon wallet is in the <b>POLYGON chain</b></p>
                        <br />
                        <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-dd-metamask.png" width="50%" />
                        <br />
                      </li>
                      <li>
                        <p>Click Import Token and paste this token address</p>
                        <br />
                        <p className={Style.wrapAddress}><b>{Config.currencyAddressDD}</b>{' '}<img className={Style.btn__copy} onClick={() => copyToClipboard(Config.currencyAddressDD)} src={IconCopy} /></p>
                        <br />
                        <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-dd-metamask2.png" width="50%" />
                        <br />
                      </li>
                      <li>
                        <p>
                          Make sure all of the information matched the following parameter:
                          <br />
                          Token Symbol: <b>DD</b>
                          <br />
                          Token Decimal: <b>18</b>
                        </p>
                        <br />
                        <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-dd-metamask3.png" width="50%" />
                        <br />
                      </li>
                      <li>Click <b>Add Custom Token</b>, and DD Token should be appear on your Metamask.</li>
                    </ol>
                  </Fade>
                </div>
              </Element>
              <Element name="usdc-coin">
                <div id="usdc-coin" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">About USDC</h1>
                    <br />
                    <h2 className="pt-20">What is USDC</h2>
                    <br />
                    <p>
                      Besides DD as our own currency token, we're using USD Coin (USDC) as its pair token. USDC is one of the few stablecoin that you wil be able to find on the crypto market.
                    </p>
                    <br />
                    <p className={Style.pbold}>
                      We used USDC for the following activities:
                    </p>
                    <ol>
                      <li>Pairing DD and USDC on DEX when adding the Liquidity Pool to swap (cash in).</li>
                      <li>Enabling users to cash out their earning in USDC for a more stable exchange rate.</li>
                      <li>Making it as the main currency to trade (sell and buy) on NFT Marketplace.</li>
                      <li>Receiving money from Loot-box pre-sale in USDC, directly to admin wallets.</li>
                    </ol>
                    <h2 className="pt-20">How to get USDC (Polygon)</h2>
                    <br />
                    <p>
                      You can purchase USDC from off/on ramp provider like Moon Pay, Wyre, or Carbon with debit or credit card. Just simply put your Diamond Hands Wallet Address, you can copied it from My Profile.
                    </p>
                    <img className="pt-10" width="355px" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-usdc-profile.png" />
                    <br />
                    <p>
                      Make sure that you are using the correct wallet address. and choose <b>USDC Polygon</b> because our wallet is powered by the
                      {' '}
                      <Button
                        onClick={() => {
                          window.open('https://polygon.technology/', '_blank');
                        }}
                        className="is-text-white is-underlined is-nunito is-semibold"
                      >
                        Matic Network
                      </Button>
                      .
                    </p>
                    <br />
                    <p>
                      Right now, you can’t transfer your USDC or top up the USDC from Diamond Hands, but you can always do it on another provider.
                    </p>
                  </Fade>
                </div>
              </Element>
              <Element name="swap-usdc2dd">
                <div id="swap-usdc2dd" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">How To Swap USDC to DD </h1>
                    <br />
                    <h2 className="pt-20">Uniswap</h2>
                    <br />
                    <p>
                      Uniswap is an Ethereum-based decentralized exchange (DEX) that allows anyone to swap ERC20 tokens. Follow these steps to add DD token on your wallet;
                    </p>
                    <br />
                    <ol>
                      <li>Open <a href="https://app.uniswap.org/#/swap?chain=polygon" target="_blank"><u>https://app.uniswap.org/#/swap?chain=polygon</u></a> and connect your Metamask wallet to Polygon mainnet.</li>
                      <li>
                        <p>Select the USDC as the token you wish to trade to DD.</p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-uniswap1.png" width="100%" />
                        <br />
                      </li>
                      <li>
                        <p>Import DD token manually as the token you wish to receive.</p>
                        <p>Paste the address:</p>
                        <p className={Style.wrapAddress}><b>{Config.currencyAddressDD}</b>{' '}<img className={Style.btn__copy} onClick={() => copyToClipboard(Config.currencyAddressDD)} src={IconCopy} /></p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-uniswap2.png" width="100%" />
                        <br />
                      </li>
                      <li>
                        <p>Next, enter the amount that you wish to trade. You can enter either your desired input amount or output amount. Then approved USDC transaction on metamask wallet.</p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-uniswap3.png" width="100%" />
                        <br />
                      </li>
                      <li>
                        <p>Review your swap. Then, press the 'Swap' button to view a preview of your swap. Confirm and approve swap transaction on Metamask wallet.</p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-uniswap4.png" width="100%" />
                        <br />
                      </li>
                      <li>Once it’s done, your tokens will appear in your ERC20 wallet.</li>
                    </ol>
                    <br />
                    <h2 className="pt-20">Sushiswap</h2>
                    <br />
                    <p>
                      SushiSwap is a decentralized, community-owned, and community-run cryptocurrency exchange built on the Ethereum network. Follow these steps to add DD token on your wallet;
                    </p>
                    <br />
                    <ol>
                      <li>Open <a href="https://app.sushi.com/en/swap" target="_blank"><u>https://app.sushi.com/en/swap</u></a> and connect your Metamask wallet to Polygon mainnet.</li>
                      <li>
                        <p>Select the USDC as the token you wish to trade to DD.</p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-sushiswap1.png" width="100%" />
                        <br />
                      </li>
                      <li>
                        <p>Import DD token manually as the token you wish to receive.</p>
                        <p>Paste the address:</p>
                        <p className={Style.wrapAddress}><b>{Config.currencyAddressDD}</b>{' '}<img className={Style.btn__copy} onClick={() => copyToClipboard(Config.currencyAddressDD)} src={IconCopy} /></p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-sushiswap2.png" width="100%" />
                        <br />
                      </li>
                      <li>
                        <p>Next, enter the amount that you wish to trade. You can enter either your desired input amount or output amount. Then review the swap.</p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-sushiswap3.png" width="100%" />
                        <br />
                      </li>
                      <li>
                        <p>Confirm and approve swap transaction on Metamask wallet.</p>
                        <br />
                          <img src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-swap-sushiswap4.png" width="100%" />
                        <br />
                      </li>
                      <li>Once it’s done, your tokens will appear in your ERC20 wallet.</li>
                    </ol>
                  </Fade>
                </div>
              </Element>
              <Element name="matic-coin">
                <div id="matic-coin" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20">About MATIC</h1>
                    <br />
                    <h2 className="pt-20">What is MATIC</h2>
                    <br />
                    <p>
                      This a native token on Polygon that is used to pay fees for transactions taking place on apps running on Polygon network, including Diamond Hands. It means every transaction such as transferring token or trading NFT assets will require gas-fee to be completed (even though it's very little compared to Ethereum; $0.0005 - $0.002).
                      <br />
                      In our case, most of the blockchain transactions are actually paid by us via Relayer (re: user gas-less experience).
                    </p>
                    <br />
                    <p className={Style.pbold}>
                      However, there are several cases in which users need to pay their own gas-fee, thus there's a need for them to top-up their own MATIC balance to:
                    </p>
                    <ol>
                      <li>List an NFT Card on marketplace</li>
                      <li>Buy an NFT Card from marketplace</li>
                      <li>Swap DD to USDC via Sushiswap SDK</li>
                      <li>Transfer USDC to external wallet (e.g. Metamask)</li>
                    </ol>
                    <h2 className="pt-20">How to get MATIC (Polygon)</h2>
                    <br />
                    <p>
                      You can purchase MATIC (Polygon) token from off/on ramp provider like Moon Pay, Wyre, or Carbon with debit or credit card. Just simply put your Diamond Hands Wallet Address, you can copied it from My Profile.
                    </p>
                    <img className="pt-10" width="355px" src="https://derrint.sirv.com/Images/diamond-hands/learn/learn-usdc-profile.png" />
                    <br />
                    <p>
                      Make sure that you are using the correct wallet address and choose MATIC (Polygon).
                      <br />
                      Right now, you can’t transfer your MATIC or top up the MATIC from Diamond Hands, but you can always do it on another provider.
                    </p>
                  </Fade>
                </div>
              </Element>
              <Element name="faq">
                <div id="faq" className="mb-20">
                  <Fade duration={500} right delay={250}>
                    <h1 className="pt-20 text-center">Frequently Asked Questions</h1>

                    <h3 className="pt-10 mb-0">What is  Diamond Hands?</h3>
                    <p>
                      Diamond Hands is the Rock Paper Scissors experience built on blockchain!
                    </p>
                    <h3 className="pt-10 mb-0">What do I need to play?</h3>
                    <p>
                      In order to play DiamondHands, you must own a Card NFT. Each of our NFTs comes with a rock, paper, and scissors card.
                    </p>

                    <h3 className="pt-10">How can I get a Card NFT?</h3>
                    <p>
                      You can obtain Card NFTs via The Marketplace or Lootboxes (If they’re still available!)
                    </p>
                    <h3 className="pt-10">How are my opponents determined</h3>
                    <p>Once players choose their bets, our backend will find a match based on current level (max 2 level differences), current win ratio (max 5 differences), and current lose ratio (max 5 differences). </p>
                    <p className="mt-6">If there’s no opponent available after 10 seconds timeout, then we will prompt players to try again or cancel the match. If the matchmaking failed or players decided to cancel, escrow will send back the $DIH deducted from the betting phase.</p>
                    
                    <h3 className="pt-10">Where can I find the Whitepaper?</h3>
                    <p>
                      Right here:
                      <br />
                      <a href="https://diamondhands-1.gitbook.io/diamondhands/">https://diamondhands-1.gitbook.io/diamondhands/</a>
                    </p>

                    <h3 className="pt-10">I need additional Help</h3>
                    <p>If you're having any difficulty, please join our Discord server and post in the #new-player-help channel. Our community will be happy to help!</p>

                    {discordComponent()}
                    
                    <div className="py-20" />
                  </Fade>
                </div>
              </Element>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContent;
