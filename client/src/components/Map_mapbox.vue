<template>
  <div
    id="mapContainer"
    :style="cssVars()"
  >
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
import { matRoom } from "@quasar/extras/material-icons";
import "mapbox-gl/dist/mapbox-gl.css";
import img from "./../assets/marker_v12.png";

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl
  // MglMarker
} from "vue-mapbox";

import { mapGetters } from "vuex";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl
  },
  data () {
    return {
      accessToken:
        "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
      mapStyle: "mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u",
      container: "mapContainer",
      center: [26.0986, 44.4365],
      zoom: 11.5
    };
  },

  created () {
    this.map = null;
    this.matRoom = matRoom;
  },
  computed: {
    ...mapGetters({
      monuments: "monuments/filteredArray",
      geoJSON: "monuments/filteredGeoJSON"
    })
  },
  watch: {
    /* eslint-disable-next-line no-unused-vars */
    geoJSON (newValue, oldValue) {
      this.filterMap();
    }
  },
  methods: {
    customizeMap (opts) {
      this.$store.map.addSource("places", {
        type: "geojson",
        data: this.geoJSON
      });
      const symbol = opts.symbol;
      this.$store.map.addLayer({
        id: "layerID", // layerID,
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": symbol,
          "icon-allow-overlap": true,
          // "text-field": ['get', 'denumire'],
          "text-field": ".",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 11,
          // "text-transform": "uppercase",
          "text-letter-spacing": 0.05,
          "text-offset": [0, 1.5]
        },
        paint: {
          "text-color": "#fff",
          "text-halo-color": "#fb5208",
          "text-halo-width": 2
        }
        // filter: ["==", "icon", symbol]
      });

      this.$store.map.on("click", e => {
        const clickedMonument = (this.$store.map.queryRenderedFeatures(
          e.point
        ) || [])[0];
        if (clickedMonument) {
          this.onMonumentClicked(clickedMonument.properties);
        } else {
          this.$store.dispatch("monuments/selectItem", null);
        }
      });
    },
    onMapLoaded (event) {
      const map = event.map;
      this.$store.map = map;
      const self = this;
      map.loadImage(img, function (error, image) {
        if (error) {
          console.error(`error loading image`, error);
          map.customizeMap({ symbol: 'music' });
        }
        map.addImage('monument-pin', image);
        self.customizeMap({ symbol: 'monument-pin' });
      });


    },
    cssVars () {
      //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        "--height":
          window.innerHeight -
          document.getElementById("header").offsetHeight +
          "px",
        "--width": window.innerWidth + "px"
      };
    },

    onMonumentClicked (monument) {
      if (!monument) return this.$store.dispatch("monuments/selectItem", null);
      this.$store.dispatch("monuments/selectItem", monument["cod_lmi"]);
    },
    filterMap () {
      if (!this.$store.map) return;
      const filteredGeoJSON = this.$store.getters["monuments/filteredGeoJSON"];
      this.$store.map.getSource("places").setData(filteredGeoJSON);
    }
  }
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
