<!-- infrastructura-sanatate :: view -->

<template>
  <div>
    <Map>
    </Map>
  </div>
</template>

<script>
import Map from "@/components/infrastructura_sanatate/Map_mapbox";

export default {
  name: "InfrastructuraSanatateView",
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
