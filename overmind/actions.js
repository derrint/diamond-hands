/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
import Cookies from 'js-cookie';
import {Magic} from 'magic-sdk';
import moment from 'moment';

import {Config} from '@constant';
// import inboxDummy from '@data/dummy/inbox.json';
// -----
// ----- GLOBAL section -----
// -----

export const setLoading = async (context, payload) => {
  context.state.isLoading = payload;
};
export const setWalletShowing = async (context, payload) => {
  context.state.isWalletShowing = payload;
};

export const showModal = async (context, payload) => {
  context.state.modal = {
    ...context.state.modal,
    type: payload,
    isVisible: true,
  };
};
export const setModalFullScreen = async (context, payload) => {
  context.state.modal = {
    ...context.state.modal,
    isFullScreen: payload,
  };
};
export const setModalNeedAction = async (context, payload) => {
  context.state.modal = {
    ...context.state.modal,
    needAction: payload,
  };
};

export const hideModal = async (context) => {
  context.state.modal = {
    ...context.state.modal,
    type: null,
    isVisible: false,
    isFullScreen: false,
  };
};

export const setModalStep = async (context, payload) => {
  context.state.modal = {
    ...context.state.modal,
    step: payload,
  };
};
export const setLoginAction = async (context, payload) => {
  context.state.loginAction = payload;
};

export const setFilter = async (context, payload) => {
  context.state.filter = {
    ...context.state.filter,
    ...payload,
  };
  context.state.isFiltered = false;
  if (context.state.filter.keyword || context.state.filter.rarity.length || context.state.filter.element.length || context.state.filter.series.length) {
    context.state.isFiltered = true;
  }
};

export const setPagination = async (context, payload) => {
  context.state.pagination = {
    ...context.state.pagination,
    ...payload,
  };
};
export const setTransferCurrency = async (context, payload) => {
  context.state.transfer.currency = payload;
};
export const setTransferForm = async (context, payload) => {
  context.state.transfer.form = payload;
};
export const setTransferResponse = async (context, payload) => {
  context.state.transfer.response = payload;
};
export const resetTransfer = async (context) => {
  context.state.transfer.form = null;
  context.state.transfer.response = null;
};
export const transferToken = async (context, payload) => {
  const {data} = await context.effects.api
    .transferToken({...payload, sessionToken: context.state.auth.jwtToken})
    .catch((e) => {
      console.log('[ERROR] transferToken : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data;
};
// -----
// ----- CARD FILTER section -----
// -----

export const getPackList = async (context, payload) => {
  const {data} = await context.effects.api
    .getPackList(payload)
    .catch((e) => {
      console.log('[ERROR] getPackList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data;
};
export const getElementList = async (context, payload) => {
  const {data} = await context.effects.api
    .getElementList(payload)
    .catch((e) => {
      console.log('[ERROR] getElementList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data;
};
export const getRarityList = async (context, payload) => {
  const {data} = await context.effects.api
    .getRarityList(payload)
    .catch((e) => {
      console.log('[ERROR] getRarityList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data;
};
// -----
// ----- USER FLOW section -----
// -----

export const login = async (context, payload) => {
  const {data} = await context.effects.api
    .login(payload)
    .catch((e) => Promise.reject(e?.response?.data || e));
  if (data) {
    const {sessionToken} = data;

    await context.actions.getPlayerProfile({sessionToken})
      .then(() => {
        Cookies.set('_diamond_hands', sessionToken, {expires: 7});
        Cookies.set('_diamond_hands_last_login', new Date().toISOString(), {expires: 7});

        context.state.auth = {
          jwtToken: sessionToken,
          isLoggedIn: true,
        };
      })
      .catch((e) => {
        console.log('[ERROR] getPlayerProfile : ', e);
        return Promise.reject(e);
      });
  }
  return data;
};

export const accountCheck = async (context, payload) => {
  const {data} = await context.effects.api
    .accountCheck(payload)
    .catch((e) => Promise.reject(e?.response?.data || e));
  return data;
};

export const loginV2 = async (context, payload) => {
  const {data} = await context.effects.api
    .loginV2(payload)
    .catch((e) => Promise.reject(e?.response?.data || e));
  if (data) {
    const {sessionToken} = data;
    
    Cookies.set('_diamond_hands', sessionToken, {expires: 7});

    context.state.auth = {
      jwtToken: sessionToken,
      isLoggedIn: true,
    };

    await context.actions.getPlayerProfile({sessionToken}).catch((e) => {
      console.log('[ERROR] getPlayerProfile : ', e);
    });
  }
  return data;
};

export const register = async (
  context,
  payload,
) => {
  const {data} = await context.effects.api
    .register(payload)
    .catch((e) => Promise.reject(e?.response?.data || e));
  
  return data;
};

export const registerV2 = async (
  context,
  payload,
) => {
  const {data} = await context.effects.api
    .registerV2(payload)
    .catch((e) => Promise.reject(e?.response?.data || e));
  
  return data;
};

export const logout = async (context) => {
  Cookies.remove('_diamond_hands', {domain: Config.urlCookie});
  context.state.auth = {
    jwtToken: null,
    isLoggedIn: false,
  };
  context.state.player = null;
};

export const loadApp = async (context) => {
  const jwtToken = Cookies.get('_diamond_hands');
  const lastLoginStr = Cookies.get('_diamond_hands_last_login');
  
  if (jwtToken) {
    await context.actions
      .getPlayerProfile({sessionToken: jwtToken})
      .then(async () => {
        const lastLogin = moment(lastLoginStr);
        const now = moment();
        const diff = lastLoginStr ? now.diff(lastLogin, 'hours') : 24;
        
        if (diff >= 24) {
          // ----- Re-authenticate MAGIC LINK -----

          /* Configure Ethereum provider */
          const customNodeOptions = {
            rpcUrl: Config.magicRPCURL, // Polygon RPC URL
            chainId: Config.magicChainId, // Polygon chain id
          };

          const magic = new Magic(Config.magicAPIKEY, {
            network: customNodeOptions,
          });

          if (await magic.user.isLoggedIn()) {
            context.state.auth = {
              jwtToken,
              isLoggedIn: true,
            };
          } else {
            // Log in the user
            context.actions.logout();
          }
        } else {
          context.state.auth = {
            jwtToken,
            isLoggedIn: true,
          };
        }
      })
      .catch(() => {
        context.actions.logout(); // sign out when token is invalid
      });
    await context.actions.getinboxUnreadCount();
  }
  return context.state.auth;
};

// -----
// ----- PLAYER section -----
// -----

export const getPlayerProfile = async (context, payload) => {
  const sessionToken = payload?.sessionToken ? payload.sessionToken : context.state.auth.jwtToken;
  const {data} = await context.effects.api
    .getPlayerProfile({sessionToken})
    .catch((e) => {
      console.log('[ERROR] getPlayerProfile : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.player = data.player;
  context.state.wallet = data.wallet;
  return data.player;
};

export const updatePlayerProfile = async (
  context,
  payload,
) => {
  const {data} = await context.effects.api
    .updatePlayerProfile({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => Promise.reject(e?.response?.data || e));
  
  return data;
};

// -----
// ----- DD Balance section -----
export const getDDBalanceHistory = async (context, payload) => {
  const {data} = await context.effects.api
    .getDDBalanceHistory({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getDDBalanceHistory : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  context.state.profile.ddBalanceHistory = data.history;

  return data;
};
export const getTreasuryBalance = async (context) => {
  const {data} = await context.effects.api
    .getTreasuryBalance()
    .catch((e) => {
      console.log('[ERROR] getTreasuryBalance : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
// -----
// ----- Inbox section -----
export const getListInbox = async (context, payload) => {
  const {data} = await context.effects.api
    .getListInbox({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      context.state.inbox.list = null;
      console.log('[ERROR] getListInbox : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (context.state.inbox.type !== payload.type) {
    context.state.inbox.list = data.list;
  } else if (payload.mode === 'reload') {
    context.state.inbox.list = data.list;
  } else if (data.list !== null) {
    context.state.inbox.list = context.state.inbox.list.concat(data.list);
  } else {
    context.state.inbox.list = data.list;
  }
  context.state.inbox.total = data.total;
  context.state.inbox.type = payload.type;
  const {current} = context.state.pagination;
  context.state.pagination = {
    current: current === null ? 1 : current,
    total: Math.ceil(data.total / 8),
  };

  return data;
};
export const getMessageInbox = async (context, payload) => {
  const {data} = await context.effects.api
    .getMessageInbox({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      context.state.inbox.selected = null;
      console.log('[ERROR] getMessageInbox : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  context.state.inbox.selected = data;

  return data;
};
export const markInboxAsRead = async (context, payload) => {
  const {data} = await context.effects.api
    .markInboxAsRead({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] markInboxAsRead : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
export const getinboxUnreadCount = async (context, payload) => {
  const {data} = await context.effects.api
    .getinboxUnreadCount({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getinboxUnreadCount : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.inbox.unread_count = data.res.reduce((a, b) => a + (b.count || 0), 0);
  }
  return data;
};

// -----
// ----- CARD section -----
// -----

export const getCardListOwned = async (context, payload) => {
  const {data} = await context.effects.api
    .getCardListOwned({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getCardListOwned : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.cards.owned = data.cards;
  if (payload?.pageName === 'card') {
    const {current} = context.state.pagination;
    context.state.pagination = {
      current: current === null ? 1 : current,
      total: Math.ceil(data.total / data.limit),
    };
  }
  return data;
};

export const getCardOwnedDetail = async (context, payload) => {
  const {data} = await context.effects.api
    .getCardOwnedDetail({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getCardOwnedDetail : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.cards.selected = data.card;

  return data.card;
};

export const getCardListByLootbox = async (context, payload) => {
  const {data} = await context.effects.api
    .getCardListByLootbox({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getCardListByLootbox : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data;
};

export const getCardList = async (context, payload) => {
  const {data} = await context.effects.api
    .getCardList({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getCardList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.cards.all = data.skins;

  const {current} = context.state.pagination;
  context.state.pagination = {
    current: current === null ? 1 : current,
    total: Math.ceil(data.total / data.limit),
  };
  return data.all;
};

export const selectCard = async (context, payload) => {
  context.state.cards.selected = {...payload};
};

export const getCardData = async (context, payload) => {
  const {data} = await context.effects.api
    .getCardData({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getCardData : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.actions.selectCard(data.skin);
  return data.skin;
};

// -----
// ----- MARKETPLACE section -----
// -----

export const getMarketplaceCardList = async (context, payload) => {
  const {data} = await context.effects.api
    .getMarketplaceCardList({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getMarketplaceCardList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.cards.marketplace = data.cardList;

  const {current} = context.state.pagination;
  context.state.pagination = {
    current: current === null ? 1 : current,
    total: Math.ceil(data.total / 8),
  };
  return data.cardList;
};

export const getMarketplaceCardDetail = async (context, payload) => {
  const {data} = await context.effects.api
    .getMarketplaceCardDetail({
      ...payload,
      // sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getMarketplaceCardDetail : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.cards.selected = data.card;

  return data.card;
};

export const buyCardOnMarketPlaceSummary = async (context, payload) => {
  if (payload.method === 'wyre') {
    const {data} = await context.effects.api
      .getMarketplaceOrderReservation({
        ...payload,
        sessionToken: context.state.auth.jwtToken,
      })
      .catch((e) => {
        console.log('[ERROR] getMarketplaceOrderReservation : ', e?.response?.data || e);
        return Promise.reject(e?.response?.data || e);
      });
    if (data) {
      context.state.payment.status = 'OPEN';
      context.state.payment.module = 'marketplace';
      context.state.payment.method = payload.method;
      context.state.payment.listingId = payload.listingId;
      context.state.payment.formRequest = null;
      context.state.payment.responses.summary = data;
    }
  } else {
    const {data} = await context.effects.api
      .getMarketplaceShowCryptoPurchaseSummary({
        ...payload,
        sessionToken: context.state.auth.jwtToken,
      })
      .catch((e) => {
        console.log('[ERROR] getMarketplaceShowCryptoPurchaseSummary : ', e?.response?.data || e);
        return Promise.reject(e?.response?.data || e);
      });
    if (data) {
      context.state.payment.status = 'OPEN';
      context.state.payment.module = 'marketplace';
      context.state.payment.method = payload.method;
      context.state.payment.listingId = payload.listingId;
      context.state.payment.formRequest = null;
      context.state.payment.responses.summary = {
        tokenId: payload.card.tokenId,
        dest: payload.card.currency,
        destCurrency: payload.card.currency.name,
        fees: {
          USDC: 0,
        },
        sourceWithoutFees: payload.card.currency,
        sourceCurrency: payload.card.currency.name,
        walletBalance: context.state.wallet.usdc,
        isBalanceSufficient: data.isBalanceSufficient,
      };
    }
  }
  return '';
};
export const buyMarketplaceCardProses = async (context, payload) => {
  context.state.payment.formRequest = payload;
  const {data} = await context.effects.api
    .buyMarketplaceCardProses(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] buyMarketplaceCardProses : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.responses.authorize = data;
  }
  return data;
};
export const marketplacePurchaseAuthorize = async (context, payload) => {
  const {data} = await context.effects.api
    .marketplacePurchaseAuthorize(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] marketplacePurchaseAuthorize : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
export const marketplacePurchaseAuthorize3DS = async (context, payload) => {
  const {data} = await context.effects.api
    .marketplacePurchaseAuthorize3DS(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] marketplacePurchaseAuthorize3DS : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};

export const marketplacePurchaseWithWidget = async (context, payload) => {
  const {data} = await context.effects.api
    .marketplacePurchaseWithWidget(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] marketplacePurchaseWithWidget : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};

export const getMarketplaceOrderStatus = async (context, payload) => {
  const {data} = await context.effects.api
    .getMarketplaceOrderStatus(payload)
    .catch((e) => {
      console.log('[ERROR] getMarketplaceOrderStatus : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.status = data.status;
    context.state.payment.responses.order.status = data;
  }
  return data;
};
export const getMarketplaceOrderDetail = async (context, payload) => {
  const {data} = await context.effects.api
    .getMarketplaceOrderDetail(payload)
    .catch((e) => {
      console.log('[ERROR] getMarketplaceOrderDetail : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.responses.order.detail = data;
  }
  return data;
};
export const buyCardOnMarketPlace = async (context, payload) => {
  const {data} = await context.effects.api
    .buyCardOnMarketPlace({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] buyCardOnMarketPlace : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};

export const listingCardOnMarketPlace = async (context, payload) => {
  context.state.cards.listing.payload = {...payload};
  const {data} = await context.effects.api
    .listingCardOnMarketPlace({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] listingCardOnMarketPlace : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.cards.listing.response = data;
  }
  return data;
};
export const marketplaceSetListingProgress = async (context, payload) => {
  const {data} = await context.effects.api
    .marketplaceSetListingProgress({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] marketplaceSetListingProgress : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
export const unlistingCardOnMarketPlace = async (context, payload) => {
  const {data} = await context.effects.api
    .unlistingCardOnMarketPlace({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] unlistingCardOnMarketPlace : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
export const exchangeRateCoin = async (context, payload) => {
  const {data} = await context.effects.api
    .exchangeRateCoin(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] exchangeRateCoin : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
// -----
// ----- LOOTBOX section -----
// -----

export const getLootboxList = async (context, payload) => {
  const {data} = await context.effects.api
    .getLootboxList(payload)
    .catch((e) => {
      console.log('[ERROR] getLootboxList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.lootboxes.all = data.lootboxList;
  return data.lootboxList;
};

export const selectLootbox = async (context, payload) => {
  context.state.lootboxes.selected = {...payload};
};

export const setPaymentMethod = async (context, payload) => {
  context.state.payment.method = payload.method;
  context.state.payment.module = payload.module;
};

export const buyLootbox = async (context, payload) => {
  if (payload.method === 'wyre') {
    const {data} = await context.effects.api
      .buyLootboxWyre({
        ...payload,
        sessionToken: context.state.auth.jwtToken,
      })
      .catch((e) => {
        console.log('[ERROR] buyLootboxWyre : ', e?.response?.data || e);
        return Promise.reject(e?.response?.data || e);
      });
    if (data) {
      context.state.payment.status = 'OPEN';
      context.state.payment.module = 'shop';
      context.state.payment.method = payload.method;
      context.state.payment.lootboxId = payload.lootboxId;
      context.state.payment.formRequest = null;
      context.state.payment.responses.summary = data;
    }
  } else {
    const {data} = await context.effects.api
      .buyLootboxWallet({
        ...payload,
        sessionToken: context.state.auth.jwtToken,
      })
      .catch((e) => {
        console.log('[ERROR] buyLootboxWallet : ', e?.response?.data || e);
        return Promise.reject(e?.response?.data || e);
      });
    if (data) {
      context.state.payment.status = 'OPEN';
      context.state.payment.module = 'shop';
      context.state.payment.method = payload.method;
      context.state.payment.lootboxId = payload.lootboxId;
      context.state.payment.responses.summary = data;
    }
  }
  return '';
};

export const purchaseLootboxWallet = async (context, payload) => {
  const {data} = await context.effects.api
    .purchaseLootboxWallet({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    // .buyLootboxWyre(payload)
    .catch((e) => {
      console.log('[ERROR] purchaseLootboxWallet : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.status = 'COMPLETE';
    context.state.payment.responses.order.detail = data;
  }
  return '';
};

// #region ----- openLootbox - this method is deprecated -----
export const openLootbox = async (context, payload) => {
  const {data} = await context.effects.api
    .openLootbox(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] openLootbox : ', e?.response?.data || e);
      context.state.lootboxes.error_openlootbox = e?.response?.data || e;
      return Promise.reject(e?.response?.data || e);
    });

  if (data) {
    const {diadAmount, cards} = data;
    const cardsMapped = cards && cards.length > 0 ? cards.map((item) => {
      const assets = [item.videoUrl, item.rockImgUrl, item.paperImgUrl, item.scissorImgUrl];
      const card = {
        ...item,
        assets,
      };
      return card;
    }) : [];

    // const {name, assets} = context.state.lootboxes.selected;
    const {name, badge, opening} = data?.lootbox;
    const assets = {
      badge,
      opening,
    };

    const lbo = {
      ...data,
      // id: LootboxId,
      name,
      assets,
      dd: diadAmount,
      cards: cardsMapped,
    };

    context.state.payment.status = '';
    context.state.lootboxes.opened = lbo;
  }
  return data;
};
// #endregion

export const openLootboxAsync = async (context, payload) => {
  context.actions.showModal('diamond-loader');

  const {data} = await context.effects.api
    .openLootboxAsync(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] openLootboxAsync : ', e?.response?.data || e);
      context.state.lootboxes.error_openlootbox = e?.response?.data || e;
      context.actions.hideModal();
      context.actions.showModal('open-lootbox-failed');
      return Promise.reject(e?.response?.data || e);
    });

  if (data) {
    // ----- return when error -----
    if (data.error) {
      context.state.lootboxes.error_openlootbox = data;
      await context.actions.hideModal();
      await context.actions.showModal('open-lootbox-failed');
      return data;
    }
    
    const {trxId, lootbox} = data;
    await context.actions.setLootboxOpening({
      trxId,
      lootbox,
      status: 'on-progress',
    });
  }
  return data;
};

export const setLootboxOpening = async (context, payload) => {
  context.state.lootboxes.opening = payload;
};

export const openLootboxStatus = async (context, payload) => {
  const {data} = await context.effects.api
    .openLootboxStatus(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] openLootboxStatus : ', e?.response?.data || e);
      // context.state.lootboxes.error_openlootbox = e?.response?.data || e;
      context.actions.hideModal();
      context.actions.showModal('open-lootbox-failed');
      return Promise.reject(e?.response?.data || e);
    });

  if (data) {
    if (data.status === 200) {
      await context.actions.setLootboxOpening({
        ...context.state.lootboxes.opening,
        status: 'success',
      });

      const {diadAmount, cards} = data;
      const cardsMapped = cards && cards.length > 0 ? cards.map((item) => {
        const assets = [item.videoUrl, item.rockImgUrl, item.paperImgUrl, item.scissorImgUrl];
        const card = {
          ...item,
          assets,
        };
        return card;
      }) : [];

      // const {name, assets} = context.state.lootboxes.selected;
      const {name, badge, opening} = context.state.lootboxes.opening.lootbox;
      const assets = {
        badge,
        opening,
      };

      const lbo = {
        ...data,
        // id: LootboxId,
        name,
        assets,
        dd: diadAmount,
        cards: cardsMapped,
      };

      context.state.payment.status = '';
      context.state.lootboxes.opened = lbo;

      // ----- hide modal when everything goes well -----
      // await context.actions.hideModal();
    }
  }
  return data;
};

// -----
// ----- PAYMENT - WYRE section -----
// -----

export const getCountryList = async (context, payload) => {
  const {data} = await context.effects.api
    .getCountryList(payload)
    .catch((e) => {
      console.log('[ERROR] getCountryList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data.countries;
};
export const buyLootboxCardProses = async (context, payload) => {
  context.state.payment.formRequest = payload;
  const {data} = await context.effects.api
    .buyLootboxCardProses(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] buyLootboxCardProses : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.responses.authorize = data;
  }
  return data;
};
export const lootboxPurchaseAuthorize = async (context, payload) => {
  const {data} = await context.effects.api
    .lootboxPurchaseAuthorize(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] lootboxPurchaseAuthorize : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};
export const lootboxPurchaseAuthorize3DS = async (context, payload) => {
  const {data} = await context.effects.api
    .lootboxPurchaseAuthorize3DS(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] lootboxPurchaseAuthorize3DS : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};

export const lootboxPurchaseWithWidget = async (context, payload) => {
  const {data} = await context.effects.api
    .lootboxPurchaseWithWidget(({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    }))
    .catch((e) => {
      console.log('[ERROR] lootboxPurchaseWithWidget : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  return data;
};

export const getLootboxOrderStatus = async (context, payload) => {
  const {data} = await context.effects.api
    .getLootboxOrderStatus(payload)
    .catch((e) => {
      console.log('[ERROR] getLootboxOrderStatus : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.status = data.status;
    context.state.payment.responses.order.status = data;
  }
  return data;
};
export const getLootboxOrderDetail = async (context, payload) => {
  const {data} = await context.effects.api
    .getLootboxOrderDetail(payload)
    .catch((e) => {
      console.log('[ERROR] getLootboxOrderDetail : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.responses.order.detail = data;
  }
  return data;
};
export const getLootboxOwned = async (context) => {
  const {data} = await context.effects.api
    .getLootboxOwned({
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] getLootboxOwned : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.lootboxes.owned = data.count;
  }
  return data;
};
export const setPaymentStatus = async (context, payload) => {
  context.state.payment.status = payload;
};

// -----
// ----- PAYMENT - CIRCLE section -----
// -----

export const getCountryListCircle = async (context, payload) => {
  const {data} = await context.effects.api
    .getCountryListCircle(payload)
    .catch((e) => {
      console.log('[ERROR] getCountryListCircle : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data.countries;
};

export const getPublicKeyCircle = async (context, payload) => {
  const {data} = await context.effects.api
    .getPublicKeyCircle(payload)
    .catch((e) => {
      console.log('[ERROR] getPublicKeyCircle : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  // context.state.lootboxes.all = data.lootboxList;
  return data;
};

export const lootboxProcessPaymentCircle = async (context, payload) => {
  context.state.payment.formRequest = payload;
  const {data} = await context.effects.api
    .lootboxProcessPaymentCircle({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] lootboxProcessPaymentCircle : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.status = data.data.status;
    context.state.payment.module = 'shop';
    context.state.payment.lootboxId = payload.lootboxId;
    context.state.payment.formRequest = null;
    context.state.payment.responses.summary = data.data;
  }
  
  return data;
};

export const getOrderStatusCircle = async (context, payload) => {
  const {data} = await context.effects.api
    .getOrderStatusCircle(payload)
    .catch((e) => {
      console.log('[ERROR] getOrderStatusCircle : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.status = data.data.status;
    context.state.payment.responses.order.detail = data.data;
  }
  return data;
};

export const getVerificationStatusCircle = async (context, payload) => {
  const {data} = await context.effects.api
    .getVerificationStatusCircle(payload)
    .catch((e) => {
      console.log('[ERROR] getVerificationStatusCircle : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  return data;
};

// -----
// ----- PAYMENT - RAMP NETWORK section -----
// -----

export const lootboxReserveRampNetwork = async (context, payload) => {
  context.state.payment.formRequest = payload;
  const {data} = await context.effects.api
    .lootboxReserveRampNetwork({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
    })
    .catch((e) => {
      console.log('[ERROR] lootboxReserveRampNetwork : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    console.log(data);
    context.state.payment.status = 'OPEN';
    context.state.payment.module = 'shop';
    context.state.payment.lootboxId = payload.lootboxId;
    context.state.payment.formRequest = null;
    context.state.payment.responses.summary = data;
  }
  
  return data;
};

// -----
// ----- PAYMENT - MOONPAY section -----
// -----

export const reserveMoonpay = async (context, payload) => {
  context.state.payment.formRequest = payload;
  const {data} = await context.effects.api
    .reserveMoonpay({
      ...payload,
      sessionToken: context.state.auth.jwtToken,
      module: context.state.payment.module,
    })
    .catch((e) => {
      console.log('[ERROR] reserveMoonpay : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    console.log(data);
    context.state.payment.status = '';
    // context.state.payment.module = context.state.payment.module;
    context.state.payment.lootboxId = payload.lootboxId;
    context.state.payment.formRequest = null;
    context.state.payment.responses.summary = data;
  }
  
  return data;
};

export const getPaymentStatusMoonpay = async (context, payload) => {
  const {data} = await context.effects.api
    .getPaymentStatusMoonpay(payload)
    .catch((e) => {
      console.log('[ERROR] getPaymentStatusMoonpay : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });
  if (data) {
    context.state.payment.status = data.status;
    // context.state.payment.responses.order.detail = data.data;
  }
  return data;
};

// -----
// ----- EVENT section -----
// -----

export const getEventList = async (context, payload) => {
  const {data} = await context.effects.api
    .getEventList(payload)
    .catch((e) => {
      console.log('[ERROR] getEventList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.events.all = data.events;
  return data.events;
};

export const selectEvent = async (context, payload) => {
  context.state.events.selected = {...payload};
};

// -----
// ----- RANK section -----
// -----

export const getRankList = async (context, payload) => {
  const {data} = await context.effects.api
    .getRankList(payload)
    .catch((e) => {
      console.log('[ERROR] getRankList : ', e?.response?.data || e);
      return Promise.reject(e?.response?.data || e);
    });

  context.state.ranks[payload.type] = data.ranks;
  if (payload.type === 'weekly') {
    context.state.ranks.start = data.startedAt;
    context.state.ranks.end = data.endedAt;
    context.state.ranks.lastUpdate = data.leaderboardLastUpdate;
    context.state.ranks.prize = data.prizepool;
  }
  return data.events;
};

// -----
// ----- PLAY section -----
// -----

export const setGameSetting = async (context, payload) => {
  context.state.game = {
    ...context.state.game,
    ...payload,
  };
};
