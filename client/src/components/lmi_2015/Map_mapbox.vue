<!-- lmi-2015 :: map -->

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
      <!-- selected item marker -->
      <MglMarker
          v-if="!!selectedItem"
          :coordinates="[
          selectedItem && selectedItem.longitudine_x,
          selectedItem && selectedItem.latitudine_y,
        ]"
      >
        <img slot="marker" src="../../assets/marker_selected.png"/>
      </MglMarker>
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
import {matRoom} from '@quasar/extras/material-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import constants from '@/util/constants.js';

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglMarker,
} from 'vue-mapbox';

import {mapGetters} from 'vuex';

export default {
  name: "Lmi2015Map",

  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker,
  },

  map: {},

  data() {
    return {
      accessToken:
          "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
      mapStyle: "mapbox://styles/tudorconstantin/ckb6h17g326dr1iuz4vf53dsr",
      container: "mapContainer",
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
    };
  },

  computed: {
    ...mapGetters({
      selectedItem: 'lmi2015/getSelectedItem',
      monuments: 'lmi2015/filteredArray',
      geoJSON: 'lmi2015/filteredGeoJSON',
    }),

    loading: {
      get() {
        return this.$store.state.lmi2015.loading;
      },
      set: function (value) {
        this.$store.dispatch('lmi2015/updateLoading', value);
      },
    },

    rightPanel() {
      return this.$store.state.lmi2015.rightPanel;
    }
  },
  watch: {
    /* eslint-disable-next-line no-unused-vars */
    geoJSON(newValue, oldValue) {
      this.filterMap();
    },
    /* eslint-disable-next-line no-unused-vars */
    selectedItem(newValue, oldValue) {
      // re-center map view
      if (newValue && newValue.longitudine_x && this.map)
        this.map.flyTo({center: [newValue.longitudine_x, newValue.latitudine_y], zoom: 18});
    },
    // when leftPanel is closed, on mobile, via swipe
    /* eslint-disable-next-line no-unused-vars */
    rightPanel(newValue, oldValue) {
      // update app rightPanel
      if (!this.$q.platform.is.desktop && newValue === false)
        this.$store.dispatch('app/updateRightPanel', false);
    },
  },
  methods: {
    customizeMap(map) {
      // const map = this.$store.state.lmi2015.map;
      for (const mt in constants.monumentTypes) {
        const img = constants.monumentTypes[mt];
        // add map data source
        map.addSource(mt, {
          type: 'geojson',
          data: {
            type: this.geoJSON.type,
            features: this.geoJSON.features.filter(
                m => m.properties.icon_code === mt
            ),
          },
          generateId: true, // This ensures that all features have unique IDs
        });
        /* eslint-disable no-unused-vars*/
        map.loadImage(img, function (error, image) {
          let symbol = '';
          if (error) {
            symbol = 'music';
          } else {
            symbol = mt;
            map.addImage(mt, image);
          }
          map.addLayer({
            id: mt, // layerID,
            type: 'symbol',
            source: mt,
            layout: {
              'icon-image': symbol,
              'icon-allow-overlap': false,
              // "text-field": ['get', 'denumire'],
              // "text-field": "testing...",
              // "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              // "text-size": 11,
              // // "text-transform": "uppercase",
              // "text-letter-spacing": 0.05,
              // "text-offset": [0, 1.5]
              'visibility': 'visible',
            },
            paint: {
              // "icon-color": "#fff",
              // "icon-halo-blur": 2,
              // "icon-halo-width": 2,
              // "icon-halo-color": "#fb5208",
              // "text-color": "#fff",
              // "text-halo-color": "#fb5208",
              // "text-halo-width": 2
            },
            // filter: ["==", "icon_code", mt]
          });
        });

        let hoveredMonumentId = null;
        map.on('mousemove', mt, (e) => {
          if (e.features && e.features.length > 0) {
            hoveredMonumentId = e.features[0].id;
            map.getCanvas().style.cursor = 'pointer';
          }
        });
        map.on('mouseleave', mt, (e) => {
          if (hoveredMonumentId) {
            hoveredMonumentId = null;
            map.getCanvas().style.cursor = '';
          }
        });
      }

      map
          .on('click', (e) => {
            const clickedMonument = (map.queryRenderedFeatures(
                e.point
            ) || [])[0];
            this.onMonumentClicked(clickedMonument);
          })
      // .on('zoomend', () => {
      //   this.$store.dispatch('lmi2015/mapViewChanged');
      // })
      // .on('moveend', () => {
      //   this.$store.dispatch('lmi2015/mapViewChanged');
      // });
    },

    onMapLoaded(event) {
      this.loading = false;
      // save map
      this.map = event.map;
      // save map reference to store
      // this.$store.dispatch('lmi2015/saveMap', this.map);
      this.customizeMap(this.map);
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
            "px",
        "--width": window.innerWidth + "px",
      };
    },

    onMonumentClicked(monument) {
      // console.log('monument: ', monument);
      const desktopFlag = this.$q.platform.is.desktop;
      // console.log('@map > onMonumentClicked >> desktopFlag: ', desktopFlag);
      this.$store.dispatch('lmi2015/selectItem', {monument, desktopFlag});
    },

    filterMap(map) {
      if (!map) return;
      const filteredGeoJSON = this.$store.getters['lmi2015/filteredGeoJSON'];

      for (const mt in constants.monumentTypes) {
        const geoJSONByMonumentType = {
          ...filteredGeoJSON,
          features: filteredGeoJSON.features.filter(
              m => m.properties.icon_code === mt
          ),
        };

        if (!map) map.getSource(mt).setData(geoJSONByMonumentType);
      }
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
    this.matRoom = matRoom;
    this.constants = constants;
    // add event listener for window resize
    window.addEventListener("resize", this.myEventHandler);
  },

  destroyed() {
    // remove custom window resize event listener
    window.removeEventListener("resize", this.myEventHandler);
  },
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
