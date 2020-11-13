// store >> toalete_publice.js

const circleRadius = ['+', ['get', 'totalToalete'], 6];
const circleOpacity = 0.7;

const unitsCircleStrokeColor = '#efefef';
const unitsCircleStrokeWidth = 3;

const itemsColors = {
  'TOALETE_PUBLICE': '#304ffe',
};

const itemsInfoPanelColors = {
  'TOALETE_PUBLICE': 'indigo-14',
};

const hoverStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': ['+', ['get', 'totalToalete'], 10],
    'circle-color': '#000000',
    'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.01, 0],
    'circle-stroke-color': '#fafafa',
    'circle-stroke-width': 3,
    'circle-stroke-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
  },
};

const highlightStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': ['+', ['get', 'totalToalete'], 10],
    'circle-color': '#000000',
    'circle-opacity': 0.01,
    'circle-stroke-color': '#faec01',
    'circle-stroke-width': 5,
    'circle-stroke-opacity': 1,
  },
  filter: ['==', ['get', 'id'], ''],
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  leftPanel: true,
  rightPanel: false,
  map: null,
  itemsInfoPanelColors,
  items: {
    code: 'TOALETE_PUBLICE',
    label: 'Toalete Publice',
    data: null,
    checked: true,
    open: true,
    layers: [
      {
        id: 'TOALETE_PUBLICE',
        name: 'Toalete Publice',
        sourceId: 'TOALETE_PUBLICE',
        data: null,
        infoPanelColor: itemsInfoPanelColors['TOALETE_PUBLICE'],
        geometry: 'Point',
        render: {
          shape: 'circle',
          paint: {
            'circle-radius': circleRadius,
            'circle-color': itemsColors['TOALETE_PUBLICE'],
            'circle-opacity': circleOpacity,
            'circle-stroke-color': unitsCircleStrokeColor,
            'circle-stroke-width': unitsCircleStrokeWidth,
          },
        },
        layout: {
          // make layer visible by default
          'visibility': 'visible',
        },
        hover: hoverStyle,
        highlight: highlightStyle,
      },
    ],
  },
  itemSelected: false,
  selectedItem: null,
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {
  getAllLayersIds() {
    return state.items.layers.map(layer => layer.id).flat();
  },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

const actions = {

  async loadAllData({commit}) {
    const [
      items,
    ] = await Promise.all([
      fetch('/geojson/toalete_publice/toalete-publice.geojson').then((r) => r.json()),
    ]);
    commit("setAllData", {items});
  },

  saveMap({commit}, value) {
    commit('setMap', value);
  },

  async selectItem({commit}, value) {
    // if null value
    if (!value) {
      commit("setSelectedItem", undefined);
      commit('setItemSelected', false);
      commit("setRightPanel", false);
    } else {
      commit('setSelectedItem', value);
      commit('setItemSelected', true);
      commit('setRightPanel', true);
    }
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

  setAllData(state, { items }) {
    // set units
    state.items.data = items;
    state.items.layers[0].data = items.features.map((feature) => {
      const newFeature = { ...feature };
      newFeature.layer = {id: 'TOALETE_PUBLICE'};

      // if both types of toilets ane 'null' set 'ecologice' value to 1
      if(feature.properties.ecologice === null && feature.properties.automat === null) newFeature.properties.ecologice = 1;
      // calculate total value
      newFeature.properties.totalToalete = newFeature.properties.ecologice + newFeature.properties.automat;
      // return new feature
      return newFeature;
    });
  },

  setMap(state, value) {
    state.map = value;
  },

  setSelectedItem(state, value) {
    state.selectedItem = value;
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
