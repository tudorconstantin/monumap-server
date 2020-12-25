// store >> spatii_publice.js

// import Mapbox from 'mapbox-gl';
// const fs = require('fs-extra');
// const spS = fetch('/geojson/spatii_publice/spatii-suprafata.geojson').then((r) => r.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const itemsInfoPanelColors = {
  'SPATII_ABANDONATE': 'cyan-11',
  'SPATII_PUNCTUALE': 'blue-14',
  'SPATII_LINIARE': 'amber-10',
  'SPATII_SUPRAFATA': 'light-green-14',
};

const state = {
  myMap: null,
  mapLoaded: false,
  layers: {
    spatiiAbandonate: {
      geometry: 'Point',
      render: {
        shape: 'circle',
        layout: {
          // make layer visible by default
          'visibility': 'visible',
        },
        paint: {
          'circle-radius': 8,
          'circle-color': '#00f5ee',
          'circle-stroke-color': '#3b3a3a',
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
          'circle-radius': 8,
          'circle-color': '#00f5ee',
          'circle-stroke-color': '#ffffff',
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
          'circle-radius': 8,
          'circle-color': '#00f5ee',
          'circle-stroke-color': '#ffde02',
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
        layout: {
          // make layer visible by default
          'visibility': 'visible',
        },
        paint: {
          'circle-radius': 8,
          'circle-color': '#1255f6',
          'circle-stroke-color': '#3b3a3a',
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
          'circle-radius': 8,
          'circle-color': '#1255f6',
          'circle-stroke-color': '#ffffff',
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
          'circle-radius': 8,
          'circle-color': '#1255f6',
          'circle-stroke-color': '#ffde02',
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
        'layout': {
          // make layer visible by default
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round',
        },
        'paint': {
          'line-dasharray': [1, 0.5],
          'line-color': '#ff4d1f',
          'line-width': 6,
        }
      },
      sourceId: 'SPATII_LINIARE',
      layerId: 'SPATII_LINIARE',
    },
    spatiiLiniareHover: {
      geometry: 'MultiLineString',
      render: {
        shape: 'line',
        'layout': {
          // make layer visible by default
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-dasharray': [1, 0.5],
          'line-color': '#ffffff',
          'line-width': 6,
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
        'layout': {
          // make layer visible by default
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-dasharray': [1, 0.5],
          'line-color': '#ffde02',
          'line-width': 6,
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
        layout: {
          // make layer visible by default
          'visibility': 'visible',
        },
        paint: {
          'fill-color': '#16e802',
          'fill-antialias': true,
          'fill-outline-color': '#3b3a3a',
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
          'line-color': '#ffffff',
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
          'line-color': '#ffde02',
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
  itemsInfoPanelColors,
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

  async selectItem({commit}, value) {
    // console.log('@store > actions >> selectItem', value);
    // console.log('@store > currentSelectedItem: ', this.state.selectedItem);
    // if null value
    if (!value) {
      // console.log('@store > actions >> !value');
      commit("setRightPanel", false);
      commit('setItemSelected', false);
      commit("setSelectedItem", undefined);
    } else {
      // console.log('@store > actions >> value');
      commit('setSelectedItem', value);
      commit('setItemSelected', true);
      commit('setRightPanel', true);
    }
  },

  updateLoading({commit}, value) {
    // console.log('@store > loading: ', value);
    commit('setLoading', value);
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

  setLoading(state, value) {
    state.loading = value;
  },

  setSelectedItem(state, value) {
    // console.log('@store > setSelectedItem >> item: ', value);
    state.selectedItem = value ? {...value} : null;
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
