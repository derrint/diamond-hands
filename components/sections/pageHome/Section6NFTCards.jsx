/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React from 'react';
import {Zoom, Fade, Bounce} from 'react-reveal';
import Flash from 'react-reveal/Flash';
import {TiArrowUpThick} from 'react-icons/ti';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

const Section6NFTCards = () => {
  const item = {
    title: 'Smart Contract NFT Cards!',
    description: 'Our NFTs level up as you play! As your cards level up, the quests will reap more of a challenge and more of a reward! You can buy & sell our NFTs over at the marketplace!',
    image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/card-img.png',
    images: {
      card: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/card-chef-paper.png',
      cardProperty: {
        topLeft: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/card-property-top-left.png',
        topRight: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/card-property-top-right.png',
        bottomLeft: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/card-property-bottom-left.png',
        bottomRight: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/card-property-bottom-right.png',
      },
      cloud: {
        bottomLeft: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/cloud-bottom-left.png',
        bottomCenter: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/cloud-bottom-center.png',
        bottomRight: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/cloud-bottom-right.png',
        topLeft: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/cloud-top-left.png',
        topRight: 'https://derrint.sirv.com/Images/diamond-hands/home/section-6/cloud-top-right.png',
      },
    },
  };

  const {card, cardProperty, cloud} = item.images;

  const texts = [
    {
      level: '2',
      exp: '1025',
      mintStrength: '0.7~0.9',
    },
    {
      level: '5',
      exp: '2379',
      mintStrength: '1.1~1.3',
    },
    {
      level: '7',
      exp: '5120',
      mintStrength: '2.4~2.6',
    },
  ];

  const [text, setText] = React.useState(texts[0]);

  let i = 0;
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      setText(texts[i]);
      if (i < (texts.length - 1)) {
        i++;
      } else {
        i = 0;
      }
    },
    3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className={Style.section_6_nft_cards}>
      <div className={Style.cloud_wrapper}>
        <Fade duration={1000} left delay={250}>
          <img src={cloud.topLeft} className={Style.cloud_top_left} />
        </Fade>
        <Fade duration={1000} right delay={600}>
          <img src={cloud.topRight} className={Style.cloud_top_right} />
        </Fade>
        <Fade duration={1000} left delay={500}>
          <img src={cloud.bottomLeft} className={Style.cloud_bottom_left} />
        </Fade>
        <Fade duration={1000} right delay={350}>
          <img src={cloud.bottomRight} className={Style.cloud_bottom_right} />
        </Fade>

        <img src={cloud.bottomCenter} className={Style.cloud_bottom_center} />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-14 sm:gap-5">
          <div className="w-full sm:w-6/12 md:w-7/12 lg:w-9/12 relative">
            <div className="flex justify-center items-center">
              <Zoom duration={750} bottom delay={1000}>
                <img src={card} className={Style.card} />
              </Zoom>
            </div>
            <Bounce duration={750} top delay={1500}>
              <div className={Style.card_top_left}>
                <img src={cardProperty.topLeft} className={Style.floating} />
              </div>
            </Bounce>
            <Bounce duration={750} top delay={1750}>
              <div className={Style.card_top_right}>
                <img src={cardProperty.topRight} className={Style.floating} />
              </div>
            </Bounce>
            <Bounce duration={750} top delay={2000}>
              <div className={Style.card_bottom_left}>
                <img src={cardProperty.bottomLeft} className={Style.floating} />
              </div>
            </Bounce>
            <Bounce duration={750} top delay={2250}>
              <div className={Style.card_bottom_right}>
                {/* <img src={cardProperty.bottomRight} /> */}
                <div className={Style.info}>
                  <div>
                    <div className={Style.label}>
                      Level
                    </div>
                    <div className="flex">
                      <Flash spy={text.level}>
                        <TiArrowUpThick size={20} color="#68CC58" />
                      </Flash>
                      {/* <Fade top spy={text.level} duration={250}> */}
                      <div className={Style.value}>
                        {text.level}
                      </div>
                      {/* </Fade> */}
                    </div>
                  </div>
                  <div>
                    <div className={Style.label}>
                      EXP
                    </div>
                    <div className="flex">
                      <Flash spy={text.exp}>
                        <TiArrowUpThick size={20} color="#68CC58" />
                      </Flash>
                      {/* <Fade top spy={text.exp} delay={250} duration={250}> */}
                      <div className={Style.value}>
                        {text.exp}
                      </div>
                      {/* </Fade> */}
                    </div>
                  </div>
                  <div>
                    <div className={Style.label}>
                      Mint Strength
                    </div>
                    <div className="flex">
                      <Flash spy={text.mintStrength}>
                        <TiArrowUpThick size={20} color="#68CC58" />
                      </Flash>
                      {/* <Fade top spy={text.mintStrength} delay={500} duration={250}> */}
                      <div className={Style.value}>
                        {text.mintStrength}
                      </div>
                      {/* </Fade> */}
                    </div>
                  </div>
                </div>
              </div>
            </Bounce>
          </div>
          <Fade duration={750} bottom delay={3000}>
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

export default Section6NFTCards;
