import React from 'react';
import MainLayout from '@components/MainLayout';

import {SectionTitle, SectionListEvent, SectionLeaderboardSeason} from '@sections/pageEvent';

const Event = () => (
  <MainLayout>
    <main className="page-event flex-grow relative">
      <SectionTitle title="Season 1 Game Rank" backdrop />
      <SectionLeaderboardSeason />
      <SectionTitle title="Events" backdrop={false} />
      <SectionListEvent />
    </main>
  </MainLayout>
);

export default Event;
