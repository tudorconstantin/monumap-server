// store >> spatii_publice.js

import Mapbox from 'mapbox-gl';
// const fs = require('fs-extra');
const spS = fetch('/geojson/spatii_publice/spatii-suprafata.geojson').then((r) => r.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  myMap: null,
  mapLoaded: false,
  currentItem: null,
  // layers: {
  //   spatiiAbandonate: {
  //     geometry: 'Point',
  //     render: {
  //       shape: 'circle',
  //       paint: {
  //         'circle-radius': 10,
  //         'circle-color': '#ad0450',
  //         'circle-stroke-color': 'gray',
  //         'circle-stroke-width': 3,
  //         'circle-opacity': 0.7
  //       },
  //     },
  //     sourceId: 'SPATII_ABANDONATE',
  //     layerId: 'SPATII_ABANDONATE',
  //   },
  //   spatiiAbandonateHover: {
  //     geometry: 'Point',
  //     render: {
  //       shape: 'circle',
  //       paint: {
  //         'circle-radius': 10,
  //         'circle-color': '#ad0450',
  //         'circle-stroke-color': 'yellow',
  //         'circle-stroke-width': 5,
  //         'circle-opacity': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           1,
  //           0
  //         ],
  //         'circle-stroke-opacity': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           1,
  //           0
  //         ]
  //       },
  //     },
  //     sourceId: 'SPATII_ABANDONATE',
  //     layerId: 'SPATII_ABANDONATE_HOVER',
  //   },
  //   spatiiAbandonateHighlight: {
  //     geometry: 'Point',
  //     render: {
  //       shape: 'circle',
  //       paint: {
  //         'circle-radius': 10,
  //         'circle-color': '#ad0450',
  //         'circle-stroke-color': 'red',
  //         'circle-stroke-width': 5,
  //       },
  //       filter: ['==', ['get', 'id'], ''],
  //     },
  //     sourceId: 'SPATII_ABANDONATE',
  //     layerId: 'SPATII_ABANDONATE_HIGHLIGHT',
  //   },
  //
  //   spatiiPunctuale: {
  //     geometry: 'Point',
  //     render: {
  //       shape: 'circle',
  //       paint: {
  //         'circle-radius': 10,
  //         'circle-color': '#0247f3',
  //         'circle-stroke-color': 'gray',
  //         'circle-stroke-width': 3,
  //         'circle-opacity': 0.8,
  //       },
  //     },
  //     sourceId: 'SPATII_PUNCTUALE',
  //     layerId: 'SPATII_PUNCTUALE',
  //   },
  //   spatiiPunctualeHover: {
  //     geometry: 'Point',
  //     render: {
  //       shape: 'circle',
  //       paint: {
  //         'circle-radius': 10,
  //         'circle-color': '#0247f3',
  //         'circle-stroke-color': 'yellow',
  //         'circle-stroke-width': 5,
  //         'circle-opacity': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           1,
  //           0
  //         ],
  //         'circle-stroke-opacity': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           1,
  //           0
  //         ]
  //       },
  //     },
  //     sourceId: 'SPATII_PUNCTUALE',
  //     layerId: 'SPATII_PUNCTUALE_HOVER',
  //   },
  //   spatiiPunctualeHighlight: {
  //     geometry: 'Point',
  //     render: {
  //       shape: 'circle',
  //       paint: {
  //         'circle-radius': 10,
  //         'circle-color': '#0247f3',
  //         'circle-stroke-color': 'red',
  //         'circle-stroke-width': 5,
  //       },
  //       filter: ['==', ['get', 'id'], ''],
  //     },
  //     sourceId: 'SPATII_PUNCTUALE',
  //     layerId: 'SPATII_PUNCTUALE_HIGHLIGHT',
  //   },
  //
  //   spatiiLiniare: {
  //     geometry: 'MultiLineString',
  //     render: {
  //       shape: 'line',
  //       paint: {
  //         'line-color': '#ffde02',
  //         'line-width': 5,
  //         'line-opacity': 0.6,
  //       },
  //     },
  //     sourceId: 'SPATII_LINIARE',
  //     layerId: 'SPATII_LINIARE',
  //   },
  //   spatiiLiniareHover: {
  //     geometry: 'MultiLineString',
  //     render: {
  //       shape: 'line',
  //       paint: {
  //         'line-color': 'yellow',
  //         'line-width': 5,
  //         'line-opacity': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           1,
  //           0.1
  //         ]
  //       },
  //     },
  //     sourceId: 'SPATII_LINIARE',
  //     layerId: 'SPATII_LINIARE_HOVER',
  //   },
  //   spatiiLiniareHighlight: {
  //     geometry: 'MultiLineString',
  //     render: {
  //       shape: 'line',
  //       paint: {
  //         'line-color': 'red',
  //         'line-width': 5,
  //       },
  //       filter: ['==', ['get', 'id'], ''],
  //     },
  //     sourceId: 'SPATII_LINIARE',
  //     layerId: 'SPATII_LINIARE_HIGHLIGHT',
  //   },
  //
  //   spatiiSuprafata: {
  //     geometry: 'MultiPolygon',
  //     render: {
  //       shape: 'fill',
  //       paint: {
  //         'fill-color': '#16e802',
  //         'fill-opacity': 0.3,
  //       },
  //     },
  //     sourceId: 'SPATII_SUPRAFATA',
  //     layerId: 'SPATII_SUPRAFATA',
  //   },
  //   spatiiSuprafataHover: {
  //     geometry: 'MultiPolygon',
  //     render: {
  //       shape: 'line',
  //       paint: {
  //         'line-color': 'yellow',
  //         'line-width': 5,
  //         'line-opacity': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           1,
  //           0.1
  //         ]
  //       },
  //     },
  //     sourceId: 'SPATII_SUPRAFATA',
  //     layerId: 'SPATII_SUPRAFATA_HOVER',
  //   },
  //   spatiiSuprafataHighlight: {
  //     geometry: 'MultiPolygon',
  //     render: {
  //       shape: 'line',
  //       paint: {
  //         'line-color': 'red',
  //         'line-width': 5,
  //       },
  //       filter: ['==', ['get', 'id'], ''],
  //     },
  //     sourceId: 'SPATII_SUPRAFATA',
  //     layerId: 'SPATII_SUPRAFATA_HIGHLIGHT',
  //   },
  // },
  accessToken: 'pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ',
  mapStyle: 'mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u',
  container: 'mapContainer',
  center: [26.0986, 44.4365],
  zoom: 12.5,
  constants: null,
  leftPanel: true,
  rightPanel: true,
  itemSelected: false,
  selectedItem: null,
  spatiiAbandonate: null,
  spatiiLiniare: null,
  spatiiSuprafata: spS,
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
    commit("setAllData", {metodologie, spAbandonate, spPunctuale, spLiniare, spSuprafata});
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

  // add map data source
  async addSource({commit}, sourceId) {
    // console.log('store > actions >> addSource: ', sourceId);
    const data = await state.spatiiSuprafata;
    commit('addSource', { sourceId, data });
  },

  // add map layer
  async addLayer({commit}, layer) {
    await commit('addLayer', layer);
  },

  // add map click event handler
  addClickHandler({dispatch, commit}) {
    commit('addClickHandler', dispatch);
  },

  // add hover layer
  addHoverLayer({commit}, { layer, hoverLayer }) {
    // console.log('store > @addHoverLayer >> hoverLayer: ', hoverLayer);
    commit('addHoverLayer', { layer, hoverLayer });
  },

  // add highlight layer
  addHighlightLayer({commit}, highlightLayer) {
    commit('addHighlightLayer', highlightLayer);
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

  loadMap (state, value) {
    state.myMap = value;
  },

  saveMap (state, value) {
    state.myMap = value;
  },

  async addSource(state, { sourceId, data }) {
    // console.log('store > mutations >> addSource: ', sourceId);
    state.myMap.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: data.type,
        features: data.features,
      },
      generateId: true, // This ensures that all features have unique IDs
    });
  },

  addLayer(state, layer) {
    // add map layer
    state.myMap.addLayer({
      id: layer.layerId,
      type: layer.render.shape,
      source: layer.sourceId,
      layout: {
        // make layer visible by default
        'visibility': 'visible',
      },
      paint: layer.render.paint,
    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    state.myMap.on('mouseenter', layer.layerId, function () {
      state.myMap.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    state.myMap.on('mouseleave', layer.layerId, function () {
      state.myMap.getCanvas().style.cursor = '';
    });
  },

  addClickHandler(state, dispatch) {
    // console.log('@addClickHandler > state: ', state);
    // Center the map on the coordinates of any clicked symbol from the layer.
    state.myMap.on('click', function (e) {
      // console.log('@click e: ', e);
      const clickedItem = (state.myMap.queryRenderedFeatures(e.point) || [])[0];
      // console.log('clickedItem: ', clickedItem);
      // if clicked on item
      if (clickedItem) {
        // for each layer
        ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
          .forEach((item) => {
            if(clickedItem.source === item) {
              // highlight selected item
              state.myMap.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);
            } else {
              // de-highlight previous selection
              state.myMap.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
            }
          });

        // save selected item to store
        dispatch('spatiiPublice/selectItem', clickedItem, {root:true});
        // set app right panel flag to true
        dispatch('app/updateRightPanel', true, {root:true});
        // set app item selected flag to true
        dispatch('app/updateItemSelected', true, {root:true});
        // move to item or center of bounding box
        if (clickedItem.geometry.type === 'Point') {
          // console.log('Geometry Type: ', e.features[0].geometry.type);
          state.myMap.flyTo({
            center: clickedItem.geometry.coordinates,
            zoom: 15,
          });
        } else if (clickedItem.geometry.type === 'LineString') {
          // console.log('Geometry Type: ', clickedItem.geometry.type);
          // Geographic coordinates for LineString
          const coordinates = clickedItem.geometry.coordinates;
          // Pass the first coordinates in the LineString to `lngLatBounds` &
          // wrap each coordinate pair in `extend` to include them in the bounds
          // result. A variation of this technique could be applied to zooming
          // to the bounds of multiple Points or Polygon geometries - it just
          // requires wrapping all the coordinates with the extend method.
          // console.log('coordinates: ', coordinates);
          const bounds = coordinates.reduce(function (bounds, coord) {
            return bounds.extend(coord);
          }, new Mapbox.LngLatBounds(coordinates[0], coordinates[0]));
          // state.myMap.fitBounds(bounds, {
          //   padding: 400
          // });
          state.myMap.flyTo({
            center: bounds.getCenter(),
            zoom: 15,
          });
        } else {
          // console.log('Geometry Type: ', clickedItem.geometry.type);
          // Geographic coordinates for MultiLineString or Polygon
          const coordinates = clickedItem.geometry.coordinates;
          // console.log('coordinates: ', coordinates);
          const bounds = coordinates[0].reduce(function (bounds, coord) {
            return bounds.extend(coord);
          }, new Mapbox.LngLatBounds(coordinates[0][0], coordinates[0][1]));
          state.myMap.flyTo({
            center: bounds.getCenter(),
            zoom: 15,
          });
        }
      } else {
        // de-highlight all layers
        ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
          .forEach((item) => {
            state.myMap.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
          });

        // set selected item to null
        dispatch('spatiiPublice/selectItem', null, {root:true});
        // set item selected flaf to false
        dispatch('spatiiPublice/updateItemSelected', false, {root:true});
        // set app related flags to false
        dispatch('app/updateRightPanel', false, {root:true});
        dispatch('app/updateItemSelected', false, {root:true});
      }

    });
  },

  // add hover layer
  addHoverLayer(state, { layer, hoverLayer }) {
    // let hoveredItemId = this.hoveredItemId;
    // console.log('store > @addHoverLayer >> hoverLayer: ', state.myMap.getSource('SPATII_SUPRAFATA'));
    state.myMap.addLayer({
      'id': hoverLayer.layerId,
      'type': hoverLayer.render.shape,
      'source': hoverLayer.sourceId,
      'layout': {},
      'paint': hoverLayer.render.paint,
    });
    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    state.myMap.on('mousemove', layer.layerId, function (e) {
      if (e.features.length > 0) {
        if (state.hoveredItemId) {
          state.myMap.setFeatureState(
            {source: layer.sourceId, id: state.hoveredItemId},
            {hover: false}
          );
        }
        state.hoveredItemId = e.features[0].id;
        state.myMap.setFeatureState(
          {source: layer.sourceId, id: state.hoveredItemId},
          {hover: true}
        );
      }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    state.myMap.on('mouseleave', `${layer.layerId}`, function () {
      if (state.hoveredItemId) {
        state.myMap.setFeatureState(
          {source: layer.sourceId, id: state.hoveredItemId},
          {hover: false}
        );
      }
      state.hoveredItemId = null;
    });
  },

  // add highlighted/selected item layer
  addHighlightLayer(state, highlightLayer) {
    // let highlightedItemId = this.highlightedItemId;
    // console.log('@hoveredItemId: ', hoveredItemId);
    state.myMap.addLayer({
      'id': highlightLayer.layerId,
      'type': highlightLayer.render.shape,
      'source': highlightLayer.sourceId,
      'layout': {},
      'paint': highlightLayer.render.paint,
      'filter': highlightLayer.render.filter,
    });
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
