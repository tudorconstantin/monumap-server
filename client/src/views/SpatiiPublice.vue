<!-- spatii-publice :: view -->

<template>
    <Map>
    </Map>
</template>

<script>
import Map from "../components/spatii_publice/Map_mapbox";

export default {
  name: "SpatiiPubliceView",

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
