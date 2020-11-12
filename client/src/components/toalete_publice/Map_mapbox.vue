<!-- toalete-publice :: Map_mapbox -->

<template>
  <div id="mapContainer" :style="cssVars()">

    <!-- left panel -->
    <q-drawer
        :overlay="true"
        v-model="leftPanel"
        side="left"
        bordered
        :content-style="{ backgroundColor: '#bdbdbd' }"
        class="bg-grey-5"
    >
      <!-- drawer content -->
      <search-panel></search-panel>
    </q-drawer>

    <!-- right panel -->
    <q-drawer
        v-model="rightPanel"
        :overlay="true"
        class="bg-grey-5"
        side="right"
        bordered
        :width="400"
        :content-style="{ backgroundColor: '#bdbdbd' }"
    >
      <!-- drawer content -->
      <info-panel v-bind:current-item="currentItem"></info-panel>
    </q-drawer>

    <!-- map -->
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
    </MglMap>
  </div>
</template>

<script>
import SearchPanel from './SearchPanel';
import InfoPanel from './InfoPanel';
import 'mapbox-gl/dist/mapbox-gl.css';

import {MglMap, MglNavigationControl, MglGeolocateControl} from 'vue-mapbox';
import Mapbox from 'mapbox-gl';

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    SearchPanel,
    InfoPanel,
  },
  data() {
    return {
      hoverItemId: null,
      accessToken:
          'pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ',
      mapStyle: 'mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u',
      container: 'mapContainer',
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
    };
  },

  computed: {
    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.toaletePublice.leftPanel;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('toaletePublice/updateLeftPanel', value);
      },
    },

    rightPanel: {
      get() {
        return this.$store.state.toaletePublice.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('toaletePublice/updateRightPanel', value);
      },
    },

    currentItem: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.toaletePublice.selectedItem;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('toaletePublice/selectItem', value);
      },
    },

    selectedItem: {
      get: function () {
        return this.currentItem;
      },
      set: function (newValue) {
        // load map object
        const map = this.$store.state.toaletePublice.map;
        if (newValue) {
          let coordinates;
          if (newValue.geometry.type === 'MultiPolygon') {
            coordinates = JSON.parse(
                JSON.stringify(newValue.geometry.coordinates[0])
            );
          } else if (newValue.geometry.type === 'MultiLineString') {
            coordinates = JSON.parse(
                JSON.stringify(newValue.geometry.coordinates)
            );
          } else if (newValue.geometry.type === 'Point') {
            coordinates = [
              [JSON.parse(JSON.stringify(newValue.geometry.coordinates))],
            ];
          }

          let point = coordinates[0].shift().slice(0, 2);
          let bounds = new Mapbox.LngLatBounds(
              new Mapbox.LngLat(...point),
              new Mapbox.LngLat(...point)
          );
          while (coordinates[0].length) {
            point = coordinates[0].shift().slice(0, 2);
            bounds.extend(new Mapbox.LngLat(...point));
          }

          map.fitBounds(bounds, {margin: 2, maxZoom: 17});
          this.currentItem = {
            ...newValue.properties,
            images: newValue.images,
          };
          return;
        }

        this.currentItem = {};
      },
    },
  },

  methods: {
    // add map source
    addMapSource(sourceId, data) {
      // load map object
      const map = this.$store.state.toaletePublice.map;
      // add source
      map.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: data.type,
          features: data.features,
        },
        generateId: true, // This ensures that all features have unique IDs
      });
    },

    // add map layer
    addMapLayer: function (layer) {
      // load map object
      const map = this.$store.state.toaletePublice.map;
      // add map layer
      map.addLayer({
        id: layer.id,
        type: layer.render.shape,
        source: layer.sourceId,
        layout: layer.layout,
        paint: layer.render.paint,
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on('mouseenter', layer.id, function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', layer.id, function () {
        map.getCanvas().style.cursor = '';
      });

      // add hover layer
      let hoveredItemId = this.hoveredItemId;
      // console.log('@hoveredItemId: ', hoveredItemId);
      const hoverLayerId = `${layer.id}_HOVER`
      map.addLayer({
        'id': hoverLayerId,
        'type': layer.hover.shape,
        'source': layer.sourceId,
        'layout': {
          // make layer visible by default
          'visibility': 'visible'
        },
        'paint': layer.hover.paint,
      });
      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.on('mousemove', hoverLayerId, function (e) {
        if (e.features.length > 0) {
          if (hoveredItemId) {
            map.setFeatureState(
                {source: layer.sourceId, id: hoveredItemId},
                {hover: false}
            );
          }
          hoveredItemId = e.features[0].id;
          map.setFeatureState(
              {source: layer.sourceId, id: hoveredItemId},
              {hover: true}
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', hoverLayerId, function () {
        if (hoveredItemId) {
          map.setFeatureState(
              {source: layer.sourceId, id: hoveredItemId},
              {hover: false}
          );
        }
        hoveredItemId = null;
      });

      // add highlight layer
      const highlightLayerId = `${layer.id}_HIGHLIGHT`;
      map.addLayer({
        'id': highlightLayerId,
        'type': layer.highlight.shape,
        'source': layer.sourceId,
        'layout': {
          // make layer visible by default
          'visibility': 'visible'
        },
        'paint': layer.highlight.paint,
        'filter': layer.highlight.filter,
      });
    },

    // add map text
    addMapText(layerId) {
      // load map object
      const map = this.$store.state.toaletePublice.map;
      // load store
      // add text property
      // map.on('load', function () {
        map.setLayoutProperty(layerId, 'text-field', 'test'
        //     [
        //   'format',
        //   ['get', 'locatie'],
        //   {'font-scale': 1.2},
        //   '\n123',
        //   {},
        //   ['get', 'automat'],
        //   {
        //     'font-scale': 0.8,
        //     'text-font': [
        //       'literal',
        //       ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
        //     ]
        //   }
        // ]
        );
      // });
    },

    // add map click event handler
    addMapClickHandler() {
      // load map object
      const map = this.$store.state.toaletePublice.map;
      // load store
      const store = this.$store;
      // load array of layers ids
      const layersIdsArr = this.$store.getters["toaletePublice/getAllLayersIds"];
      // console.log('layersIdsArr: ', layersIdsArr);
      // on click action
      map.on('click', function (e) {
        // console.log('@click e: ', e);
        // find clicked item
        const clickedItem = (map.queryRenderedFeatures(e.point, {layers: layersIdsArr}) || [])[0];
        // console.log('clickedItem: ', clickedItem);
        // deselect previous selection
        const previousSelectedItem = store.state.toaletePublice.selectedItem;
        // console.log('previousSelectedItem: ', previousSelectedItem);
        if (previousSelectedItem) map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
        // if clicked on item
        if (clickedItem) {
          // highlight selected item
          map.setFilter(`${clickedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);

          // save selected item to store
          store.dispatch('toaletePublice/selectItem', clickedItem);
          // set app right panel flag to true
          store.dispatch('app/updateRightPanel', true);
          // set app item selected flag to true
          store.dispatch('app/updateItemSelected', true);

          // move to item or center of bounding box
          if (clickedItem.geometry.type === 'Point') {
            // console.log('Geometry Type: ', e.features[0].geometry.type);
            map.flyTo({
              center: clickedItem.geometry.coordinates,
              zoom: 17,
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
            // map.fitBounds(bounds, {
            //   padding: 400
            // });
            map.flyTo({
              center: bounds.getCenter(),
              zoom: 17,
            });
          } else {
            // console.log('Geometry Type: ', clickedItem.geometry.type);
            // Geographic coordinates for MultiLineString or Polygon
            const coordinates = clickedItem.geometry.coordinates;
            // console.log('coordinates: ', coordinates);
            const bounds = coordinates[0].reduce(function (bounds, coord) {
              return bounds.extend(coord);
            }, new Mapbox.LngLatBounds(coordinates[0][0], coordinates[0][1]));
            map.flyTo({
              center: bounds.getCenter(),
              zoom: 17,
            });
          }
        } else {
          // set selected item to null
          store.dispatch('toaletePublice/selectItem', null);
          // set item selected flag to false
          store.dispatch('toaletePublice/updateItemSelected', false);
          // set app related flags to false
          store.dispatch('app/updateRightPanel', false);
          store.dispatch('app/updateItemSelected', false)
        }

      });
    },


    async onMapLoaded(event) {
      const map = event.map;
      // save map reference to store
      this.$store.dispatch('toaletePublice/saveMap', map);
      // add map data sources
      const itemsArr = await this.$store.state.toaletePublice.items;
      // console.log('itemsArr: ', itemsArr);
      await this.addMapSource('TOALETE_PUBLICE', itemsArr.data);

      // add map layers
      // add layers for 'TOALETE_PUBLICE'
      this.addMapLayer(this.$store.state.toaletePublice.items.layers[0]);
      //
      // // add text property
      // this.addMapText('TOALETE_PUBLICE');

      // add click handler
      this.addMapClickHandler();
    },

    cssVars() {
      //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        '--height':
            window.innerHeight -
            document.getElementById('header').offsetHeight +
            'px',
        '--width': window.innerWidth + 'px',
      };
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
