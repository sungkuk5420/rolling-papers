const routes = [
  {
    path: "/line-login",
    component: () => import("layouts/PlainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/LineLogin.vue") }]
  },
  {
    path: "/create-group",
    name: "createGroup",
    component: () => import("layouts/PlainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/CreateGroup.vue") }
    ]
  },
  {
    path: "/write-message",
    name: "writeMessage",
    component: () => import("pages/WriteMessage.vue")
  },
  {
    path: "/group-info",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/GroupInfo.vue") }]
  },
  {
    path: "/share-group",
    component: () => import("layouts/PlainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/ShareGroup.vue") }]
  },
  {
    path: "/buy-me-a-coffee",
    component: () => import("layouts/PlainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/BuyMeACoffee.vue") }]
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/MainPage.vue") }]
  },
  {
    path: "/my-papers",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/MyPapers.vue") }]
  },
  {
    path: "/join-group",
    name: "joinGroup",
    component: () => import("layouts/PlainLayout.vue"),
    children: [{ path: "", component: () => import("pages/JoinGroup.vue") }]
  },
  {
    path: "/detail-page",
    name: "detailPage",
    component: () => import("pages/DetailPage.vue")
  },
  {
    path: "/creators",
    component: () => import("layouts/PlainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Creators.vue") }]
  },
  {
    path: "/send-service-message",
    component: () => import("layouts/PlainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SendServiceMessage.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
