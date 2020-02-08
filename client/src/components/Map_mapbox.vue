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
        <q-icon
          slot="marker"
          :name="matRoom"
          color="deep-orange"
        >x</q-icon>

        <!-- <MglPopup anchor="top">
          <div>
            <h1>{{ monument.denumire }}</h1>
            <div>{{ monument.adresa }}</div>
          </div>
        </MglPopup> -->
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
// import icons
import { matRoom } from '@quasar/extras/material-icons'

// import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglMarker
} from "vue-mapbox";

import { mapState } from "vuex";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker
  },
  data () {
    return {
      accessToken:
        "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
      mapStyle:
        "mapbox://styles/tudorconstantin/ck3on4c1v27jt1cmx3gmr5j0x/draft",
      container: "mapContainer"
    };
  },

  created () {
    this.map = null;
    this.matRoom = matRoom;
  },
  computed: mapState({
    monuments: state => {
      const mons = (state.monuments && state.monuments.items) || [];
      return mons.filter(m => m.latitudine && m.longitudine);
    },
    monumentShown: state => true || state.photos.isNavOpen
  }),
  methods: {
    onMapLoaded (event) {
      this.$store.map = event.map;
      // console.log(`====got pins: `, this.$store.monuments);
    },
    // showRightPanel (monument) {
    //   this.$store.commit("photos/openNav", monument);
    // }
  }
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
</style>
