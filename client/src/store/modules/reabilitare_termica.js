// store >> reabilitare_termica.js

const circleRadius = 6;
const circleOpacity = 0.9;

const itemsCircleStrokeColor = '#494949';
const itemsCircleStrokeWidth = 2;

const itemsColors = {
  'URMEAZA': '#fae202',
  'IN_PROIECTARE': '#e87109',
  'IN_EXECUTIE': '#3ee302',
  'FINALIZAT': '#3680ff',
  'REZILIAT': '#ff0303',
  'AVIZ_NEGATIV_ISC': '#010910',
};

const itemsInfoPanelColors = {
  'TOATE': 'grey-5',
  'URMEAZA': 'yellow',
  'IN_PROIECTARE': 'orange',
  'IN_EXECUTIE': 'light-green-13',
  'FINALIZAT': 'blue-6',
  'REZILIAT': 'deep-orange-13',
  'AVIZ_NEGATIV_ISC': 'grey-10',
};

const hoverStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': 9,
    'circle-color': '#000000',
    'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.01, 0],
    'circle-stroke-color': '#fafafa',
    'circle-stroke-width': 2,
    'circle-stroke-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
  },
};

const highlightStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': 9,
    'circle-color': '#000000',
    'circle-opacity': 0.01,
    'circle-stroke-color': '#faec01',
    'circle-stroke-width': 3,
    'circle-stroke-opacity': 1,
  },
  filter: ['==', ['get', 'id'], ''],
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  map: null,
  leftPanel: true,
  rightPanel: false,
  itemSelected: false,
  selectedItem: null,
  items: null,
  itemsInfoPanelColors,
  itemGroups: [
    {
      code: 'IMOBILE',
      label: 'Imobile',
      data: null,
      checked: true,
      open: true,
      layers: [
        {
          id: 'URMEAZA',
          name: 'Urmeaza',
          sourceId: 'URMEAZA',
          data: null,
          infoPanelColor: itemsInfoPanelColors['URMEAZA'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors['URMEAZA'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'IN_PROIECTARE',
          name: 'In Proiectare',
          sourceId: 'IN_PROIECTARE',
          data: null,
          infoPanelColor: itemsInfoPanelColors['IN_PROIECTARE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors['IN_PROIECTARE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'IN_EXECUTIE',
          name: 'In Executie',
          sourceId: 'IN_EXECUTIE',
          data: null,
          infoPanelColor: itemsInfoPanelColors['IN_EXECUTIE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors['IN_EXECUTIE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'FINALIZAT',
          name: 'Finalizat',
          sourceId: 'FINALIZAT',
          data: null,
          infoPanelColor: itemsInfoPanelColors['FINALIZAT'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors['FINALIZAT'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'REZILIAT',
          name: 'Reziliat',
          sourceId: 'REZILIAT',
          data: null,
          infoPanelColor: itemsInfoPanelColors['REZILIAT'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors['REZILIAT'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'AVIZ_NEGATIV_ISC',
          name: 'Aviz Negativ ISC',
          sourceId: 'AVIZ_NEGATIV_ISC',
          data: null,
          infoPanelColor: itemsInfoPanelColors['AVIZ_NEGATIV_ISC'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors['AVIZ_NEGATIV_ISC'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
      ],
    },
  ],

  filtruEtapeToate: true,
  filtruEtape: [
    'URMEAZA',
    'IN_PROIECTARE',
    'IN_EXECUTIE',
    'FINALIZAT',
    'REZILIAT',
    'AVIZ_NEGATIV_ISC',
  ],
  filtruEtapeReset: [
    'URMEAZA',
    'IN_PROIECTARE',
    'IN_EXECUTIE',
    'FINALIZAT',
    'REZILIAT',
    'AVIZ_NEGATIV_ISC',
  ],
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {

  getAllLayersIds() {
    return state.itemGroups.map(group => group.layers.map(layer => layer.id)).flat();
  },

  filteredItems(state) {
    const items = {...state.itemGroups[0]};
    items.layers = items.layers.filter(layer => state.filtruEtape.includes(layer.id));
    return items;
  },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

const actions = {

  async loadAllData({commit}) {
    const items = await fetch('/geojson/reabilitare_termica/b_reabilitare-termica_l.geojson').then((r) => r.json());
    commit("setAllData", items);
  },

  saveMap({commit}, value) {
    commit('setMap', value);
  },

  updateItemsFilterToate({commit}, value) {
    commit('setItemsFilterToate', value);
  },

  updateItemsFilter({commit}, value) {
    commit('setItemsFilter', value);
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

  setAllData(state, items) {
    // set units
    state.items = items;
    // console.log('@store > setAllData >> items: ', items);
    state.itemGroups[0].data = items;
    state.itemGroups[0].layers.forEach((layer) => {
      const features = items.features.filter((i) => i.properties.stadiu_normalizat.toUpperCase() === layer.name.toUpperCase());
      layer.data = features.map((feature) => {
        const newFeature = feature;
        newFeature.layer = {id: layer.id};
        return newFeature;
      });
    });
  },

  setMap(state, value) {
    state.map = value;
  },

  setItemsFilterToate(state, value) {
    // set checkbox 'TOATE'
    state.filtruEtapeToate = value;

    // if set to true
    if (value) {
      // show all map layers
      state.filtruEtapeReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });
      // reset checkboxes values
      state.filtruEtape = state.filtruEtapeReset.slice();

      // else, if set to false
    } else {
      // hide all map layers
      state.filtruEtapeReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'none');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
      });
      // set all checkboxes to false
      state.filtruEtape = [];
    }
  },

  setItemsFilter(state, value) {
    // update checkboxes value
    state.filtruEtape = value;

    // if all checkboxes are selected
    if (value.length === state.filtruEtapeReset.length) {
      // set checkbox 'TOATE' to true
      state.filtruEtapeToate = true;
      // show all map layers
      state.filtruEtapeReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });

      // if some checkboxes are de-selected
    } else {
      // set 'TOATE' filter to false
      state.filtruEtapeToate = false;
      // for each checkbox
      state.filtruEtapeReset.forEach((layerId) => {
        // if checkbox list includes layerId, show layer
        if (state.filtruEtape.includes(layerId)) {
          state.map.setLayoutProperty(layerId, 'visibility', 'visible');
          state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
          state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
          // else, if checkbox does not include layerId, hide layer
        } else {
          state.map.setLayoutProperty(layerId, 'visibility', 'none');
          state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
          state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
        }
      });
    }
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
