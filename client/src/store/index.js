import Vue from "vue";
import Vuex from "vuex";

import monuments from "./modules/monuments";
import polygons from "./modules/polygons";
import photos from "./modules/photos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    monuments,
    photos,
    polygons,
  }
});
