/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {withRouter, useRouter} from 'next/router';

import {useActions} from '@overmind/index';
import MainLayout from '@components/MainLayout';

import {SectionBreadCrumb, SectionDetailCard} from '@sections/pageCardsDetail';

const CardDetail = () => {
  const {getMarketplaceCardDetail} = useActions();
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id) {
      const cardId = router?.query?.id[0];
      getMarketplaceCardDetail({cardId});
    }

    return () => {};
  }, [router.query]);

  return (
    <MainLayout>
      <main className="page-shop flex-grow relative">
        <SectionBreadCrumb />
        <SectionDetailCard isMarketplace pageName="marketplace-detail" />
      </main>
    </MainLayout>
  );
};

export default withRouter(CardDetail);
