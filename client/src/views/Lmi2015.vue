<!-- lmi-2015 :: view -->

<template>
  <div>
    <!-- left panel -->
    <search-panel
        v-if="isLmiRoute
        && this.$store.state.app.leftPanel
        && this.$store.state.lmi2015.leftPanel"
    ></search-panel>

    <!-- right panel -->
    <info-panel
        v-if="isLmiRoute
        && this.$store.state.app.rightPanel
        && this.$store.state.lmi2015.rightPanel"
    ></info-panel>

    <!-- map -->
    <Map></Map>

    <!-- lmi2015 photo gallery -->
    <lmi2015-album-dates></lmi2015-album-dates>
    <lmi2015-album-sections></lmi2015-album-sections>
    <lmi2015-album-photo-gallery></lmi2015-album-photo-gallery>
  </div>
</template>

<script>
import SearchPanel from '../components/lmi_2015/SearchPanel';
import InfoPanel from '../components/lmi_2015/InfoPanel';
import Map from "../components/lmi_2015/Map_mapbox";
import Lmi2015AlbumDates from '../components/lmi_2015/AlbumDates';
import Lmi2015AlbumSections from '../components/lmi_2015/AlbumSections';
import Lmi2015AlbumPhotoGallery from '../components/lmi_2015/AlbumPhotoGallery';

export default {
  name: "Lmi2015",

  components: {
    SearchPanel,
    InfoPanel,
    Map,
    Lmi2015AlbumDates,
    Lmi2015AlbumSections,
    Lmi2015AlbumPhotoGallery,
  },

  computed: {
    isLmiRoute() {
      return this.$route.name === 'lmi-2015';
    },
  },
}
</script>

<style scoped>
</style>