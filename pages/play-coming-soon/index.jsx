import React from 'react';

import MainLayout from '@components/MainLayout';
import {
  // SectionTitle,
  // SectionGame,
  SectionComingSoon,
} from '@sections/pagePlay';

const Play = () => (
  <MainLayout>
    <main className="page-play flex-grow relative">
      <SectionComingSoon />
      {/* <SectionTitle />
      <SectionGame /> */}
    </main>
  </MainLayout>
);

export default Play;
