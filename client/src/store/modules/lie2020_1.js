// store >> lie2020_1.js

// import constants from "@/util/constants";

const circleRadius = 8;
const circleOpacity = 0.7;

const itemsCircleStrokeColor = '#494949';
const itemsCircleStrokeWidth = 3;

const itemsColors = {
  'CLASA_I': '#d50000',
  'CLASA_II': '#f4511e',
  'CLASA_III': '#ffa726',
  'CLASA_IV': '#ffeb3b',
  'CONSOLIDATA': '#1e88e5',
  'NEINCADRATA': '#546e7a',
  'NENECESAR': '#4caf50',
  'PROPUS_DEMOLARE': '#212121',
  'URGENTA': '#8e24aa',
  'cu_LMI': '#e1bee7',
  'fara_LMI': '#b2ebf2',
};

const itemsInfoPanelColors = {
  'TOATE': 'grey-5',
  'CLASA_I': 'red-14',
  'CLASA_II': 'deep-orange-7',
  'CLASA_III': 'orange-5',
  'CLASA_IV': 'yellow-6',
  'CONSOLIDATA': 'blue-7',
  'NEINCADRATA': 'blue-grey-7',
  'NENECESAR': 'green-6',
  'PROPUS_DEMOLARE': 'grey-10',
  'URGENTA': 'purple-7',
  'TOATE_LMI': 'grey-7',
  'cu_LMI': 'grey-7',
  'fara_LMI': 'grey-7',
};

const hoverStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': 11,
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
    'circle-radius': 11,
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
  loading: true,
  // map: null,
  leftPanel: true,
  rightPanel: false,
  itemSelected: false,
  selectedItem: null,
  items: {},
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
          id: 'CLASA_I',
          name: 'Clasa I',
          sourceId: 'CLASA_I',
          data: null,
          infoPanelColor: itemsInfoPanelColors.CLASA_I,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.CLASA_I,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'CLASA_II',
          name: 'Clasa II',
          sourceId: 'CLASA_II',
          data: null,
          infoPanelColor: itemsInfoPanelColors.CLASA_II,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.CLASA_II,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'CLASA_III',
          name: 'Clasa III',
          sourceId: 'CLASA_III',
          data: null,
          infoPanelColor: itemsInfoPanelColors.CLASA_III,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.CLASA_III,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'CLASA_IV',
          name: 'Clasa IV',
          sourceId: 'CLASA_IV',
          data: null,
          infoPanelColor: itemsInfoPanelColors.CLASA_IV,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.CLASA_IV,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'CONSOLIDATA',
          name: 'Consolidata',
          sourceId: 'CONSOLIDATA',
          data: null,
          infoPanelColor: itemsInfoPanelColors.CONSOLIDATA,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.CONSOLIDATA,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'NEINCADRATA',
          name: 'Neincadrata',
          sourceId: 'NEINCADRATA',
          data: null,
          infoPanelColor: itemsInfoPanelColors.NEINCADRATA,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.NEINCADRATA,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'NENECESAR',
          name: 'Nenecesar',
          sourceId: 'NENECESAR',
          data: null,
          infoPanelColor: itemsInfoPanelColors.NENECESAR,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.NENECESAR,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'PROPUS_DEMOLARE',
          name: 'Propus demolare',
          sourceId: 'PROPUS_DEMOLARE',
          data: null,
          infoPanelColor: itemsInfoPanelColors.PROPUS_DEMOLARE,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.PROPUS_DEMOLARE,
              'circle-opacity': circleOpacity,
              'circle-stroke-color': itemsCircleStrokeColor,
              'circle-stroke-width': itemsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'URGENTA',
          name: 'Urgenta',
          sourceId: 'URGENTA',
          data: null,
          infoPanelColor: itemsInfoPanelColors.URGENTA,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': itemsColors.URGENTA,
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

  filtruRiscSeismicToate: true,
  filtruRiscSeismic: [
    'CLASA_I',
    'CLASA_II',
    'CLASA_III',
    'CLASA_IV',
    'CONSOLIDATA',
    'NEINCADRATA',
    'NENECESAR',
    'PROPUS_DEMOLARE',
    'URGENTA',
  ],
  filtruRiscSeismicReset: [
    'CLASA_I',
    'CLASA_II',
    'CLASA_III',
    'CLASA_IV',
    'CONSOLIDATA',
    'NEINCADRATA',
    'NENECESAR',
    'PROPUS_DEMOLARE',
    'URGENTA',
  ],

  filtruLMIToate: true,
  filtruLMI: [
    'cu_LMI',
    'fara_LMI',
  ],
  filtruLMIReset: [
    'cu_LMI',
    'fara_LMI',
  ],
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {
  getAllLayersIds() {
    return state.itemGroups.map(group => group.layers.map(layer => layer.id)).flat();
  },

  filteredArray: (state) => {
    // console.log('items: ', state.items.features);
    // if array has no items, return empty array
    if (!state.items.features) return [];
    // if no filters are applied, return all items
    if (!( state.filtruRiscSeismic )) return state.items.features;
    // filter items
    let filteredItems = [...state.items.features];
    // console.log('filteredItems', filteredItems);
    if (state.filtruRiscSeismic && state.filtruLMI) {
      filteredItems = filteredItems.filter((i) => {
        return state.filtruRiscSeismic.includes(i.layer.id) &&
          state.filtruLMI.includes(i.lmi);
      });
    }
    // return array filtered by the search bar, searching without diacritics
    // return filteredItems.filter(m => {
    //     for (const field of constants.searchableFields) {
    //       if (m.properties[field] && m.properties[field].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(needle))
    //         return true;
    //     }
    //     return false;
    //   }
    // );
    return filteredItems;
  },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

const actions = {

  async loadAllData({commit}) {
    // console.log('@store: read data from file');
    const items = await fetch('/geojson/lie2020_1/b_lie_2020-1_point.geojson').then((r) => r.json());
    commit("setAllData", items);
  },

  updateLoading({commit}, value) {
    // console.log('@store > loading: ', value);
    commit('setLoading', value);
  },

  updateFiltruRiscSeismicToate({commit}, {value, map}) {
    commit('setItemsRSFilterToate', {value, map});
  },

  updateFiltruRiscSeismic({commit}, {value, map}) {
    commit('setItemsRSFilter', {value, map});
  },

  updateFiltruLMIToate({commit}, {value}) {
    commit('setItemsLMIFilterToate', {value});
  },

  updateFiltruLMI({commit}, {value}) {
    commit('setItemsLMIFilter', {value});
  },

  async selectItem({commit}, value) {
    // console.log('@store > selectItem: ', value);
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
    // stop loading spinner
    // state.loading = false;
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

  setFiltruRiscSeismic({commit, state, dispatch}, val) {
    if (val && state.selectedItem && state.selectedItem.icon_code !== val) {
      dispatch('selectItem', null);
    }
    commit('setFiltruRiscSeismic', val);
  },

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUTATIONS

const mutations = {

  setAllData(state, items) {
    // console.log('@store: save data to store');
    // set units
    state.items = items;
    // console.log('@store > setAllData >> items: ', items);
    // state.itemGroups[0].data = items;
    // console.log('@store: calculate items count');
    state.items.totalCount = items.features.length;
    state.items.lmiCount = items.features
      .filter(i => i.properties.cod_lmi !== '/Na')
      .length;
    state.items.noLmiCount = state.items.totalCount - state.items.lmiCount;
    // console.log('@store: prepare layers');
    state.itemGroups[0].layers.forEach((layer) => {
      const features = items.features
        .filter((i, index) => {
          // if 'risc_seismic' is not 'Urgenta' (U1, U2, U3, U4)
          if (i.properties.risc_seism.trim().toLowerCase()[0] !== 'u') {
            const response = i.properties.risc_seism.trim().toLowerCase() === layer.name.toLowerCase();
            if (response) items.features[index].layer = {id: layer.id};
            return response;
          }
          // if 'risc_seismic' is 'Urgenta' (U1, U2, U3, U4)
          const response = i.properties.risc_seism.trim().toLowerCase()[0] === layer.name.toLowerCase()[0];
          if (response) items.features[index].layer = {id: 'URGENTA'};
          return response;
          }
        );
      // count lmi and non-lmi items
      layer.lmiCount = 0;
      layer.noLmiCount = 0;
      features.forEach((i) => {
        // if item has LMI code
        if (i.properties.cod_lmi !== '/Na') {
          i.lmi = 'cu_LMI';
          layer.lmiCount += 1;
        } else {
          i.lmi = 'fara_LMI';
          layer.noLmiCount += 1;
        }
      });
      layer.itemsCount = features.length;
      layer.data = features.map((feature) => {
        // const newFeature = {properties: {}};
        // newFeature.id = feature.id;
        // newFeature.properties.id = feature.properties.id;
        // // newFeature.properties.sector = feature.properties.sector;
        // // newFeature.properties.adresa = feature.properties.adresa;
        // // newFeature.properties.lat = feature.properties.lat;
        // // newFeature.properties.lng = feature.properties.lng;
        // // newFeature.properties.stadiu_normalizat = feature.properties.stadiu_normalizat;
        // const newFeature = {...feature};
          feature.layer = {id: layer.id};
        return feature;
      });
    });
    // console.log('@store: data preparation DONE!');
  },

  setLoading(state, value) {
    state.loading = value;
  },

  setItemsRSFilterToate(state, {value, map}) {
    // set checkbox 'TOATE'
    state.filtruRiscSeismicToate = value;

    // if set to true
    if (value) {
      // show all map layers
      state.filtruRiscSeismicReset.forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
        map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });
      // reset checkboxes values
      state.filtruRiscSeismic = state.filtruRiscSeismicReset.slice();

      // else, if set to false
    } else {
      // hide all map layers
      state.filtruRiscSeismicReset.forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
        map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
        map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
      });
      // set all checkboxes to false
      state.filtruRiscSeismic = [];
    }
  },

  setItemsRSFilter(state, {value, map}) {
    // update checkboxes value
    state.filtruRiscSeismic = value;
    // console.log('value: ', value);
    // console.log('map: ', map);

    // if all checkboxes are selected
    if (value.length === state.filtruRiscSeismicReset.length) {
      // set checkbox 'TOATE' to true
      state.filtruRiscSeismicToate = true;
      // show all map layers
      state.filtruRiscSeismicReset.forEach((layerId) => {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
        map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });

      // if some checkboxes are de-selected
    } else {
      // set 'TOATE' filter to false
      state.filtruRiscSeismicToate = false;
      // for each checkbox
      state.filtruRiscSeismicReset.forEach((layerId) => {
        // if checkbox list includes layerId, show layer
        if (state.filtruRiscSeismic.includes(layerId)) {
          map.setLayoutProperty(layerId, 'visibility', 'visible');
          map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
          map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
          // else, if checkbox does not include layerId, hide layer
        } else {
          map.setLayoutProperty(layerId, 'visibility', 'none');
          map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
          map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
        }
      });
    }
  },

  setItemsLMIFilterToate(state, {value}) {
    // set checkbox 'TOATE'
    state.filtruLMIToate = value;

    // if set to true
    if (value) {
      // reset checkboxes values
      state.filtruLMI = [...state.filtruLMIReset];

      // else, if set to false
    } else {
      // set all checkboxes to false
      state.filtruLMI = [];
    }
  },

  setItemsLMIFilter(state, {value}) {
    // set 'total' checkbox value
    if (value.length === 2) {
      state.filtruLMIToate = true;
    } else {
      state.filtruLMIToate = false;
    }
    // set checkbox values
    state.filtruLMI = value;
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

  setFiltruRiscSeismic(state, v) {
    state.filtruRiscSeismic = v;
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
