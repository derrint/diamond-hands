/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Router from 'next/router';
// import {Zoom} from 'react-reveal';
// import {isDesktop} from 'react-device-detect';
import {toast} from 'react-toastify';
import {Fade} from 'react-reveal';
import Pulse from 'react-reveal/Pulse';

import {useActions, useState} from '@overmind/index';
import {CardLootbox, CardDetail} from '@templates';
import {Modal} from '@modules';
import {Button} from '@elements';
import {getSlug} from '@utils/helper';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

// import lootboxes from '@data/dummy/lootboxes.json';

const SectionListCard = () => {
  const {modal, cards, lootboxes} = useState();
  const {
    hideModal, getLootboxList,
  } = useActions();

  React.useEffect(() => {
    getLootboxList({limit: 3})
      .catch(() => {
        toast.error('Oops, unable to fetch data. Please try again in a few moments.');
      });

    return () => {};
  }, []);

  const [lootboxesHome, setLootboxesHome] = React.useState([]);
  React.useEffect(() => {
    if (lootboxes.all) {
      const lbHome = lootboxes.all.filter((x) => x.expiredAt === 0);
      const lbHomeSliced = lbHome.slice(0, 3);
      setLootboxesHome(lbHomeSliced);
    }

    return () => {};
  }, [lootboxes.all]);

  return (
    <section className={Style.section_9_lootbox_list}>
      <div className="container mx-auto flex flex-col items-center">
        <Fade duration={500} top delay={0}>
          <h1 className="text-center mb-10 mt-5">Choose & open your lootbox</h1>
        </Fade>

        <div className={Style.cardWrapper}>
          {lootboxesHome.length > 0 && lootboxesHome.map((item) => (
            <div className="flex justify-center items-center" key={`card-${item.id}`}>
              <CardLootbox
                key={`card-${item.id}`}
                data={item}
                buttonAction={() => {
                  const href = `/shop/${item.id}/${getSlug(item.name)}`;
                  Router.push(href);
                }}
                className="!max-w-[240px]"
                cardContentClassName="!p-2"
              />
            </div>
          ))}
        </div>

        <Fade duration={500} bottom delay={1000}>
          <Pulse forever>
            <div className={`flex justify-center ${Style.buttonWrapper}`}>
              <Button
                href="/shop"
                className="is-orange is-medium is-rounded is-semibold is-white-shadow inline-flex items-center mt-10 mb-5"
              >
                <div className="px-5">See all lootboxes</div>
              </Button>
            </div>
          </Pulse>
        </Fade>
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'card-detail'}
        onClose={() => hideModal()}
      >
        <CardDetail
          data={cards.selected}
          isAutoPlay
          hasThumbnail
        />
      </Modal>
    </section>
  );
};

export default SectionListCard;
