/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React from 'react';
import Select from 'react-select';
import {useState, useActions} from '@overmind/index';
import {currencyFormat} from '@utils/helper';
import {Button} from '@elements';
import {toast} from 'react-toastify';

const WyreSelectCountry = () => {
  const {lootboxes, payment, cards} = useState();
  const {
    setModalStep, setLoading, buyLootbox, getCountryList, buyCardOnMarketPlaceSummary,
  } = useActions();
  const [countries, setCountries] = React.useState([]);
  const [countriesName, setCountriesName] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState();
  // const [rememberMe, setRememberMe] = React.useState(false);
  // const handleCheckbox = (event) => {
  //   const {target} = event;
  //   const value = target.type === 'checkbox' ? target.checked : target?.value;
  //   // const {name} = target;

  //   setRememberMe(value);
  // };
  React.useEffect(() => {
    getCountryList().then((res) => {
      setCountries(res);
      const tmpcountriesName = res.map((each) => {
        const obj = {value: each.code, label: each.name};
        return obj;
      });
      setCountriesName(tmpcountriesName);
    });
    return () => {};
  }, []);

  const nexStep = async () => {
    try {
      setLoading(true);
      if (payment.module === 'shop') {
        await buyLootbox({
          method: 'wyre',
          lootboxId: lootboxes.selected.id.toString(),
          country: selectedCountry.code,
        });
      } else {
        await buyCardOnMarketPlaceSummary({
          method: 'wyre',
          listingId: cards.selected.listingId,
          tokenId: cards.selected.tokenId,
          card: cards.selected,
        });
      }
      setModalStep(2);
      await setLoading(false);
    } catch (e) {
      toast.error(e.error || e);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="title">Buy Lootbox</div>
        <div className="price_usd">{currencyFormat(lootboxes.selected?.price, '$', '')}</div>
      </div>
      <div className="contries-dropdown">
        <h3 className="title">Please select your country to continue</h3>
        <div className="w-full mb-6">
          <Select
            className="country-dropdown"
            classNamePrefix="select"
            placeholder="- Select Country -"
            name="country"
            value={countriesName.find((o) => o.value === selectedCountry?.name)}
            options={countriesName}
            onChange={(e) => {
              const selected = countries.find((o) => o.code === e.value);
              setSelectedCountry(selected);
            }}
          />
        </div>
        {/* <div className="remember-me">
          <div>
            <input type="checkbox" id="checkbox-authorize-wyre" className="checkbox" checked={rememberMe} onChange={handleCheckbox} />
          </div>
          <span className="label"> Remember me </span>
        </div> */}
      </div>
      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            nexStep();
          }}
          isDisabled={!selectedCountry}
        >
          <div>Next</div>
        </Button>
      </div>
    </>
  );
};

export default WyreSelectCountry;
