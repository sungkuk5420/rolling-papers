
const routes = [
  {
    path: '/set-nickname',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SetNickname.vue') }
    ]
  },
  {
    path: '/create-group',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/CreateGroup.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MainPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
