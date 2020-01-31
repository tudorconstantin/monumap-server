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
      <MglMarker
        v-for="monument in monuments"
        :key="monument['cod LMI']"
        :coordinates="[monument.longitudine, monument.latitudine]"
      >
        <v-icon slot="marker" @click="showRightPanel(monument)"
          >mdi-map-marker</v-icon
        >

        <!-- <MglPopup anchor="top">
          <div>
            <h1>{{ monument.denumire }}</h1>
            <div>{{ monument.adresa }}</div>
          </div>
        </MglPopup> -->
      </MglMarker>
    </MglMap>
    <Monument v-if="monumentShown" />
  </div>
</template>

<script>
// import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglMarker
} from "vue-mapbox";

import Monument from "@/components/Monument.vue";

import { mapState } from "vuex";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker,
    Monument
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
    monuments: state => {
      const mons = (state.monuments && state.monuments.items) || [];
      return mons.filter(m => m.latitudine && m.longitudine);
    },
    monumentShown: state => state.sidebar.isNavOpen
  }),
  methods: {
    onMapLoaded(event) {
      this.$store.map = event.map;
      // console.log(`====got pins: `, this.$store.monuments);
    },
    showRightPanel(monument) {
      this.$store.commit("sidebar/openNav", monument);
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
