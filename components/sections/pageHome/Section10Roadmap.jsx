import React from 'react';
import {Zoom, Fade} from 'react-reveal';
import Pulse from 'react-reveal/Pulse';
import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';
import {BsDiscord} from 'react-icons/bs';

import {homeRoadmap} from '@data';

import Style from '@styles/page/pageHome/sectionFullpage.module.scss';

const SectionRoadmap = () => {
  const items = homeRoadmap;
  const settings = {
    // className: 'center',
    centerMode: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: '60px',
    nextArrow: <FiArrowRight color="#1C5D79" />,
    prevArrow: <FiArrowLeft color="#1C5D79" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  const [slider, setSlider] = React.useState(null);

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };

  return (
    <Fade duration={500} delay={100}>
      <section className={Style.section_10_roadmap}>
        <div className="container mx-auto text-center pt-20 pb-20 flex flex-col justify-start relative gap-20">
          
          <Fade top duration={500} delay={0}>
            <h1 className="mt-10">Our Roadmap</h1>
          </Fade>

          <Zoom duration={500} delay={500}>
            <div className={Style.itemWrapper} id="home-roadmap">
              <Slider ref={(c) => (setSlider(c))} {...settings}>
                {items.map((item, key) => (
                  <div className="" key={`information-${key}`}>
                    <Fade left duration={500} delay={500 + (key * 250)}>
                      <div className={`${Style.item}`}>
                        <h2>
                          #
                          {item.id}
                        </h2>
                        <h3>{item.title}</h3>
                        <h4>{item.subtitle}</h4>
                        {/* <p>{item.description}</p> */}
                        <div className="flex gap-2 mt-20">
                          {item.icons.map((icon, idx) => (
                            <img key={idx} src={icon} className="w-[48px]" />
                          ))}
                        </div>
                      </div>
                    </Fade>
                  </div>
                ))}
              </Slider>
            </div>
            <div className={Style.nextPrevWrapper}>
              <button onClick={previous}>
                <FiArrowLeft color="#1C5D79" size={32} />
              </button>
              <button onClick={next}>
                <FiArrowRight color="#1C5D79" size={32} />
              </button>
            </div>
          </Zoom>

          <Fade bottom duration={500} delay={1750}>
            <div className="flex items-center justify-center">
              <Pulse forever>
                <button className={Style.buttonDiscord}>
                  <span>Join Our</span>
                  <div className="mt-1">
                    <BsDiscord color="white" size={24} />
                  </div>
                  <span>Discord..</span>
                </button>
              </Pulse>
            </div>
          </Fade>
        </div>
      </section>
    </Fade>
  );
};

export default SectionRoadmap;
