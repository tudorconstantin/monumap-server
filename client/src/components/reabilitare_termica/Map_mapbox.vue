<!-- reabilitare-termica :: Map_mapbox -->

<template>
  <div id="mapContainer" :style="cssVars()">

    <!-- left panel -->
    <q-drawer
        v-if="isLmiRoute
        && this.$store.state.app.leftPanel
        && this.$store.state.reabilitareTermica.leftPanel"
        id="search-panel-container"
        :overlay="true"
        v-model="leftPanel"
        side="left"
        bordered
        :content-style="{ backgroundColor: '#bdbdbd' }"
        class="bg-grey-5"
    >
      <!-- drawer content -->
      <search-panel
          id="search-panel-component"
          :map="map"
      ></search-panel>
    </q-drawer>

    <!-- right panel -->
    <q-drawer
        v-if="isLmiRoute
        && this.$store.state.app.rightPanel
        && this.$store.state.reabilitareTermica.rightPanel"
        v-model="rightPanel"
        :overlay="true"
        class="bg-grey-5"
        side="right"
        bordered
        :width="$q.platform.is.desktop ? 400 : ($q.screen.width < 640 ? $q.screen.width : 400)"
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
        v-if="loading"
    />
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
          'pk.eyJ1IjoiYWxpbmNoaXMiLCJhIjoiY2toNHQ3eGdzMGVmaTJyczVyanN0dWY0YiJ9.cmyaXMKo-Q055Iu2y5V7fQ',
      mapStyle: 'mapbox://styles/alinchis/ckh4tdtog05ii19ocdg2rywt0',
      container: 'mapContainer',
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
      specialComponentKey: 0,
    };
  },

  computed: {
    isLmiRoute() {
      return this.$route.name === 'reabilitare-termica';
    },

    loading: {
      get() {
        return this.$store.state.reabilitareTermica.loading;
      },
      set: function (value) {
        this.$store.dispatch('reabilitareTermica/updateLoading', value);
      },
    },

    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.reabilitareTermica.leftPanel;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('reabilitareTermica/updateLeftPanel', value);
      },
    },

    rightPanel: {
      get() {
        return this.$store.state.reabilitareTermica.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('reabilitareTermica/updateRightPanel', value);
      },
    },

    currentItem: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.reabilitareTermica.selectedItem;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('reabilitareTermica/selectItem', value);
      },
    },

    selectedItem: {
      get: function () {
        return this.currentItem;
      },
      set: function (newValue) {
        // load map object
        const map = this.$store.state.reabilitareTermica.map;
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
        layout: {
          // make layer visible by default
          'visibility': 'visible',
        },
        paint: layer.render.paint,
        // filter: layer.sourceId ===
        //     ['==', ['get', 'stadiu_normalizat'], layer.name.toLowerCase()],
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

    // add map click event handler
    addMapClickHandler(map) {
      // get desktop flag
      const desktopFlag = this.$q.platform.is.desktop;
      // load store
      const store = this.$store;

      // load array of layers ids
      const layersIdsArr = this.$store.getters["reabilitareTermica/getAllLayersIds"];
      // on click action
      map.on('click', async function (e) {
        // start loading spinner
        // self.loading = true;
        // console.log('@map > loading: ', self.$store.state.reabilitareTermica.loading);
        // console.log('@click e: ', e);
        // find clicked item
        const clickedItem = (map.queryRenderedFeatures(e.point, {layers: layersIdsArr}) || [])[0];
        // console.log('@map > clickedItem: ', clickedItem);
        // deselect previous selection
        const previousSelectedItem = store.state.reabilitareTermica.selectedItem;
        // console.log('previousSelectedItem: ', previousSelectedItem);
        if (previousSelectedItem)
          map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
        // if clicked on item
        if (clickedItem) {
          // highlight selected item
          map.setFilter(`${clickedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);

          // save selected item to store
          store.dispatch('reabilitareTermica/selectItem', clickedItem);
          // set app right panel flag to true
          if (desktopFlag) store.dispatch('app/updateRightPanel', true);
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
          store.dispatch('reabilitareTermica/selectItem', null);
          // set item selected flag to false
          store.dispatch('reabilitareTermica/updateItemSelected', false);
          // set app related flags to false
          store.dispatch('app/updateRightPanel', false);
          store.dispatch('app/updateItemSelected', false)
        }
      });
    },


    async onMapLoaded(event) {
      this.loading = false;

      const map = event.map;
      // console.log('map: ', map);
      this.map = map;

      // add map layers
      // add layers for 'ETAPE'
      this.$store.state.reabilitareTermica.itemGroups[0].layers
          .forEach((layer) => {
            this.addMapSource(map, layer.sourceId, {
              "type": "FeatureCollection",
              "name": layer.id,
              "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
              features: this.$store.state.reabilitareTermica.items.features
                  .filter(item => item.properties.stadiu_normalizat.toUpperCase() === layer.name.toUpperCase()),
            });
            this.addMapLayer(map, layer);
          });
      // move hover layer to the top
      // this.$store.state.reabilitareTermica.itemGroups[0].layers
      //     .forEach((layer) => {
      //       map.moveLayer(`${layer.id}_HOVER`);
      //     });
      // move highlight layer to the top
      // this.$store.state.reabilitareTermica.itemGroups[0].layers
      //     .forEach((layer) => {
      //       map.moveLayer(`${layer.id}_HIGHLIGHT`);
      //     });
      // add click handler
      this.addMapClickHandler(map);
    },

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
            "px",
        "--width": window.innerWidth + "px",
      };
    },

    // on window resize
    myEventHandler() {
      // console.log('event: ', e);
      // this.map.resize();
      const desktopFlag = this.$q.platform.is.desktop;
      if (desktopFlag) {
        const spBox = document.getElementById('mapContainer');
        const spDD = document.getElementById('rt-sp-descarcare-date');
        const spFL = document.getElementById('rt-sp-lista-filtre');
        const spVSmaxHeight = spBox.offsetHeight - spDD.offsetHeight - spFL.offsetHeight - 32;
        // console.log('searchPanel VB height: ', spVSmaxHeight);
        const spVSelement = document.getElementById('rt-sp-vscroll');
        // console.log('vscroll.maxHeight: ', spVSelement.style.maxHeight);
        spVSelement.style.maxHeight = `${spVSmaxHeight}px`;
        // console.log('vscroll.maxHeight: ', spVSelement.style.maxHeight);
        spVSelement.style.display = 'block';
        // force redraw
        this.$mount();
      }
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

  // mounted() {
  //   console.log('screen: ', this.$q.screen.height);
  //   const desktopFlag = this.$q.platform.is.desktop;
  //   if (desktopFlag) {
  //     // const spBox = document.getElementById('mapContainer').offsetHeight;
  //     // const spDD = document.getElementById('rt-sp-descarcare-date').offsetHeight;
  //     // const spFL = document.getElementById('rt-sp-lista-filtre').offsetHeight;
  //     // const spVSmaxHeight = spBox - spDD - spFL - 32;
  //     const screenHeight = this.$q.screen.height;
  //     const headerHeight = 98;
  //     const ddHeight = 0;
  //     const feHeight = 0;
  //     const spVSmaxHeight = screenHeight - headerHeight - ddHeight - feHeight;
  //     // console.log('searchPanel VB height: ', spVSmaxHeight);
  //     const spVSelement = document.getElementById('rt-sp-vscroll');
  //     // console.log('vscroll.maxHeight: ', spVSelement.style.maxHeight);
  //     spVSelement.style.maxHeight = `${spVSmaxHeight}px`;
  //     // console.log('vscroll.maxHeight: ', spVSelement.style.maxHeight);
  //     spVSelement.style.display = 'block';
  //     this.$mount();
  //   }
  // },

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
