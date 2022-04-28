/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Zoom} from 'react-reveal';
import _ from 'lodash';
import {RiCloseCircleFill} from 'react-icons/ri';

import {useActions, useState} from '@overmind/index';
import {DropDown} from '@modules';
import {cardRarities, cardElements} from '@data';
import {getSlug, capitalizeFirstLetter} from '@utils/helper';

import Style from '@styles/page/pageCards/sectionFilter.module.scss';

/* import images */
import IconSearch from '@images/icon/icon-search.png';
// import IconClose from '@images/icon/icon-close-result.png';

const SectionFilter = ({pageName}) => {
  const {filter, auth} = useState();
  const {
    setFilter,
    getCardList,
    setPagination,
    getMarketplaceCardList,
    getCardListOwned,
    getPackList,
    getElementList,
    getRarityList,
  } = useActions();

  const [inputSearch, setInputSearch] = React.useState('');
  const [showCardBy, setShowCardBy] = React.useState('');
  const [cardSeriesData, setCardSeries] = React.useState([]);
  const [cardRaritiesData, setCardRarities] = React.useState([]);
  const [cardElementsData, setCardElements] = React.useState([]);

  const filterInitialState = {
    ...filter,
    keyword: '',
    series: [],
    rarity: [],
    element: [],
    showOwnedOnly: false,
    showListedOnly: false,
  };

  const showCardOptions = [
    {
      id: 'all',
      label: 'All',
      page: ['cards', 'marketplace', 'card'],
      showOwnedOnly: false,
      showListedOnly: false,
    },
    {
      id: 'owned',
      label: 'Owned',
      page: ['cards', 'marketplace'],
      showOwnedOnly: true,
      showListedOnly: false,
    },
    {
      id: 'onsell',
      label: 'On sell',
      page: ['card'],
      showOwnedOnly: false,
      showListedOnly: true,
    },
  ];
  const selectedShowCardLabel = pageName === 'card' ? showCardOptions.find((x) => x.showListedOnly === filter.showListedOnly)?.label : showCardOptions.find((x) => x.showOwnedOnly === filter.showOwnedOnly)?.label;

  const sortOptions = [
    {
      id: 'name-asc',
      label: 'Name A-Z',
    },
    {
      id: 'name-desc',
      label: 'Name Z-A',
    },
  ];
  const orderOptions = [
    {
      id: 'asc',
      label: 'Name A-Z',
    },
    {
      id: 'desc',
      label: 'Name Z-A',
    },
  ];
  const selectedSortLabel = sortOptions.find((x) => x.id === filter.sort)?.label;
  const selectedOrderLabel = orderOptions.find((x) => x.id === filter.order)?.label;
  const initFilterData = () => {
    getPackList().then((res) => {
      const data = [];
      _.mapKeys(res.packs, (value, key) => { data.push({id: key, name: value}); });
      setCardSeries(data);
    });
    getElementList().then((res) => {
      const data = [];
      _.mapKeys(res.elements, (value, key) => {
        const jsonData = _.find(cardElements, (o) => o.name === value);
        data.push({id: key, name: value, image: jsonData?.image});
      });
      setCardElements(data);
    });
    getRarityList().then((res) => {
      const data = [];
      _.mapKeys(res.rarities, (value, key) => {
        const jsonData = _.find(cardRarities, (o) => o.name === value);
        if (jsonData) {
          data.push({id: key, name: value, image: jsonData?.image});
        }
      });
      
      setCardRarities(data);
    });
  };
  React.useEffect(() => {
    initFilterData();
    return () => {};
  }, []);

  const handleCheckBox = (e, type, itemCheck) => {
    const {checked} = e.target;
    let filterData;
    let isExistsData;

    if (checked) {
      isExistsData = filter[type].some((item) => item === itemCheck);
      if (!isExistsData) {
        const newData = [...filter[type], ...[itemCheck]];
        setFilter({
          [type]: newData,
        });
      }
    } else {
      filterData = filter[type].filter((item) => itemCheck !== item);
      setFilter({
        [type]: filterData,
      });
    }
  };

  const removeFilter = (type, itemRemove = null) => {
    if (itemRemove !== null) {
      const filterData = filter[type].filter((item) => itemRemove !== item);
  
      setFilter({
        [type]: filterData,
      });
    }

    if (type === 'all') {
      setFilter(filterInitialState);
      setInputSearch('');
    } else if (type === 'keyword') {
      setFilter({keyword: ''});
      setInputSearch('');
    }
  };

  const submitSearch = () => {
    setFilter({keyword: inputSearch});
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSearch();
    }
  };

  const handleChangeSearch = (e) => {
    const {value} = e.target;
    setInputSearch(value);
  };

  const filterTypes = [
    {
      id: 'series',
      label: 'pack',
      items: _.sortBy(cardSeriesData, ['name', '']),
    },
    {
      id: 'rarity',
      label: 'rarity',
      items: _.sortBy(cardRaritiesData, ['name', '']),
    },
    {
      id: 'element',
      label: 'element',
      items: _.sortBy(cardElementsData, ['name', '']),
    },
  ];

  const dropdownItem = (item, type) => {
    const slug = getSlug(`${item.id}-${item.name}`);
    const isChecked = filter[type].some((activeData) => (activeData === item.name));

    return (
      <li className="dropdown-content__list__item" key={slug}>
        <input type="checkbox" id={slug} name={item.name} checked={isChecked} onChange={(e) => handleCheckBox(e, type, item.name)} />
        <label htmlFor={slug}>
          {item.image && (
            <img src={item.image} />
          )}
          <span>{item.name}</span>
        </label>
      </li>
    );
  };

  const resetPage = () => {
    setFilter({offset: 0});
    setPagination({current: 1});
  };
  React.useEffect(() => {
    resetPage();
    removeFilter('all');
    return () => {};
  }, [auth.isLoggedIn]);
  React.useEffect(() => {
    resetPage();
    if (pageName === 'marketplace') {
      getMarketplaceCardList({
        ...filter,
        offset: 0,
      });
    } else if (pageName === 'card') {
      if (auth.isLoggedIn) {
        getCardListOwned({
          ...filter,
          offset: 0,
          pageName,
        });
      }
    } else {
      getCardList({
        ...filter,
        offset: 0,
      });
    }

    return () => {};
  }, [
    filter.series,
    filter.element,
    filter.rarity,
    filter.keyword,
    filter.sort,
    filter.order,
    filter.showOwnedOnly,
    filter.showListedOnly,
  ]);
  
  return (
    <section className={Style.section__filter}>
      <div className={`container mx-auto ${Style.container}`}>
        <Zoom delay={350} duration={500}>
          <div className={`${Style.wrapperFilter} ${pageName === 'card' ? Style.wrapper_mycard : ''}`}>
            <div className={Style.block__left}>
              <div className={Style.search}>
                <input className="outline-none" type="text" placeholder="Search card" value={inputSearch} onChange={handleChangeSearch} onKeyDown={handleKeyDown} />
                <button onClick={submitSearch}><img src={IconSearch} width={24} /></button>
              </div>
              <div className={`${Style.filter}`}>
                <DropDown
                  title={`Show card: ${selectedShowCardLabel}`}
                  type="checkbox"
                  alignContent="right"
                >
                  <ul className="dropdown-content__list">
                    {
                    showCardOptions.length > 0 && showCardOptions.map((item, index) => {
                      const isOption = item.page.indexOf(pageName) > -1;
                      if (isOption) {
                        return (
                          <li
                            key={`dd-${index}`}
                            className="dropdown-content__list__item gap-2"
                            // onClick={() => {
                            //   const {showOwnedOnly} = showCardOptions.find((x) => x.id === item.id);
                            //   setFilter({showOwnedOnly});
                            // }}
                          >
                            <input
                              type="radio"
                              id={`dd-${index}`}
                              name={item.label}
                              value={item.id}
                              checked={item.id === showCardBy}
                              disabled={(!auth.isLoggedIn && item.id !== 'all')}
                              onChange={(e) => {
                                if (pageName === 'card') {
                                  const {showListedOnly} = showCardOptions.find((x) => x.id === item.id);
                                  console.log(showListedOnly, showCardOptions.find((x) => x.id === item.id));
                                  setFilter({showListedOnly});
                                } else {
                                  const {showOwnedOnly} = showCardOptions.find((x) => x.id === item.id);
                                  console.log(showOwnedOnly);
                                  setFilter({showOwnedOnly});
                                }
                                setShowCardBy(e.currentTarget.value);
                              }}
                            />
                            <label htmlFor={`dd-${index}`} className={(!auth.isLoggedIn && item.id !== 'all') ? 'dropdown-content__list__item__disabled' : ''}>{item.label}</label>
                          </li>
                        );
                      }
                      return (<></>);
                    })
                  }
                  
                  </ul>
                </DropDown>

                {filterTypes.map((type) => (
                  <DropDown
                    key={type.id}
                    title={capitalizeFirstLetter(type.label)}
                    type="checkbox"
                    alignContent="left"
                  >
                    <ul className="dropdown-content__list">
                      {
                        type.items.length > 0 && type.items.map((item) => (
                          dropdownItem(item, type.id)
                        ))
                      }
                      
                    </ul>
                  </DropDown>
                ))}
              </div>
            </div>
            <div className={Style.block__right}>
              <div className={`${Style.filterMobile}`}>
                <DropDown
                  title="Filter"
                  type="checkbox"
                  alignContent="left"
                >
                  <div className={Style.filterMobile__wrapper}>
                    {filterTypes.map((type, i) => (
                      <ul key={i} className="dropdown-content__list">
                        <h3>
                          {capitalizeFirstLetter(type.id)}
                        </h3>
                        
                        {
                          type.items.length > 0 && type.items.map((item) => (
                            dropdownItem(item, type.id)
                          ))
                        }
                      </ul>
                    ))}
                  </div>
                </DropDown>
              </div>
              {pageName === 'marketplace' ? (
                <DropDown
                  title={`Sort by : ${selectedOrderLabel}`}
                  type="checkbox"
                  alignContent="right"
                >
                  <ul className="dropdown-content__list">
                    {
                    orderOptions.length > 0 && orderOptions.map((item, index) => (
                      <li
                        key={`dd-${index}`}
                        className="dropdown-content__list__item"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                          setFilter({order: item.id});
                        }}
                      >
                        <span>{item.label}</span>
                      </li>
                    ))
                  }
                  
                  </ul>
                </DropDown>
              ) : (
                <DropDown
                  title={`Sort by : ${selectedSortLabel}`}
                  type="checkbox"
                  alignContent="right"
                >
                  <ul className="dropdown-content__list">
                    {
                    sortOptions.length > 0 && sortOptions.map((item, index) => (
                      <li
                        key={`dd-${index}`}
                        className="dropdown-content__list__item"
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                          setFilter({sort: item.id});
                        }}
                      >
                        <span>{item.label}</span>
                      </li>
                    ))
                  }
                  
                  </ul>
                </DropDown>
              )}
            </div>
          </div>
        </Zoom>
        <div className={`${Style.wrapperResult} ${pageName === 'card' ? Style.wrapper_mycard_result : ''}`}>
          
          {filter.keyword && (
            <Zoom duration={500}>
              <div className={Style.searchResult}>
                <div className={Style.item}>
                  Search result: "
                  {filter.keyword}
                  "
                  <RiCloseCircleFill className="close_icon" size={16} color="#1C5D79" onClick={() => removeFilter('keyword')} />
                  {/* <img src={IconClose} width={16} onClick={() => removeFilter('keyword')} /> */}
                </div>
              </div>
            </Zoom>
          )}
          
          <div className={Style.filterResult}>
            {filterTypes.map((type, i) => (
              <React.Fragment key={i}>
                {filter[type.id].length > 0 && filter[type.id].map((item, key) => {
                  const image = type.items.find((x) => x.name === item)?.image;
                  return (
                    <Zoom duration={500} key={`filter-series-${key}`}>
                      <div className={Style.item} key={`filter-series-${key}`}>
                        {image && (
                          <img src={image} width={24} />
                        )}
                        <span>{item}</span>
                        {' '}
                        <RiCloseCircleFill className="close_icon" size={16} color="#1C5D79" onClick={() => removeFilter(type.id, item)} />
                        {/* <img src={IconClose} width={16} onClick={() => removeFilter(type.id, item)} /> */}
                      </div>
                    </Zoom>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          {
            filter.series.concat(filter.rarity).concat(filter.element).length > 0 && (
              <Zoom duration={500}>
                <a onClick={() => removeFilter('all')} className={Style.resetFilter}>Reset Filter</a>
              </Zoom>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default SectionFilter;
