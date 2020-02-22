<template>
  <div 
    id="mapcontainer"
    :style="cssVars"
  >
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker
        v-for="monument in monuments"
        :key="monument['cod LMI']"
        :lat-lng="[monument.latitudine, monument.longitudine]"
        @click="selectItem(monument)"
      />
    </l-map>
  </div>
</template>

<script>
// import mapState
import { mapState } from "vuex";


export default {
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 10,
      center: [46.766676, 23.587646],
      bounds: null,
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    onMapLoaded (event) {
      this.$store.map = event.map;
    },
    selectItem (monument) {
      this.$store.dispatch("monuments/selectItem", monument);
    },
  },
  computed: {
    ...mapState({
      monuments: state => {
        const mons = (state.monuments && state.monuments.items) || [];
        return mons.filter(m => m.latitudine && m.longitudine);
      },
    }),
    getContainerHeight () {
      return document.getElementById('map-enclosure').offsetHeight;
    },
    cssVars(){ //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        '--height': window.innerHeight - document.getElementById('header').offsetHeight + 'px'
      }
    }
  }

}
</script>

<style lang="sass" scoped>
#mapcontainer
    width: 100%
    height: var(--height)
</style>