import React from 'react';
import {Zoom} from 'react-reveal';

import Style from '@styles/page/pageEvent/sectionTitle.module.scss';

const SectionTitle = ({title, backdrop}) => (
  <section className={`section__title text-center ${Style.section__title} ${!backdrop ? Style.backdrop : ''}`}>
    <Zoom duration={500} delay={250}>
      <h1>{title}</h1>
    </Zoom>
  </section>
);

export default SectionTitle;
