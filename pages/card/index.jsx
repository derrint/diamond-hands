import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionListCard} from '@sections/pageCards';

const Cards = () => (
  <MainLayout>
    <main className="page-cards flex-grow relative">
      <SectionTitle title="My Cards" />
      {/* <SectionFilter pageName="card" /> */}
      <SectionListCard pageName="card" isMyCard />
    </main>
  </MainLayout>
);

export default Cards;
