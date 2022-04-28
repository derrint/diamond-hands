import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionBanner, SectionListCard} from '@sections/pageShop';

const Shop = () => (
  <MainLayout>
    <main className="page-shop flex-grow relative">
      <SectionTitle />
      <SectionBanner />
      <SectionListCard />
    </main>
  </MainLayout>
);

export default Shop;
