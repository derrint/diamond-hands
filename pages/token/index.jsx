import React from 'react';

import MainLayout from '@components/MainLayout';
import {
  SectionInformation,
} from '@sections/pageToken';

const Home = () => (
  <MainLayout>
    <main className="page-token flex-grow relative">
      <SectionInformation />
    </main>
  </MainLayout>
);

export default Home;
