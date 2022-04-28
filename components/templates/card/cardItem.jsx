import React from 'react';

import {Slider} from '@modules';
import {getSlug} from '@utils/helper';

const cardItem = ({
  data, hasInformation, hasShadow, hasThumbnail, isAutoPlay, className, hasPagination, hasNavigation, isLootbox,
}) => (
  <div className={`card__item ${hasShadow ? 'has-shadow' : ''} ${hasInformation ? 'has-information' : ''} ${className}`}>
    <div className={`block__image ${hasNavigation ? 'has-navigation' : ''}`}>
      <Slider
        assets={data.assets}
        autoPlay={isAutoPlay}
        thumbnail={hasThumbnail}
        effect="flip"
        isLootbox={isLootbox}
        {...(hasPagination ? {pagination: {clickable: true}} : {})}
        {...(hasNavigation ? {navigation: {clickable: true}} : {})}
      />
    </div>
    {
      hasInformation && (
        <div className="block__information">
          <div className="left">
            <p className="series">
              <span>{data.series}</span>
            </p>
            <p className="rarity">
              <span className={getSlug(data.rarity)}>{data.rarity}</span>
            </p>
          </div>
          {/* <div className="right">
            <p className="virtual-price">
              500 DIH
            </p>
            <p className="price">
              $141
            </p>
            <div className="status">
              <img src={IconCheck} />
              Owned
            </div>
          </div> */}
        </div>
      )
    }
  </div>
);

export default cardItem;
