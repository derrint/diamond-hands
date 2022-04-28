import React from 'react';
import {Zoom} from 'react-reveal';

import Style from '@styles/page/pageShop/sectionTitle.module.scss';

const SectionTitle = () => (
  <section className={`section__title text-center flex justify-center ${Style.section__title}`}>
    <Zoom duration={500} cascade delay={250}>
      <div className="container">
        <h1>Shop</h1>
        <h3>Shop Diamond Hands Lootbox to get the NFT card &amp; DD token</h3>
      </div>
    </Zoom>
  </section>
);

export default SectionTitle;
