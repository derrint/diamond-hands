import React from 'react';
import {Zoom} from 'react-reveal';
import {Button} from '@elements';

import Style from '@styles/page/pagePlay/sectionComingSoon.module.scss';

const SectionTitle = () => (
  <section className={`text-center my-20 ${Style.section__comingsoon}`}>
    <div className={`container mx-auto ${Style.container}`}>
      <Zoom duration={500} delay={250}>
        <h1>
          Get ready for the Rock Paper Scissor battle
          <br />
          in Diamond Hands Metaverse
        </h1>
        <div className={`flex justify-center ${Style.banner}`}>
          <img src="https://derrint.sirv.com/Images/diamond-hands/play/banner-play-comingsoon.webp" />
        </div>
        <span className={Style.text}>
          To begin your Diamond Hands journey, you need at least 1 NFT Card.
          <br />
          Purchase a lootbox & claim your cards!
        </span>
        <div className="mt-20 mb-16">
          <Button
            href="/shop"
            className="is-blue-light is-small is-semibold is-rounded"
          >
            Lootbox Shop
          </Button>
        </div>
        <div>
          <Button
            href="/learn"
            className={Style.btnText}
          >
            Learn more about game
          </Button>
        </div>
      </Zoom>
    </div>
  </section>
);

export default SectionTitle;
