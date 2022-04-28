/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useState, useActions} from '@overmind/index';
import {Button} from '@elements';
import {toast} from 'react-toastify';

const PopUpAlertOpenLootbox = () => {
  const {lootboxes} = useState();
  const {
    hideModal,
    showModal,

    // // ----- lootbox open using toast promise -----
    // openLootbox,
    // getPlayerProfile,

    // ----- lootbox open new flow -----
    openLootboxAsync,
  } = useActions();

  const openLootboxAction = () => {
    hideModal();

    // // ----- lootbox open using toast promise -----
    // toast.promise(
    //   openLootbox({}),
    //   {
    //     pending: {
    //       render() {
    //         return 'Opening Lootbox';
    //       },
    //     },
    //     success: {
    //       render() {
    //         getPlayerProfile();
    //         return 'Lootbox Opened 🎉';
    //       },
    //     },
    //     error: {
    //       render({data}) {
    //         showModal('open-lootbox-failed');
    //         return data.error;
    //       },
    //       autoClose: false,
    //     },
    //   },
    // ).then(() => {
    //   showModal('lootbox-content-global');
    // });

    // ----- lootbox open new flow -----
    openLootboxAsync({})
      .catch((e) => {
        toast.error(e?.data?.error || 'Oops, please try again in a few moments.');
        showModal('open-lootbox-failed');
      });
  };

  return (
    <div className="alertlootbox">
      <div className="mb-5">
        <span>
          Your purchase was successful. You have
          {' '}
          {lootboxes.owned}
          {' '}
          box(s) ready to open! Let's see what's in it.
        </span>
      </div>
      <div className="flex flex-row justify-end">
        <Button className="is-small is-rounded alertlootbox_button" onClick={() => hideModal()}>
          <div className="flex flex-row">
            <span className="dismiss-text-button">Dismiss</span>
          </div>
        </Button>
        <Button className="is-orange is-small is-rounded alertlootbox_button" onClick={() => openLootboxAction()}>
          <div className="flex flex-row">
            <span className="openlootbox-text-button text-center">Open Lootbox</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
export default PopUpAlertOpenLootbox;
