import IconMenuShop from '@images/icon/icon-menu-shop.png';
import IconMenuShopActive from '@images/icon/icon-menu-shop-active.png';
import IconMenuCards from '@images/icon/icon-menu-cards.png';
import IconMenuCardsActive from '@images/icon/icon-menu-cards-active.png';
import IconMenuMarket from '@images/icon/icon-menu-market.png';
import IconMenuMarketActive from '@images/icon/icon-menu-market-active.png';
import IconMenuPlay from '@images/icon/icon-menu-play.png';
import IconMenuPlayActive from '@images/icon/icon-menu-play-active.png';
import IconMenuRank from '@images/icon/icon-menu-rank.png';
import IconMenuRankActive from '@images/icon/icon-menu-rank-active.png';
import IconMenuEvent from '@images/icon/icon-menu-event.png';
import IconMenuEventActive from '@images/icon/icon-menu-event-active.png';
import IconMenuToken from '@images/icon/icon-menu-token.png';
import IconMenuTokenActive from '@images/icon/icon-menu-token-active.png';
import IconMenuLearn from '@images/icon/icon-menu-learn.png';
import IconMenuLearnActive from '@images/icon/icon-menu-learn-active.png';

const mainMenu = [
  {
    id: 1,
    order: 1,
    label: 'Shop',
    href: '/shop',
    icon: IconMenuShop,
    iconActive: IconMenuShopActive,
    isVisible: true,
    isAuth: false,
  },
  {
    id: 2,
    order: 2,
    label: 'Cards',
    href: '/cards',
    icon: IconMenuCards,
    iconActive: IconMenuCardsActive,
    isVisible: true,
    isAuth: false,
  },
  {
    id: 3,
    order: 3,
    label: 'Market',
    href: '/marketplace',
    icon: IconMenuMarket,
    iconActive: IconMenuMarketActive,
    isVisible: true,
    isAuth: false,
  },
  {
    id: 4,
    order: 4,
    label: 'Play',
    href: '/play',
    icon: IconMenuPlay,
    iconActive: IconMenuPlayActive,
    isVisible: true,
    isAuth: false,
    // highlight: 'coming soon',
  },
  // {
  //   id: 5,
  //   order: 5,
  //   label: 'Rank',
  //   href: '/rank',
  //   icon: IconMenuRank,
  //   iconActive: IconMenuRankActive,
  //   isVisible: true,
  //   isAuth: false,
  // },
  {
    id: 6,
    order: 6,
    label: 'Event',
    href: '/event',
    icon: IconMenuEvent,
    iconActive: IconMenuEventActive,
    isVisible: true,
    isAuth: false,
  },
  {
    id: 7,
    order: 7,
    label: 'Token',
    href: '/token',
    icon: IconMenuToken,
    iconActive: IconMenuTokenActive,
    isVisible: true,
    isAuth: false,
  },
  {
    id: 8,
    order: 8,
    label: 'Learn',
    href: '/learn',
    icon: IconMenuLearn,
    iconActive: IconMenuLearnActive,
    isVisible: true,
    isAuth: false,
  },
  // {
  //   id: 7,
  //   order: 3,
  //   label: 'Token',
  //   href: '/token',
  //   icon: IconToken,
  //   iconActive: IconTokenActive,
  //   isVisible: false,
  //   isAuth: false,
  // },
  // {
  //   id: 8,
  //   order: 4,
  //   label: 'Lottery',
  //   href: '/lottery',
  //   icon: IconLottery,
  //   iconActive: IconLotteryActive,
  //   isVisible: false,
  //   isAuth: false,
  // },
  // {
  //   id: 9,
  //   order: 5,
  //   label: 'Game',
  //   href: '/learn',
  //   icon: IconGame,
  //   iconActive: IconGameActive,
  //   isVisible: false,
  //   isAuth: false,
  // },
];

export default mainMenu;
