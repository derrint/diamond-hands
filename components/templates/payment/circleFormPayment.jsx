/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import publicIp from 'public-ip';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import {toast} from 'react-toastify';
import {createMessage, encrypt, readKey} from 'openpgp';

import {Config} from '@constant';
import {Button} from '@elements';
import {useActions, useState} from '@overmind/index';

const CircleFormPayment = () => {
  const {
    setModalStep,
    getCountryListCircle,
    buyMarketplaceCardProses,
    setLoading,
    getPublicKeyCircle,
    lootboxProcessPaymentCircle,
  } = useActions();
  const {modal, payment, lootboxes} = useState();

  const [isFormValid, setIsFormValid] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [countriesName, setCountriesName] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState({});
  const [expirationTmp, setExpirationTmp] = React.useState('');
  const [phoneTmp, setPhoneTmp] = React.useState('');

  const [cardDetails, setCardDetails] = React.useState({
    number: '',
    cvv: '',
  });

  const webhookUrl = Config.webURL + 'payment';

  const [dataForm, setDataForm] = React.useState({
    lootboxId: lootboxes.selected.id,
    // keyId: '',
    // encryptedData: '',
    expMonth: null,
    expYear: null,
    name: '',
    line1: '',
    line2: '-',
    city: '',
    district: '',
    country: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    // clientIpAddress: '',
    // verificationSuccessUrl: 'http://localhost:4000/payment/success/',
    // verificationFailureUrl: 'http://localhost:4000/payment/failure/',
  });

  React.useEffect(() => {
    getCountryListCircle().then((res) => {
      setCountries(res);
      const _countriesName = res.map((each) => {
        const obj = {value: each.code, label: each.name};
        return obj;
      });
      setCountriesName(_countriesName);
    });
    return () => {};
  }, []);

  React.useEffect(() => {
    if (payment.formRequest !== null) {
      setExpirationTmp(payment.formRequest?.debitCardMonth + '-' + payment.formRequest?.debitCardYear);
      setDataForm(payment.formRequest);
      const _selected = countries.find((o) => o.code === payment.formRequest?.addressCountry);
      // console.log(_selected);
      setPhoneTmp(payment.formRequest?.phone?.replace('+' + _selected?.phonePrefix, ''));
      setSelectedCountry({..._selected, img_uri: 'https://flagcdn.com/h20/' + payment.formRequest?.addressCountry?.toLowerCase() + '.png'});
    }
    return () => {};
  }, [countries]);

  React.useEffect(() => {
    setIsFormValid(false);
    if (Object.values(dataForm).indexOf('') === -1) {
      setIsFormValid(true);
    }
    return () => {};
  }, [dataForm]);

  const submit = async () => {
    try {
      // ----- get IP Address -----
      const ipAddress = await publicIp.v4({
        fallbackUrls: [
          'https://ifconfig.co/ip',
        ],
      });
      
      // ----- start of - ENCRYPT CARD DETAILS -----

      const {publicKey, keyId} = await getPublicKeyCircle();
      
      const encryptData = async (dataToEncrypt) => {
        const decodedPublicKey = await readKey({armoredKey: atob(publicKey)});
        const message = await createMessage({text: JSON.stringify(dataToEncrypt)});
        const encrypted = await encrypt({
          message,
          encryptionKeys: decodedPublicKey,
        }).then((ciphertext) => ({
          encryptedMessage: btoa(ciphertext),
          keyId,
        }));

        return encrypted;
      };

      const {encryptedMessage} = await encryptData(cardDetails);

      // ----- end of - ENCRYPT CARD DETAILS -----

      if (payment.module === 'marketplace') {
        setLoading(true);
        buyMarketplaceCardProses({
          ...dataForm,
          clientIpAddress: ipAddress,
          keyId,
          encryptedData: encryptedMessage,
          verificationSuccessUrl: webhookUrl + '/success',
          verificationFailureUrl: webhookUrl + '/failure',
        }).then(() => {
          setLoading(false);
          setModalStep(4);
        }).catch((e) => {
          // console.log(e);
          toast.error(e.error || e);
          setLoading(false);
        });
      } else {
        setLoading(true);
        lootboxProcessPaymentCircle({
          ...dataForm,
          clientIpAddress: ipAddress,
          keyId,
          encryptedData: encryptedMessage,
          verificationSuccessUrl: webhookUrl + '/success',
          verificationFailureUrl: webhookUrl + '/failure',
        }).then(({data}) => {
          const {requiredAction} = data;
          const {redirectUrl} = requiredAction;
          window.open(redirectUrl, '_blank', 'toolbar=0,location=0,menubar=0,width=700,height=700');

          setLoading(false);
          setModalStep(2.5);
        }).catch((e) => {
          // console.log(e);
          toast.error(e.error || e);
          setLoading(false);
        });
      }
    } catch (e) {
      toast.error(e.error || e);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    const prevStep = modal.step - 1;
    setModalStep(prevStep);
  };

  return (
    <div className="payment-form">
      <div className="flex flex-col">
        <form className="form__payment">
          <div className="title-section mb-5 px-3">Card Info</div>
          <div>
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <div className="label">Name (as it appears on your card)</div>
                <input className="outline-none" type="text" value={dataForm.name} name="name" onChange={(e) => setDataForm({...dataForm, name: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <div className="label">Card number</div>
                <input className="outline-none" type="text" value={cardDetails.number} name="debitCardNumber" onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="label">Valid through</div>
                <InputMask
                  name="expiration"
                  type="text"
                  mask="99/9999"
                  className="outline-none"
                  placeholder="MM/YYYY"
                  value={expirationTmp}
                  onChange={(e) => {
                    if (e.target.value) {
                      // console.log(e.target.value)
                      setExpirationTmp(e.target.value);
                      const val = e.target.value.split('/');
                      setDataForm({
                        ...dataForm,
                        expMonth: parseInt(val[0], 10),
                        expYear: parseInt(val[1], 10),
                      });
                    }
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <div className="label">Security code</div>
                <input className="outline-none" maxLength="4" type="text" value={cardDetails.cvv} name="cvv" placeholder="CVV" onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="title-section mt-10 mb-5 px-3">Billing Address</div>
          
          <div>
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="label">Country</div>
                <Select
                  className="country-dropdown"
                  classNamePrefix="select"
                  name="country"
                  value={countriesName.find((o) => o.value === dataForm.country)}
                  options={countriesName}
                  onChange={(e) => {
                    const _selected = countries.find((o) => o.code === e.value);
                    setDataForm({...dataForm, country: e.value, phoneNumber: '+' + _selected.phonePrefix + phoneTmp});
                    setSelectedCountry({..._selected, img_uri: 'https://flagcdn.com/h20/' + e.value.toLowerCase() + '.png'});
                  }}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 ">
                <div className="label">State / Province</div>
                <input className="outline-none" type="text" value={dataForm.district} name="state" onChange={(e) => setDataForm({...dataForm, district: e.target.value})} />
              </div>
            </div>

            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <div className="label">Residential address</div>
                <input className="outline-none" type="text" value={dataForm.line1} name="address" onChange={(e) => setDataForm({...dataForm, line1: e.target.value})} />
              </div>
            </div>
            
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 ">
                <div className="label">City</div>
                <input className="outline-none" type="text" value={dataForm.city} name="city" onChange={(e) => setDataForm({...dataForm, city: e.target.value})} />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="label">ZIP / Postal</div>
                <input
                  className="outline-none"
                  type="text"
                  value={dataForm.postalCode}
                  name="zipcode"
                  onChange={(e) => {
                    setDataForm({...dataForm, postalCode: e.target.value});
                  }}
                />
              </div>
            </div>
          </div>

          <div className="title-section mt-10 mb-5 px-3">Contact</div>
          
          <div>
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <div className="label">Email</div>
                <input className="outline-none" type="text" value={dataForm.email} name="email" onChange={(e) => setDataForm({...dataForm, email: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <div className="label">Phone Number</div>
                <div className="input-box">
                  <img className="img-prefix" src={selectedCountry.img_uri} />
                  <span className="prefix">
                    +
                    {selectedCountry?.phonePrefix}
                  </span>
                  <input
                    className="outline-none"
                    type="text"
                    value={phoneTmp}
                    name="phone"
                    onChange={(e) => {
                      if (e.target.value !== '') {
                        setPhoneTmp(e.target.value);
                        setDataForm({...dataForm, phoneNumber: '+' + selectedCountry.phonePrefix + e.target.value});
                      } else {
                        setPhoneTmp('');
                        setDataForm({...dataForm, phoneNumber: ''});
                      }
                    }}
                  />
                </div>
                {/* <input className="outline-none" type="text" name="phone" onChange={(e) => setDataForm({...dataForm, addressStreet1: e.target.value})} /> */}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <div className="flex items-center mt-10"> */}
      <div className="mt-10 flex flex-wrap">
        <div className="w-full md:w-1/2 px-3 ">
          <Button
            className="is-transparent is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
            onClick={handleBack}
          >
            <div>Back</div>
          </Button>
        </div>
        <div className="w-full md:w-1/2 px-3 ">
          <Button
            className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
            onClick={() => {
              submit();
            }}
            isDisabled={!isFormValid}
          >
            <div>Confirm purchase</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CircleFormPayment;
