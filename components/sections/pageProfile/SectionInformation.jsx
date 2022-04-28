import React from 'react';
import {Zoom} from 'react-reveal';
// import {AiOutlineQuestionCircle} from 'react-icons/ai';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {Modal} from '@modules';
import Style from '@styles/page/pageProfile/sectionInformation.module.scss';
import {currencyFormat} from '@utils/helper';
import moment from 'moment';
/* import images */
import IconPlusWhite from '@images/icon/icon-plus-white.png';
import IconUpGreen from '@images/icon/icon-up-green.png';
import IconDownRed from '@images/icon/icon-down-red.png';
import IconHistory from '@images/icon/icon-history.png';
import IconDD from '@images/icon/icon-dd.png';
import IconSwap from '@images/icon/icon-swap.png';
import _ from 'lodash';

const SectionInformation = () => {
  const {modal, wallet, profile, auth} = useState();
  const {showModal, hideModal, getDDBalanceHistory, getCardListOwned} = useActions();
  const [mycards, setMyCards] = React.useState();
  const getHistory = () => {
    getDDBalanceHistory({limit: 8, offset: 0, order: 'desc'}).then(() => {
      showModal('dd-balance-history');
    });
  };
  React.useEffect(() => {
    getCardListOwned({pageName: 'profile'}).then(res => {
      setMyCards(res);
    });
    return () => {};
  }, [auth.isLoggedIn]);

  const currentDD = currencyFormat(wallet?.diad?.value, '', wallet?.diad?.symbol);

  return (
    <section className={Style.section__information}>
      <div className={`container mx-auto flex flex-col items-center ${Style.container}`}>
        {/* <Zoom duration={500} delay={350}>
          <div className={Style.wrapper}>
            <h1 className="flex">
              <img width="32" height="32" src={IconDD} />
              $DD Balance
            </h1>

            <span className={Style.currentDD_label}>Current</span>
            <div className="flex md:flex-row flex-col md:items-center justify-between">
              <span className={Style.currentDD_value}>{currentDD}</span>
              <div className="flex gap-6">
                <Button className="is-blue-light is-rounded is-extra-small is-semibold">
                  <div className="flex flex-row items-center gap-4 py-3 px-5">
                    <img width="22" height="22" src={IconPlusWhite} />
                    Get DD
                  </div>
                </Button>
                <Button className="is-blue-light is-rounded is-extra-small is-semibold">
                  <div className="flex flex-row items-center gap-4 py-3 px-5">
                    <img width="22" height="22" src={IconSwap} />
                    Swap
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 mt-8">
              <img width="16" height="16" src={IconUpGreen} />
              <span className={Style.earnedDD_value}>55 DD</span>
            </div>
            <span className={Style.earnedDD_label}>Today’s DD earned</span>

            <div className={`p-6 mt-6 ${Style.detailDD}`}>
              <span className={Style.detailDD_label}>Detail</span>
              <div className="flex flex-row items-center gap-12 mt-2">
                <span className={Style.detailDD_value}>55 DD</span>
                <span className={Style.detailDD_desc}>Generated from cards owned</span>
              </div>
            </div>

            <div className="flex justify-center my-12">
              <Button
                className="is-transparent is-rounded is-extra-small is-semibold"
                onClick={() => {
                  getHistory();
                }}
              >
                <div className="flex flex-row items-center gap-4 py-1 px-5">
                  <img width="22" height="22" src={IconHistory} />
                  See History
                </div>
              </Button>
            </div>

            <div className="flex justify-center mt-12">
              <Button className="is-semibold is-text" href="/learn#dd-coin">
                Learn about $DD
              </Button>
            </div>

          </div>
        </Zoom> */}
        <Zoom duration={500} delay={350}>
          <div className={`${Style.wrapper} my-5 gap-5`}>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col w-3/12 sm:w-5/12">
                <h1 className="flex justify-start items-center gap-2">
                  My Cards
                  {/* <AiOutlineQuestionCircle size="20" color="rgba(12, 53, 59, 0.2)" /> */}
                </h1>
                <div>
                  <img src="https://derrint.sirv.com/Images/diamond-hands/profile/illustration-mycards.png" width="120" />
                </div>
              </div>
              <div className="flex flex-col mt-3 w-9/12 sm:w-7/12">
                {mycards?.total > 0 ? (
                  <>
                    <span className={Style.myCards_label}>Cards Owned</span>
                    <span className={Style.myCards_value}>{mycards?.total}</span>
                    <div className="flex justify-start my-12">
                      <Button
                        className="is-transparent is-rounded is-extra-small is-semibold"
                        href="/card"
                      >
                        <div className="flex flex-row items-center gap-4 py-1 px-5">
                          See all
                        </div>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={Style.myCards_label}>No card owned</span>
                    <span className={Style.myCards_description}>
                      Seems like you don’t have a card at the moment. To play the game, you need a set of NFT card.
                      <br />
                      Get them from Lootbox or Marketplace.
                    </span>
                    <div className="flex justify-start my-12">
                      <Button
                        className="is-transparent is-rounded is-extra-small is-semibold"
                        href="/shop"
                      >
                        <div className="flex flex-row items-center gap-4 py-1 px-5">
                          Buy Lootbox Now
                        </div>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Zoom>
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'dd-balance-history'}
        onClose={() => hideModal()}
      >
        <div className={Style.modal}>
          <h1>DD Balance History</h1>
          <div className={Style.table_wrapper}>
            <table>
              <tr className={Style.table_header_row}>
                <th className="pb-5 pr-16 text-left">Date</th>
                <th className="pb-5 pr-16 text-right">Amount</th>
                <th className="pb-5 pr-16 text-left">Type</th>
                <th className="pb-5 pr-16 text-left">Status</th>
                <th className="pb-5 text-right">Balance</th>
              </tr>
              {profile?.ddBalanceHistory?.map((h, i) => {
                const paddingTop = i === 0 ? 'pt-6' : 'pt-3';
                return (
                  <tr key={i}>
                    <td className={`${paddingTop} pr-16 text-left`}>{moment(h.createdAt * 1000).format('MMM DD, YYYY HH:mm')}</td>
                    <td className={`${paddingTop} pr-16 text-right flex flex-row items-center justify-end`}>
                      <div className="pr-3">
                        {h.type === 'In' ? (
                          <img width="10" height="10" src={IconUpGreen} />
                        ) : (
                          <img width="10" height="10" src={IconDownRed} />
                        )}
                      </div>
                      {currencyFormat(h.amount, '', 'DD')}
                    </td>
                    <td className={`${paddingTop} pr-16 text-left`}>{h.description}</td>
                    <td className={`${paddingTop} pr-16 text-left capitalize`}>
                      <div className={h.status === 'Success' ? 'text-success' : 'text-danger'}>
                        {h.status}
                      </div>
                    </td>
                    <td className={`${paddingTop} text-right`}>{currencyFormat(h.totalBalance, '', 'DD')}</td>
                  </tr>
                );
              })}
            </table>
            {_.isEmpty(profile?.ddBalanceHistory) && (
              <div className="flex justify-center m-10">
                <span>You don't have any transaction yet</span>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SectionInformation;
