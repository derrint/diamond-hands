/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {withRouter, useRouter} from 'next/router';

import {useActions, useState} from '@overmind/index';
import MainLayout from '@components/MainLayout';

import {SectionBreadCrumb, SectionDetailLootbox} from '@sections/pageShopDetail';

const ShopDetail = () => {
  const {lootboxes} = useState();
  const {selectLootbox, getLootboxList} = useActions();
  const router = useRouter();
  
  React.useEffect(() => {
    // ----- TEMPORARY -----
    if (lootboxes.all === null) {
      getLootboxList({sorted: false});
    }
    // ----- end of TEMPORARY -----
    
    return () => {};
  }, []);

  React.useEffect(() => {
    if (router.query.id && lootboxes.all) {
      // const lootboxId = parseInt(router?.query?.id[0], 10);
      const lootboxId = router?.query?.id[0];
      const lootbox = lootboxes.all.find((x) => x.id === lootboxId);
      selectLootbox(lootbox);
    }

    return () => {};
  }, [router.query, lootboxes.all]);

  return (
    <MainLayout>
      <main className="page-shop flex-grow relative">
        <SectionBreadCrumb />
        <SectionDetailLootbox />
      </main>
    </MainLayout>
  );
};

export default withRouter(ShopDetail);
