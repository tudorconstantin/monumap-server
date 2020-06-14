<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
// import Map from "@/components/Map_leaflet";
import Map from "@/components/toalete_publice/toalete_publice";

export default {
  name: "mapview",
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
