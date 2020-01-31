import Vue from "vue";
import Vuex from "vuex";

import monuments from "./modules/monuments";
import sidebar from "./modules/sidebar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    monuments,
    sidebar,
  }
});
