/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useActions, useState} from '@overmind/index';
import ReactLoading from 'react-loading';

import {Button} from '@elements';
import {toast} from 'react-toastify';

const WyreAuthorize = ({summary, authorize}) => {
  const {payment} = useState();
  
  const {
    setModalStep, setLoading, lootboxPurchaseAuthorize, marketplacePurchaseAuthorize,
    lootboxPurchaseAuthorize3DS, marketplacePurchaseAuthorize3DS,
  } = useActions();
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [dataForm, setDataForm] = React.useState({
    purchasesId: summary.purchasesId, // "110440763279540225",
    authType: '', // "ALL",
    authSMS: '', // "000000",
    authCard2fa: '', // "000000"
  });
  const action3DS = () => {
    setIsloading(true);
    setDataForm({...dataForm, authType: '3DS'});
    if (payment.module === 'marketplace') {
      marketplacePurchaseAuthorize3DS(dataForm).then(() => {
        setIsloading(false);
        setModalStep(5);
      }).catch((e) => {
        console.log(e);
        toast.error(e.error || e);
        setIsloading(false);
      });
    } else {
      lootboxPurchaseAuthorize3DS(dataForm).then(() => {
        setIsloading(false);
        setModalStep(5);
      }).catch((e) => {
        console.log(e);
        toast.error(e.error || e);
        setIsloading(false);
      });
    }
    // window.open(authorize.authorization3dsUrl, '_blank');
    const popUp = window.open();
    if (popUp) {
      setTimeout(() => {
        popUp.document.location.href = authorize.authorization3dsUrl;
      }, 100);
      popUp.focus();
      popUp.document.close();
    }
  };
  React.useEffect(() => {
    // setIsFormValid(false);
    if (authorize.authorization3dsUrl !== '') {
      action3DS();
    } else if (authorize.smsNeeded && authorize.card2faNeeded) {
      setDataForm({...dataForm, authType: 'ALL'});
    } else if (authorize.card2faNeeded && !authorize.smsNeeded) {
      setDataForm({...dataForm, authType: 'CARD2FA'});
    } else if (authorize.smsNeeded && !authorize.card2faNeeded) {
      setDataForm({...dataForm, authType: 'SMS'});
    } else {
      setDataForm({...dataForm, authType: 'none'});
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    setIsFormValid(false);
    if (authorize.authorization3dsUrl !== '') {
      setIsFormValid(true);
    } else if (authorize.smsNeeded && authorize.card2faNeeded) {
      let valid = false;
      if (dataForm.authSMS !== '' && dataForm.authSMS.length === 6) {
        valid = true;
      }
      if (dataForm.authCard2fa !== '' && dataForm.authCard2fa.length === 6) {
        valid = true;
      } else {
        valid = false;
      }
      setIsFormValid(valid);
    } else if (!authorize.smsNeeded) {
      if (dataForm.authCard2fa !== '' && dataForm.authCard2fa.length === 6) {
        setIsFormValid(true);
      }
    } else if (!authorize.card2faNeeded) {
      if (dataForm.authSMS !== '' && dataForm.authSMS.length === 6) {
        setIsFormValid(true);
      }
    }
    return () => {};
  }, [dataForm]);
  
  const cardAuthorize = () => {
    marketplacePurchaseAuthorize(dataForm).then(() => {
      setLoading(false);
      setModalStep(5);
    }).catch((e) => {
      console.log(e);
      toast.error(e.error || e);
      setLoading(false);
    });
  };
  const lootboxAuthorize = () => {
    lootboxPurchaseAuthorize(dataForm).then(() => {
      setLoading(false);
      setModalStep(5);
    }).catch((e) => {
      console.log(e);
      toast.error(e.error || e);
      setLoading(false);
    });
  };
  const doAuthorize = () => {
    if (payment.module === 'marketplace') {
      cardAuthorize();
    } else {
      lootboxAuthorize();
    }
  };
  const submit = () => {
    setLoading(true);
    if (dataForm.authType === '3DS') {
      window.open(authorize.authorization3dsUrl, '_blank');
      doAuthorize();
    } else {
      doAuthorize();
    }
  };
  return (
    <div className="payment-authorize">
      {authorize.authorization3dsUrl !== '' && (
        <>
          <div className="flex flex-col items-center">
            <div className="flex flex-col note">
              <span className="title">Do not leave this page until the payment process is complete</span>
              <span className="subtitle">
                Diamond Hands is directing you to your bank’s authentication page, please enter a password associated with the card or a code sent to your phone.
                Make sure you have disabled the AdBlocker to access the authentication page.
              </span>
            </div>
          </div>
          {isloading && (
            <div className="loading-wrapper flex flex-col justify-center items-center">
              <ReactLoading className="loading" type="spin" color="#1FA3DC" height={50} width={50} />
            </div>
          )}
        </>
      )}
      {authorize.authorization3dsUrl === '' && (
        <>
          <div className="flex flex-col items-center">
            <div className="title">Enter the 6 digit verification code</div>
            <div className="subtitle">
              We just sent it to your cellphone
            </div>
          </div>
          <div className="flex flex-col">
            <form className="form__payment">
              {(dataForm.authType === 'ALL' || dataForm.authType === 'SMS') && (
              <div className="form-control mb-5 flex flex-wrap">
                <div className="w-full px-3">
                  <input className="outline-none" type="text" name="sms" maxLength={6} placeholder="SMS Authentication Code" onChange={(e) => setDataForm({...dataForm, authSMS: e.target.value})} />
                </div>
              </div>
              )}
              {(dataForm.authType === 'ALL' || dataForm.authType === 'CARD2FA') && (
              <div className="form-control mb-5 flex flex-wrap">
                <div className="w-full px-3">
                  <input className="outline-none" type="text" name="2fa" maxLength={6} placeholder="2FA Authentication Code" onChange={(e) => setDataForm({...dataForm, authCard2fa: e.target.value})} />
                </div>
              </div>
              )}
            </form>
          </div>
          <div className="flex flex-col items-center mt-10">
            <Button
              className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
              onClick={() => {
                submit();
              }}
              isDisabled={!isFormValid}
            >
              <div>Authorize Transaction</div>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default WyreAuthorize;
