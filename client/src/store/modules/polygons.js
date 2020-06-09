// import _ from 'lodash';
import constants from '../../util/constants.js';

const state = {
  items: [],
  geoJSON: {},
  selectedItem: {
    cod_lmi: '',
    SIRSUP: '',
    rang: '',
    UAT: '',
    SIRUTA: '',
    localitate: '',
    SIRINF: '',
    sector: '',
    adresa: '',
    strada_nume: '',
    strada_numar: '',
    cod_lmi_jud: '',
    cod_lmi_nat: '',
    cod_lmi_grupa: '',
    cod_lmi_val: '',
    cod_lmi_num: '',
    tip_patrimoniu: '',
    program: '',
    tip_polygon: '',
    denumire: '',
    observatii_adresa: '',
    fotografiat: '',
    Inexistent: '',
    constructie_noua: '',
    stare: '',
    observatii: '',
    observatii_corina: '',
    datare: '',
    x: '',
    y: '',
  },
  polygonDisplayed: false,
  filterText: '',
};

const getters = {
  getMapHeight () {
    return document.getElementById('map-enclosure').offsetHeight;
  },
  getSelectedItem () {
    return state.selectedItem;
  },
  filteredArray: (state) => {
    if (!state.geoJSON.features) return [];
    if (!state.filterText) return state.geoJSON.features.map(f => f.properties);

    const needle = state.filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // return array filtered by the search bar, searching without diacritics
    return state.items.filter(m =>{
        for (const field of constants.searchableFields){
          if (m[field] && m[field].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(needle)) 
          return true;
        }
        return false;
      }
    );
  },

  filteredGeoJSON: (state, getters) => {
    const res = {
      type: state.geoJSON.type,
      features: [],
    };
    if (!getters.filteredArray) {
      return res;
    }
    if (!state.geoJSON.features) {
      return res;
    }
    const filteredPolygons = getters.filteredArray.map(m => m.cod_lmi);

    res.features = state.geoJSON.features.filter(feature => filteredPolygons.indexOf(feature.properties.cod_lmi) > -1);

    return res;
  }
};

const actions = {
  async getAllPolygons ({ commit }) {

    const geojson = await fetch("/api/polygons.geojson");
    const geojsonPolygons = await geojson.json();
    commit("setGeoJSON", geojsonPolygons);
    commit("setPolygons", geojsonPolygons.features.map(m => m.properties));
  },
  async selectItem ({ commit, state }, codLmi) {
    // if null value
    if (!codLmi) {
      commit("setSelectedItem", undefined);
      commit("setPolygonDisplay", false);
      return;
    }

    // get all polygon data
    const fullPolygon = state.geoJSON.features.find(
      m => m['properties']["cod_lmi"] === codLmi
    );

    const polygonProperties = fullPolygon['properties'];

    // request image list
    const srvImgArrPath = `${polygonProperties['SIRSUP']}_${polygonProperties['UAT']}/${polygonProperties['SIRUTA']}_${polygonProperties['localitate']}/${polygonProperties['SIRINF']}_${polygonProperties['sector'].replace(' ', '-')}/${polygonProperties['cod_lmi']}`;

    //TODO: polygon images????
    const imgArrReqPath = `/api/monument.images?polygonPath=${srvImgArrPath}`;
    const res = await fetch(imgArrReqPath);
    const imgArr = await res.json() || [];

    // save full path images to array
    const fullPathImageArray = imgArr.map(photoName => `/images/${srvImgArrPath}/${photoName}`);

    // creat images properties
    fullPolygon.images = fullPathImageArray;

    commit("setSelectedItem", fullPolygon);
    commit("setPolygonDisplay", true);

  },
  setFilterText ({ commit }, text) {
    commit('setFilterText', text);
  },

  /* eslint-disable no-unused-vars*/
  mapViewChanged ({ commit, state }) {
    return;
    // (?)TODO: filter the available markers based on the displayed area
    // commit('setPolygons', state.geoJSON.features.map(i => i.properties));
    // const items = this.map.queryRenderedFeatures();
    // commit('setPolygons', items.map(i => i.properties));
  }
};

const mutations = {
  setPolygons (state, polygons) {
    state.items = polygons;
  },
  setGeoJSON (state, polygons) {
    state.geoJSON = polygons;
  },
  setSelectedItem (state, item) {
    state.selectedItem = item;
  },
  setPolygonDisplay (state, v) {
    state.polygonDisplayed = v;
  },
  setFilterText (state, v) {
    state.filterText = v;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
