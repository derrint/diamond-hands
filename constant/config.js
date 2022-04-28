/* eslint-disable import/no-anonymous-default-export */
const urlCookie = '';
const token = 'bypasstoken';
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
const baseURL = process.env.NEXT_PUBLIC_URL;
const apiURL = process.env.NEXT_PUBLIC_API_HOST;
const webURL = process.env.NEXT_PUBLIC_WEB_URL;
const polygonscanURL = process.env.NEXT_PUBLIC_POLYGONSCAN_URL;
const isCookie = 'true';
const magicAPIKEY = process.env.NEXT_PUBLIC_MAGIC_API_KEY;
const magicRPCURL = process.env.NEXT_PUBLIC_MAGIC_RPC_URL;
const magicChainId = parseInt(process.env.NEXT_PUBLIC_MAGIC_CHAIN_ID, 10);
const transactionRelayerUrl = process.env.NEXT_PUBLIC_RELAYER_URL;

const adminAddress = process.env.NEXT_PUBLIC_ADDRESS_ADMIN;
const nftAddress = process.env.NEXT_PUBLIC_ADDRESS_NFT;
const marketplaceAddress = process.env.NEXT_PUBLIC_ADDRESS_MARKETPLACE;
const treasuryAddress = process.env.NEXT_PUBLIC_ADDRESS_TREASURY;
const currencyAddressDD = process.env.NEXT_PUBLIC_ADDRESS_CURRENCY_DD;
const currencyAddressUSDC = process.env.NEXT_PUBLIC_ADDRESS_CURRENCY_USDC;
const currencyAddressMatic = process.env.NEXT_PUBLIC_ADDRESS_CURRENCY_MATIC;
const maxAllowance = BigInt(10 ** 20).toString();
const decimalValueDD = process.env.NEXT_PUBLIC_DECIMAL_VALUE_DD;
const decimalValueUSDC = process.env.NEXT_PUBLIC_DECIMAL_VALUE_USDC;
const decimalValueMATIC = process.env.NEXT_PUBLIC_DECIMAL_VALUE_MATIC;
const minCardSellPrice = parseInt(process.env.NEXT_PUBLIC_CARD_SELL_PRICE_MINIMUM, 10);

const rampNetworkUrl = process.env.NEXT_PUBLIC_RAMPNETWORK_URL;
const rampNetworkApiKey = process.env.NEXT_PUBLIC_RAMPNETWORK_API_KEY;

const moonpayUrl = process.env.NEXT_PUBLIC_MOONPAY_URL;
const moonpayApiKey = process.env.NEXT_PUBLIC_MOONPAY_API_KEY;
const moonpaySecretKey = process.env.NEXT_PUBLIC_MOONPAY_SECRET_KEY;
const moonpayWebhookKey = process.env.NEXT_PUBLIC_MOONPAY_WEBHOOK_KEY;

const minter1Address = process.env.NEXT_PUBLIC_ADDRESS_MINTER_1;
const minter2Address = process.env.NEXT_PUBLIC_ADDRESS_MINTER_2;
const minter3Address = process.env.NEXT_PUBLIC_ADDRESS_MINTER_3;
const minter4Address = process.env.NEXT_PUBLIC_ADDRESS_MINTER_4;
const minter5Address = process.env.NEXT_PUBLIC_ADDRESS_MINTER_5;

const IS_DEV = process.env.NEXT_PUBLIC_IS_DEV;

export default {
  urlCookie,
  token,
  jwtSecret,
  baseURL,
  apiURL,
  webURL,
  polygonscanURL,
  isCookie,
  magicAPIKEY,
  magicRPCURL,
  magicChainId,
  transactionRelayerUrl,
  adminAddress,
  nftAddress,
  marketplaceAddress,
  treasuryAddress,
  currencyAddressDD,
  currencyAddressUSDC,
  currencyAddressMatic,
  maxAllowance,
  decimalValueDD,
  decimalValueUSDC,
  decimalValueMATIC,
  minCardSellPrice,
  rampNetworkUrl,
  rampNetworkApiKey,
  moonpayUrl,
  moonpayApiKey,
  moonpaySecretKey,
  moonpayWebhookKey,
  minter1Address,
  minter2Address,
  minter3Address,
  minter4Address,
  minter5Address,
  IS_DEV,
};
