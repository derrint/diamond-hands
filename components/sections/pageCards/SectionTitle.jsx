import React from 'react';
import {Zoom} from 'react-reveal';

import Style from '@styles/page/pageCards/sectionTitle.module.scss';

const SectionTitle = ({title, subtitle}) => (
  <section className={`section__title text-center ${Style.section__title}`}>
    <Zoom duration={500} delay={250}>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </Zoom>
  </section>
);

export default SectionTitle;
