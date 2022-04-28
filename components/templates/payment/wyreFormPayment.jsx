import React from 'react';
import publicIp from "public-ip";
import Select, {components} from 'react-select';
import InputMask from 'react-input-mask';
import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';
import {toast} from 'react-toastify';

const WyreFormPayment = ({summary}) => {
  const {setModalStep, setModalFullScreen, setModalNeedAction, getCountryList, buyLootboxCardProses, buyMarketplaceCardProses, setLoading} = useActions();
  const {modal, payment} = useState();
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [countriesName, setCountriesName] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState({});
  const [expirationTmp, setExpirationTmp] = React.useState('');
  const [phoneTmp, setPhoneTmp] = React.useState('');
  const [dataForm, setDataForm] = React.useState({
    purchasesId: summary.purchasesId,
    debitCardNumber: '',
    debitCardYear: '',
    debitCardMonth: '',
    debitCardCVV: '',
    addressCountry: '',
    addressState: '',
    addressCity: '',
    addressStreet1: '',
    addressPostalCode: '',
    givenName: '',
    familyName: '',
    email: '',
    phone: '',
  });
  React.useEffect(() => {
    getCountryList().then((res) => {
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
      console.log(_selected);
      setPhoneTmp(payment.formRequest?.phone.replace('+'+ _selected?.phonePrefix, ''));
      setSelectedCountry({..._selected, img_uri: `https://flagcdn.com/h20/`+ payment.formRequest?.addressCountry.toLowerCase() +`.png`}); 
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
    const ip_address = await publicIp.v4({
      fallbackUrls: [
        'https://ifconfig.co/ip'
      ]
    });
    if (payment.module === 'marketplace') {
      setModalNeedAction(false);
      setModalFullScreen(false);
      setLoading(true);
      buyMarketplaceCardProses({...dataForm, ip: ip_address}).then((res) => {
        setLoading(false);
        setModalNeedAction(true);
        setModalFullScreen(true);
        setModalStep(4);
      }).catch((e) => {
        console.log(e);
        toast.error(e.error || e);
        setLoading(false);
        setModalNeedAction(true);
        setModalFullScreen(true);
      });
    } else {
      setModalNeedAction(false);
      setModalFullScreen(false);
      setLoading(true);
      buyLootboxCardProses({...dataForm, ip: ip_address}).then((res) => {
        setLoading(false);
        setModalNeedAction(true);
        setModalFullScreen(true);
        setModalStep(4);
      }).catch((e) => {
        console.log(e);
        toast.error(e.error || e);
        setLoading(false);
        setModalNeedAction(true);
        setModalFullScreen(true);
      });
    }
  }
  return (
    <div className="payment-form">
      <div className="flex flex-col items-center">
        <div className="title">Enter payment information</div>
        <div className="subtitle">
          Enter your personal information as it appears
          <br />
          on your bank account
        </div>
      </div>
      <div className="flex flex-col">
        <form className="form__payment">
          <div className="title-section px-3">Card Info</div>
          <div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input className="outline-none" type="text" value={dataForm.givenName} name="firstname" placeholder="First name*" onChange={(e) => setDataForm({...dataForm, givenName: e.target.value})} />
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <input className="outline-none" type="text" value={dataForm.familyName} name="lastname" placeholder="Last name*" onChange={(e) => setDataForm({...dataForm, familyName: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full px-3">
                <input className="outline-none" type="text" value={dataForm.debitCardNumber} name="cardnumber" placeholder="Card number*" onChange={(e) => setDataForm({...dataForm, debitCardNumber: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <InputMask 
                  name="expiration" 
                  type="text"
                  mask="99/9999" 
                  className="outline-none" 
                  placeholder="Expiration* (MM/YYYY)"
                  value={expirationTmp}
                  onChange={(e) => {
                    if(e.target.value) {
                      // console.log(e.target.value)
                      setExpirationTmp(e.target.value);
                      const val = e.target.value.split('/');
                      setDataForm({...dataForm, debitCardMonth: val[0], debitCardYear: val[1]});
                    }
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <input className="outline-none" maxLength="4" type="text" value={dataForm.debitCardCVV} name="ccv" placeholder="CCV*" onChange={(e) => setDataForm({...dataForm, debitCardCVV: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="title-section px-3">Billing Address</div>
          <div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Select
                  className="country-dropdown"
                  classNamePrefix="select"
                  placeholder="Select country*"
                  name="country"
                  value={countriesName.find((o) => o.value=== dataForm.addressCountry)}
                  // value={() => {
                  //   const _selected = countriesName.find((o) => o.value=== dataForm.addressCountry)
                  //   console.log(_selected);
                  //   setSelectedCountry({..._selected, img_uri: `https://flagcdn.com/h20/`+ e.value.toLowerCase() +`.png`});
                  //   return _selected;
                  // }}
                  options={countriesName}
                  onChange={(e) => {
                    const _selected = countries.find((o) => o.code === e.value);
                    setDataForm({...dataForm, addressCountry: e.value, phone: '+'+ _selected.phonePrefix + phoneTmp});
                    setSelectedCountry({..._selected, img_uri: `https://flagcdn.com/h20/`+ e.value.toLowerCase() +`.png`});
                  }}
                />
                {/* <input className="outline-none" type="text" name="selectcountry" placeholder="Select country*" onChange={(e) => setDataForm({...dataForm, addressCountry: e.target.value})} /> */}
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <input className="outline-none" type="text" value={dataForm.addressState} name="state" placeholder="State*" onChange={(e) => setDataForm({...dataForm, addressState: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full px-3">
                <input className="outline-none" type="text" value={dataForm.addressStreet1} name="address" placeholder="Address*" onChange={(e) => setDataForm({...dataForm, addressStreet1: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className="outline-none"
                  type="text"
                  value={dataForm.addressPostalCode}
                  name="zipcode"
                  placeholder="Portal/ZIP code*"
                  onChange={(e) => {
                    setDataForm({...dataForm, addressPostalCode: e.target.value});
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 ">
                <input className="outline-none" type="text" value={dataForm.addressCity} name="city" placeholder="City*" onChange={(e) => setDataForm({...dataForm, addressCity: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="title-section px-3">Contact</div>
          <div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full px-3">
                <input className="outline-none" type="text" value={dataForm.email} name="email" placeholder="Email*" onChange={(e) => setDataForm({...dataForm, email: e.target.value})} />
              </div>
            </div>
            <div className="form-control mb-5 flex flex-wrap">
              <div className="w-full px-3">
                <div className="input-box">
                  <img className="img-prefix" src={selectedCountry.img_uri} />
                  <span className="prefix">+{selectedCountry?.phonePrefix}</span>
                  <input className="outline-none" type="text" value={phoneTmp} name="phone" onChange={(e) => {
                    if(e.target.value !== '') {
                      setPhoneTmp(e.target.value);
                      setDataForm({...dataForm, phone: '+'+ selectedCountry.phonePrefix + e.target.value});
                    } else {
                      setPhoneTmp('');
                      setDataForm({...dataForm, phone: ''})
                    }
                  }} />
                </div>
                {/* <input className="outline-none" type="text" name="phone" onChange={(e) => setDataForm({...dataForm, addressStreet1: e.target.value})} /> */}
              </div>
            </div>
          </div>
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
          <div>Submit</div>
        </Button>
      </div>
    </div>
  );
};

export default WyreFormPayment;
