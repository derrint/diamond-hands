import IconMyWallet from '@images/logo/logo-my-wallet.png';
import LogoCircle from '@images/logo/logo-circle.png';
// import LogoRampNetwork from '@images/logo/logo-ramp-network.png';
import LogoMoonPay from '@images/logo/logo-moonpay.png';

const paymentMethods = [
  // {
  //   id: 'ramp-network',
  //   name: 'Ramp',
  //   description: 'Let mainstream users buy crypto in your app',
  //   image: LogoRampNetwork,
  //   isDisabled: true,
  // },
  {
    id: 'moonpay',
    name: 'MoonPay',
    description: 'Buy with credit / debit card',
    image: LogoMoonPay,
  },
  {
    id: 'wallet',
    name: 'My Wallet',
    description: 'Buy with your USDC balance',
    image: IconMyWallet,
  },
  {
    id: 'circle',
    name: 'Circle',
    description: 'Circle help internet businesses accept payments and send payouts globally in one unified platform',
    image: LogoCircle,
    isDisabled: true,
  },
];

export default paymentMethods;
