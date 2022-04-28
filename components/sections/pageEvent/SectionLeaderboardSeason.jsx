import React from 'react';
import {useState, useActions} from '@overmind';
import Style from '@styles/page/pageEvent/SectionLeaderboardSeason.module.scss';
import {Fade} from 'react-reveal';
import moment from 'moment';
import {FaRegCalendarAlt} from 'react-icons/fa';
import Countdown, {zeroPad} from "react-countdown";
import {currencyFormat} from '@utils/helper';
import {Button} from '@elements';
/* import images */
import IconRank1 from '@images/icon/icon-rank-1.png';
import IconRank2 from '@images/icon/icon-rank-2.png';
import IconRank3 from '@images/icon/icon-rank-3.png';
import IconDD from '@images/icon/icon-dd.png';

const SectionLeaderboard = () => {
  const {ranks} = useState();
  const {getRankList} = useActions();
  React.useEffect(() => {
    getRankList({
      type: 'weekly',
      limit: 15,
      offset: 0,
    });

    return () => {};
  }, []);
  return (
    <section className={`mb-20 ${Style.section__listLeaderBoard}`}>
      <div className={`container mx-auto ${Style.container}`}>
        {/* <div className="flex flex-row justify-center gap-5"> */}
          <div className={Style.wrapper}>
            <div className={Style.reward}>
              <div className={Style.content}>
                <div className="flex flex-col sm:flex-row text-center sm:text-left justify-between items-center mb-10">
                  <div className="flex flex-col">
                    <h2 className={Style.title}>
                      Season 1 is live!
                    </h2>
                    <span className={`inline-flex items-center ${Style.subtitle}`}><FaRegCalendarAlt size={12} className="mr-3" color="#1C5D79" />{`(GMT) ${moment(ranks?.start * 1000).format('DD MMM')} - ${moment(ranks?.end * 1000).format('DD MMM, YYYY')}`}</span>
                  </div>
                  <div className="flex flex-col mt-5 sm:mt-0">
                    <span className={`${Style.timeRemaining} text-center sm:text-right`}>
                      Time Remaining
                    </span>
                    {ranks?.end && (
                      <Countdown
                        date={ranks?.end * 1000}
                        // date={ranks?.end + }
                        renderer={props => <span className={Style.countdown}>
                          {`${props.days} days ${zeroPad(props.hours)}:${zeroPad(props.minutes)}:${zeroPad(props.seconds)}`}
                        </span>}
                      />
                    )}
                  </div>
                </div>
                <div className={`flex flex-col mb-10 ${Style.rewardDetail}`}>
                  <span className={`${Style.desc} mb-5`}>Hurry up! Only the Top 3 will earn rewards! We cut 4% from every Game to provide our weekly prize pool.</span>
                  <div className="flex flex-col">
                    {ranks?.prize?.map((item, i) => {
                      let image = "";
                      let rankTxt = "";
                      switch (i) {
                        case 0:
                          image = "https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-1st.png";
                          rankTxt = "1st Position";
                          break;
                        case 1:
                          image = "https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-2nd.png";
                          rankTxt = "2nd Position";
                          break;
                        case 2:
                          image = "https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-3rd.png";
                          rankTxt = "3rd Position";
                          break;
                        default:
                          break;
                      }
                      return (
                        <div className={`${Style.prizeContainer} items-center gap-2`}>
                          <img className={`${Style.coinStack} w-[30px] sm:w-[50px]`} src={image} />
                          <div className={`${Style.rank} flex flex-col sm:flex-row items-start sm:items-center justify-center relative text-left gap-2 sm:gap-5`}>
                            <span className={Style.rankText}>{rankTxt}</span>
                            <div className={Style.dd}>
                              <img className={Style.dd_icon} src={IconDD} />
                              <div className={Style.dd_value}>{currencyFormat(item, 'DD')}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={Style.imgContainer}>
                    <img src="https://derrint.sirv.com/Images/diamond-hands/event/img-eclipse.png" className={Style.imgBgEclipse} />                    
                    <img src="https://derrint.sirv.com/Images/diamond-hands/event/img-treasure-box-prize.png" className={Style.imgTreasureBox} />                    
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <Button className="is-orange is-small is-semiboldx2 is-rounded !p-0 !px-5 !py-4 text-center" href="/play">Play Now</Button>
                  <span className={Style.note}>Get a chance to win a prize!</span>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.wrapper}>
            <div className={Style.leaderboard}>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                <h2 className={Style.title}>
                  Leaderboard
                </h2>
                <span className={`inline-flex items-center ${Style.subtitle}`}>Last Update: {moment(ranks?.lastUpdate * 1000).format('DD/MM/YYYY')}</span>
              </div>
              {ranks?.weekly && (
                <Fade duration={500} delay={100}>
                  <div className={Style.other}>
                    {ranks?.weekly && ranks?.weekly.length > 0 && ranks?.weekly.map((item, i) => {
                      let rankIcon = null;
                      switch (item.rank) {
                        case 1:
                          rankIcon = IconRank1;
                          break;
                        case 2:
                          rankIcon = IconRank2;
                          break;
                        case 3:
                          rankIcon = IconRank3;
                          break;
                          
                        default:
                          break;
                      }

                      const delay = 150 + (i * 50);

                      return (
                        <Fade duration={500} bottom delay={delay} key={`list-player-${item.rank}`}>
                          <div className={Style.other_player} key={`list-player-${item.rank}`}>
                            <span>
                              {rankIcon ? (
                                <img src={rankIcon} className={Style.rankIcon} />
                              ) : (
                                <>
                                  #
                                  {item.rank}
                                </>
                              )}
                            </span>
                            <span>{item.userName}</span>
                            <span>
                              {item.battlePoint}
                              {' '}
                              BP
                            </span>
                          </div>
                        </Fade>
                      );
                    })}
                  </div>
                </Fade>
              )}
            </div>
          </div>
        {/* </div> */}
      </div>
    </section>
  );
};
export default SectionLeaderboard;
