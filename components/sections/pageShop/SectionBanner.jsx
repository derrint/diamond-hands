import React from 'react';
import {Zoom} from 'react-reveal';
import {Slider} from '@modules';

import Style from '@styles/page/pageShop/sectionBanner.module.scss';

const SectionFilter = () => {
  const banners = [
    // 'https://derrint.sirv.com/Images/diamond-hands/banner/banner-ssr-lto.png',
    // 'https://derrint.sirv.com/Images/diamond-hands/banner/banner-ssr-lto.png',
  ];
  
  return (
    <section className={Style.section__filter}>
      <Zoom duration={500} bottom delay={350}>
        <div className={`container mx-auto ${Style.container}`}>
          <Slider
            assets={banners}
            autoPlay
            thumbnail={false}
            pagination={{clickable: true}}
            className={Style.section__banner}
          />
        </div>
      </Zoom>
    </section>
  );
};

export default SectionFilter;
