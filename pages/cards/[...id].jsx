/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {withRouter, useRouter} from 'next/router';

import {useActions, useState} from '@overmind/index';
import MainLayout from '@components/MainLayout';

import {SectionBreadCrumb, SectionDetailCard} from '@sections/pageCardsDetail';

const CardDetail = () => {
  const {cards} = useState();
  const {getCardData} = useActions();
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id) {
      const skinId = router?.query?.id[0];
      getCardData({skinId});
    }

    return () => {};
  }, [router.query, cards.all]);

  return (
    <MainLayout>
      <main className="page-shop flex-grow relative">
        <SectionBreadCrumb />
        <SectionDetailCard pageName="cards-detail" />
      </main>
    </MainLayout>
  );
};

export default withRouter(CardDetail);
