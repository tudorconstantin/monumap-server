<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
import Map from "@/components/Map";

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
