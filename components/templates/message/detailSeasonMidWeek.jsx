/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import IconRank1 from '@images/icon/icon-rank-1.png';
import IconRank2 from '@images/icon/icon-rank-2.png';
import IconRank3 from '@images/icon/icon-rank-3.png';
import {Fade} from 'react-reveal';
import {Button} from '@elements';
import {useState} from '@overmind';
import moment from 'moment';

const messageDetail = ({
  message, data,
}) => {
  const {player} = useState();
  const [isUserOnLeaderBoard, setIsUserOnLeaderBoard] = React.useState(false);

  React.useEffect(() => {
    const userFiltered = data?.res?.leaderboard.find((o) => o.userName === player?.userName);
    if (userFiltered) {
      setIsUserOnLeaderBoard(true);
    }
    return () => {};
  }, []);
  return (
    <>
      <div className="flex justify-center items-center gab-5 message-section">
        <p className="message-title mb-10">{isUserOnLeaderBoard ? 'You\'re on This Week\'s Leaderboard!' : 'This Week Leaderboard is 🔥'}</p>
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        {isUserOnLeaderBoard ? (
          <p className="text-center subtitle-400">
            Hi champ!
            <br />
            This week's leaderboard will end in the next few days.
            <br />
            You're very close to victory.. so what are you waiting for?
            <br />
            Hold your position & claim the prize pool at the end of the week.
          </p>
        ) : (
          <p className="text-center subtitle-400">
            Hi champ!
            <br />
            This week's leaderboard will end in the next few days.
            <br />
            You're very close to victory.. so what are you waiting for?
            <br />
            Let’s step up your card & BP!
          </p>
        )}
      </div>
      <div className="flex flex-col mb-10 items-center">
        <div className="leaderboard-period is-orange-bg">
          Week
          {' '}
          {data?.res?.week}
          {' '}
          {moment().month(data?.res?.month - 1).format('MMMM')}
          {' '} Leaderboard • {data?.res?.eventDate}
          {!isUserOnLeaderBoard && (
            <>
              <br />
              <p className="duration">
                {data?.res?.daysRemaining}
                {' '}
                days to go!
              </p>
            </>
          )}
        </div>
        <div className="leaderboard">
          <Fade duration={500} delay={100}>
            <div className="other">
              {data?.res?.leaderboard?.map((item, i) => {
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
                    <div className={item.userName === player.userName ? 'other_player mark-my-user' : 'other_player'} key={`list-player-${item.rank}`}>
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
      <div className="flex flex-col justify-center items-center mb-10">
        <Button href="/play" className="is-orange is-extra-small is-semibold is-rounded">Play now</Button>
      </div>
      {!isUserOnLeaderBoard && (
        <div className="flex flex-col mb-10 items-center">
          <p className="subtitle-400 text-center">
            Still need Diamond Hands NFT to play? Grab yours from the
            {' '}
            <Button className="is-text is-nunito is-semibold" href="/shop">shop</Button>
          </p>
        </div>
      )}
    </>
  );
};
export default messageDetail;
