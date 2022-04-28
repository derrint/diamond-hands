/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import moment from 'moment';
import Countdown, {zeroPad} from 'react-countdown';
import {Zoom} from 'react-reveal';

import {useActions, useState} from '@overmind';
import {Button} from '@elements';
import {Modal} from '@modules';
import Style from '@styles/page/pageRank/sectionTitle.module.scss';

import IconRank1 from '@images/icon/icon-rank-1.png';
import IconRank2 from '@images/icon/icon-rank-2.png';
import IconRank3 from '@images/icon/icon-rank-3.png';
import IconTreasure from '@images/icon/icon-treasure.png';
import IconInfo from '@images/icon/icon-info.png';

const SectionTitle = () => {
  const {ranks, modal} = useState();
  const {showModal, hideModal} = useActions();
  const {start, end} = ranks;

  const startDate = moment(start * 1000).utc().format('YYYY/MM/DD');
  const endDate = moment(end * 1000).utc().format('YYYY/MM/DD');

  // Renderer callback with condition
  const renderer = ({
    days, hours, minutes, seconds, completed,
  }) => {
    if (completed) {
      // Render a completed state
      return null;
    }
    // Render a countdown
    return (
      <h3 className={Style.countdown}>
        Time remaining :
        <span>
          {` ${days} days ${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
        </span>
      </h3>
    );
  };

  const expiredDate = end * 1000;

  const localStyle = {
    modalWrapper: {
      fontFamily: 'Nunito',
      fontSize: '1.42rem',
      fontWeight: 600,
      fontStyle: 'normal',
      textTransform: 'none',
      color: '#0C353B',
      // background: '#FDFADC',
      width: 400,
      lineHeight: '24px',
    },
    h2: {
      fontFamily: 'G8321',
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'G8321',
      fontSize: '1.4rem',
      fontWeight: 700,
      marginTop: 16,
      marginBottom: 8,
    },
    ul: {
      listStyle: 'disc',
      paddingLeft: 20,
    },
    ol: {
      listStyle: 'lower-alpha',
      paddingLeft: 20,
    },
  };

  return (
    <section className={`section__title text-center my-20 ${Style.section__title}`}>
      <Zoom duration={500} delay={250}>
        <h1>Leaderboard</h1>
      </Zoom>
      <Zoom duration={500} delay={350}>
        <h2 className="mt-10 mb-1">This Week</h2>
        <h3 className="mb-5">
          GMT
          {' '}
          {startDate}
          {' '}
          -
          {endDate}
        </h3>
        
        <Countdown
          date={expiredDate}
          renderer={renderer}
        />
        
      </Zoom>
      
      <Zoom duration={500} top delay={500}>
        <div className="my-10 flex justify-center">
          <div className={Style.reward}>
            <img className={Style.iconTreasure} src={IconTreasure} />
            <div className="flex flex-row items-center">
              <h4 className="text-left mr-5">Weekly Reward</h4>
              <div>
                <Button
                  onClick={() => {
                    showModal('weekly-reward');
                  }}
                >
                  <img src={IconInfo} style={{width: '20px'}} alt="" />
                </Button>
              </div>
            </div>
            <h5 className="text-left">Only top 3 will get the reward</h5>
            <div className={`flex flex-row ${Style.prizeWrapper}`}>
              {ranks.prize && ranks.prize.map((item, index) => {
                const ddPrizeAmount = item;
                let ddPrizeImage = null;
                switch (index) {
                  case 0:
                    ddPrizeImage = IconRank1;
                    break;
                  case 1:
                    ddPrizeImage = IconRank2;
                    break;
                  case 2:
                    ddPrizeImage = IconRank3;
                    break;
                
                  default:
                    ddPrizeImage = IconRank1;
                    break;
                }

                return (
                  <div key={index} className={Style.prize}>
                    <img src={ddPrizeImage} />
                    <span>
                      {ddPrizeAmount}
                      {' '}
                      DD
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Zoom>

      <Modal
        show={modal.isVisible && modal.type === 'weekly-reward'}
        onClose={() => hideModal()}
      >
        <div style={localStyle.modalWrapper}>
          <h2 style={localStyle.h2}>Weekly Reward</h2>
          <h3 style={localStyle.h3}>Rules</h3>
          <ul style={localStyle.ul}>
            <li>Cut-off time every Sunday, 23:59 GMT+0</li>
            <li>
              Assign $DIH to Top 3 Ranking on Leaderboard
              <ol style={localStyle.ol}>
                <li>Total Prize = number of Players who played 3 match during the week period x 10 $DIH</li>
                <li>$DIH rewards distribution 50%:30%:20%</li>
              </ol>
            </li>
            <li>
              E.g. Today is Wednesday, and there's 1000 players who at least played 3 match, so the calculation is
              <ol style={localStyle.ol}>
                <li>1000 x 10 = 10,000 DIH as Total Prize</li>
                <li>5,000 : 3,000 : 2,000 DIH distribution</li>
              </ol>
            </li>
          </ul>
        </div>
      </Modal>
      
    </section>
  );
};

export default SectionTitle;
