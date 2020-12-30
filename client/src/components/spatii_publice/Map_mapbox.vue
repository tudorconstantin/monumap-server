<!-- spatii-publice :: map -->

<template>
  <div id="mapContainer" :style="cssVars()">

    <!-- left panel -->
    <search-panel :map="map" :mapLoadedFlag="mapLoadedFlag"></search-panel>

    <!-- right panel -->
    <info-panel v-bind:current-item="currentItem"></info-panel>

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

    <!-- loading indicator -->
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

import Mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  // MglMarker,
} from 'vue-mapbox';

// import {mapGetters} from 'vuex';

export default {
  name: 'SpatiiPubliceMap',

  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    SearchPanel,
    InfoPanel,
  },

  data() {
    return {
      geoJSON: {},
      items: [],
      filteredItems: [],
      currentItem: {},
      hoveredItem: {},
      highlightedItemId: null,
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
        return this.$store.state.spatiiPublice.loading;
      },
      set: function (value) {
        this.$store.dispatch('spatiiPublice/updateLoading', value);
      },
    },

    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.spatiiPublice.leftPanel;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('spatiiPublice/updateLeftPanel', value);
      },
    },

    rightPanel: {
      get() {
        return this.$store.state.spatiiPublice.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('spatiiPublice/updateRightPanel', value);
      },
    },

    selectedItem: {
      // getter
      get: function () {
        return this.$store.state.spatiiPublice.selectedItem;
      },
      // setter
      set: function (item) {
        this.$store.commit('spatiiPublice/selectItem', item)
      }
    },
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
    layers() {
      return this.$store.state.spatiiPublice.layers;
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
        // layout: {
        //   // make layer visible by default
        //   'visibility': 'visible',
        // },
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
      // return mapObj;
    },

    // add map click event handler
    addMapClickHandler(mapObj) {
      // get desktop flag
      const desktopFlag = this.$q.platform.is.desktop;
      // load store
      const store = this.$store;

      // Center the map on the coordinates of any clicked symbol from the layer.
      mapObj.on('click', function (e) {
        // console.log('@click e: ', e);
        // console.log('@click array: ', mapObj.queryRenderedFeatures(e.point) || []);
        // select the second item from the array of items stack clicked, first item is on hover layer
        const clickedItem = (mapObj.queryRenderedFeatures(e.point) || [])[0];
        // console.log('clickedItem: ', clickedItem);

        // de-highlight all layers
        ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
            .forEach((item) => {
              mapObj.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
            });

        // if map item clicked
        if (clickedItem) {
          // highlight current selection
          // for each layer
          ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
              .forEach((item) => {
                if(clickedItem.source === item) {
                  // highlight selected item
                  mapObj.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);
                }
              });

          // save selected item to store
          store.dispatch('spatiiPublice/selectItem', clickedItem);
          // set app right panel flag to true
          if (desktopFlag) store.dispatch('app/updateRightPanel', true);
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
            }, new Mapbox.LngLatBounds(coordinates[0], coordinates[0]));
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
            }, new Mapbox.LngLatBounds(coordinates[0][0], coordinates[0][1]));
            mapObj.flyTo({
              center: bounds.getCenter(),
              zoom: 15,
            });
          }
        } else {
          // de-highlight all layers
          ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
              .forEach((item) => {
                mapObj.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
              });

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

    // add hover layer
    addHoverLayer(mapObj, layer, hoverLayer) {
      let hoveredItem = this.hoveredItem;
      // console.log('@hoveredItemId: ', hoveredItemId);
      mapObj.addLayer({
        'id': hoverLayer.layerId,
        'type': hoverLayer.render.shape,
        'source': hoverLayer.sourceId,
        'layout': {},
        'paint': hoverLayer.render.paint,
      });
      // When the user moves their mouse over the layer, we'll update the
      // feature state for the feature under the mouse.
      mapObj.on('mousemove', layer.layerId, function (e) {
        // if mouse passes over at least 1 item
        if (e.features.length > 0) {
          // console.log('@hover > e: ', e.features);
          // deselect previous hover item, if exists
          if (hoveredItem && hoveredItem.itemId) {
            // console.log('hoveredItem: ', hoveredItem);
            mapObj.setFeatureState(
                {source: hoveredItem.sourceId, id: hoveredItem.itemId},
                {hover: false}
            );
          }
          // select first item in the list of hovered items
          hoveredItem = {
            itemId: e.features[0].id,
            sourceId: e.features[0].layer.source,
          };
          // set hover layer to visible, for the current hovered item
          mapObj.setFeatureState(
              {source: hoveredItem.sourceId, id: hoveredItem.itemId},
              {hover: true}
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      mapObj.on('mouseleave', layer.layerId, function () {
        // console.log('mouseleave > hoveredItemId: ', hoveredItem);
        if (hoveredItem) {
          mapObj.setFeatureState(
              {source: hoveredItem.sourceId, id: hoveredItem.itemId},
              {hover: false}
          );
        }
        hoveredItem = null;
      });
    },

    // add highlighted/selected item layer
    addHighlightLayer(mapObj, highlightLayer) {
      // let highlightedItemId = this.highlightedItemId;
      // console.log('@hoveredItemId: ', hoveredItemId);
      mapObj.addLayer({
        'id': highlightLayer.layerId,
        'type': highlightLayer.render.shape,
        'source': highlightLayer.sourceId,
        'layout': {},
        'paint': highlightLayer.render.paint,
        'filter': highlightLayer.render.filter,
      });

      // return new map obj
      // return mapObj;
    },

    onMapLoaded(event) {
      this.loading = false;

      const map = event.map;
      // save map
      this.map = map;

      // add map layers
      // add layer for 'spatii-suprafata'
      this.addMapLayer(map, this.layers.spatiiSuprafata, this.spatiiSuprafata);
      // add hover layer for 'spatii-suprafata'
      this.addHoverLayer(map, this.layers.spatiiSuprafata, this.layers.spatiiSuprafataHover);
      // add highlight/selection layer for 'spatii-suprafata'
      this.addHighlightLayer(map, this.layers.spatiiSuprafataHighlight);

      // add layer for 'spatii-liniare'
      this.addMapLayer(map, this.layers.spatiiLiniare, this.spatiiLiniare);
      // add hover layer for 'spatii-liniare'
      this.addHoverLayer(map, this.layers.spatiiLiniare, this.layers.spatiiLiniareHover);
      // add highlight/selection layer for 'spatii-liniare'
      this.addHighlightLayer(map, this.layers.spatiiLiniareHighlight);

      // add layer for 'spatii-punctuale'
      this.addMapLayer(map, this.layers.spatiiPunctuale, this.spatiiPunctuale);
      // add hover layer for 'spatii-punctuale'
      this.addHoverLayer(map, this.layers.spatiiPunctuale, this.layers.spatiiPunctualeHover);
      // add highlight/selection layer for 'spatii-punctuale'
      this.addHighlightLayer(map, this.layers.spatiiPunctualeHighlight);

      // add layer for 'spatii-abandonate'
      this.addMapLayer(map, this.layers.spatiiAbandonate, this.spatiiAbandonate);
      // add hover layer for 'spatii-abandonate'
      this.addHoverLayer(map, this.layers.spatiiAbandonate, this.layers.spatiiAbandonateHover);
      // add highlight/selection layer for 'spatii-abandonate'
      this.addHighlightLayer(map, this.layers.spatiiAbandonateHighlight);

      // add click event handler
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

    // on window resize
    myEventHandler() {
      // force redraw
      this.$mount();
    },
  },

  created() {
    // create non-dynamic map object
    this.map = {};
    // add event listener for window resize
    window.addEventListener("resize", this.myEventHandler);
  },

  destroyed() {
    // remove custom window resize event listener
    window.removeEventListener("resize", this.myEventHandler);
  },

  watch: {
    // when leftPanel is closed, on mobile, via swipe
    /* eslint-disable-next-line no-unused-vars */
    rightPanel(newValue, oldValue) {
      // update app rightPanel
      if (!this.$q.platform.is.desktop && newValue === false)
        this.$store.dispatch('app/updateRightPanel', false);
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
