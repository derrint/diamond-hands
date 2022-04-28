/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Zoom} from 'react-reveal';

import {isSafari, isIOS, isChrome, isFirefox, isOpera} from 'react-device-detect';

import {Button} from '@elements';

import Style from '@styles/page/pageHome/sectionBanner.module.scss';

/* import images */
// import BgCloud from '@images/bg/bg-cloud.png';
import BannerVideo from '@videos/home/banner.mp4';
// import BannerVideoWEBM from '@videos/home/banner.webm';
// import BannerVideoFallback from '@images/banner/banner-video-fallback.jpg';

const SectionBanner = () => {
  // #region ----- setting up interval text change -----

  const texts = [
    {
      first: 'Welcome to DiamondHands!',
      second: 'A Rock Paper Scissors',
      third: 'Trading Card Game',
      fourth: '',
    },
    // {
    //   first: 'Rock. Paper. Scissor.',
    //   second: 'Earn More DD Coins',
    //   third: 'from Your Lootbox',
    //   fourth: 'Coming in March 2022',
    // },
    // {
    //   first: 'Rock. Paper. Scissor.',
    //   second: 'Get the Game VIP Access',
    //   third: 'from Your Lootbox',
    //   fourth: 'Coming in March 2022',
    // },
    {
      first: ' ',
      second: 'Lootboxes',
      third: 'available now!',
      fourth: '',
    },
  ];

  const [text, setText] = React.useState(texts[0]);
  const [isTextShown, setIsTextShown] = React.useState(true);

  let i = 0;
  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      setIsTextShown(false);
      setText(texts[i]);
      if (i < (texts.length - 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(() => {
        setIsTextShown(true);
      }, 1000);
    },
    5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // #endregion

  const videoParentRef = React.useRef();
  const [shouldUseImage, setShouldUseImage] = React.useState(false);
  
  React.useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari && isIOS && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0];

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute("muted", ""); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none";
                setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);
  
  return (
    <section className={Style.section__banner}>
      <div className={`text-center relative flex flex-col justify-around ${Style.container}`}>
        <div className={Style.bg}>
          <div className={Style.playerWrapper}>
            {shouldUseImage ? (
              <img src={BannerVideo} alt="Muted Video" />
            ) : (
              <div
                className="h-full"
                ref={videoParentRef}
                dangerouslySetInnerHTML={{
                  __html: `
                  <video
                    loop
                    muted
                    autoplay
                    playsinline
                    preload="metadata"
                    class="${Style.video}"
                  >
                  <source src="${BannerVideo}" type="video/mp4" />
                  </video>`
                }}
              />
            )}
          </div>
        </div>
        
        <div className={Style.caption}>
          <Zoom duration={500} delay={125}>
            <div>
              
              <Zoom duration={750} cascade when={isTextShown}>
                <h3 className="mb-2 sm:mb-10">
                  {text.first}
                </h3>
              </Zoom>
              <Zoom duration={750} cascade when={isTextShown}>
                <h1 className="">{text.second}</h1>
                <h1 className="mb-5 sm:mb-10">{text.third}</h1>
              </Zoom>
              <h4 className="mb-5 sm:mb-20">{text.fourth}</h4>
            </div>
          </Zoom>

          <Zoom duration={500} delay={500}>
            <div className={Style.buttonWrapper}>
              <div className="flex flex-col justify-center">
                <div>
                  <Button
                    href="/shop"
                    className={`is-orange is-large is-rounded is-semibold is-shadow inline-flex items-center gap-2 ${isChrome || isFirefox || isOpera ? 'is-shiny' : ''} ${Style.button}`}
                  >
                    <span>
                      Shop Lootbox Now
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
      </div>
    </section>
  );
};

export default SectionBanner;
