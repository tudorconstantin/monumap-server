const state = {
  items: [],
  geoJSON: {},
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
  monumentDisplayed: false,
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

    const geojson = await fetch("/api/monuments.geojson");
    const geojsonMonuments = await geojson.json();
    commit("setGeoJSON", geojsonMonuments);
  },
  selectItem ({ commit }, item) {
    commit("setSelectedItem", item);
  }
};

const mutations = {
  setMonuments (state, monuments) {
    state.items = monuments;
  },
  setGeoJSON (state, monuments){
    state.geoJSON = monuments;
  },
  setSelectedItem (state, item) {
    //console.log(`@mutations:: setSelectedItem ${item['cod LMI']}`);
    state.selectedItem = item;
  },
  setMonumentDisplay(state, v){
    state.monumentDisplayed = v;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
