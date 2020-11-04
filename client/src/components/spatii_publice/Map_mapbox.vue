<!-- spatii-publice :: map -->

<template>
  <div id="mapContainer" :style="cssVars()">
    <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :container="container"
        :center="center"
        :zoom="zoom"
        height="1000px"
        @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left"/>
      <MglGeolocateControl position="top-left"/>
      <!--      <MglMarker-->
      <!--          v-if="!!selectedItem"-->
      <!--          :coordinates="[-->
      <!--          selectedItem && selectedItem.x,-->
      <!--          selectedItem && selectedItem.y,-->
      <!--        ]"-->
      <!--      >-->
      <!--        <img slot="marker" src="../../assets/marker_selected.png"/>-->
      <!--      </MglMarker>-->
    </MglMap>
  </div>
</template>

<script>

import {matRoom} from '@quasar/extras/material-icons';
import MapBox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  // MglMarker,
} from 'vue-mapbox';

import {mapGetters} from 'vuex';

export default {
  name: 'SpatiiPubliceMap',

  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    // MglMarker,
  },

  data() {
    return {
      geoJSON: {},
      items: [],
      filteredItems: [],
      currentItem: {},
      hoveredItemId: null,
      layers: {
        spatiiAbandonate: {
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#ad0450',
              'circle-stroke-color': 'gray',
              'circle-stroke-width': 1,
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
              'circle-stroke-color': 'red',
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

        spatiiPunctuale: {
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#0247f3',
              'circle-stroke-color': 'gray',
              'circle-stroke-width': 1,
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
              'circle-stroke-color': 'red',
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
              'line-color': 'red',
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
              'line-color': 'red',
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
      },

      accessToken:
          'pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ',
      mapStyle: 'mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u',
      container: 'mapContainer',
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
    };
  },

  async created() {
    this.map = null;
    this.matRoom = matRoom;
  },

  computed: {
    ...mapGetters({
      polygons: 'polygons/filteredArray',
    }),

    spatiiAbandonate() {
      return this.$store.getters["spatiiPublice/getSpatiiAbandonate"];
    },
    spatiiPunctuale() {
      return this.$store.getters["spatiiPublice/getSpatiiPunctuale"];
    },
    spatiiLiniare() {
      return this.$store.getters["spatiiPublice/getSpatiiLiniare"];
    },
    spatiiSuprafata() {
      return this.$store.getters["spatiiPublice/getSpatiiSuprafata"];
    },
  },

  methods: {
    addMapLayer: function (mapObj, layer, data) {

      // add map source
      mapObj.addSource(layer.sourceId, {
        type: 'geojson',
        data: {
          type: data.type,
          features: data.features,
        },
        generateId: true, // This ensures that all features have unique IDs
      });

      // add map layer
      mapObj.addLayer({
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
      mapObj.on('mouseenter', layer.layerId, function () {
        mapObj.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      mapObj.on('mouseleave', layer.layerId, function () {
        mapObj.getCanvas().style.cursor = '';
      });
      // save map object to store
      this.$store.map = mapObj;
      // return new map object
      return mapObj;
    },

    // add map click event handler
    addMapClickHandler(mapObj) {
      // load store
      const store = this.$store;
      // Center the map on the coordinates of any clicked symbol from the layer.
      mapObj.on('click', function (e) {
        // console.log('@click e: ', e);
        const clickedItem = (mapObj.queryRenderedFeatures(e.point) || [])[0];
        // console.log('clickedItem: ', clickedItem);
        // if clicked on item
        if (clickedItem) {
          // save selected item to store
          store.dispatch('spatiiPublice/selectItem', clickedItem);
          // set app right panel flag to true
          store.dispatch('app/updateRightPanel', true);
          // set app item selected flag to true
          store.dispatch('app/updateItemSelected', true);
          // move to item or center of bounding box
          if (clickedItem.geometry.type === 'Point') {
            // console.log('Geometry Type: ', e.features[0].geometry.type);
            mapObj.flyTo({
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
            }, new MapBox.LngLatBounds(coordinates[0], coordinates[0]));
            // mapObj.fitBounds(bounds, {
            //   padding: 400
            // });
            mapObj.flyTo({
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
            }, new MapBox.LngLatBounds(coordinates[0][0], coordinates[0][1]));
            mapObj.flyTo({
              center: bounds.getCenter(),
              zoom: 15,
            });
          }
        } else {
          // set selected item to null
          store.dispatch('spatiiPublice/selectItem', null);
          // set item selected flaf to false
          store.dispatch('spatiiPublice/updateItemSelected', false);
          // set app related flags to false
          store.dispatch('app/updateRightPanel', false);
          store.dispatch('app/updateItemSelected', false)
        }

      });
    },

    addHoverLayer(mapObj, layer, hoverLayer) {
      let hoveredItemId = this.hoveredItemId;
      // console.log('@hoveredItemId: ', hoveredItemId);
      mapObj.addLayer({
        'id': hoverLayer.layerId,
        'type': hoverLayer.render.shape,
        'source': hoverLayer.sourceId,
        'layout': {},
        'paint': hoverLayer.render.paint,
      });
      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      mapObj.on('mousemove', layer.layerId, function (e) {
        if (e.features.length > 0) {
          if (hoveredItemId) {
            mapObj.setFeatureState(
                {source: layer.sourceId, id: hoveredItemId},
                {hover: false}
            );
          }
          hoveredItemId = e.features[0].id;
          mapObj.setFeatureState(
              {source: layer.sourceId, id: hoveredItemId},
              {hover: true}
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      mapObj.on('mouseleave', `${layer.layerId}`, function () {
        if (hoveredItemId) {
          mapObj.setFeatureState(
              {source: layer.sourceId, id: hoveredItemId},
              {hover: false}
          );
        }
        hoveredItemId = null;
      });
      return mapObj;
    },

    /* eslint-disable-next-line no-unused-vars */
    setFilter(filter) {
      let filteredItems = [...this.items];
      if (filter.text) {
        filteredItems = filteredItems.filter(i => i.properties.denumire.toUpperCase().indexOf(filter.text.toUpperCase()) > -1);
      }

      this.filteredItems = filteredItems;
    },

    onMapLoaded(event) {
      let map = event.map;
      this.$store.map = map;
      // add map layers
      // add layer for 'spatii-suprafata'
      map = this.addMapLayer(map, this.layers.spatiiSuprafata, this.spatiiSuprafata);
      // add layer for 'spatii-liniare'
      map = this.addMapLayer(map, this.layers.spatiiLiniare, this.spatiiLiniare);
      // add layer for 'spatii-punctuale'
      map = this.addMapLayer(map, this.layers.spatiiPunctuale, this.spatiiPunctuale);
      // add layer for 'spatii-abandonate'
      map = this.addMapLayer(map, this.layers.spatiiAbandonate, this.spatiiAbandonate);
      // add test hover layer
      map = this.addHoverLayer(map, this.layers.spatiiSuprafata, this.layers.spatiiSuprafataHover);
      map = this.addHoverLayer(map, this.layers.spatiiLiniare, this.layers.spatiiLiniareHover);
      map = this.addHoverLayer(map, this.layers.spatiiPunctuale, this.layers.spatiiPunctualeHover);
      map = this.addHoverLayer(map, this.layers.spatiiAbandonate, this.layers.spatiiAbandonateHover);


      // add click event handler
      map = this.addMapClickHandler(map);

    },

    cssVars() {
      //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        "--height": this.$q.platform.is.desktop ?
            window.innerHeight -
            document.getElementById("header").offsetHeight +
            "px" :
            window.innerHeight -
            document.getElementById("header-mobile").offsetHeight +
            "px",
        "--width": window.innerWidth + "px",
      };
    },

    selectItem(item) {
      if (!item) {
        this.$store.dispatch('spatiiPublice/selectItem', undefined);
        // this.$store.dispatch('app/updateRightPanel', false);
        this.$store.dispatch('app/updateItemSelected', false);
      } else {
        this.$store.dispatch('spatiiPublice/selectItem', item);
        this.$store.dispatch('app/updateRightPanel', true);
        this.$store.dispatch('app/updateItemSelected', true);
      }

    },
  },
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
