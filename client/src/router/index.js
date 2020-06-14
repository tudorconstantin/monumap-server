import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/lmi",
    name: "lmi",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/MapView.vue")
  },
  {
    path: "/spatii-publice",
    name: "spatii-publice",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/SpatiiPublice.vue")
  },
  {
    path: "/toalete-publice",
    name: "toalete-publice",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/ToaletePublice.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
