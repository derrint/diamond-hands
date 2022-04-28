/* eslint-disable no-nested-ternary */
import React from 'react';
import {Zoom} from 'react-reveal';
import {isMobile} from 'react-device-detect';

import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';

import Style from '@styles/page/pagePlay/sectionComingSoon.module.scss';

const SectionBackdrop = () => {
  const {auth, game} = useState();
  const {showModal, setGameSetting} = useActions();

  return (
    <>
      {!game.isVisible ? (
        <section className={`text-center mb-20 ${Style.section__comingsoon}`}>
          <div className={`container mx-auto ${Style.container}`}>
            <Zoom duration={500} delay={250}>
              <h1>
                The Rock Paper Scissor Battle
                <br />
                in Diamond Hands Metaverse is Now Live!
              </h1>

              <>
                {!auth.isLoggedIn ? (
                  <>
                    <div className="mt-10">
                      <span className={Style.text}>
                        To play the Rock Paper Scissor battle, you required to login and have at least 1 set of NFT Card. Purchase a lootbox & claim your cards on
                        {' '}
                        <Button
                          href="/shop"
                          className="is-text is-nunito is-semibold"
                        >
                          Shop
                        </Button>
                        !
                      </span>
                    </div>
                    <div className="mt-14 mb-20">
                      <Button
                        onClick={() => {
                          showModal('login');
                        }}
                        className="is-blue-light is-small is-semibold is-rounded"
                      >
                        Login Now
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      if (isMobile) {
                        showModal('alert-desktop-only');
                      } else {
                        setGameSetting({isVisible: true});
                      }
                    }}
                    className="is-orange is-large is-rounded is-semibold inline-flex items-center justify-center mt-10 gap-5"
                  >
                    <div className="mx-6">
                      Play the game
                    </div>
                  </Button>
                )}
              </>

              <div className={`flex justify-center ${Style.banner}`}>
                <img src="https://derrint.sirv.com/Images/diamond-hands/play/banner-play-comingsoon.webp" />
              </div>
              
              <>
                {auth.isLoggedIn && (
                  <>
                    <span className={Style.text}>
                      To begin your Diamond Hands journey, you need at least 1 NFT Card. Purchase a lootbox & claim your cards!
                    </span>
                        
                    <div className="mt-14 mb-16">
                      <Button
                        href="/shop"
                        className="is-blue-light is-small is-semibold is-rounded"
                      >
                        <span>Lootbox Shop</span>
                      </Button>
                    </div>
                  </>
                )}
              </>

              <div>
                <Button
                  href="/learn"
                  className={Style.btnText}
                >
                  Learn more about game
                </Button>
              </div>
            </Zoom>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default SectionBackdrop;
