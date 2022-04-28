/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionListInbox} from '@sections/pageInbox';

const Rank = () => (
  <MainLayout>
    <main className="page-leader-board flex-grow relative">
      <SectionTitle />
      <SectionListInbox />
      {/* <SectionPromotion /> */}
    </main>
  </MainLayout>
);

export default Rank;
