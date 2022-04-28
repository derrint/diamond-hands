import React from 'react';
import moment from 'moment';
import {currencyFormat} from '@utils/helper';
import IconDD from '@images/icon/icon-dd.png';
import IconRank1 from '@images/icon/icon-rank-1.png';
import IconRank2 from '@images/icon/icon-rank-2.png';
import IconRank3 from '@images/icon/icon-rank-3.png';
import {Fade} from 'react-reveal';
import {Button} from '@elements';

const messageDetail = ({
  message, data,
}) => {
  const prize = [
    {
      dd: data?.res?.reward1st,
      image: 'https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-1st.png',
      text: '1st Position',
    },
    {
      dd: data?.res?.reward2nd,
      image: 'https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-2nd.png',
      text: '2nd Position',
    },
    {
      dd: data?.res?.reward3rd,
      image: 'https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-3rd.png',
      text: '3rd Position',
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center gab-5 message-section">
        <p className="message-title mb-10">Prepare Yourself, New Weekly Tournament is Coming!</p>
      </div>
      {/* <div className="flex flex-col justify-center items-center mb-10">
        <p className="text-center subtitle-400">
          It’s the time of the week to win 💎
          <b>
            {data?.res?.prizePool}
            {' '}
            DD
          </b>
        </p>
      </div> */}
      {/* <div className="flex flex-col mb-10 items-center">
        <div className="prize-container">
          <div className="flex flex-row justify-between mb-5">
            <p className="text-left title-prize">
              Week
              {' '}
              {data?.res?.week}
              {' '}
              {moment().month(data?.res?.month - 1).format('MMMM')}
              {' '}
              | Leaderboard Rewards
            </p>
            <div className="date-period">
              {data?.res?.eventDate}
            </div>
          </div>
          <div className="flex flex-row justify-between items-end mb-5">
            <div className="prize-detail-container">
              {prize.map((item, i) => (
                <div className="prize-detail items-center gap-2" key={i}>
                  <img src={item.image} width="50" />
                  <div className="rank items-center gap-2">
                    <span className="text-rank">{item.text}</span>
                    <div className="dd">
                      <img className="dd-icon" src={IconDD} />
                      <div className="dd-value">{currencyFormat(item.dd, '', 'DD')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <img src="https://derrint.sirv.com/Images/diamond-hands/event/img-treasure-v2.png" width="30%" />
          </div>
        </div>
      </div> */}
      <div className="flex flex-col mb-10 items-center">
        <div className="prize-container">
          <div className="flex flex-row justify-center mb-10">
            <p className="text-left title-prize">
              Week
              {' '}
              {data?.res?.week}
              {' '}
              {moment().month(data?.res?.month - 1).format('MMMM')}
              {' '}
              {data?.res?.eventDate}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center mb-5">
            <div className="flex flex-row items-center gap-5">
              <img src="https://derrint.sirv.com/Images/diamond-hands/event/img-coin-stack-dd.png" width="50" />
              <div className="week-now items-center gap-2">
                <span className="description">
                  We cut 4% from every game to provide our 
                  weekly prize pool for <b>top 3 leaderboard</b>.
                  Secure your position now!
                </span>
              </div>
            </div>
            <div className="w-full img-container">
              <img src="https://derrint.sirv.com/Images/diamond-hands/event/img-treasure-v2.png" />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button href="/play" className="is-orange is-extra-small is-semibold is-rounded">Play the game</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-10 items-center">
        <div className="last-week-recap flex flex-col justify-center items-center">
          <h1 className="last-week-recap-title mb-10">Last week’s Recap</h1>
          <div className="flex flex-col justify-center items-center total-prize-container mb-10">
            <span className="inline-flex title">
              Total Prize {' '}
              <span className="ml-2 is-yellow">
                {data?.res?.prizePool}
                {' '}
                DD
              </span>
            </span>
            <div className="grid grid-cols-2 gap-4 my-2 mx-5">
              <span className="label">1st</span>
              <div className="dd">
                <img className="dd-icon" src={IconDD} />
                <div className="dd-value">{currencyFormat(data?.res?.reward1st, '', 'DD')}</div>
              </div>
              <span className="label">2nd</span>
              <div className="dd">
                <img className="dd-icon" src={IconDD} />
                <div className="dd-value">{currencyFormat(data?.res?.reward2nd, '', 'DD')}</div>
              </div>
              <span className="label">3rd</span>
              <div className="dd">
                <img className="dd-icon" src={IconDD} />
                <div className="dd-value">{currencyFormat(data?.res?.reward3rd, '', 'DD')}</div>
              </div>
            </div>
          </div>
          <div className="leaderboard-period">
            Last Week Leaderboard
          </div>
          <div className="leaderboard">
            <Fade duration={500} delay={100}>
              <div className="other">
                {data?.res?.lastLeaderboard?.map((item, i) => {
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
                      <div className="other_player" key={`list-player-${item.rank}`}>
                        <span>
                          {rankIcon ? (
                            <img src={rankIcon} className="rankIcon" />
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
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-10 items-center">
        <p className="text-center subtitle-400">
          This week is your chance to be our Top 3 Winner!
          <br />
          Pick your card and win the DD
        </p>
      </div>
      {/* <div className="flex flex-col justify-center items-center mb-10">
        <Button href="/play" className="is-orange is-extra-small is-semibold is-rounded">Play now</Button>
      </div> */}
      <div className="flex flex-col mb-10 items-center">
        <p className="subtitle-400 text-center">
          Still need Diamond Hands NFT to play? Grab yours from the
          {' '}
          <Button className="is-text is-nunito is-semibold" href="/shop">shop</Button>
        </p>
      </div>
    </>
  );
};
export default messageDetail;
