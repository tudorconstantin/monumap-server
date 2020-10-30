<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
// import Map from "@/components/Map_leaflet";
import Map from "@/components/spatii_publice/spatii_publice";

export default {
  name: "SpatiiPublice",
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
