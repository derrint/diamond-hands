/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {withRouter, useRouter} from 'next/router';

import {useActions, useState} from '@overmind/index';
import MainLayout from '@components/MainLayout';

import {SectionBreadCrumb, SectionDetailCard} from '@sections/pageCardsDetail';

const CardDetail = () => {
  const {auth} = useState();
  const {getCardOwnedDetail} = useActions();
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id && auth.isLoggedIn) {
      const cardId = router?.query?.id[0];
      getCardOwnedDetail({cardId});
    }

    return () => {};
  }, [router.query, auth.isLoggedIn]);

  return (
    <MainLayout>
      <main className="page-shop flex-grow relative">
        <SectionBreadCrumb />
        <SectionDetailCard pageName="card-detail" isMyCard />
      </main>
    </MainLayout>
  );
};

export default withRouter(CardDetail);
