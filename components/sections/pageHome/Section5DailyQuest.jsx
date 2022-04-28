/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React from 'react';
import {Fade} from 'react-reveal';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

const Section5DailyQuest = () => {
  const item = {
    title: 'Daily Quests!',
    description: 'Earn $DD rewards from the NFT cards that you own! There are daily quests available for all rarities and all levels!',
    image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-5/badge.png',
  };

  const cards = [
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-1.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-2.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-3.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-4.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-5.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-6.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-5/Quest-7.png',
  ];

  return (
    <section className={Style.section_5_daily_quest}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-5">
          <Fade top duration={500} bottom delay={250}>
            <img src={item.image} className="w-96 -mb-10" />
          </Fade>
          <Fade duration={500} top delay={2250}>
            <p className="w-full sm:w-8/12 lg:w-5/12 text-center">{item.description}</p>
          </Fade>
          <div className="h-[40vh]" />
          <div className="flex items-center justify-center gap-5 mt-[30vh] absolute">
            {cards.map((card, idx) => (
              <Fade key={idx} duration={500} bottom cascade delay={500 + (idx * 150)}>
                <img src={card} className={`w-[15%] hover:w-[20%] transition-all duration-300 ${idx === 0 ? 'hover:ml-[300px]' : idx === cards.length - 1 ? 'hover:mr-[300px]' : ''} `} />
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5DailyQuest;
