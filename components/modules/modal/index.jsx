/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Zoom} from 'react-reveal';
import {RiCloseCircleFill, RiCloseCircleLine} from 'react-icons/ri';

import {useActions, useState} from '@overmind/index';

/* import images */
// import IconClose from '@images/icon/icon-close.png';
// import IconClosePrimary from '@images/icon/icon-close-primary.png';
// import IconCloseThin from '@images/icon/icon-close-circle-thin.png';
import IconBackThin from '@images/icon/icon-back-circle-thin.png';

const Modal = ({
  show,
  onClose,
  classNames,
  children,
  isUsingStep,
  modalStyle,
  headerStyle,
  bodyStyle,
  noCloseButton,
  type,
}) => {
  const {modal, transfer} = useState();
  const {setModalStep} = useActions();

  const [isBrowser, setIsBrowser] = React.useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  useEffect(() => {
    if (show) {
      if (type === 'toast-dialog') {
        document.getElementById('main-component').style.filter = 'blur(4px)';
      } else if (type === 'toast-cookies') {
        document.getElementById('main-component').style.filter = 'none';
      } else {
        document.getElementById('main-component').style.filter = 'blur(8px)';
      }
    } else {
      document.getElementById('main-component').style.filter = 'none';
    }
  }, [show]);

  const handleBack = (e) => {
    e.preventDefault();
    const prevStep = modal.step - 1;
    setModalStep(prevStep);
  };

  const handleClose = (e) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  };

  const backIcon = IconBackThin;
  const closeIcon = isUsingStep ? <RiCloseCircleLine className="close_icon is-large" color="#1C5D79" />
    : classNames?.includes('is-blue') ? <RiCloseCircleFill className="close_icon" color="#FFFFFF" /> : <RiCloseCircleFill className="close_icon" color="#1C5D79" />;

  const modalContent = show ? (
    <>
      {type === 'toast-dialog' ? (
        <div className="overlay">
          <div className="overlay__backdrop" onClick={handleClose} />
      
          <Zoom duration={500}>
            <div className={`dh__toast-message ${classNames}`}>
              {modal.needAction && (
              <div className="header">
                {isUsingStep && modal.step > 1 && modal.step !== 5 && (
                <a className="back" href="#" onClick={handleBack}>
                  <img className={`back_icon ${isUsingStep ? 'is-large' : ''}`} src={backIcon} />
                </a>
                )}
                {onClose && !noCloseButton && (
                <a className="close" href="#" onClick={handleClose}>
                  {closeIcon}
                </a>
                )}
              </div>
              )}
              <div className="body" style={bodyStyle}>
                {children}
              </div>
            </div>
          </Zoom>
        </div>
      ) : type === 'toast-cookies' ? (
        <div className="flex justify-center">
          <Zoom duration={500}>
            <div className={`dh__toast-cookies ${classNames}`}>
              {modal.needAction && (
              <div className="header">
                {isUsingStep && modal.step > 1 && modal.step !== 5 && (
                <a className="back" href="#" onClick={handleBack}>
                  <img className={`back_icon ${isUsingStep ? 'is-large' : ''}`} src={backIcon} />
                </a>
                )}
                {onClose && !noCloseButton && (
                <a className="close" href="#" onClick={handleClose}>
                  {closeIcon}
                </a>
                )}
              </div>
              )}
              <div className="body" style={bodyStyle}>
                {children}
              </div>
            </div>
          </Zoom>
        </div>
      ) : (
        <div className="overlay">
          <div className="overlay__backdrop" onClick={handleClose} />
      
          <Zoom duration={500}>
            <div className={`dh__modal ${classNames}`} style={modalStyle}>
              {modal.needAction && (
              <div className="header" style={headerStyle}>
                {modal.type === 'transfer-wallet' && modal.step === 2 && transfer.currency !== 'DD' && (
                  <a className="back flex flex-row items-center" href="#" onClick={handleBack}>
                    <img className={`back_icon ${isUsingStep ? 'is-large' : ''}`} src={backIcon} />
                    <span className="mx-2 edit">Edit</span>
                  </a>
                )}
                {isUsingStep && modal.step > 1 && modal.step !== 5 && modal.type !== 'transfer-wallet' && (
                  <a className="back" href="#" onClick={handleBack}>
                    <img className={`back_icon ${isUsingStep ? 'is-large' : ''}`} src={backIcon} />
                  </a>
                )}
                {onClose && !noCloseButton && (
                <a className="close" href="#" onClick={handleClose}>
                  {closeIcon}
                </a>
                )}
              </div>
              )}
              <div className={`body ${type === 'message' ? 'scrollbar-on' : ''}`} style={bodyStyle}>
                {children}
              </div>
            </div>
          </Zoom>
        </div>
      )}
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root'),
    );
  }
  return null;
};

export default Modal;
