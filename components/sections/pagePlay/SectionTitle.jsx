import React from 'react';
import {Zoom} from 'react-reveal';

import {useState} from '@overmind/index';
import Style from '@styles/page/pageCards/sectionTitle.module.scss';

const SectionTitle = () => {
  const {cards} = useState();
  
  return (
    <section className={`section__title text-center my-20 ${Style.section__title}`}>
      {cards.owned && (
        <Zoom duration={500} delay={250}>
          <h1 className="pt-14">Play Game</h1>
        </Zoom>
      )}
    </section>
  );
};

export default SectionTitle;
