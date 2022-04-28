/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Zoom} from 'react-reveal';
import Style from '@styles/page/pageInbox/sectionTitle.module.scss';

const SectionTitle = () => (
  <section className={`section__title text-center ${Style.section__title}`}>
    <Zoom duration={500} delay={250}>
      <h1>Inbox</h1>
    </Zoom>
  </section>
);

export default SectionTitle;
