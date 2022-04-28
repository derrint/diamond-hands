/* eslint-disable prefer-template */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import {Zoom} from 'react-reveal';
import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {useState} from '@overmind/index';
import {Button} from '@elements';
import IconCoinDD from '@images/icon/icon-coin-dd.png';
import {currencyFormat} from '@utils/helper';

const LootboxContents = ({data, buyLootboxAction}) => {
  const {lootboxes} = useState();
  const settings = {
    className: 'center',
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '60px',
  };

  const [isAnimationDone, setIsAnimationDone] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsAnimationDone(true);
    }, 11000);

    return () => {};
  }, []);

  return (
    <div className="lootbox-contents-wrapper container">
      {/* <div className="flex flex-col items-center">
        <img className="badge" src={data?.assets?.badge} />
        <h1 className="mb-10">{data?.name}</h1>
        <p className="mb-10">Yaay! you've got</p>
        <img className="dd_coin_image" src={IconCoinDD} />
        <div className="dd_amount">{currencyFormat(data?.dd, '', '$DD')}</div>
      </div> */}
      <div className={`flex flex-col items-center ${isAnimationDone ? '' : 'hidden'}`}>
        {data?.cards?.length > 3 ? (
          <div className="items-center justify-center cards-wrapper">
            <Slider {...settings}>
              {data?.cards.map((card, i) => (
                <Zoom bottom key={'card-' + i} duration={750} delay={i * 1000} when={isAnimationDone}>
                  <div className="item-wrapper is-card">
                    <img className="img-carousel" src={card.paperImgUrl} />
                  </div>
                </Zoom>
              ))}
              <Zoom bottom key="card-dd" duration={750} delay={data?.cards.length * 1000} when={isAnimationDone}>
                <div className="item-wrapper">
                  <img className="dd_coin_image" src={IconCoinDD} />
                  <div className="dd_amount">{currencyFormat(data?.dd, '', 'DD')}</div>
                </div>
              </Zoom>
            </Slider>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center cards-wrapper">
            {data?.cards?.map((card, i) => (
              <Zoom bottom key={'card-' + i} duration={750} delay={i * 1000} when={isAnimationDone}>
                <div className="item-wrapper is-card">
                  <img className="img-carousel with-shadow" src={card.paperImgUrl} />
                </div>
              </Zoom>
            ))}
            <Zoom bottom key="card-dd" duration={750} delay={data?.cards.length * 1000} when={isAnimationDone}>
              <div className="item-wrapper">
                <img className="dd_coin_image" src={IconCoinDD} />
                <div className="dd_amount">{currencyFormat(data?.dd, '', 'DD')}</div>
              </div>
            </Zoom>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center">
        <img className={`opening-gif ${isAnimationDone ? 'opening-gif-hidden' : ''}`} src={data?.assets?.opening.gif} />
        <div className={`opening-gif-alt ${isAnimationDone ? '' : 'opening-gif-alt-hidden'}`} style={{backgroundImage: `url(${data?.assets?.opening.gif})`}} />
      </div>

      {lootboxes?.selected?.price && (
        <div className="flex flex-col items-center mt-10">
          <Zoom bottom duration={750} delay={data?.cards.length * 1000 + 1000} when={isAnimationDone}>
            <Button
              className="is-yellow is-small is-bold is-rounded is-nunito inline-flex flex-col items-center button"
              onClick={buyLootboxAction}
            >
              <div className="text">Buy Again</div>
              {/* <div className="price">{currencyFormat(lootboxes?.selected?.price, '$')}</div> */}
            </Button>
          </Zoom>
        </div>
      )}
      
    </div>
  );
};

export default LootboxContents;
