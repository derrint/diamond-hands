/* eslint-disable no-param-reassign */
import React from 'react';
import {Fade} from 'react-reveal';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

const Section4GameRule = () => {
  const item = {
    title: 'Classic Rock Paper Scissors',
    description: 'Rules are simple! Paper beats Rock, Rock beats Scissors, Scissors beats Paper. You\'ll find real time opponents from around the world! There is always someone looking to play!',
    image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-4/gameplay.gif',
  };

  return (
    <section className={Style.section_4_game_rule}>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-14 sm:gap-5">
          <div className="w-full sm:w-6/12 md:w-7/12 lg:w-9/12 flex justify-center items-center">
            <div className={Style.imageWrapper}>
              <Fade duration={500} left delay={250}>
                <img src={item.image} className={`${Style.image} rounded-[25px] sm:rounded-[40px]`} />
              </Fade>
            </div>
          </div>
          <Fade duration={750} bottom delay={750}>
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

export default Section4GameRule;
