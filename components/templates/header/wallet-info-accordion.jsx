import React from 'react';
// import ReactTooltip from 'react-tooltip';
import Cookies from 'js-cookie';

import {HiChevronDown, HiChevronUp} from 'react-icons/hi';
import {useState, useActions} from '@overmind/index';
import {Config} from '@constant';
import {Button} from '@elements';

import IconPlusBlue from '@images/icon/icon-plus-blue.png';
import IconHistoryBlue from '@images/icon/icon-history-blue.png';
import IconSendBlue from '@images/icon/icon-send-blue.png';
import IconUSDC from '@images/icon/icon-usdc-logo.png';
import IconMatic from '@images/icon/icon-matic-logo.png';
import IconDD from '@images/icon/icon-dd.png';

const Accordion = ({data, setActiveAccordion, activeAccordion}) => {
  const {
    resetTransfer, setWalletShowing, setTransferCurrency, setModalStep, showModal,
  } = useActions();
  const {player} = useState();
  const [isActive, setIsActive] = React.useState();
  const getSymbol = (symbol) => {
    switch (symbol) {
      case 'MATIC':
        return IconMatic;
      case 'USDC':
        return IconUSDC;
      case 'DD':
        return IconDD;
      default:
        break;
    }
    return '';
  };
  
  let urlHistory = '';
  switch (data.symbol) {
    case 'MATIC':
      urlHistory = `${Config.polygonscanURL}token/${Config.currencyAddressMatic}?a=${player.walletId}`;
      break;
    case 'USDC':
      urlHistory = `${Config.polygonscanURL}token/${Config.currencyAddressUSDC}?a=${player.walletId}`;
      break;
    case 'DD':
      urlHistory = `${Config.polygonscanURL}token/${Config.currencyAddressDD}?a=${player.walletId}`;
      break;
    default:
      break;
  }
  
  const transferWalletAction = (item) => {
    resetTransfer();
    setWalletShowing(false);
    setTransferCurrency(item.symbol);
    if (data.symbol === 'DD') {
      const isCookie = Cookies.get('wallet-dd-transfer-intro');
      if (!isCookie) {
        setModalStep(0);
      } else {
        setModalStep(1);
      }
    } else {
      setModalStep(1);
    }
    // console.log(item);
    showModal('transfer-wallet');
  };
  return (
    <div
      className="wallet-accordion-info"
      onClick={() => {
        setIsActive(!isActive);
        if (activeAccordion === data.symbol) {
          setActiveAccordion('');
        } else {
          setActiveAccordion(data.symbol);
        }
      }}
    >
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <img className="wallet-accordion-info--icon" src={getSymbol(data.symbol)} />
          <span className="wallet-accordion-info--value">
            {data.value}
          </span>
          <span className="wallet-accordion-info--symbol">
            {data.symbol}
          </span>
        </div>
        <div>
          {(activeAccordion === data.symbol) ? (
            <HiChevronUp size="24" color="#1FA3DC" className="wallet-accordion-info--accordion-icon" />
          ) : (
            <HiChevronDown size="24" color="#1FA3DC" className="wallet-accordion-info--accordion-icon" />
          )}
        </div>
      </div>
      {(activeAccordion === data.symbol) && (
        <div className="wallet-accordion-info--action">
          {data.symbol !== 'DD' && (
            <div>
              <Button
                onClick={() => window.open('https://www.moonpay.com/buy/matic', '_blank')}
              >
                <img src={IconPlusBlue} />
                <span>Top Up</span>
              </Button>
            </div>
          )}
          {/* <ReactTooltip id={`top-up-${i}`} place="right" backgroundColor="#1C5D79" effect="solid">
                          <span className="w-full">Feature is not ready yet</span>
                        </ReactTooltip> */}
          <div data-tip data-for={`tf-${data.symbol}`}>
            <Button
              onClick={() => transferWalletAction(data)}
              // className={data.symbol !== 'DD' ? 'no-bg-disabled' : ''}
              // isDisabled={data.symbol !== 'DD'}
            >
              <img src={IconSendBlue} />
              <span>Transfer to Polygon wallet</span>
            </Button>
          </div>
          {/* {data.symbol !== 'DD' && (
            <ReactTooltip id={`tf-${data.symbol}`} place="right" backgroundColor="#1C5D79" effect="solid">
              <span className="w-full">Feature is not ready yet</span>
            </ReactTooltip>
          )} */}
          <Button onClick={() => window.open(urlHistory, '_blank')}>
            <img src={IconHistoryBlue} />
            <span>Transaction history</span>
          </Button>
        </div>
      )}
    </div>
  );
};
export default Accordion;
