import http from '@utils/http';

export const api = {
  
  // ----- USER FLOW section -----

  login(payload) {
    return http.post('/PlayerLogin', payload);
  },
  accountCheck(payload) {
    return http.post('/PlayerEmailCheck', payload);
  },
  
  loginV2(payload) {
    return http.post('/V2/PlayerLogin', payload);
  },

  register(payload) {
    return http.post('/PlayerRegister', payload);
  },
  
  registerV2(payload) {
    return http.post('/V2/PlayerRegister', payload);
  },

  // ----- PLAYER section -----

  getPlayerProfile(payload) {
    return http.get('/PlayerProfile', {params: {...payload}});
  },

  updatePlayerProfile(payload) {
    return http.post('/PlayerUpdateProfile', payload);
  },
  transferToken(payload) {
    return http.post('/CashOut', payload);
  },

  // ----- INBOX section -----

  getListInbox(payload) {
    return http.get('/InboxGets', {params: {...payload}});
  },
  getMessageInbox(payload) {
    return http.get('/InboxGet', {params: {...payload}});
  },
  markInboxAsRead(payload) {
    return http.post('/InboxMarkAsRead', payload);
  },
  
  getinboxUnreadCount(payload) {
    return http.get('/InboxGetUnreadCount', {params: {...payload}});
  },

  // ----- DD Balance section -----
  getDDBalanceHistory(payload) {
    return http.get('/DiadHistory', {params: {...payload}});
  },
  getTreasuryBalance() {
    return http.get('/Vault');
  },

  // ----- CARD section -----

  getCardListOwned(payload) {
    return http.post('/CardListOwned', payload);
  },

  getCardOwnedDetail(payload) {
    return http.post('/CardGet', payload);
  },
  
  getCardListByLootbox(payload) {
    return http.get('/CardListByLootbox', {params: {...payload}});
  },

  getCardList(payload) {
    return http.post('/SkinList', payload);
  },

  getCardData(payload) {
    return http.get('/SkinGet', {params: {...payload}});
  },

  // ----- CARD FILTER section -----
  
  getPackList(payload) {
    return http.get('/PackList', {params: {...payload}});
  },

  getElementList(payload) {
    return http.get('/ElementList', {params: {...payload}});
  },

  getRarityList(payload) {
    return http.get('/RarityList', {params: {...payload}});
  },

  // ----- MARKETPLACE section -----

  getMarketplaceCardList(payload) {
    return http.post('/MarketplaceCardList', payload);
  },
  getMarketplaceCardDetail(payload) {
    return http.get('/MarketplaceCardDetail', {params: {...payload}});
  },
  getMarketplaceOrderReservation(payload) {
    return http.post('/MarketplaceCreateOrderReservation ', payload);
  },
  getMarketplaceShowCryptoPurchaseSummary(payload) {
    return http.post('/MarketplaceShowCryptoPurchaseSummary ', payload);
  },
  buyMarketplaceCardProses(payload) {
    return http.post('/MarketplaceCardProcess', payload);
  },
  marketplacePurchaseAuthorize(payload) {
    return http.post('/marketplacePackagePurchaseWith2Fa', payload);
  },
  marketplacePurchaseAuthorize3DS(payload) {
    return http.post('/MarketplacePackagePurchaseWith3DS', payload);
  },
  marketplacePurchaseWithWidget(payload) {
    return http.post('/MarketplacePackagePurchaseWithWidget', payload);
  },
  
  getMarketplaceOrderStatus(payload) {
    return http.get('/MarketplaceGetOrderStatus', {params: {...payload}});
  },
  getMarketplaceOrderDetail(payload) {
    return http.get('/MarketplaceGetOrderDetail', {params: {...payload}});
  },
  buyCardOnMarketPlace(payload) {
    return http.post('/MarketplaceBuy ', payload);
  },
  listingCardOnMarketPlace(payload) {
    return http.post('/MarketplaceOnListing', payload);
  },
  unlistingCardOnMarketPlace(payload) {
    return http.post('/MarketplaceUnListing', payload);
  },
  marketplaceSetListingProgress(payload) {
    return http.post('/MarketplaceSetListingProgress', payload);
  },
  exchangeRateCoin(payload) {
    return http.get('/ExchangeRate', {params: {...payload}});
  },

  // ----- LOOTBOX section -----

  getLootboxList(payload) {
    return http.get('/LootboxList', {params: {...payload}});
  },

  buyLootboxBypass(payload) {
    return http.post('/LootboxBypass', payload);
  },

  buyLootboxWyre(payload) {
    return http.post('/LootboxCreateOrderReservation', payload);
  },
  buyLootboxWallet(payload) {
    return http.post('/LootboxShowCryptoPurchaseSummary', payload);
  },

  purchaseLootboxWallet(payload) {
    return http.post('/LootboxPurchaseWithCrypto', payload);
  },

  openLootbox(payload) {
    return http.post('/LootboxOpen', payload);
  },
  openLootboxAsync(payload) {
    return http.post('/LootboxOpenAsync', payload);
  },
  openLootboxStatus(payload) {
    return http.post('/LootboxOpenStatus', payload);
  },

  getCountryList(payload) {
    return http.get('/LootboxGetCountryList', {params: {...payload}});
  },
  buyLootboxCardProses(payload) {
    return http.post('/LootboxCardProcess', payload);
  },
  lootboxPurchaseAuthorize(payload) {
    return http.post('/LootboxPackagePurchaseWith2Fa', payload);
  },
  lootboxPurchaseAuthorize3DS(payload) {
    return http.post('/LootboxPackagePurchaseWith3DS', payload);
  },
  lootboxPurchaseWithWidget(payload) {
    return http.post('/LootboxPackagePurchaseWithWidget', payload);
  },
  getLootboxOrderStatus(payload) {
    return http.get('/LootboxGetOrderStatus', {params: {...payload}});
  },
  getLootboxOrderDetail(payload) {
    return http.get('/LootboxGetOrderDetail', {params: {...payload}});
  },
  getLootboxOwned(payload) {
    return http.get('/LootboxOwned', {params: {...payload}});
  },

  // ----- PAYMENT - CIRCLE section -----
  
  getPublicKeyCircle(payload) {
    return http.get('/CPaymentGetPublicKey', {params: {...payload}});
  },

  getCountryListCircle(payload) {
    return http.get('/CPaymentGetCountryList', {params: {...payload}});
  },

  lootboxProcessPaymentCircle(payload) {
    return http.post('/CPaymentProcessLootbox', payload);
  },

  getOrderStatusCircle(payload) {
    return http.post('/CPaymentGetOrderStatus', payload);
  },
  
  getVerificationStatusCircle(payload) {
    return http.post('/CPaymentVerificationStatus', payload);
  },

  // ----- PAYMENT - RAMP NETWORK section -----

  lootboxReserveRampNetwork(payload) {
    return http.post('/RNPaymentReserveLootbox', payload);
  },

  getPaymentStatusRampNetwork(payload) {
    return http.get('/RNGetPaymentStatus', {params: {...payload}});
  },

  // ----- PAYMENT - MOONPAY section -----

  reserveMoonpay(payload) {
    const endpoint = (payload.module === 'shop') ? '/MoonpayReserveLootbox' : '/MoonpayReserveMarketplace';
    return http.post(endpoint, payload);
  },

  getPaymentStatusMoonpay(payload) {
    return http.get('/MoonpayGetPaymentStatus', {params: {...payload}});
  },

  // ----- EVENT section -----

  getEventList(payload) {
    return http.get('/EventList', {params: {...payload}});
  },

  // ----- RANK section -----

  getRankList(payload) {
    let endpoint = '';
    if (payload.type === 'weekly') {
      endpoint = '/LeaderboardWeekly';
    } else if (payload.type === 'monthly') {
      endpoint = '/LeaderboardMonthly';
    } else {
      endpoint = '/LeaderboardLifetime';
    }
    return http.get(endpoint, {params: {...payload}});
  },
  
};

export default api;
