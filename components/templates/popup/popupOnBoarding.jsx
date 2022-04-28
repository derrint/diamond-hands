/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React from 'react';
import Pulse from 'react-reveal/Pulse';
import Router from 'next/router';

import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';
import {CardLootbox} from '@templates';
import {getSlug} from '@utils/helper';

// import ImgOnboarding from '@images/banner/img-onboarding.png';
// import IconHandGuide from '@images/icon/icon-hand-guide.png';

const PopUpOnBoarding = () => {
  const {player, lootboxes} = useState();
  const {getLootboxList, hideModal} = useActions();

  const [lootboxesHome, setLootboxesHome] = React.useState([]);
  React.useEffect(() => {
    if (lootboxes.all) {
      const lbHome = lootboxes.all.filter((x) => x.expiredAt === 0);
      const lbHomeSliced = lbHome.slice(3, 5);
      setLootboxesHome(lbHomeSliced);
    } else {
      getLootboxList({limit: 5});
    }

    return () => {};
  }, [lootboxes.all]);

  return (
    <div className="onboarding container">
      <div className="flex flex-col justify-between">
        <div className="onboarding_title">
          Welcome
          to
          {' '}
          <span className="onboarding_title_bold">Diamond Hands,</span>
          {' '}
          <span className="onboarding_title_bold_blue">{player?.userName}</span>
        </div>
        
        <div className="onboarding_desciption flex flex-col items-center">
          <h1>
            Ready to play
            {' '}
            <span>Rock Paper Scissors?</span>
          </h1>
          <p>
            Your journey begins here from a set of NFT Cards!
            <br />
            We recommend these amazing lootbox to get started!
          </p>
        </div>
        
        <div className="flex mt-16 mb-8 flex-col items-center">
          <div className="onboarding_cardWrapper mb-10">
            <div className="label">
              ⏰  &nbsp; Limited pre-sale offer, hurry up!
            </div>
            {lootboxesHome.length > 0 && lootboxesHome.map((item) => (
              <div className="flex justify-center items-center" key={`card-${item.id}`}>
                <CardLootbox
                  key={`card-${item.id}`}
                  data={item}
                  buttonAction={() => {
                    const href = `/shop/${item.id}/${getSlug(item.name)}`;
                    Router.push(href);
                  }}
                  className="small"
                />
              </div>
            ))}
          </div>
          <Pulse forever>
            <div className="flex justify-center">
              <Button className="is-orange is-small is-rounded onboarding_button" href="/shop">
                <div className="flex flex-row">
                  <span className="onboarding_button_text">See all Lootboxes available</span>
                </div>
              </Button>
            </div>
          </Pulse>
        </div>
        <div className="flex flex-col items-center">
          <Button
            onClick={() => {
              hideModal();
              location.href = '/#coming-real-soon';
            }}
            className="text-center"
          >
            <span className="onboarding_link">
              Learn more about Diamond Hands
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopUpOnBoarding;
