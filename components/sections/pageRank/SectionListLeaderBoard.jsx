/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Zoom, Fade} from 'react-reveal';

import {useState} from '@overmind';
import {Button} from '@elements';
import Style from '@styles/page/pageRank/sectionListLeaderBoard.module.scss';

/* import images */
import IconCup from '@images/icon/icon-cup.png';
import IconRank1 from '@images/icon/icon-rank-1.png';
import IconRank2 from '@images/icon/icon-rank-2.png';
import IconRank3 from '@images/icon/icon-rank-3.png';

const SectionListLeaderBoard = () => {
  const {ranks, player} = useState();

  // ----- for TABS -----
  const tabs = [
    {
      id: 'weekly',
      name: 'This Week',
      items: ranks?.weekly,
      player: {
        battlePoint: player?.battlePointWeekly,
        rank: player?.rankWeekly,
      },
    },
    {
      id: 'monthly',
      name: 'This Month',
      items: ranks?.monthly,
      player: {
        battlePoint: player?.battlePointMonthly,
        rank: player?.rankMonthly,
      },
    },
    {
      id: 'alltime',
      name: 'All Time',
      items: ranks?.alltime,
      player: {
        battlePoint: player?.battlePoint,
        rank: player?.rank,
      },
    },
  ];
  const [activeTab, setActiveTab] = React.useState('weekly');
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (ranks) {
      const activeData = tabs.find((x) => x.id === activeTab);
      setData({
        ...activeData,
        items: [],
      });
      setTimeout(() => {
        setData(activeData);
      }, 20);
    }

    return () => {};
  }, [activeTab, ranks.weekly, ranks.monthly, ranks.alltime, player]);

  return (
    <section className={`mb-20 ${Style.section__listLeaderBoard}`}>
      <Zoom duration={500} bottom delay={250}>
        <div className={`container mx-auto ${Style.container}`}>
          <div className={Style.tab}>
            {tabs.map((tab, i) => {
              const activeClass = activeTab === tab.id ? Style.active : '';
              const delay = 150 + (i * 50);

              return (
                <Fade duration={500} bottom delay={delay} key={tab.id}>
                  <Button
                    key={tab.id}
                    className={`${Style.tab_item} ${activeClass}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                    }}
                  >
                    {tab.id === 'weekly' && <img src={IconCup} />}
                    <span>{tab.name}</span>
                  </Button>
                </Fade>
              );
            })}
          </div>

          <div className={Style.wrapper}>
            <div className={Style.leaderboard}>
              
              <Fade duration={500} delay={100}>
                <div className={Style.current}>
                  <span>
                    #
                    {data.player?.rank || '--'}
                  </span>
                  <span>
                    {player && data.player ? (
                      <>
                        {player.userName}
                      </>
                    ) : (
                      <div className="flex flex-row items-center">
                        You
                        <Button className="is-orange is-rounded is-extra-small is-semibold is-white-shadow ml-10">
                          Play Now
                        </Button>
                      </div>
                    )}
                  </span>
                  <span>
                    {data.player?.battlePoint || '--'}
                    {' '}
                    BP
                  </span>
                </div>
              </Fade>

              {data.items && data.items.length > 0 && (
                <Fade duration={500} delay={100}>
                  <div className={Style.other}>
                    {data.items && data.items.length > 0 && data.items.map((item, i) => {
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
        </div>
      </Zoom>
    </section>
  );
};

export default SectionListLeaderBoard;
