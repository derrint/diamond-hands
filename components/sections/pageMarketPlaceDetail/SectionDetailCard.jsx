import {CardItem} from '@templates';

import {Button} from '@elements';
import Style from '@styles/page/pageMarketPlaceDetail/sectionDetail.module.scss';

/* import images */
import CardDragon from '@images/dummy/card-dragon.png';
import CardFrank from '@images/dummy/card-frankenstein.png';
import CardMermaid from '@images/dummy/card-mermaid.png';

/* import videos */
import CardMotionWitch from '@videos/card-motion/witch.webm';
import CardMotionZombie from '@videos/card-motion/zombie.webm';

const SectionDetail = () => {
  const data = {
    id: 2,
    assets: [CardMotionZombie, CardMotionWitch, CardFrank, CardDragon, CardMermaid],
  };

  return (
    <section className={`mb-20 ${Style.section__detail}`}>
      <div className={`container mx-auto ${Style.container}`}>
        <div className={Style.wrapper}>
          <div className={Style.block__left}>
            <CardItem
              data={data}
              hasInformation={false}
              hasShadow={false}
              hasThumbnail
              isAutoPlay={false}
              className={Style.wrapperImage}
            />
          </div>
          <div className={Style.block__right}>
            <h1 className="mb-10">Mr. Roboto Hands</h1>
            <p className="mb-20">Roboto has a dual nature. It has a mechanical skeleton and the forms are largely geometric. At the same time, the font features friendly and open curves. While some grotesks distort their letterforms to force a rigid rhythm, Roboto doesn’t compromise, allowing letters to be settled into their natural width. This makes for a more natural reading rhythm more commonly found in humanist and serif types.</p>
            <div className={Style.information}>
              <span className={Style.serie}>
                Series
                <br />
                <span>
                  Futuristic Pack
                </span>
              </span>
              <span className={Style.rarity}>
                Rarity
                <br />
                <span>
                  Super Rare
                </span>
              </span>
              <span className={Style.rarity}>
                Element
                <br />
                <span>
                  Earth
                </span>
              </span>
            </div>
            <div className={Style.information__price}>
              <span>
                <span className={Style.virtual__price}>500 DIH</span>
                <br />
                <span className={Style.price}>$14</span>
              </span>
              <Button className="is-blue-light is-bold is-small is-rounded">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDetail;
