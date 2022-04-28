import React from 'react';

import {useState} from '@overmind/index';
import MainLayout from '@components/MainLayout';
import {
  // SectionTitle,
  SectionGameDebug,
  SectionBackdrop,
} from '@sections/pagePlay';

const Play = () => {
  const {game} = useState();
  return (
    <MainLayout>
      <main className={`page-play pt-10 flex-grow ${game.isFullScreen ? '' : 'relative'}`}>
        <SectionBackdrop />
        {/* <SectionTitle /> */}
        <SectionGameDebug />
      </main>
    </MainLayout>
  );
};

export default Play;
