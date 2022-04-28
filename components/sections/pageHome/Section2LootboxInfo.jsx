/* eslint-disable no-param-reassign */
import React from 'react';
import {Zoom, Fade} from 'react-reveal';

import {Button} from '@elements';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

import IconChevronCircleRight from '@images/icon/icon-chevron-circle-right-white.png';

const Section2LootboxInfo = ({isLoaded}) => {
  const item = {
    title: 'Get Your Lootbox!',
    description: 'DiamondHand lootboxes start from as low as $75. In every lootbox, you will find a special hand-crafted NFT card that will serve as your ticket to participating in Season 1 of DiamondHands! Your lootbox purchase will also mint $DD Tokens that you will use in game!',
    image: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/lootbox-img.png',
    images: {
      lootbox: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/lootbox.png',
      shine: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/shine.png',
      card: {
        top: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/card-top.png',
        right: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/card-right.png',
        bottom: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/card-bottom.png',
        left: 'https://derrint.sirv.com/Images/diamond-hands/home/section-2/card-left.png',
      },
    },
    url_caption: 'Go to Shop & purchase a Lootbox',
    url: '/shop',
  };

  const {lootbox, shine, card} = item.images;

  // #region ----- READY state -----
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      setIsReady(isLoaded);
    }

    return () => {};
  }, [isLoaded]);
  // #endregion ----- READY state -----

  return (
    <section className={Style.section_2_lootbox_info}>
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
          <Fade when={isReady} bottom cascade duration={750} delay={2250}>
            <div className="w-full sm:w-1/2 z-10">
              <h2 className="mb-10 !text-[22px] lg:!text-[24px]">{item.title}</h2>
              <p className="mb-10 !text-[16px] lg:!text-[18px]">{item.description}</p>
              <div className="flex">
                <Button href={item.url} className="flex flex-row items-center gap-5 is-rounded is-blue-light is-small is-semibold !text-[12px] lg:!text-[16px]">
                  {item.url_caption}
                  <span><img src={IconChevronCircleRight} className="w-8" /></span>
                </Button>
              </div>
            </div>
          </Fade>
          <div className="w-full sm:w-1/2 relative">
            <Fade when={isReady} duration={500} right delay={0}>
              <img className={Style.lootbox} src={lootbox} />
            </Fade>

            <Fade when={isReady} duration={500} delay={500}>
              <img className={Style.shine} src={shine} />
            </Fade>

            <Zoom when={isReady} duration={500} delay={1000}>
              <div className={Style.card_top}>
                <img className={Style.floating} src={card.top} />
              </div>
            </Zoom>

            <Zoom when={isReady} duration={500} delay={1250}>
              <div className={Style.card_left}>
                <img className={Style.floating} src={card.left} />
              </div>
            </Zoom>

            <Zoom when={isReady} duration={500} delay={1500}>
              <div className={Style.card_right}>
                <img className={Style.floating} src={card.right} />
              </div>
            </Zoom>

            <Zoom when={isReady} duration={500} delay={1750}>
              <div className={Style.card_bottom}>
                <img className={Style.floating} src={card.bottom} />
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2LootboxInfo;
