/* eslint-disable camelcase */
import React from 'react';
import {useState, useActions} from '@overmind/index';
import IconSell from '@images/icon/icon-sell.png';
import IconChecked from '@images/icon/icon-checked-blue.png';
import Style from '@styles/page/pageProfile/sectionSellCard.module.scss';
import {Button} from '@elements';
import {toast} from 'react-toastify';
import {SDKContext} from '@context/SDK';
import {Config} from '@constant';
import {currencyFormat} from '@utils/helper';
import {ethers} from 'ethers';

const SectionSellCard = () => {
  const {cards, filter, wallet} = useState();
  const {
    hideModal, showModal, listingCardOnMarketPlace, getCardListOwned, getCardOwnedDetail, getinboxUnreadCount, marketplaceSetListingProgress,
  } = useActions();
  const [amount, setAmount] = React.useState(0);
  const [isValid, setIsvalid] = React.useState(false);
  const [isValidMatic, setIsvalidMatic] = React.useState(false);
  const {nftlabsWithoutRelay} = React.useContext(SDKContext);

  const handleCheckbox = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const {name} = target;

    setIsvalid(value);
  };
  const handleCheckboxMatic = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const {name} = target;

    setIsvalidMatic(value);
  };
  const doSell = async () => {
    try {
      await marketplaceSetListingProgress({tokenId: cards.selected.cardId, onProgress: true});
      await getCardOwnedDetail({cardId: cards.selected.cardId});
      
      const price = ethers.utils.parseUnits(amount.toString(), Config.decimalValueUSDC); // if env is production use 6
      // console.log({
      //   nft_address: Config.nftAddress,
      //   cardID: cards.selected.cardId, // tokenId of token you want to list
      //   usdc_address: Config.currencyAddressUSDC, // 0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e
      //   price, // price
      // });
      // const data = await nftlabsWithoutRelay.getMarketModule(Config.marketplaceAddress).list( // 0xBD9a1d225C20062757947A56e351d810952FDC82
      //   Config.nftAddress, // 0x59D745F6DbFA46780fdd6a3FB88dA35C4cD9a8a7
      //   cards.selected.cardId, // tokenId of token you want to list
      //   Config.currencyAddressUSDC, // 0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e
      //   price, // price
      //   1, // quantity of owned tokens you want to list
      //   0, // 0 seconds until start = listing immediately available
      //   0, // 0 seconds until start = listing immediately available
      //   0, // 0 means that the listing will never get taken off the marketplace
      // );

      // TODO: ==== Marketplace V2 start
      const listing = {
        assetContractAddress: Config.nftAddress,
        tokenId: cards.selected.cardId,
        startTimeInSeconds: 0,
        listingDurationInSeconds: 307584000,
        quantity: 1,
        currencyContractAddress: Config.currencyAddressUSDC,
        buyoutPricePerToken: price,
      };
      console.log(listing, Config.marketplaceAddress);
      const data = await nftlabsWithoutRelay.getMarketplaceModule(Config.marketplaceAddress).createDirectListing(listing);
      console.log(data);
      // TODO: ==== Marketplace V2 end
      const payload = {
        tokenId: cards.selected.cardId,
        price: amount.toString(),
        currency: 'USDC',
      };
      await listingCardOnMarketPlace(payload).then(async () => {
        await marketplaceSetListingProgress({tokenId: cards.selected.cardId, onProgress: false});
        await getCardListOwned({...filter, pageName: 'card'});
        await getCardOwnedDetail({cardId: cards.selected.cardId});
        await getinboxUnreadCount();
        hideModal();
      });
      // return 'OK';
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
    return '';
  };

  const minCardSellPriceMessage = `Minimum amount is $USDC ${Config.minCardSellPrice}`;

  const submit = async () => {
    if (amount < Config.minCardSellPrice) {
      toast.error(minCardSellPriceMessage);
    } else if (parseFloat(wallet.matic.value) <= 0.1) {
      toast.error('Minimum matic balance is 0.1');
    } else {
      toast.promise(
        doSell(),
        {
          pending: {
            render() {
              return 'Processing...';
            },
          },
          success: {
            render() {
              hideModal();
              showModal('sell-card-success');

              // ----- add FB Pixel tracking -----
              import('react-facebook-pixel')
                .then((x) => x.default)
                .then((ReactPixel) => {
                  const payload = {
                    itemType: 'card',
                    itemId: cards.selected.cardId,
                    itemName: cards.selected.name,
                  };
                  ReactPixel.trackCustom('SellCard', {
                    ...payload,
                    content_category: payload.itemType,
                    content_type: 'product',
                    content_ids: [payload.itemId],
                    content_name: payload.itemName,
                    contents: [{
                      id: payload.itemId,
                      quantity: 1,
                      name: payload.itemName,
                    }],
                    currency: 'USD',
                    num_items: 1,
                    value: parseFloat(amount),
                  });
                });

              return 'Successfully listing card';
            },
          },
          error: {
            render({data}) {
              marketplaceSetListingProgress({tokenId: cards.selected.cardId, onProgress: false}).then(() => {
                getCardOwnedDetail({cardId: cards.selected.cardId});
              });
              // console.log('data = ', data);
              return data.error || data.reason || 'Oops, please try again in a few moments.';
            },
            autoClose: false,
          },
        },
      );
    }
  };

  return (
    <div className={`${Style.sellWrapper} container mx-auto`}>
      <div className="flex flex-row justify-center items-center gab-2 mb-8">
        <img src={IconSell} />
        <span className={`text-center ml-2 ${Style.title}`}>Sell card</span>
      </div>
      <div className="flex flex-row justify-center gab-2 mb-5">
        <span className={`text-center ml-2 ${Style.subtitle}`}>Your sell method for</span>
        <span className={`text-center ml-2 ${Style.subtitle2}`}>{cards.selected.name}</span>
      </div>
      <div className="flex flex-row justify-center gab-2 mb-5">
        <div className={`flex flex-row items-center ${Style.methodButton}`}>
          <span className={`text-center ml-2 ${Style.label}`}>Fixed Price</span>
          <img src={IconChecked} />
        </div>
      </div>
      <div className="flex flex-row justify-center gab-2 mb-10">
        <span className={`text-center ml-2 ${Style.subtitle}`}>
          Your asset will be listed on the Marketplace with a fixed price.
          <br />
          In order to get it back, you’ll have to cancel the sale.
        </span>
      </div>
      <div className={`flex flex-col sm:flex-row justify-between gab-2 mb-10 ${Style.form}`}>
        <span className={`${Style.label} ${Style.labelPoss}`}>Sell at</span>
        <div className="flex flex-col items-start sm:items-end">
          <div className="flex flex-row items-center mb-5">
            <span className={Style.label}>$USDC </span>
            <input
              type="number"
              className="ml-2 outline-none"
              name="amount"
              placeholder={Config.minCardSellPrice}
              min="0"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <span className={`text-center mb-5 ${Style.subtitle}`}>{minCardSellPriceMessage}</span>
          <div className={`${Style.noteWrapper}`}>
            <span className={`text-right ${Style.subtitle}`}>
              You’ll receive
              {' '}
              <span className={`text-right ${Style.subtitle4}`}>
                {currencyFormat(amount - ((7.5 / 100) * amount))}
                {' '}
              </span>
              after
              <br />
            </span>
          </div>
          <div className={`items-center ${Style.noteWrapper}`}>
            <span className={`text-right ${Style.subtitle}`}>subtracting a </span>
            <span className={`text-right ${Style.subtitle3}`}>7.5% fee</span>
          </div>
        </div>
      </div>
      <div className={Style.agreement}>
        <div className="flex flex-row justify-start items-center mb-5">
          <div>
            <input type="checkbox" id="checkbox-authorize" className="checkbox" checked={isValid} onChange={handleCheckbox} />
          </div>
          <span className={Style.label} htmlFor="checkbox-authorize">
            Once card listed, you can’t unlisted it before 48 hours
          </span>
        </div>
        <div className="flex flex-row justify-start items-center">
          <div>
            <input type="checkbox" id="checkbox-authorize-matic" className="checkbox" checked={isValidMatic} onChange={handleCheckboxMatic} />
          </div>
          <span className={Style.label} htmlFor="checkbox-authorize">
            The gass fee will be taken from your MATIC, the transaction will
            <br />
            not be able to continue if the Matic is not sufficient.
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-center gab-2 mt-10">
        <span className={Style.label}>Price update will take about 1 minute</span>
      </div>
      <div className={`flex flex-row justify-center gab-2 mb-10 ${Style.buttonConfirm}`}>
        <Button
          className="is-blue-light px-8 py-4 is-semibold is-rounded is-nunito inline-flex flex-col items-center next-button"
          onClick={() => {
            submit();
          }}
          isDisabled={cards.selected.isOnListingProgress ? true : !(isValid && isValidMatic && amount > 0)}
        >
          <div className="flex flex-row justify-center items-center">
            <img src={IconSell} />
            <span className={`text-center ml-2 ${Style.title}`}>Post your listing</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SectionSellCard;
