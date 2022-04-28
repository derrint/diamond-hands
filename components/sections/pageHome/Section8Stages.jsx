/* eslint-disable no-param-reassign */
import React from 'react';
import {Fade} from 'react-reveal';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

const Section8Stages = () => {
  const item = {
    title: 'Different Stages to Choose From',
    description: `As you play, you'll gain access to higher stages of play. The higher the stage, the higher the rewards! Do you have what it takes to make it to Stage 10?`,
    image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stages-img.png',
    stages: [
      {
        text: '10 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-1.png',
      },
      {
        text: '50 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-2.png',
      },
      {
        text: '100 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-3.png',
      },
      {
        text: '500 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-4.png',
      },
      {
        text: '1,000 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-5.png',
      },
      {
        text: '5,000 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-6.png',
      },
      {
        text: '10,000 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-7.png',
      },
      {
        text: '100,000 DD',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-8.png',
      },
      {
        text: '',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-9.png',
      },
      {
        text: '',
        image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-8/stage-10.png',
      },
    ]
  };

  return (
    <section className={Style.section_8_stages}>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row  items-center justify-between gap-14 sm:gap-5">
          <div className="w-full sm:w-6/12 md:w-7/12 lg:w-9/12 flex justify-center items-center">
            <div className="grid grid-cols-5 gap-8 w-[80%]">
              {item.stages.map((stage, idx) => {
                return (
                  <Fade left duration={500} delay={250 + (idx * 150)}>
                    <div key={idx} className="flex flex-col justify-between gap-3">
                      <img src={stage.image} className={`${Style.stage_image} ${idx === 2 ? ' -mt-4 -mb-5 ' : ''}`} />
                      <div className={`${Style.stage_text} ${idx === 2 ? ' text-[#1FAA46] ' : ' text-white '}`}>{stage.text}</div>
                    </div>
                  </Fade>
                )
              })}
            </div>
          </div>
          <Fade duration={750} bottom delay={2250}>
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

export default Section8Stages;
