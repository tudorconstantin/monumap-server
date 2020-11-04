// store >> map.js

import Mapbox from 'mapbox-gl';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  map: {},
  mapLoaded: false,
  currentItem: null,
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
  constants: null,
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

const actions = {
  loadMap (context) {
    'use strict';
    Mapbox.accessToken = state.accessToken;
    const myMap = new Mapbox.Map({
      container: state.container,
      style: state.mapStyle,
      hash: true,
      center: state.center,
      zoom: state.zoom,
      constants: state.constants,
    });
    context.commit('loadMap', myMap);
  },

  // add map layer
  addLayer({commit}, layer, data) {
    commit('addLayer', layer, data);
  },

  // add map click event handler
  addClickHandler({commit}) {
    commit('addClickHandler');
  },

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUTATIONS

const mutations = {

  loadMap (state, value) {
    state.myMap = value;
  },

  addLayer(state, layer, data) {
    // add map source
    state.map.addSource(layer.sourceId, {
      type: 'geojson',
      data: {
        type: data.type,
        features: data.features,
      },
      generateId: true, // This ensures that all features have unique IDs
    });

    // add map layer
    state.map.addLayer({
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
    state.map.on('mouseenter', layer.layerId, function () {
      state.map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    state.map.on('mouseleave', layer.layerId, function () {
      state.map.getCanvas().style.cursor = '';
    });
  },

  addClickHandler({state, dispatch}) {
    // Center the map on the coordinates of any clicked symbol from the layer.
    state.map.on('click', function (e) {
      console.log('@click e: ', e);
      const clickedItem = (state.map.queryRenderedFeatures(e.point) || [])[0];
      console.log('clickedItem: ', clickedItem);
      // if clicked on item
      if (clickedItem) {
        // for each layer
        ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
          .forEach((item) => {
            if(clickedItem.source === item) {
              // highlight selected item
              state.map.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);
            } else {
              // de-highlight previous selection
              state.map.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
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
          state.map.flyTo({
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
          // state.map.fitBounds(bounds, {
          //   padding: 400
          // });
          state.map.flyTo({
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
          state.map.flyTo({
            center: bounds.getCenter(),
            zoom: 15,
          });
        }
      } else {
        // de-highlight all layers
        ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
          .forEach((item) => {
            state.map.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
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
