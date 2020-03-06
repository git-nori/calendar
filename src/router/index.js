import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/index.js'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "top",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Top.vue"),
    meta: { isPublic: true }  // public
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.isPublic && !store.state.authModule.isLoggedIn)) {
    next({ path: '/', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router;
