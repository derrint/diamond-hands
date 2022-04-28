/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Router from 'next/router';
import {Zoom} from 'react-reveal';
import {Modal} from '@modules';
import {Button} from '@elements';

import {useActions, useState} from '@overmind/index';
import {CardLootbox, CardDetail} from '@templates';
import {getSlug} from '@utils/helper';
import ImgNoLootbox from '@images/banner/img-no-lootbox.png';

import Style from '@styles/page/pageShop/sectionListCard.module.scss';

// import lootboxes from '@data/dummy/lootboxes.json';

const SectionListCard = () => {
  const {
    modal, cards, lootboxes,
  } = useState();
  const {
    hideModal, getLootboxList, showModal,
  } = useActions();
  React.useEffect(() => {
    getLootboxList({sorted: false}).then((res) => {
      if (!res || res.length === 0) {
        showModal('no-lootbox');
      }
    });

    return () => {};
  }, []);

  return (
    <section className={`mt-20 mb-20 ${Style.section__listCard}`}>
      <Zoom duration={500} bottom delay={500}>
        <div className={`container mx-auto ${Style.container}`}>
          {lootboxes.all && lootboxes.all.map((item) => (
            <div className="flex justify-center items-center" key={`card-${item.id}`}>
              <CardLootbox
                data={item}
                buttonAction={() => {
                  const href = `/shop/${item.id}/${getSlug(item.name)}`;
                  Router.push(href);
                }}
              />
            </div>
          ))}
        </div>
      </Zoom>

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
      <Modal
        show={modal.isVisible && modal.type === 'no-lootbox'}
        onClose={() => hideModal()}
        classNames="is-blue-75"
      >
        <div className={`${Style.NoLootboxContainer} container mx-auto`}>
          <div className="flex flex-row justify-center items-center gab-2 mb-5">
            <span className={`text-center ml-2 ${Style.title}`}>No Lootbox Available</span>
          </div>
          <div className="flex flex-row justify-center mb-10">
            <img src={ImgNoLootbox} />
          </div>
          <div className="flex flex-row justify-center items-center gab-2 mb-10">
            <span className={`text-center ml-2 ${Style.subtitle}`}>
              To begin your Diamond Hands journey and play the game, you need at least 1 set of Diamond Hands NFT Card.
              <br />
              Unfortunately, our Lootboxes are sold out. You can still get NFT Cards from other player using the marketplace.
              <br />
              The price of Diamond Hands NFT card has risen due to the game’s popularity,
              <br />
              so this might be a large investment for you and many players!
            </span>
          </div>
          <div className={`flex flex-row justify-center gab-2 mb-10 ${Style.button}`}>
            <Button
              className="is-blue-light px-8 py-4 is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
              href="/marketplace"
            >
              <div className="flex flex-row justify-center items-center">
                <span className={`text-center ml-2 ${Style.title}`}>Buy Card from Marketplace</span>
              </div>
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SectionListCard;
