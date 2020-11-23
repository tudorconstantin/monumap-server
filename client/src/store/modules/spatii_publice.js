// store >> spatii_publice.js

import Mapbox from 'mapbox-gl';
// const fs = require('fs-extra');
// const spS = fetch('/geojson/spatii_publice/spatii-suprafata.geojson').then((r) => r.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  myMap: null,
  mapLoaded: false,
  layers: {
    spatiiAbandonate: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#ad0450',
          'circle-stroke-color': 'gray',
          'circle-stroke-width': 3,
          'circle-opacity': 0.7
        },
      },
      sourceId: 'SPATII_ABANDONATE',
      layerId: 'SPATII_ABANDONATE',
    },
    spatiiAbandonateHover: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#ad0450',
          'circle-stroke-color': 'yellow',
          'circle-stroke-width': 5,
          'circle-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ],
          'circle-stroke-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ]
        },
      },
      sourceId: 'SPATII_ABANDONATE',
      layerId: 'SPATII_ABANDONATE_HOVER',
    },
    spatiiAbandonateHighlight: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#ad0450',
          'circle-stroke-color': 'red',
          'circle-stroke-width': 5,
        },
        filter: ['==', ['get', 'id'], ''],
      },
      sourceId: 'SPATII_ABANDONATE',
      layerId: 'SPATII_ABANDONATE_HIGHLIGHT',
    },

    spatiiPunctuale: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#0247f3',
          'circle-stroke-color': 'gray',
          'circle-stroke-width': 3,
          'circle-opacity': 0.8,
        },
      },
      sourceId: 'SPATII_PUNCTUALE',
      layerId: 'SPATII_PUNCTUALE',
    },
    spatiiPunctualeHover: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#0247f3',
          'circle-stroke-color': 'yellow',
          'circle-stroke-width': 5,
          'circle-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ],
          'circle-stroke-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ]
        },
      },
      sourceId: 'SPATII_PUNCTUALE',
      layerId: 'SPATII_PUNCTUALE_HOVER',
    },
    spatiiPunctualeHighlight: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#0247f3',
          'circle-stroke-color': 'red',
          'circle-stroke-width': 5,
        },
        filter: ['==', ['get', 'id'], ''],
      },
      sourceId: 'SPATII_PUNCTUALE',
      layerId: 'SPATII_PUNCTUALE_HIGHLIGHT',
    },

    spatiiLiniare: {
      geometry: 'MultiLineString',
      render: {
        shape: 'line',
        paint: {
          'line-color': '#ffde02',
          'line-width': 5,
          'line-opacity': 0.6,
        },
      },
      sourceId: 'SPATII_LINIARE',
      layerId: 'SPATII_LINIARE',
    },
    spatiiLiniareHover: {
      geometry: 'MultiLineString',
      render: {
        shape: 'line',
        paint: {
          'line-color': 'yellow',
          'line-width': 5,
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.1
          ]
        },
      },
      sourceId: 'SPATII_LINIARE',
      layerId: 'SPATII_LINIARE_HOVER',
    },
    spatiiLiniareHighlight: {
      geometry: 'MultiLineString',
      render: {
        shape: 'line',
        paint: {
          'line-color': 'red',
          'line-width': 5,
        },
        filter: ['==', ['get', 'id'], ''],
      },
      sourceId: 'SPATII_LINIARE',
      layerId: 'SPATII_LINIARE_HIGHLIGHT',
    },

    spatiiSuprafata: {
      geometry: 'MultiPolygon',
      render: {
        shape: 'fill',
        paint: {
          'fill-color': '#16e802',
          'fill-opacity': 0.3,
        },
      },
      sourceId: 'SPATII_SUPRAFATA',
      layerId: 'SPATII_SUPRAFATA',
    },
    spatiiSuprafataHover: {
      geometry: 'MultiPolygon',
      render: {
        shape: 'line',
        paint: {
          'line-color': 'yellow',
          'line-width': 5,
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.1
          ]
        },
      },
      sourceId: 'SPATII_SUPRAFATA',
      layerId: 'SPATII_SUPRAFATA_HOVER',
    },
    spatiiSuprafataHighlight: {
      geometry: 'MultiPolygon',
      render: {
        shape: 'line',
        paint: {
          'line-color': 'red',
          'line-width': 5,
        },
        filter: ['==', ['get', 'id'], ''],
      },
      sourceId: 'SPATII_SUPRAFATA',
      layerId: 'SPATII_SUPRAFATA_HIGHLIGHT',
    },
  },
  accessToken: 'pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ',
  mapStyle: 'mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u',
  container: 'mapContainer',
  center: [26.0986, 44.4365],
  zoom: 12.5,
  leftPanel: true,
  rightPanel: true,
  itemSelected: false,
  selectedItem: null,
  metodologie: null,
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
    await commit("setAllData", {metodologie, spAbandonate, spPunctuale, spLiniare, spSuprafata});
  },

  loadMap({commit}) {
    Mapbox.accessToken = state.accessToken;
    const myMap = new Mapbox.Map({
      container: state.container,
      style: state.mapStyle,
      hash: true,
      center: state.center,
      zoom: state.zoom,
      constants: state.constants,
    });
    commit('loadMap', myMap);
  },

  saveMap({commit}, value) {
    commit('saveMap', value);
  },

  // // add map data source
  // async addSource({commit}, sourceId) {
  //   // console.log('store > actions >> addSource: ', sourceId);
  //   const data = await state.spatiiSuprafata;
  //   commit('addSource', { sourceId, data });
  // },
  //
  // // add map layer
  // async addLayer({commit}, layer) {
  //   await commit('addLayer', layer);
  // },
  //
  // // add map click event handler
  // addClickHandler({dispatch, commit}) {
  //   commit('addClickHandler', dispatch);
  // },
  //
  // // add hover layer
  // addHoverLayer({commit}, { layer, hoverLayer }) {
  //   // console.log('store > @addHoverLayer >> hoverLayer: ', hoverLayer);
  //   commit('addHoverLayer', { layer, hoverLayer });
  // },
  //
  // // add highlight layer
  // addHighlightLayer({commit}, highlightLayer) {
  //   commit('addHighlightLayer', highlightLayer);
  // },

  async selectItem({commit}, value) {
    console.log('@store > actions >> selectItem', value);
    // console.log('@store > currentSelectedItem: ', this.state.selectedItem);
    // if null value
    if (!value) {
      commit("setSelectedItem", undefined);
      // commit("setMonumentDisplay", false);
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
  setAllData(state, {metodologie, spAbandonate, spPunctuale, spLiniare, spSuprafata}) {
    state.metodologie = metodologie;
    state.spatiiAbandonate = spAbandonate;
    state.spatiiPunctuale = spPunctuale;
    state.spatiiLiniare = spLiniare;
    state.spatiiSuprafata = spSuprafata;
  },

  loadMap (state, value) {
    state.myMap = value;
  },

  saveMap (state, value) {
    state.myMap = value;
  },

  setSelectedItem(state, value) {
    // console.log('@store > setSelectedItem >> item: ', value);
    state.selectedItem = {...value};
    // console.log('@store > mutations >> currentSelectedItem: ', this.state.selectedItem);

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
