/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import React from 'react';
import {Zoom} from 'react-reveal';
import {FaFileContract} from 'react-icons/fa';

import {useActions} from '@overmind/index';
import {Button} from '@elements';
import Style from '@styles/page/pageToken/sectionInformation.module.scss';
import {Config} from '@constant';

// import {currencyFormat} from '@utils/helper';

import IconPlant from '@images/icon/icon-plant.png';
import IconVault from '@images/icon/icon-vault.png';
import IconChevronCircleRightWhite from '@images/icon/icon-chevron-circle-right-white.png';

const SectionInformation = () => {
  const {getTreasuryBalance} = useActions();
  const [treasury, setTreasury] = React.useState();
  
  React.useEffect(() => {
    getTreasuryBalance().then((balance) => setTreasury(balance.diad));
    return () => {};
  }, []);
  
  return (
    <section className={`pb-20 ${Style.section__information}`}>
      <div className="container mx-auto">
        <div className={Style.container}>
          <Zoom duration={500} bottom cascade>
            <div className={Style.introduction}>
              <h1 className="text-center">
                DD Token
              </h1>
              <div className={Style.content}>
                <div className="flex flex-col justify-center">
                  <div>
                    DD is the native currency in DiamondHands. DD allows token holders to play DiamondHands and can also be traded on various Cryptocurrency exchanges.
                  </div>
                  <div className="flex justify-start mt-8">
                    <Button
                      className="is-blue is-extra-small is-semibold is-rounded"
                      onClick={() => window.open(`${Config.polygonscanURL}/token/${Config.currencyAddressDD}`, '_blank').focus()}
                    >
                      <div className="px-3 py-2">
                        View token on Polygonscan
                      </div>
                    </Button>
                  </div>
                  <div className={`${Style.contract} mt-8 gap-5`}>
                    <div>
                      <FaFileContract color="#F5BD4F" size="16" />
                    </div>
                    <span>
                      Contract: 0x6169cc88b258dea808e1519168a79a6ccb666e7f
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img width="100%" src="https://derrint.sirv.com/Images/diamond-hands/token/illustration-dd-2x.png" />
                </div>
              </div>
            </div>
  
            <div className={Style.functionality}>
              <h1 className="text-center">
                DD Token functionality
              </h1>
              <div className={Style.content}>
                <div className={Style.imgContentOnTop}>
                  <img width="100%" src="https://derrint.sirv.com/Images/diamond-hands/token/illustration-functionality.png" />
                </div>
                <div className={Style.leftDesc}>
                  <h2>Play to earn</h2>
                  <span>NFTs in our game have built in quest systems. Complete the daily quest, and mint DD!</span>
                </div>
                <div className={Style.imgContentOnCenter}>
                  <img width="100%" src="https://derrint.sirv.com/Images/diamond-hands/token/illustration-functionality.png" />
                </div>
                <div className={Style.rightDesc}>
                  <h2>Access to Higher Stages</h2>
                  <span>Each game stages has a DD amount required in order to participate in that stage.</span>
                </div>
              </div>
            </div>
  
            <div className={Style.finance}>
              <div className="text-center">
                <h1>Gamified Finance</h1>
  
                <h3>
                  One of our strategic visions within Diamond Hands is to create
                  <br />
                  monetary incentives for the most committed and motivated players.
                </h3>
              </div>
  
              <div className={Style.content}>
                <div className={Style.item}>
                  <div className="flex justify-center">
                    <img src="https://derrint.sirv.com/Images/diamond-hands/token/icon-schoolbag.png" />
                  </div>
                  <h2>Dynamic NFTs & Card Minting</h2>
                  <span>The Cards you use Mint DD if you can complete the card’s daily quest. The more you use a card, the higher level the card will obtain. The more rare & higher level card you have; the more your daily quest reward will be for that NFT.</span>
                </div>
  
                <div className={Style.item}>
                  <div className="flex justify-center">
                    <img src="https://derrint.sirv.com/Images/diamond-hands/token/icon-trophy.png" />
                  </div>
                  <h2>Tournament & Seasonal Prize Pools</h2>
                  <span>We launch a reoccuring Seasonal Leaderboard. At the end of each season, the top 50 players, scored by BP will be awarded $DD from the Treasury.</span>
                </div>
  
                <div className={Style.item}>
                  <div className="flex justify-center">
                    <img src="https://derrint.sirv.com/Images/diamond-hands/token/icon-gift.png" />
                  </div>
                  <h2>Limited Edition Drops</h2>
                  <span>Our Limited Edition Drops give users the opportunity to obtain extra rare cards. These Limited Edition Cards hold more difficuly but contain greater quest rewards.</span>
                </div>
              </div>
            </div>
  
            <div className={Style.whitepaper}>
              <div>
                Want to learn more?
                <br />
                Become a DiamondHands guru and explore our whitepaper!
              </div>
              <div className="flex justify-center mt-12">
                <Button
                  className="is-orange is-extra-small is-semibold is-rounded"
                  onClick={() => {
                    window.open('https://diamondhands-1.gitbook.io/diamondhands/', '_blank');
                  }}
                >
                  <div className="px-3 py-2">
                    Read Whitepaper
                  </div>
                </Button>
              </div>
            </div>
  
            <div className={Style.treasury}>
              <div className="text-center">
                <h1 className="flex flex-row justify-center">
                  <img src={IconPlant} />
                  Diamond Hands Treasury
                </h1>
  
                <h3 className="flex flex-row justify-center">
                  We cut 5% from every Battle and distribute them to:
                </h3>
              </div>
  
              <div className={Style.content}>
                <div className={Style.item}>
                  <h2>4%</h2>
                  <h4>Prize Pool & Community Events</h4>
                </div>
  
                <div className={Style.item}>
                  <h2>1%</h2>
                  <h4>Token Burned</h4>
                </div>
              </div>

              {treasury?.value !== '0' ? (
                <div className="flex flex-row justify-center">
                  <div className={Style.current}>
                    <h4 className="flex flex-row justify-center">
                      <img src={IconVault} />
                      Current balance in DD
                    </h4>
                    <h2>
                      {treasury?.displayValue}
                      {' '}
                      DD
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-center">
                  <div className={Style.current}>
                    <h4 className="flex flex-row justify-center mb-2">
                      <img src={IconVault} />
                      Current balance in DD
                    </h4>
                    <span className={Style.emptyWord}>
                      Treasury balance will be updated
                      {' '}
                      <br />
                      {' '}
                      when the game is available
                    </span>
                  </div>
                </div>
              )}
  
              <div className="flex justify-center mt-20 mb-10">
                <Button
                  className="is-blue-light is-extra-small is-semibold is-rounded"
                  onClick={() => window.open(`${Config.polygonscanURL}address/${Config.treasuryAddress}`, '_blank').focus()}
                >
                  <div className="flex flex-row justify-center px-3 py-2 gap-5">
                    See treasury history
                    <img style={{width: 20}} src={IconChevronCircleRightWhite} />
                  </div>
                </Button>
              </div>
            </div>
          </Zoom>
  
        </div>
      </div>
    </section>
  );
};

export default SectionInformation;
