import React from 'react';
import {Zoom, Fade, Slide} from 'react-reveal';

import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';
import {Modal} from '@modules';
import {FormLogin, FormRegister} from '@templates';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

/* import images */
import IconDiscordWhite from '@images/icon/icon-discord-white.png';

// import IconBattle from '@images/icon/icon-battle-white.png';

const SectionPromotion = () => {
  const {modal, auth} = useState();
  const {showModal, hideModal, setLoginAction} = useActions();
  
  const images = [
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/1.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/2.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/3.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/4.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/5.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/6.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/7.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/8.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/9.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/10.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/11.png',
    'https://derrint.sirv.com/Images/diamond-hands/home/section-11/12.png',
  ];

  return (
    <Fade duration={500} delay={100}>
      <section className={Style.section_11_join}>
        <div className="container mx-auto text-center relative h-full">
        
          <Zoom duration={500} delay={250}>
            <h2 className="mt-[15vh]">Don’t miss a thing, join the family now!</h2>
          </Zoom>

          <Zoom duration={500} delay={500}>
            <div className="mt-20">
              {auth.isLoggedIn
                ? (
                  <div className="flex flex-row justify-center">
                    <Button
                      onClick={() => {
                        window.open('https://discord.gg/G89yvGYefz', '_blank');
                      }}
                      className="is-orange is-medium is-rounded is-semiboldx2 is-white-shadow"
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
                      className="is-orange is-large is-rounded is-semiboldx2 is-white-shadow"
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

          {images.map((item, idx) => (
            <Slide duration={500} bottom delay={500 + 200 * (idx + 1)} key={idx}>
              <img className={`${Style.illustration} transition-all`} src={item} />
            </Slide>
          ))}
          
        </div>
      </section>
    </Fade>
  );
};

export default SectionPromotion;
