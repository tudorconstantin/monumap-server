<template>
  <div 
    id="mapContainer"
    :style="cssVars()"
  >
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :container="container"
      height='1000px'
      @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left" />
      <MglGeolocateControl position="top-left" />
      
    </MglMap>
  </div>
</template>

<script>
import { matRoom } from '@quasar/extras/material-icons'

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  // MglMarker
} from "vue-mapbox";

import { mapState } from "vuex";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
  },
  data () {
    return {
      accessToken:
        "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
      mapStyle:
        "mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u",        
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
      this.$store.map.on('click', (e) => {

        const clickedMonument = (this.$store.map.queryRenderedFeatures(e.point) || [])[0];
        if(clickedMonument){
          this.onMonumentClicked(clickedMonument.properties);
        }
      })
    },
    cssVars(){ //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {        
        '--height': window.innerHeight - document.getElementById('header').offsetHeight + 'px',
        '--width': window.innerWidth + 'px',
      }
    },

    onMonumentClicked(monument){
      const fullMonument = this.$store.state.monuments.items.find( m => m['cod LMI'] === monument.lmi);
      this.$store.dispatch('monuments/selectItem', fullMonument);
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
