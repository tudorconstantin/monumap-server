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
    path: "/lmi-2015",
    name: "lmi-2015",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/Lmi2015.vue")
  },
  {
    path: "/spatii-publice",
    name: "spatii-publice",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/SpatiiPublice.vue")
  },
  {
    path: "/servicii-medicale",
    name: "servicii-medicale",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/ServiciiMedicale.vue")
  },
  {
    path: "/toalete-publice",
    name: "toalete-publice",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/ToaletePublice.vue")
  },
  // {
  //   path: "/lie-2020-1",
  //   name: "lie-2020-1",
  //   component: () =>
  //     import(/* webpackChunkName: "map" */ "../views/Lie2020_1.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
