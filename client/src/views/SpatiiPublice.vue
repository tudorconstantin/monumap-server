<!-- spatii-publice :: view -->

<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
import Map from "../components/spatii_publice/Map_mapbox";

export default {
  name: "SpatiiPublice",

  components: {
    Map,
  },

  data () {
    return {
      homepage: false,
    }
  },
};
</script>

<style>
</style>
