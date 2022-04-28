import React from 'react';
import ReactLoading from 'react-loading';
import {LootboxContents} from '@templates';
import {Zoom, Fade} from 'react-reveal';
import {Modal} from '@modules';
import {useState, useActions} from '@overmind';
import {Button} from '@elements';
import Style from '@styles/page/pageInbox/SectionListInbox.module.scss';
import {MessageDetail} from '@templates';
import {toast} from 'react-toastify';
import IconRight from '@images/icon/icon-right.blue.png';
import moment from 'moment';

const SectionListInbox = () => {
  const {inbox, modal, auth, lootboxes, filter, pagination} = useState();
  const {
    getinboxUnreadCount, getListInbox, getMessageInbox, markInboxAsRead, showModal, hideModal, setFilter, setPagination,
  } = useActions();

  const [activeTab, setActiveTab] = React.useState('general');
  const [inboxTypes, setInboxTypes] = React.useState([]);
  const [selectedMessage, setSelectedMessage] = React.useState({});
  const [selectedMessageDetail, setSelectedMessageDetail] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMoreData, setIsLoadingMoreData] = React.useState(false);
  const inboxs = [
    {
      name: 'General',
      type: 'general',
    },
    {
      name: 'Payment',
      type: 'payment',
    },
    {
      name: 'Card updates',
      type: 'card-updates',
    },
    {
      name: 'Daily quest',
      type: 'daily-quest',
    },
  ];
  
  const setUnreadCount = () => {
    getinboxUnreadCount().then((unreadCount) => {
      const types = inboxs.map((item) => {
        const newItem = {...item, count: unreadCount.res.find((o) => o.category === item.type).count};
        return newItem;
      });
      setInboxTypes(types);
    });
  };
  // React.useEffect(() => {
  //   if (auth.isLoggedIn) {
  //     setUnreadCount();
  //   }
  //   return () => {};
  // }, []);
  // React.useEffect(() => {
  //   if (auth.isLoggedIn) {
  //     // const activeData = inboxs.find((x) => x.type === activeTab);
  //     setUnreadCount();
  //     getListInbox({limit: filter.limit, offset: filter.offset, type: activeTab}).catch((err) => {
  //       toast.error(err.error);
  //     });
  //   }
  //   return () => {};
  // }, [auth.isLoggedIn]);

  React.useEffect(() => {
    if (auth.isLoggedIn) {
      setIsLoading(true);
      // const activeData = inboxs.find((x) => x.type === activeTab);
      setFilter({limit: 8, offset: 0});
      setPagination({current: null, total: null});
      setUnreadCount();
      getListInbox({limit: 8, offset: 0, type: activeTab, mode: 'reload'}).then(() => {
        setIsLoading(false)
      }).catch((err) => {
        toast.error(err.error);
      });
    }

    return () => {};
  }, [activeTab, auth.isLoggedIn]);
  const openMessage = async (item) => {
    setSelectedMessage(item);
    if (item.extraType !== 'lootbox-purchase-reminder' && item.title !== 'Lootbox Purchase Reminder') {
      await getMessageInbox({type: activeTab, inboxId: item.id}).then((res) => {
        setSelectedMessageDetail(res.res);
        if (activeTab === 'general' && res.res?.extraType !== 'lootbox-open-reminder') {
          setSelectedMessageDetail(item);
        }
        showModal('message-detail');
      });
    } else {
      setSelectedMessageDetail(item);
      showModal('message-detail');
    }
    if (!item.isRead) {
      await markInboxAsRead({ids: [item.id]});
    }
    await setUnreadCount();
    await getListInbox({limit: inbox.list.length, offset: 0, type: activeTab, mode: 'reload'}).catch((err) => {
      toast.error(err.error);
    });
    // console.log(item);
  };
  const buyLootboxAction = () => {
    hideModal();
    location.href = "/shop";
  };
  // React.useEffect(() => {
  //   if (inboxs) {
  //     // const activeData = inboxs.find((x) => x.type === activeTab);
  //     getListInbox({type: activeTab});
  //     // .then((res) => {
  //       // setData({
  //       //   ...activeData,
  //       //   list: res.list,
  //       // });
  //     // });
  //     // setTimeout(() => {
  //     //   setData(activeData);
  //     // }, 20);
  //   }
  const fetchMoreData = async () => {
    await setIsLoadingMoreData(true);
    const {current, total} = pagination;
    const {limit, offset} = filter;
    let page = current;
    let newOffset = 0;
    page = current + 1;
    newOffset = offset + limit;
    if (page <= total ) {
      console.log('...more data');
      await setFilter({offset: newOffset});
      await setPagination({current: page});
      await getListInbox({limit: filter.limit, offset: newOffset, type: activeTab}).catch((err) => {
        toast.error(err.error);
      });
    }
    await setIsLoadingMoreData(false);
  }
  const listInnerRef = React.useRef();

  const onScroll = () => {
    if (listInnerRef.current && inbox.total > 0) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        fetchMoreData();
      }
    }
  }
  return (
    <section className={`mb-20 ${Style.section__listInbox}`}>
      <Zoom duration={500} bottom delay={500}>
        <div className={`container mx-auto ${Style.container}`}>
          <div className={Style.tab}>
            {inboxTypes && inboxTypes.map((tab, i) => {
              const activeClass = activeTab === tab.type ? Style.active : '';
              const delay = 150 + (i * 50);
              return (
                <Fade duration={500} bottom delay={delay} key={tab.type}>
                  <Button
                    key={tab.type}
                    className={`${Style.tab_item} ${activeClass}`}
                    onClick={() => {
                      setActiveTab(tab.type);
                    }}
                  >
                    <span className={`${Style.title} ${activeClass}`}>{tab.name}</span>
                    {tab.count > 0 && (
                      <span className={`${Style.badge}`}>{tab.count}</span>
                    )}
                  </Button>
                </Fade>
              );
            })}
          </div>
          {/* <div className={Style.wrapper}>
            <div className={Style.wrapperScrollable}>
              <div className={Style.content}>
                {(inbox?.list && inbox.list.length > 0) ? (
                  <Fade delay={250}>
                    <div className={Style.messageWrapper}>
                      {inbox?.list && inbox?.list.length > 0 && inbox?.list.map((item, i) => {
                        const delay = 500 + (i * 100);
                        const unreadClass = !item.read ? Style.unread : '';
                        const firstItemClass = i === 0 ? Style.borderRadiusFirstRow : '';
                        return (
                          <Fade bottom delay={delay} key={`list-message-${i}`}>
                            <div className={`${Style.messageWrapper_item} ${unreadClass} ${firstItemClass}`} key={`list-message-${i}`}>
                              <Button
                                key={`list-message-button-${i}`}
                                onClick={() => {
                                  openMessage(item);
                                }}
                              >
                                <div className={Style.messageWrapper_item_indicator}>
                                  {!item.isRead && (
                                    <div className={Style.messageWrapper_item_indicator_circle} />
                                  )}
                                </div>
                                <div className={Style.messageWrapper_item_message}>
                                  <span>{item.title}</span>
                                  <div className={Style.messageWrapper_item_message_desc}>
                                    <span>{item.description}</span>
                                  </div>
                                </div>
                              </Button>
                            </div>
                          </Fade>
                        );
                      })}
                    </div>
                  </Fade>
                ) : (
                  <div className={`flex flex-col justify-center items-center ${Style.messageEmpty}`}>
                    <span className={Style.title}>There is no mail today</span>
                    <span className={Style.subtitle}>You will get notification when the mail comes in</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}
          <div className={Style.wrapper}>
            <div 
              className={Style.content} 
              onScroll={onScroll}
              ref={listInnerRef}
            >
              {isLoading ? (
                <div className={`flex flex-col justify-center items-center ${Style.messageEmpty}`}>
                  <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
                </div>
              ) : (
                <>
                  {(inbox?.list && inbox.list.length > 0) ? (
                    <Fade duration={500} delay={250}>
                      <div className={Style.messageWrapper}>
                        {inbox?.list && inbox?.list.length > 0 && inbox?.list.map((item, i) => {
                          const delay = 100 + (i * 50);
                          const unreadClass = !item?.isRead ? Style.unread : '';
                          const firstItemClass = i === 0 ? Style.borderRadiusFirstRow : '';
                          return (
                            <Fade duration={500} bottom delay={delay} key={`list-message-${i}`}>
                              <div className={`${Style.messageWrapper_item} ${unreadClass} ${firstItemClass}`} key={`list-message-${i}`}>
                                <Button
                                  key={`list-message-button-${i}`}
                                  onClick={() => {
                                    openMessage(item);
                                  }}
                                >
                                  <div className="flex flex-row justify-between items-center">
                                    <div>
                                      <div className={Style.messageWrapper_item_indicator}>
                                        {!item?.isRead && (
                                          <div className={Style.messageWrapper_item_indicator_circle} />
                                        )}
                                      </div>
                                      <div className={Style.messageWrapper_item_message}>
                                        <span>{item.title}</span>
                                        <div className={Style.messageWrapper_item_message_desc}>
                                            <span>{item.description}</span>
                                        </div>
                                        <div className={Style.messageWrapper_item_message_date}>
                                          <span>{moment(item.timestamp * 1000).format('MM/DD/YYYY - hh:mm A')}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={Style.messageWrapper_item_icon}>
                                      <img src={IconRight} />
                                    </div>
                                  </div>
                                </Button>
                              </div>
                            </Fade>
                          );
                        })}
                        {isLoadingMoreData && (
                          <div className={`flex flex-col justify-center items-center`}>
                            <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
                          </div>
                        )}
                      </div>
                    </Fade>
                  ) : (
                    <div className={`flex flex-col justify-center items-center ${Style.messageEmpty}`}>
                      <span className={Style.title}>There is no mail today</span>
                      <span className={Style.subtitle}>You will get notification when the mail comes in</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Zoom>
      <Modal
        show={modal.isVisible && modal.type === 'message-detail'}
        onClose={() => hideModal()}
        type={'message'}
      >
        <MessageDetail
          message={selectedMessage}
          data={selectedMessageDetail}
          category={activeTab}
        />
      </Modal>
      <Modal
        show={modal.isVisible && modal.type === 'lootbox-content'}
        onClose={() => hideModal()}
      >
        <LootboxContents data={lootboxes.opened} buyLootboxAction={buyLootboxAction} />
      </Modal>
    </section>
  );
};

export default SectionListInbox;
