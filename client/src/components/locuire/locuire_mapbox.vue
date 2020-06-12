<template>
  <div id="mapContainer" :style="cssVars()">
    <q-drawer :overlay="true" v-model="left" side="left" bordered>
      <!-- drawer content -->
      <search-panel></search-panel>
    </q-drawer>

    <q-drawer v-model="itemInfoShown" side="right" bordered :width="400">
      <!-- drawer content -->
      <info-panel v-bind:current-item="currentItem"></info-panel>
    </q-drawer>
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :container="container"
      :center="center"
      :zoom="zoom"
      height="1000px"
      @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left" />
      <MglGeolocateControl position="top-left" />
    </MglMap>
  </div>
</template>

<script>
import SearchPanel from './SearchPanel';
import InfoPanel from './InfoPanel';
import { matRoom } from '@quasar/extras/material-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import constants from '@/util/constants.js';

import { MglMap, MglNavigationControl, MglGeolocateControl } from 'vue-mapbox';

import { mapGetters } from 'vuex';

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
      geoJSON: {},
      currentItem: {},
      left: true,
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
    this.constants = constants;
    const resp = await fetch('/api/polygons.geojson');
    this.geoJSON = await resp.json();
  },
  computed: {
    itemInfoShown() {
      return !!this.currentItem?.cod_lmi;
    },
    selectedItem: {
      get: function() {
        return this.currentItem;
      },
      set: function(newValue) {
        if (newValue) {
          const bounds = JSON.parse(
            JSON.stringify(newValue.geometry.coordinates[0])
          );
          this.$store.map.fitBounds(bounds, { margin: 2 });
          this.currentItem = {
            ...newValue.properties,
            images: newValue.images,
          };
          return;
        } 

        console.log(`===============clean up currentItem`);
        this.currentItem = {};
      },
    },

    ...mapGetters({
      polygons: 'polygons/filteredArray',
    }),
  },

  methods: {
    addPolygons() {
      const map = this.$store.map;
      map.addSource('polygons', {
        type: 'geojson',
        data: {
          ...this.geoJSON,
          features: this.geoJSON.features.filter(
            (m) => m.geometry.type === 'Polygon'
          ),
        },
        generateId: true, // This ensures that all features have unique IDs
      });

      map.addLayer({
        id: 'polygons',
        type: 'fill',
        source: 'polygons',
        layout: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      });
    },
    customizeMap() {
      const map = this.$store.map;
      this.addPolygons();

      map
        .on('click', (e) => {
          const clickedPolygon = (this.$store.map.queryRenderedFeatures(
            e.point
          ) || [])[0];
          if (clickedPolygon) {
            this.selectItem(clickedPolygon.properties);
          } else {
            this.selectItem(null);
          }
        })
        .on('zoomend', () => {
          this.$store.dispatch('polygons/mapViewChanged');
        })
        .on('moveend', () => {
          this.$store.dispatch('polygons/mapViewChanged');
        });
    },
    onMapLoaded(event) {
      const map = event.map;
      this.$store.map = map;
      this.customizeMap();
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

    async selectItem(polygon) {
      if (!polygon) {
        this.currentItem = {};
        this.selectedItem = null;
        return;
      }
      // get all polygon data
      const fullPolygon = this.geoJSON.features.find(
        (m) => m['properties']['cod_lmi'] === polygon['cod_lmi']
      );

      const polygonProperties = fullPolygon['properties'];

      // request image list
      const srvImgArrPath = `${polygonProperties['SIRSUP']}_${
        polygonProperties['UAT']
      }/${polygonProperties['SIRUTA']}_${polygonProperties['localitate']}/${
        polygonProperties['SIRINF']
      }_${polygonProperties['sector'].replace(' ', '-')}/${
        polygonProperties['cod_lmi']
      }`;

      //TODO: polygon images????
      const imgArrReqPath = `/api/monument.images?polygonPath=${srvImgArrPath}`;
      const res = await fetch(imgArrReqPath);
      const imgArr = (await res.json()) || [];

      // save full path images to array
      const fullPathImageArray = imgArr.map(
        (photoName) => `/images/${srvImgArrPath}/${photoName}`
      );

      // creat images properties
      fullPolygon.images = fullPathImageArray;
      this.selectedItem = fullPolygon;
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
