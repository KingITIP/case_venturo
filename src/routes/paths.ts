const ROOTS = {
  AUTH: '/auth',
  PUBLIC: '/',
  DASHBOARD: '/dashboard',
};

export const paths = {
  faqs: '/faqs',
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
  public: {
    root: ROOTS.PUBLIC,
    landing: `${ROOTS.PUBLIC}`,
    build: '/build',
    login: '/login',
    editor: (id: string) => `/editor/${id}`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    dashboards: {
      finance: `${ROOTS.DASHBOARD}/dashboards/finance`,
      monitoring: `${ROOTS.DASHBOARD}/dashboards/monitoring`,
      sales: `${ROOTS.DASHBOARD}/dashboards/sales`,
    },
    settings: {
      branches: `${ROOTS.DASHBOARD}/settings/branches`,
      roles: `${ROOTS.DASHBOARD}/settings/roles`,
      users: `${ROOTS.DASHBOARD}/settings/users`,
      translationOverride: `${ROOTS.DASHBOARD}/settings/translation-override`,
    },
    demo: {
      item: `${ROOTS.DASHBOARD}/demo/item`,
      itemEmpty: `${ROOTS.DASHBOARD}/demo/item-empty`,
      order: `${ROOTS.DASHBOARD}/demo/order`,
      orderDetail: (id: string) => `${ROOTS.DASHBOARD}/demo/order/${id}`,
    },
  },
};
