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
      <search-panel :map="map" :mapLoadedFlag="mapLoadedFlag"></search-panel>
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

    <q-spinner
        color="blue"
        size="3em"
        :thickness="10"
        class="absolute-center vertical-middle"
        v-if="loading"/>
  </div>
</template>

<script>
import SearchPanel from './SearchPanel';
import InfoPanel from './InfoPanel';
// import 'mapbox-gl/dist/mapbox-gl.css';

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
      hoveredItem: {},
      accessToken:
    "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
        mapStyle: "mapbox://styles/tudorconstantin/ckb6h17g326dr1iuz4vf53dsr",
      container: 'mapContainer',
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
      mapLoadedFlag: false,
    };
  },

  computed: {
    loading: {
      get() {
        return this.$store.state.lie2020_1.loading;
      },
      set: function (value) {
        this.$store.dispatch('lie2020_1/updateLoading', value);
      },
    },

    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.lie2020_1.leftPanel;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('lie2020_1/updateLeftPanel', value);
      },
    },

    rightPanel: {
      get() {
        return this.$store.state.lie2020_1.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('lie2020_1/updateRightPanel', value);
      },
    },

    currentItem: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.lie2020_1.selectedItem;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('lie2020_1/selectItem', value);
      },
    },

    selectedItem: {
      get: function () {
        return this.currentItem;
      },
      set: function (newValue) {
        // load map object
        const map = this.$store.state.lie2020_1.map;
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
    addMapSource(map, sourceId, data) {
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
    addMapLayer: function (map, layer) {
      // add map layer
      map.addLayer({
        id: layer.id,
        type: layer.render.shape,
        source: layer.sourceId,
        // layout: layer.layout,
        layout: {
          visibility: 'visible',
        },
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
      let hoveredItem = this.hoveredItem;
      // console.log('@hoveredItem: ', hoveredItem);
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
        // if more than one feature is hovered
        if (e.features.length > 0) {
          // de-highlight previous hovered item, if any
          if (hoveredItem && hoveredItem.sourceId) {
            map.setFeatureState(
                {source: hoveredItem.sourceId, id: hoveredItem.id},
                {hover: false}
            );
          }
          // highlight current hovered item
          hoveredItem.id = e.features[0].id;
          hoveredItem.layerId = hoverLayerId;
          hoveredItem.sourceId = layer.sourceId;
          map.setFeatureState(
              {source: hoveredItem.sourceId, id: hoveredItem.id},
              {hover: true}
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', hoverLayerId, function () {
        if (hoveredItem) {
          map.setFeatureState(
              {source: hoveredItem.sourceId, id: hoveredItem.id},
              {hover: false}
          );
        }
        // hoveredItem = null;
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

      // console.log('mapLayer: ', map.getLayer(layer.id));
    },

    // add map click event handler
    addMapClickHandler(map) {
      // load map object
      // const map = this.$store.state.lie2020_1.map;
      // load store
      const store = this.$store;
      // load array of layers ids
      const layersIdsArr = this.$store.getters["lie2020_1/getAllLayersIds"];
      // console.log('layersIdsArr: ', layersIdsArr);
      // on click action
      map.on('click', function (e) {
        // console.log('@click e: ', e);
        // find clicked item
        const clickedItem = (map.queryRenderedFeatures(e.point, {layers: layersIdsArr}) || [])[0];
        // console.log('clickedItem: ', clickedItem);
        // deselect previous selection
        // const previousSelectedItem = store.state.lie2020_1.selectedItem;
        // console.log('previousSelectedItem: ', previousSelectedItem);
        // remove highlight
        layersIdsArr.forEach((layerId) => {
          map.setFilter(`${layerId}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
        });
        // if (previousSelectedItem)
        //   map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
        // if clicked on item
        if (clickedItem) {
          // highlight selected item
          map.setFilter(`${clickedItem.layer.id.replace('_HOVER', '')}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);

          // save selected item to store
          store.dispatch('lie2020_1/selectItem', clickedItem);
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
          store.dispatch('lie2020_1/selectItem', null);
          // set item selected flag to false
          store.dispatch('lie2020_1/updateItemSelected', false);
          // set app related flags to false
          store.dispatch('app/updateRightPanel', false);
          store.dispatch('app/updateItemSelected', false)
        }

      });
    },


    async onMapLoaded(event) {
      this.loading = false;

      const map = event.map;
      // save map
      this.map = map;
      // add map data sources
      // console.log('itemsGroups: ', this.$store.state.lie2020_1.itemGroups);
      // const layersArr = this.$store.state.lie2020_1.itemGroups[0].layers;
      // console.log('layersArr: ', layersArr[0]);
      // await this.addMapSource(map, layersArr[0]);
      // // add map layers
      // this.addMapLayer(map, layersArr[0]);

      this.$store.state.lie2020_1.itemGroups[0].layers
          .forEach((layer) => {
            this.addMapSource(map, layer.sourceId, {
              "type": "FeatureCollection",
              "name": layer.id,
              "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
              features: this.$store.state.lie2020_1.items.features
                  .filter(item => item.layer.id === layer.id),
            });
            this.addMapLayer(map, layer);
          });

      // add click handler
      this.addMapClickHandler(map);

      // update mapLoadedFlag
      this.mapLoadedFlag = true;
    },

    // calculate map height, required by mapbox
    cssVars() {
      //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        "--height": this.$q.platform.is.desktop ?
            window.innerHeight -
            document.getElementById("header").offsetHeight +
            "px" :
            window.innerHeight -
            (document.getElementById("header-mobile-portrait") ?
                document.getElementById("header-mobile-portrait") :
                document.getElementById("header-mobile-landscape")).offsetHeight +
            "px" ,
        "--width": window.innerWidth + "px",
      };
    },
  },

  created() {
    this.map = {};
  }
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
