/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {
  Thumbs, Navigation, Autoplay, EffectFlip, EffectCube, Pagination,
} from 'swiper';
import {isDesktop} from 'react-device-detect';

import {getFileExtension} from '@utils/helper';
import IconVideo from '@images/icon/icon-video.png';
import IconThumbRock from '@images/icon/icon-thumb-rock.png';
import IconThumbPaper from '@images/icon/icon-thumb-paper.png';
import IconThumbScissor from '@images/icon/icon-thumb-scissor.png';

SwiperCore.use([EffectFlip, EffectCube, Navigation, Autoplay, Thumbs, Pagination]);

const Slider = ({
  assets, autoPlay, thumbnail, effect, pagination, navigation, className, isLootbox,
}) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const setAutoPlay = autoPlay
    ? {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    } : false;

  const videoExtensions = ['mp4', 'webm'];

  return (
    <>
      <Swiper
        id="main-slider"
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        effect={effect}
        navigation={navigation || false}
        pagination={pagination || false}
        autoplay={setAutoPlay}
        thumbs={{swiper: thumbsSwiper}}
        className={className}
      >
        {
          assets.map((item, index) => (
            videoExtensions.includes(getFileExtension(item))
              ? (
                <SwiperSlide key={`slides-${index}`}>
                  <video className="image-card" autoPlay loop src={item}>
                    {/* <source src={item} type="video/mp4" /> */}
                  </video>
                </SwiperSlide>
              )
              : (
                <SwiperSlide key={`slides-${index}`}>
                  <div>
                    {isLootbox && (
                      <div className="card-label-lootbox">
                        <span>Chance to collect this card!</span>
                      </div>
                    )}
                    <img className="image-card" src={item} />
                  </div>
                </SwiperSlide>
              )))
        }
        
      </Swiper>
      
      {
        thumbnail && (
          <Swiper
            id="thumbs"
            // spaceBetween={20}
            slidesPerView={assets.length}
            onSwiper={setThumbsSwiper}
          >
            {
              assets.map((item, index) => {
                const i = isDesktop ? index : index + 1;
                const coverClass = videoExtensions.includes(getFileExtension(item)) ? 'video-cover' : 'image-cover';
                let thumbImg = null;
                switch (i) {
                  case 0:
                    thumbImg = IconVideo;
                    break;
                  case 1:
                    thumbImg = IconThumbRock;
                    break;
                  case 2:
                    thumbImg = IconThumbPaper;
                    break;
                  case 3:
                    thumbImg = IconThumbScissor;
                    break;
                  default:
                    thumbImg = item;
                    break;
                }

                return (
                  <SwiperSlide key={`slides-${i}`}>
                    <div className={`${coverClass} cursor-pointer`}>
                      <img src={thumbImg} />
                    </div>
                  </SwiperSlide>
                );
              })
            }
            
          </Swiper>
        )
      }

    </>
  );
};

export default Slider;
