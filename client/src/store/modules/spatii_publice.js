// store >> spatii_publice.js

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  leftPanel: true,
  rightPanel: true,
  itemSelected: false,
  selectedItem: null,
  spatiiAbandonate: null,
  spatiiLiniare: null,
  spatiiSuprafata: null,
  spatiiPunctuale: null,
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {
  getSpatiiAbandonate() {
    return state.spatiiAbandonate;
  },
  getSpatiiPunctuale() {
    return state.spatiiPunctuale;
  },
  getSpatiiLiniare() {
    return state.spatiiLiniare;
  },
  getSpatiiSuprafata() {
    return state.spatiiSuprafata;
  },
  getMethodology(id) {
    return state.metodologie.filter(item => item.id === id)[0];
  },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

// sort array of object by key
// function sortByKey(array, key) {
//   return array.sort(function(a, b) {
//     var x = a[key]; var y = b[key];
//     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//   });
// }

const actions = {
  async loadAllData({commit}) {
    const [
      metodologie,
      spAbandonate,
      spPunctuale,
      spLiniare,
      spSuprafata,
    ] = await Promise.all([
      fetch('/geojson/spatii_publice/metodologie.json').then((r) => r.json()),
      fetch('/geojson/spatii_publice/spatii-abandonate.geojson').then((r) => r.json()),
      fetch('/geojson/spatii_publice/spatii-punctuale.geojson').then((r) => r.json()),
      fetch('/geojson/spatii_publice/spatii-liniare.geojson').then((r) => r.json()),
      fetch('/geojson/spatii_publice/spatii-suprafata.geojson').then((r) => r.json()),
    ]);
    commit("setAllData", {metodologie, spAbandonate, spPunctuale, spLiniare, spSuprafata});
  },

  async selectItem({commit}, value) {
    // if null value
    if (!value) {
      commit("setSelectedItem", undefined);
      // commit("setMonumentDisplay", false);
      commit("setRightPanel", false);
    }

    commit('setSelectedItem', value);
    commit('setItemSelected', true);
    commit('setRightPanel', true);
  },

  updateLeftPanel({commit}, value) {
    commit('setLeftPanel', value);
  },

  updateRightPanel({commit}, value) {
    commit('setRightPanel', value);
  },

  toggleLeftPanel({commit, state}) {
    commit('setLeftPanel', !state.leftPanel);
  },

  toggleRightPanel({commit, state}) {
    commit('setRightPanel', !state.rightPanel);
  },

  updateItemSelected({commit}, value) {
    commit('setItemSelected', value);
  },

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUTATIONS

const mutations = {
  setAllData(state, {metodologie, spAbandonate, spPunctuale, spLiniare, spSuprafata}) {
    state.metodologie = metodologie;
    state.spatiiAbandonate = spAbandonate;
    state.spatiiPunctuale = spPunctuale;
    state.spatiiLiniare = spLiniare;
    state.spatiiSuprafata = spSuprafata;
  },

  setSelectedItem(state, value) {
    state.selectedItem = value;
    if(value) {
      const details = state.metodologie.filter(item => item.id === value.layer.source)[0];
      state.selectedItem.definition = details.definition;
      state.selectedItem.methodology = details.methodology;
      state.selectedItem.date = details.date;
    }
  },

  setLeftPanel(state, value) {
    state.leftPanel = value;
  },

  setRightPanel(state, value) {
    state.rightPanel = value;
  },

  setItemSelected(state, value) {
    state.itemSelected = value;
  },

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPORT

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
