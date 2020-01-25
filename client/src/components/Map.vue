<template>
  <div id="mapContainer">
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :container="container"
      @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left" />
      <MglGeolocateControl position="top-left" />
    </MglMap>
  </div>
</template>

<script>
// import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl, MglGeolocateControl } from "vue-mapbox";

import { mapState } from "vuex";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
      mapStyle:
        "mapbox://styles/tudorconstantin/ck3on4c1v27jt1cmx3gmr5j0x/draft",
      container: "mapContainer"
    };
  },

  created() {
    this.map = null;
    this.$store.dispatch("monuments/getAllMonuments");
  },
  computed: mapState({
    monuments: state => state.monuments.items
  }),
  methods: {
    onMapLoaded(event) {
      // or just to store if you want have access from other components
      this.$store.map = event.map;
    }
  }
};
</script>
<style>
#mapContainer {
  text-align: left;
  height: 100%;
}
</style>
