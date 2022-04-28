import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionContent} from '@sections/pageLearn';

const Learn = () => (
  <MainLayout className="mode--dark">
    <main className="page-how-to-play flex-grow relative">
      <SectionTitle />
      <SectionContent />
    </main>
  </MainLayout>
);

export default Learn;
