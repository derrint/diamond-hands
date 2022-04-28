import {Button} from '@elements';
import {Zoom, Fade} from 'react-reveal';

import Style from '@styles/page/pageProfile/sectionPromotion.module.scss';

/* import images */
import BgCards from '@images/bg/bg-cards.png';

const SectionPromotion = () => (
  <Fade duration={500} delay={350}>
    <section className={Style.section__promotion}>
      <div className="container mx-auto text-center flex flex-col justify-center relative">
        <div className={Style.container}>
          <div className={Style.bg}>
            <img className={Style.bg_image} src={BgCards} />
          </div>
          <div className={Style.content}>
            <Zoom duration={500} delay={250}>
              <h2>Get your Diamond Hands card now!</h2>
            </Zoom>
            <Zoom duration={500} delay={500}>
              <div className="flex mt-12">
                <Button
                  href="/shop"
                  className="is-orange is-small is-rounded is-bold"
                >
                  Lootbox Shop
                </Button>
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    </section>
  </Fade>
);

export default SectionPromotion;
