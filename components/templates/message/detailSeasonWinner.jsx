/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Fade} from 'react-reveal';
import {Button} from '@elements';
import {useState} from '@overmind';
import {Config} from '@constant';
import {currencyFormat} from '@utils/helper';

const messageDetail = ({
  data,
}) => {
  const {player} = useState();
  const myUser = data?.res?.leaderboard.find((o) => o.username === player?.userName);
  return (
    <>
      <div className="flex justify-center items-center gab-5 message-section">
        <p className="message-title mb-10">Congrats! Claim Your Rewards Now 💎</p>
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <p className="text-center subtitle-400">
          You’re on the last week’s top 3 position!
          <br />
          We guess the real champion is born...
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <p className="text-center subtitle-400">
          Claim the prize pool and keep playing!!
        </p>
      </div>
      <div className="flex flex-col mb-10 items-center">
        <Fade duration={500} delay={100}>
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col justify-center items-center player-container">
              <div className="flex flex-col player no-first">
                <div className="flex justify-center items-center">
                  <div className={player.userName === data?.res?.leaderboard[1]?.username ? 'image-cover-mine' : 'image-cover'}>
                    <img className="mx-auto" width="50" src={Config.baseURL + data?.res?.leaderboard[1]?.avatar} />
                  </div>
                </div>
                <span className={player.userName === data?.res?.leaderboard[1]?.username ? 'player-name-mine' : 'player-name'}>{data?.res?.leaderboard[1]?.username}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center player-container">
              <div className="flex flex-col player">
                <div className="flex justify-center items-center">
                  <div className={player.userName === data?.res?.leaderboard[0]?.username ? 'image-cover-mine' : 'image-cover'}>
                    <img className="mx-auto" width="50" src={Config.baseURL + data?.res?.leaderboard[0]?.avatar} />
                  </div>
                </div>
                <span className={player.userName === data?.res?.leaderboard[0]?.username ? 'player-name-mine' : 'player-name'}>{data?.res?.leaderboard[0]?.username}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center player-container">
              <div className="flex flex-col player no-first">
                <div className="flex justify-center items-center">
                  <div className={player.userName === data?.res?.leaderboard[2]?.username ? 'image-cover-mine' : 'image-cover'}>
                    <img className="mx-auto" width="50" src={Config.baseURL + data?.res?.leaderboard[2]?.avatar} />
                  </div>
                </div>
                <span className={player.userName === data?.res?.leaderboard[2]?.username ? 'player-name-mine' : 'player-name'}>{data?.res?.leaderboard[2]?.username}</span>
              </div>
            </div>
            {/* {data?.res?.leaderboard.map((item, i) => {
              const itsme = player.userName === item.userName;
              return (
                <div className="flex flex-col justify-center items-center player" key={i}>
                  <div className={itsme ? 'image_-cover-mine' : 'image_-cover'}>
                    <img className="mx-auto" src={Config.baseURL + item?.avatar} />
                  </div>
                  <span className={itsme ? 'player-name-mine' : 'player-name'}>{item.userName}</span>
                </div>
              );
            })} */}
          </div>
          <img src="https://derrint.sirv.com/Images/diamond-hands/img-podium.png" className="img-podium" />
          <div className="flex w-full reward-container">
            <div className="grid grid-cols-3 w-full">
              <div className="flex flex-col justify-center items-center">
                <span className="player-reward">{currencyFormat(data?.res?.leaderboard[1]?.diadReward, '', 'DD')}</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="player-reward firt">{currencyFormat(data?.res?.leaderboard[0]?.diadReward, '', 'DD')}</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="player-reward">{currencyFormat(data?.res?.leaderboard[2]?.diadReward, '', 'DD')}</span>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <Button
          href="/play"
          className="is-orange is-extra-small is-semibold is-rounded"
          isDisabled={myUser?.claimedAt > 0}
        >
          Claim Reward
        </Button>
      </div>
    </>
  );
};
export default messageDetail;
