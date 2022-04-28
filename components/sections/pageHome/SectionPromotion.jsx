import React from 'react';
import {Zoom, Fade} from 'react-reveal';

import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';
import {Modal} from '@modules';
import {FormLogin, FormRegister} from '@templates';

import Style from '@styles/page/pageHome/sectionPromotion.module.scss';

/* import images */
import Chest from '@images/dummy/chest.png';
import IconDiscordWhite from '@images/icon/icon-discord-white.png';

// import IconBattle from '@images/icon/icon-battle-white.png';

const SectionPromotion = () => {
  const {modal, auth} = useState();
  const {showModal, hideModal, setLoginAction} = useActions();

  return (
    <Fade duration={500} delay={100}>
      <section className={`pb-20 ${Style.section__promotion}`}>
        <div className="container mx-auto">
          <div className={`text-center pt-20 pb-20 flex flex-col justify-start relative gap-20 ${Style.container}`}>
          
            <Zoom duration={500} delay={250}>
              <h2 className="mt-10">Don’t miss a thing, join the family now!</h2>
            </Zoom>

            <Zoom duration={500} delay={500}>
              <div className="my-10">
                {auth.isLoggedIn
                  ? (
                    <div className="flex flex-row justify-center">
                      <Button
                        onClick={() => {
                          window.open('https://discord.gg/G89yvGYefz', '_blank');
                        }}
                        className="is-orange is-medium is-rounded is-semiboldx2"
                      >
                        <div className="flex flex-row items-center gap-4 px-8">
                          <img width="22" height="22" src={IconDiscordWhite} />
                          Join Diamond Hands discord
                        </div>
                      </Button>
                    </div>
                  )
                  : (
                    <>
                      <Button
                        onClick={() => showModal('register')}
                        className="is-orange is-large is-rounded is-semiboldx2"
                      >
                        Sign me up
                      </Button>

                      <Modal
                        show={modal.isVisible && modal.type === 'login'}
                        onClose={() => {
                          setLoginAction({enable: false, action_text: ''});
                          hideModal();
                        }}
                      >
                        <FormLogin />
                      </Modal>
                      <Modal
                        show={modal.isVisible && modal.type === 'register'}
                        onClose={() => hideModal()}
                      >
                        <FormRegister />
                      </Modal>
                    </>
                  )}
              </div>
              {/* <div>
                <a className={Style.more} href="/learn">Learn how to play here</a>
              </div> */}
            </Zoom>

            <Zoom duration={500} left delay={250}>
              <div className={Style.image__card}>
                <img src={Chest} />
              </div>
            </Zoom>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default SectionPromotion;
