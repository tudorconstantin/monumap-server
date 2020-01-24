import Vue from "vue";
import Vuex from "vuex";

import monuments from "./modules/monuments";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    monuments
  }
});
