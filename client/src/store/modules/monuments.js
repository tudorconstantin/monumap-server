const state = {
  items: [],
  selectedItem: {
    'nr': '',
    'cod LMI': '',
    'val': '',
    'SIRSUP': '',
    'rang': '',
    'UAT': '',
    'SIRUTA': '',
    'localitate': '',
    'denumire': '',
    'adresa': '',
    'latitudine': '',
    'longitudine': '',
    'cota': '',
    'cod postal': '',
    'stare generală': '',
    'program': '',
    'tipul monumentului': '',
    'datare': '',
    'tipul patrimoniului': '',
    'observatii': '',
  },
};

const getters = {
  getMapHeight () {
    return document.getElementById('map-enclosure').offsetHeight;
  },
  getSelectedItem () {
    // console.log(`@getters:: getSelectedItem ${state.selectedItem['cod LMI']}`);
    return state.selectedItem;
  },
  getFilteredArray () {
    // return array filtered by the search bar
    return state.items;
  },
};

const actions = {
  async getAllMonuments ({ commit }) {
    const res = await fetch("/api/monuments/");
    const monuments = await res.json();
    commit("setMonuments", monuments);
  },
  selectItem ({ commit }, item) {
    // console.log(`@actions:: selectItem ${item['cod LMI']}`);
    commit("setSelectedItem", item);
  }
};

const mutations = {
  setMonuments (state, monuments) {
    state.items = monuments;
  },
  setSelectedItem (state, item) {
    //console.log(`@mutations:: setSelectedItem ${item['cod LMI']}`);
    state.selectedItem = item;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
