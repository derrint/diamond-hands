/* eslint-disable no-param-reassign */
import React from 'react';
import {Bounce, Fade} from 'react-reveal';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

const Section7Events = () => {
  const item = {
    title: 'Tournaments & Events',
    description: 'We hold community tournaments and events regularly! If you can make the top 50 on our leaderboard, you\'ll receive rewards each season!',
    image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/rank-img.png',
    images: {
      lamp: {
        left: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/lamp-left.png',
        right: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/lamp-right.png',
      },
      podium: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/podium.png',
      shine: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/shine.png',
      card: {
        first: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/card-1.png',
        second: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/card-2.png',
        third: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/card-3.png',
      },
      coin: 'https://derrint.sirv.com/Images/diamond-hands/home/section-7/coin.png',
    },
  };

  const {
    lamp, podium, shine, card, coin,
  } = item.images;

  return (
    <section className={Style.section_7_events}>
      <div className="absolute w-full h-full">
        <Fade duration={500} delay={250}>
          <img src={lamp.left} className={Style.lamp_left} />
        </Fade>
        <Fade duration={500} delay={125}>
          <img src={lamp.right} className={Style.lamp_right} />
        </Fade>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-14 sm:gap-5">
          <div className="w-full sm:w-6/12 md:w-7/12 lg:w-9/12 relative">
            <div className="flex justify-center items-center">
              <Fade duration={500} bottom delay={750}>
                <img className={Style.podium} src={podium} />
              </Fade>

              <Fade duration={750} delay={2000}>
                <img className={Style.shine} src={shine} />
              </Fade>

              <Fade duration={500} bottom delay={3500}>
                <img className={Style.coin} src={coin} />
              </Fade>
            </div>

            <Bounce top duration={500} delay={2750}>
              <div className={Style.card_first}>
                <img src={card.first} className={Style.floating} />
              </div>
            </Bounce>

            <Bounce top duration={500} delay={1500}>
              <div className={Style.card_second}>
                <img src={card.second} className={Style.floating} />
              </div>
            </Bounce>

            <Bounce top duration={500} delay={1250}>
              <div className={Style.card_third}>
                <img src={card.third} className={Style.floating} />
              </div>
            </Bounce>
          </div>
          <Fade duration={750} bottom delay={4000}>
            <div className="w-full sm:w-6/12 md:w-5/12 lg:w-3/12 bg-white rounded-3xl p-10">
              <h2 className="mb-10">{item.title}</h2>
              <p className="">{item.description}</p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Section7Events;
