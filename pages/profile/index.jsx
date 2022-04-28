import React from 'react';
import MainLayout from '@components/MainLayout';

import {
  SectionTitle, SectionInformation, SectionPromotion,
} from '@sections/pageProfile';

const Profile = () => (
  <MainLayout>
    <main className="page-profile flex-grow relative">
      <SectionTitle />
      <SectionInformation />
      <SectionPromotion />
    </main>
  </MainLayout>
);

export default Profile;
