import React from 'react';
import {Zoom} from 'react-reveal';

import Style from '@styles/page/pageLearn/sectionTitle.module.scss';

const SectionTitle = () => (
  <section className={`section__title text-center my-20 ${Style.section__title}`}>
    <Zoom duration={500} delay={250}>
      <h1>Introduction to Diamond Hands</h1>
    </Zoom>
  </section>
);

export default SectionTitle;
