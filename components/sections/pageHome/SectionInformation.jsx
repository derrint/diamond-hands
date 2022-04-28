/* eslint-disable no-param-reassign */
import React from 'react';
import ReactPlayer from 'react-player';
import {Zoom} from 'react-reveal';
import {ImPlay2} from 'react-icons/im';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {Modal} from '@modules';
import Style from '@styles/page/pageHome/sectionInformation.module.scss';

import IconChevronCircleRight from '@images/icon/icon-chevron-circle-right-blue.png';
import IconTrumpet from '@images/icon/icon-trumpet.png';

const SectionInformation = ({title, items, sectionNumber}) => {
  const {modal} = useState();
  const {
    hideModal, showModal,
  } = useActions();

  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <section className={`pt-20 pb-20 ${Style.section__information} ${sectionNumber === 2 ? Style.section__information_2 : null}`}>
      <div className={`container mx-auto ${Style.container}`}>
        <Zoom duration={500} bottom>
          {title && (
            <div id="coming-real-soon" className={Style.coming_real_soon}>
              <h4>
                {sectionNumber === 2 && (
                  <span><img src={IconTrumpet} alt="IconTrumpet" /></span>
                )}
                <span>{title}</span>
                {sectionNumber === 2 && (
                  <span><img src={IconTrumpet} alt="IconTrumpet" /></span>
                )}
              </h4>

              <div className="flex justify-center items-center mt-10 mb-5">
                <Button
                  href="/play"
                  className="is-orange is-small is-rounded is-semibold inline-flex items-center justify-center mb-10 gap-5"
                >
                  Play Now
                </Button>
              </div>

              {/* <h5>
                on March 2022
              </h5> */}
            </div>
          )}
        </Zoom>

        <Zoom duration={500} bottom>
          <div className="flex flex-col justify-center items-center mb-0 sm:mb-20">
            {sectionNumber === 2 && (
              <>
                <h1>
                  #1
                  {' '}
                  <span>Rock Paper Scissor Game</span>
                  {' '}
                  Built on #Polygon!
                </h1>
                <div className={`flex flex-col justify-end items-center ${Style.trailerVideo}`}>
                  <Button
                    onClick={() => {
                      setIsVideoPlaying(true);
                      showModal('video-player-game-trailer');
                    }}
                    className={`is-blue-light is-medium is-rounded is-semibold inline-flex items-center justify-center mb-10 gap-5 ${Style.buttonPlay}`}
                  >
                    <ImPlay2 size="24" className="inline" />
                    <div className="pb-0 sm:pb-1">
                      Watch game trailer
                    </div>
                  </Button>
                </div>
              </>
            )}
          </div>
        </Zoom>
  
        {
          items.map((item, key) => (
            <div className={`flex items-center ${Style.item}`} key={`information-${key}`}>
              <Zoom duration={500} bottom cascade delay={250}>
                <div className={`block__description ${Style.block__description}`}>
                  <h2 className="mb-10">{item.title}</h2>
                  <p className="mb-10">{item.description}</p>
                  {item.url && (
                    <div>
                      <Button href={item.url} className="flex flex-row items-center gap-5">
                        {item.url_caption}
                        <span className="mr-2"><img src={IconChevronCircleRight} alt="IconChevronCircleRight" /></span>
                      </Button>
                    </div>
                  )}
                </div>
              </Zoom>
              <div className={`block__image ${Style.block__image}`}>
                <Zoom duration={500} bottom delay={250}>
                  <img src={item.image} />
                </Zoom>
              </div>
            </div>
          ))
        }
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

export default SectionInformation;
