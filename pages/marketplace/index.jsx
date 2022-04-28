import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionFilter, SectionListCard} from '@sections/pageCards';

const MarketPlace = () => (
  <MainLayout>
    <main className="page-marketplace flex-grow relative">
      <SectionTitle title="Marketplace" subtitle="Buy Diamond Hands Card from Others" />
      <SectionFilter pageName="marketplace" />
      <SectionListCard isMarketplace pageName="marketplace" />
    </main>
  </MainLayout>
);

export default MarketPlace;
