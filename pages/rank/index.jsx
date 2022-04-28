/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout from '@components/MainLayout';

import {useActions} from '@overmind';
import {SectionTitle, SectionListLeaderBoard} from '@sections/pageRank';
import {SectionPromotion} from '@sections/pageHome';

const Rank = () => {
  const {getRankList} = useActions();

  const rankTypes = ['weekly', 'monthly', 'alltime'];

  React.useEffect(() => {
    rankTypes.forEach((r) => {
      getRankList({
        type: r,
        limit: 15,
        offset: 0,
      });
    });

    return () => {};
  }, []);
  
  return (
    <MainLayout>
      <main className="page-leader-board flex-grow relative">
        <SectionTitle />
        <SectionListLeaderBoard />
        <SectionPromotion />
      </main>
    </MainLayout>
  );
};

export default Rank;
