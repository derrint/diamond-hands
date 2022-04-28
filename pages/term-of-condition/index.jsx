import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionContent} from '@sections/pageTermCondition';

const TermCondition = () => (
  <MainLayout>
    <main className="page-term-condition flex-grow relative">
      <SectionTitle />
      <SectionContent />
    </main>
  </MainLayout>
);

export default TermCondition;
