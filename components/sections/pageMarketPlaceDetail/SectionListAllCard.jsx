import {CardItem} from '@templates';

import Style from '@styles/page/pageMarketPlaceDetail/sectionListCard.module.scss';

/* import images */
import CardAphabot from '@images/dummy/card-alphabot.png';
import CardAstroboy from '@images/dummy/card-astroboy.png';
import CardDragon from '@images/dummy/card-dragon.png';
import CardFrank from '@images/dummy/card-frankenstein.png';
import CardMermaid from '@images/dummy/card-mermaid.png';
import CardRobocop from '@images/dummy/card-robocop.png';

const SectionBreadCrumb = () => {
  const data = [
    {
      id: 1,
      assets: [CardAphabot, CardAstroboy, CardDragon],
    },
    {
      id: 2,
      assets: [CardFrank, CardDragon, CardMermaid],
    },
    {
      id: 3,
      assets: [CardAstroboy, CardRobocop, CardDragon],
    },
  ];

  return (
    <section className={`mb-20 ${Style.section__listCard}`}>
      <div className={`container mx-auto ${Style.container}`}>
        <h2 className="mb-20">Collect all cards on Futuristic Pack</h2>
        <div className={Style.wrapper__item}>
          {
            data.map((item, index) => (
              <CardItem
                key={`list-all-card-${index}`}
                data={item}
                hasInformation
                hasShadow
                hasThumbnail={false}
                isAutoPlay
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default SectionBreadCrumb;
