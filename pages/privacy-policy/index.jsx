import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionContent} from '@sections/pagePrivacyPolicy';

const PrivacyPolicy = () => (
  <MainLayout>
    <main className="page-privacy-policy flex-grow relative">
      <SectionTitle />
      <SectionContent />
    </main>
  </MainLayout>
);

export default PrivacyPolicy;
