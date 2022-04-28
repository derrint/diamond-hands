/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import moment from 'moment';
import {Fade, Zoom} from 'react-reveal';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';
import {MdAccessTimeFilled} from 'react-icons/md';
import {BiChevronRightCircle} from 'react-icons/bi';
import Slider from 'react-slick';

import {useActions, useState} from '@overmind';
import {Button} from '@elements';
import {Modal} from '@modules';
import {stripHTML, getDateRangeLabel} from '@utils/helper';

import Style from '@styles/page/pageEvent/sectionListEvent.module.scss';

/* import images */
// import EventDecember from '@images/dummy/event-december.png';
// import EventHelloween from '@images/dummy/event-helloween.png';
// import EventRobot from '@images/dummy/event-robot.png';
// import EventYu from '@images/dummy/event-yu.png';

const SectionListEvent = () => {
  const {
    getEventList, showModal, hideModal, selectEvent,
  } = useActions();
  const {events, modal} = useState();
  
  React.useEffect(() => {
    getEventList({
      limit: 15,
      offset: 0,
      showDeleted: false,
    });

    return () => {};
  }, []);

  const getPeriod = (start, end) => {
    const startDate = moment(start * 1000).toISOString();
    const endDate = moment(end * 1000).toISOString();
    const period = getDateRangeLabel(startDate, endDate, 'D MMM YYYY');
    return period;
  };

  const featuredEvents = events && events.all && events.all
    .filter((event) => event.isFeatured);

  const otherEvents = events && events.all && events.all
    .filter((event) => !event.isFeatured)
    .slice(0, 3);

  const settings = {
    // className: 'center',
    centerMode: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '60px',
    nextArrow: <FiArrowRight color="#1C5D79" />,
    prevArrow: <FiArrowLeft color="#1C5D79" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
    <section className={Style.section__listEvent}>
      {featuredEvents && (
        <Zoom duration={500} bottom delay={350}>
          <div className={`container mx-auto flex flex-col items-center justify-center mb-20 ${Style.container}`}>
            <div className={Style.banner__wrapper}>
              <Slider ref={(c) => (setSlider(c))} {...settings}>
                {featuredEvents.map((item, key) => (
                  <div className="" key={`information-${key}`}>
                    <Fade left duration={500} delay={500 + (key * 250)}>
                      <div className={`${Style.banner}`}>
                        <img src={item.bannerImgUrl} className={Style.image} alt="" />
                        <div className={Style.caption}>
                          <h5>Featured</h5>
                          <h1>{item.name}</h1>
                          <h4>
                            <MdAccessTimeFilled className="inline-block mr-2" color="#ffffff" size={16} />
                            {' '}
                            Period:
                            {' '}
                            {getPeriod(item.startedAt, item.endedAt)}
                          </h4>
                          <p>{item.descrHtml}</p>
                          <Button className="inline-block is-orange is-small is-semiboldx2 is-rounded" href="/shop">Check lootbox now</Button>
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
          </div>
        </Zoom>
      )}

      <div className={`container mx-auto mb-20 ${Style.container}`}>
        {featuredEvents && featuredEvents.length > 0 && (
          <Zoom duration={500} delay={250}>
            <h1 className={Style.list__title}>Don't miss another events</h1>
          </Zoom>
        )}

        {otherEvents ? (
          <div className={Style.list__wrapper}>
            {otherEvents.map((item, index) => {
              const delay = 150 + (index * 50);

              return (
                <Fade duration={500} bottom delay={delay} key={`event-${index}`}>
                  <div className={`${Style.item} w-1/3`} key={`event-${index}`}>
                    <div
                      className={Style.block__image}
                      onClick={() => {
                        selectEvent(item);
                        showModal('event-detail');
                      }}
                    >
                      <div className={Style.imageCover}>
                        <img src={item.bannerImgUrl} />
                      </div>
                    </div>
                    <div className={Style.block__decription}>
                      <div>
                        <h2
                          className={Style.title}
                          onClick={() => {
                            selectEvent(item);
                            showModal('event-detail');
                          }}
                        >
                          {item.name}
                        </h2>
                        <h4 className={Style.date}>
                          <MdAccessTimeFilled className="inline-block mr-2" color="#ffffff" size={16} />
                          {' '}
                          Period:
                          {' '}
                          {getPeriod(item.startedAt, item.endedAt)}
                        </h4>
                        <p className={Style.description}>{stripHTML(item.descrHtml)}</p>
                      </div>
                      <div className="flex justify-center items-center gap-10">
                        <Button className="is-orange is-small is-semiboldx2 is-rounded" href="/play">Play Now</Button>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        ) : (
          <Fade duration={500} bottom delay={350}>
            <div className="flex justify-center items-center">
              <img src="https://derrint.sirv.com/Images/diamond-hands/event/empty-state-event.png" width="200px" />
            </div>

            {/* <div className={Style.emptyState}>
              <div className={Style.emptyState__text1}>
                There is no event at the moment.
                <br />
                But we have bunch of events which will be coming soon.
                <br />
                So let’s prepare and get ready!
              </div>
            </div> */}
          </Fade>
        )}

        {otherEvents && otherEvents.length > 3 && (
          <div className="text-center mt-10">
            <Zoom duration={500} delay={250}>
              <Button className="inline-block is-blue-light is-small is-semibold is-rounded" href="/event-all">
                <div className="flex items-center justify-center gap-3">
                  See all events
                  <BiChevronRightCircle color="#ffffff" size={20} className="mt-1" />
                </div>
              </Button>
            </Zoom>
          </div>
        )}
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'event-detail'}
        onClose={() => hideModal()}
        classNames="is-blue is-large"
      >
        {events.selected && (
          <div className={Style.detail}>
            <img src={events.selected.bannerImgUrl} />
            <p className={Style.date}>{getPeriod(events.selected.startedAt, events.selected.endedAt)}</p>
            <h2 className={Style.title}>{events.selected.name}</h2>
            <p className={Style.description}>{stripHTML(events.selected.descrHtml)}</p>
            <Button className="is-orange is-small is-bold is-rounded" href="/play">
              <div className="px-20">
                Play Now
              </div>
            </Button>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default SectionListEvent;
