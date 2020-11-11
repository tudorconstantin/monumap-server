<!-- spatii-publice :: view -->

<template>
  <div>
    <!-- left panel -->
    <search-panel
        v-if="isSpatiiPubliceRoute
        && this.leftPanel"
    ></search-panel>

    <!-- right panel -->
    <info-panel
        v-if="isSpatiiPubliceRoute
        && this.$store.state.app.rightPanel
        && this.$store.state.spatiiPublice.rightPanel"
    ></info-panel>
    <!-- mobile only -->
    <q-page-sticky
        v-if="$q.platform.is.mobile && this.$store.state.spatiiPublice.selectedItem"
        position="bottom-right"
        :offset="[50, 50]"
    >
      <q-btn fab color="blue-8" icon="o_visibility" type="button" @click="toggleRightPanel"/>
    </q-page-sticky>

    <!-- map -->
    <Map></Map>
  </div>
</template>

<script>
import SearchPanel from '../components/spatii_publice/SearchPanel';
import InfoPanel from '../components/spatii_publice/InfoPanel';
import Map from "../components/spatii_publice/Map_mapbox";

export default {
  name: "SpatiiPublice",

  components: {
    SearchPanel,
    InfoPanel,
    Map,
  },

  computed: {
    isSpatiiPubliceRoute() {
      return this.$route.name === 'spatii-publice';
    },

    leftPanel: {
      get() {
        return this.$store.state.spatiiPublice.leftPanel;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('spatiiPublice/updateLeftPanel', value);
      },
    },
  },

  methods: {
    toggleRightPanel() {
      this.$store.dispatch('spatiiPublice/toggleRightPanel');
    },
  },

  created: async function () {
    // if client platform is desktop, show the left panel
    if (this.$q.platform.is.desktop) {
      this.leftPanel = true;
      this.$store.dispatch('app/updateLeftPanel', true);
      this.$store.dispatch('app/updateRightPanel', true);
    }
  },
};
</script>

<style>
</style>
