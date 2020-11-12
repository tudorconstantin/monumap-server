<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
// import Map from "@/components/Map_leaflet";
import Map from "@/components/toalete_publice/Map_mapbox";

export default {
  name: "ToaletePubliceView",
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