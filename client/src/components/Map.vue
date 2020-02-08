<template>
  <div 
    id="mapcontainer"
    :style="{
            'height': `calc(100%)`
     }"
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
      // console.log(`====got pins: `, this.$store.monuments);
    },
    selectItem (monument) {
      // console.log(monument["cod LMI"]);
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
  }

}
</script>

<style lang="sass" scoped>
#mapcontainer
    width: 100%
    // height: 700px
</style>