import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionFilter, SectionListCard} from '@sections/pageCards';

const Cards = () => (
  <MainLayout>
    <main className="page-cards flex-grow relative">
      <SectionTitle title="Cards" subtitle="Browse all Diamond Hands NFT Cards Collection" />
      <SectionFilter pageName="cards" />
      <SectionListCard isVideo pageName="cards" />
    </main>
  </MainLayout>
);

export default Cards;
