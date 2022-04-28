import React from 'react';
import {Zoom} from 'react-reveal';

import {useActions, useState} from '@overmind/index';
import {Modal} from '@modules';
import {FormEditNickname} from '@templates';
import {truncateMiddle, copyToClipboard} from '@utils/helper';
import Style from '@styles/page/pageProfile/sectionTitle.module.scss';
import {Config} from '@constant';

/* import images */
import IconEdit from '@images/icon/icon-edit.png';
import IconCopy from '@images/icon/icon-copy.png';
// import IconDefaultProfile from '@images/icon/icon-default-profile.png';

const SectionTitle = () => {
  const {player, modal} = useState();
  const {showModal, hideModal} = useActions();

  const [walletId, setWalletId] = React.useState('');

  React.useEffect(() => {
    if (player) {
      setWalletId(player.walletId);
    }
  }, [player]);

  return (
    <section className={` ${Style.section__title}`}>
      <div className={`container mx-auto text-center ${Style.container}`}>
        <Zoom duration={500} delay={100}>
          <h1>My Profile</h1>
          <div className={`mx-auto ${Style.profile__image}`}>
            <div className={Style.image__cover}>
              <img className="mx-auto" src={Config.baseURL + player?.avatarUrl} />
              {/* <span>Lv. 3</span> */}
            </div>
          </div>
          <div className={Style.input__username}>
            <span>
              <input value={player?.userName} disabled />
            </span>
            
            <img className={Style.btn__edit} onClick={() => showModal('edit-nickname')} src={IconEdit} />
          </div>
          <div className={Style.walletInfo}>
            <span>Your Diamond Hands wallet address</span>
            <h3>
              {truncateMiddle(walletId, 11)}
              <img className={Style.btn__copy} onClick={() => copyToClipboard(walletId)} src={IconCopy} />
            </h3>
          </div>
        </Zoom>
      </div>

      <Modal
        show={modal.isVisible && modal.type === 'edit-nickname'}
        onClose={() => hideModal()}
      >
        <FormEditNickname />
      </Modal>
    </section>
  );
};

export default SectionTitle;
