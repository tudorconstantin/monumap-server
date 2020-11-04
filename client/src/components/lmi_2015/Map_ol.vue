<template>
  <div id="mapcontainer">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 100%"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      <vl-feature
        v-for="monument in monuments"
        :key="monument['cod LMI']"
        @click="selectItem(monument)"
      >
        <vl-geom-point :coordinates="[monument.longitudine, monument.latitudine]"></vl-geom-point>
      </vl-feature>
    </vl-map>
  </div>
</template>

<script>
// import mapState
import { mapState } from "vuex";

export default {
  data () {
    return {
      zoom: 10,
      center: [23.587646, 46.766676],
      bounds: null,
      rotation: 0,
    }
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
    height: 700px
</style>