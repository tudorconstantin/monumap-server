import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import map from "./modules/map";
import lmi2015 from "./modules/lmi2015";
import photos from "./modules/lmi2015_photos";
import lie2020_1 from "./modules/lie2020_1";
import polygons from "./modules/polygons";
import spatiiPublice from "./modules/spatii_publice";
import serviciiMedicale from "./modules/servicii_medicale";
import toaletePublice from "../components/toalete_publice/toalete_publice";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    map,
    lmi2015,
    photos,
    lie2020_1,
    polygons,
    spatiiPublice,
    serviciiMedicale,
    toaletePublice,
  }
});
