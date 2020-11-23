<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
// import Map from "@/components/Map_leaflet";
import Map from "@/components/infrastructura_sanatate/Map_mapbox";

export default {
  name: "ReabilitareTermicaView",
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
