/* eslint-disable no-param-reassign */
import React from 'react';
import ReactPlayer from 'react-player';
import {Fade, Zoom} from 'react-reveal';
import Tada from 'react-reveal/Tada';
import Pulse from 'react-reveal/Pulse';
import {ImPlay2} from 'react-icons/im';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {Modal} from '@modules';
import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

import IconTrumpet from '@images/icon/icon-trumpet.png';

const Section3GameTrailer = ({isLoaded}) => {
  const {modal} = useState();
  const {
    hideModal, showModal,
  } = useActions();

  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // #region ----- READY state -----
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      setIsReady(isLoaded);
    }

    return () => {};
  }, [isLoaded]);
  // #endregion ----- READY state -----

  return (
    <section className={Style.section_3_game_trailer}>
      <div className="container mx-auto">
        <div id="coming-real-soon" className={Style.coming_real_soon}>
          <Zoom when={isReady} duration={500} delay={750} top>
            <h4>
              <span><img src={IconTrumpet} alt="IconTrumpet" /></span>
              <span>The battle is live!</span>
              <span><img src={IconTrumpet} alt="IconTrumpet" /></span>
            </h4>
          </Zoom>

          <Zoom when={isReady} duration={500} delay={1000} top>
            <Tada when={isReady} duration={750} delay={1250}>
              <div className="flex justify-center items-center my-3">
                <Button
                  href="/play"
                  className="is-orange is-small is-rounded is-semibold inline-flex items-center justify-center mb-10 gap-5"
                >
                  Play Now
                </Button>
              </div>
            </Tada>
          </Zoom>

          {/* <h5>
              on March 2022
            </h5> */}
        </div>

        <Fade when={isReady} duration={500} delay={0} bottom>
          <div className="flex flex-col justify-center items-center mb-0 sm:mb-20">
            <h1>
              #1
              {' '}
              <span>Rock Paper Scissor Game</span>
              {' '}
              Built on #Polygon!
            </h1>
            <div className={`flex flex-col justify-end items-center ${Style.trailerVideo}`}>
              <Fade when={isReady} duration={750} delay={2000}>
                <Pulse forever>
                  <Button
                    onClick={() => {
                      setIsVideoPlaying(true);
                      showModal('video-player-game-trailer');
                    }}
                    className={`is-blue-light is-medium is-rounded is-semibold inline-flex items-center justify-center mb-10 gap-5 ${Style.buttonPlayTrailer}`}
                  >
                    <ImPlay2 size="24" className="inline" />
                    <div className="pb-0 sm:pb-1">
                      Watch game trailer
                    </div>
                  </Button>
                </Pulse>
              </Fade>
            </div>
          </div>
        </Fade>
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'video-player-game-trailer'}
        bodyStyle={{
          padding: 0,
          width: '100vw',
          height: 'calc(100vw * 9 / 16)',
          maxWidth: 720,
          maxHeight: 405,
          minHeight: 'unset',
          aspectRatio: 16 / 9,
        }}
        onClose={() => {
          setIsVideoPlaying(false);
          hideModal();
        }}
        classNames="is-blue is-large"
      >
        <ReactPlayer
          width="100%"
          height="100%"
          // width="720px"
          // height="405px"
          playing={modal.isVisible && isVideoPlaying}
          loop
          controls
          url="https://www.youtube.com/watch?v=Lv9QUuyjppI"
        />
      </Modal>
    </section>
  );
};

export default Section3GameTrailer;
