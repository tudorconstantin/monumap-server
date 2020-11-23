<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
// import Map from "@/components/Map_leaflet";
import Map from "@/components/lie_2020_1/Map_mapbox.vue";

export default {
  name: "LIE2020_1",
  components: {
    Map,
  },
  data () {
    return {
      homepage: false,
    }
  }
};
</script>

<style>
</style>
