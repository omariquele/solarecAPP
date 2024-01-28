const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/HomePage.vue'), name: 'home' }
      // ... other child routes if any ...
    ]
  },

  // Pre-pago Routes
  { path: '/buy-electricity', component: () => import('pages/BuyElectricityPage.vue'), name: 'BuyElectricityPage' },
  { path: '/confirm-pay-recharge', component: () => import('src/pages/ConfirmPayRechargePage.vue'),name: 'confirm-pay-recharge'},
  { path: '/last-recharge', component: () => import('src/pages/LastRechargePage.vue'), name: 'last-recharge',
  },
  // ... other routes ...

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
