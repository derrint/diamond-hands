const state = {
  // ----- GLOBAL props -----
  isLoading: false,
  isWalletShowing: false,
  auth: {
    jwtToken: null,
    isLoggedIn: undefined,
  },
  modal: {
    type: null,
    isVisible: false,
    step: 0,
    isFullScreen: false,
    needAction: true,
    nested: [],
  },
  filter: {
    limit: 8,
    offset: 0,
    series: [],
    element: [],
    rarity: [],
    keyword: '',
    sort: 'name-asc',
    order: 'asc',
    showOwnedOnly: false,
    showListedOnly: false,
  },
  isFiltered: false,
  pagination: {
    current: null,
    total: null,
  },

  // ----- SEGMENTED props -----
  player: null,
  wallet: null,
  cards: {
    all: null,
    owned: null,
    marketplace: [],
    selected: null,
    listing: {
      payload: null,
      response: null,
    },
  },
  lootboxes: {
    all: null,
    selected: null,
    purchased: null,
    opened: null,
    owned: 0,
    error_openlootbox: null,
    opening: null,
  },
  events: {
    all: null,
    selected: null,
  },
  ranks: {
    weekly: null,
    monthly: null,
    alltime: null,
  },
  inbox: {
    list: null,
    selected: null,
    type: null,
    total: 0,
    unread_count: 0,
  },
  payment: {
    method: '',
    module: '',
    listingId: '',
    lootboxId: '',
    formRequest: null,
    responses: {
      summary: null,
      authorize: null,
      order: {
        status: null,
        detail: null,
      },
    },
    status: '',
  },
  profile: {
    ddBalanceHistory: null,
  },
  loginAction: {
    enable: false,
    action_text: '',
  },
  transfer: {
    currency: null,
    form: null,
    response: null,
  },
  game: {
    isVisible: false,
    isFullScreen: false,
  },
};

export default state;
