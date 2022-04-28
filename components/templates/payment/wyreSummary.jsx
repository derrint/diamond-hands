/* eslint-disable react/display-name */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import Select, {components} from 'react-select';
import ReactTooltip from 'react-tooltip';

import {useActions} from '@overmind/index';
import {Button} from '@elements';
import {currencyFormat} from '@utils/helper';

import IconChevronRight from '@images/icon/icon-chevron-right.png';
import IconQuestionMark from '@images/icon/icon-question-mark-circle.png';

const WyreSummary = ({summary}) => {
  const {setModalStep} = useActions();
  const currenciesFrom = [
    {
      value: summary?.sourceCurrency,
      label: summary?.sourceCurrency,
      image: 'https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-currency-usd.png',
    },
  ];
  const currenciesTo = [
    {
      value: summary?.destCurrency,
      label: summary?.destCurrency,
      image: 'https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-currency-usdc.png',
    },
  ];

  const symbolFrom = summary?.sourceCurrency === 'USD' ? '$' : summary?.sourceCurrency;

  // const paymentMethods = [
  //   // {
  //   //   id: 'apple-pay',
  //   //   name: 'Apple Pay',
  //   //   image: 'https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-apple-pay.png',
  //   //   isEnabled: false,
  //   // },
  //   {
  //     id: summary?.paymentMethod,
  //     name: 'Card payments',
  //     image: 'https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-cc.png',
  //     isEnabled: true,
  //     isSelected: true,
  //   },
  // ];

  const paymentSummaries = [
    {
      label: `${summary?.destCurrency} Exchange Rate`,
      value: summary?.exchangeRate,
      hasTooltip: false,
      textTooltip: '',
      idTooltip: '',
    },
    {
      label: 'Transaction fee ',
      value: summary?.fees[summary?.sourceCurrency],
      hasTooltip: true,
      textTooltip: 'Wyre charges a standard transaction fee for currency exchanges. This is the only fee associated with Wyre, there are no other hidden fees.',
      idTooltip: 'transaction-fee',
    },
    {
      label: 'Network fee',
      value: summary?.fees[summary?.destCurrency],
      hasTooltip: true,
      textTooltip: 'To ensure transactions are processed on blockchain network, purchases sent to external wallet addresses are charged a “mining” or “network” fee. This fee is paid directly to the miners.',
      idTooltip: 'network-fee',
    },
    {
      label: 'Purchase Total',
      value: summary?.sourceAmount,
      hasTooltip: false,
      textTooltip: '',
      idTooltip: '',
    },
  ];

  const Control = ({children, ...props}) => (
    <components.Control {...props}>
      <img className="currency-icon" src={props.selectProps?.value.image} alt="IconChevronRight" />
      {children}
    </components.Control>
  );

  const [isWyreAuthorized, setIsWyreAuthorized] = React.useState(false);
  const handleCheckbox = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target?.value;
    // const {name} = target;

    setIsWyreAuthorized(value);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="price_usd">{currencyFormat(summary?.sourceAmountWithoutFees, symbolFrom, '')}</div>
        <div className="price_usdc">
          ~
          {' '}
          {currencyFormat(summary?.destAmount, '', summary?.destCurrency)}
        </div>
      </div>

      <div className="currency-dropdown">
        <Select
          className="currency-dropdown-from"
          classNamePrefix="select"
          defaultValue={currenciesFrom[0]}
          name="currency_from"
          options={currenciesFrom}
          components={{Control}}
        />
        <img className="chevron-right" src={IconChevronRight} alt="IconChevronRight" />
        <Select
          className="currency-dropdown-to"
          classNamePrefix="select"
          defaultValue={currenciesTo[0]}
          name="currency_to"
          options={currenciesTo}
          components={{Control}}
        />
      </div>
  
      <div className="dh-wallet-info">
        <div className="flex flex- grid grid-cols-2">
          <div className="dh-wallet-info--label">
            Diamond Hands wallet address*
          </div>
          <div className="flex dh-wallet-info--icon">
            <img data-tip data-for="contract-address" src={IconQuestionMark} />
            <ReactTooltip id="contract-address" place="right" backgroundColor="#1C5D79" effect="solid">
              <span className="w-full">This is your official in-app cryptocurrency wallet addres and can not be changed. You can safely add funds and swap from your Diamond Hands wallet</span>
            </ReactTooltip>
          </div>
        </div>
        <div className="dh-wallet-info--value">
          {summary?.dest.split(':')[1]}
        </div>
      </div>

      <div className="payment-methods">
        <h3 className="title_payment">Available payment option</h3>
        <span className="subtitle_payment">We'll add more payment methods soon</span>
        <div className="wrapper_single_card">
          <div className="item_single">
            <img className="chevron-right" src="https://derrint.sirv.com/Images/diamond-hands/payment-method/icon-cc.png" />
            <span>Card payments</span>
          </div>
        </div>
        {/* <div className="wrapper">
          {paymentMethods.map((item) => (
            <div key={item.id} className={`item ${item.id === 'debit-card' ? 'active' : ''}`}>
              <img className="chevron-right" src={item.image} />
              <span>{item.name}</span>
            </div>
          ))}
        </div> */}
      </div>

      <div className="summary">
        {paymentSummaries.map((item, i) => (
          <div key={i} className="item">
            <div className="flex flex-row">
              <span className="label">
                {item.label}
              </span>
              {item.hasTooltip && (
                <div className="items-center mt-1 ml-2">
                  <img data-tip data-for={item.idTooltip} src={IconQuestionMark} />
                  <ReactTooltip id={item.idTooltip} place="right" backgroundColor="#1C5D79" effect="solid">
                    <span className="w-full">{item.textTooltip}</span>
                  </ReactTooltip>
                </div>
              )}
            </div>
            <span className="value">
              {currencyFormat(parseFloat(item?.value).toFixed(2), '', summary?.sourceCurrency)}
            </span>
          </div>
        ))}
      </div>

      <div className="agreement">
        <div>
          <input type="checkbox" id="checkbox-authorize-wyre" className="checkbox" checked={isWyreAuthorized} onChange={handleCheckbox} />
        </div>
        <label className="label" htmlFor="checkbox-authorize-wyre">
          I authorize Wyre to debit my account indicated for the amount above on today’s date, and I agree to
          {' '}
          <Button href="https://www.sendwyre.com/user-agreement/" isExternal>Wyre’s User Agreement</Button>
        </label>
      </div>

      <div className="flex flex-col items-center mt-10">
        <Button
          className="is-blue-light is-small is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            setModalStep(3);
          }}
          isDisabled={!isWyreAuthorized}
        >
          <div>Next</div>
        </Button>
      </div>
    </>
  );
};

export default WyreSummary;
