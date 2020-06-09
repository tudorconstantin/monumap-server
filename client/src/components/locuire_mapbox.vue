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
      <MglNavigationControl position="top-left" />
      <MglGeolocateControl position="top-left" />
    </MglMap>
  </div>
</template>

<script>
import { matRoom } from '@quasar/extras/material-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import constants from '@/util/constants.js';

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
} from 'vue-mapbox';

import { mapGetters } from 'vuex';

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ',
      mapStyle: 'mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u',
      container: 'mapContainer',
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
    };
  },

  created() {
    this.map = null;
    this.matRoom = matRoom;
    this.constants = constants;
  },
  computed: {
    ...mapGetters({
      selectedItem: 'polygons/getSelectedItem',
      polygons: 'polygons/filteredArray',
      geoJSON: 'polygons/filteredGeoJSON',
    }),
  },
  watch: {
    /* eslint-disable-next-line no-unused-vars */
    // geoJSON(newValue, oldValue) {
    //   this.filterMap();
    // },
    /* eslint-disable-next-line no-unused-vars */
    selectedItem(newValue, oldValue) {
      // re-center map view
      if (newValue) {
        const bounds = JSON.parse(
          JSON.stringify(newValue.geometry.coordinates[0])
        );
        this.$store.map.fitBounds(bounds, { margin: 2 });
      }
    },
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
            this.onPolygonClicked(clickedPolygon.properties);
          } else {
            this.$store.dispatch('polygons/selectItem', null);
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

    onPolygonClicked(polygon) {
      if (!polygon) return this.$store.dispatch('polygons/selectItem', null);
      this.$store.dispatch('polygons/selectItem', polygon['cod_lmi']);
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
