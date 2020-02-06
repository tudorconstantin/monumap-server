<template>
  <q-layout view="hHh lpR fFf">

    <q-header
      elevated
      class="bg-primary text-white"
      height-hint="98"
      v-if="!isHomeRoute"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />

        <q-toolbar-title class="row">
          <img
            class="q-pr-xs"
            src="./assets/logo_bucuresti_2050.svg"
            style="max-width: 600px; max-height: 40px;"
          >
          <img
            class="q-pl-xs"
            src="./assets/logo_bucuresti_2050_text_fara-subtitlu_bicrom_linie.svg"
            style="max-width: 600px; max-height: 40px;"
          >
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab
          to="/lmi"
          label="LMI"
        />
        <q-route-tab
          to="/locuire"
          label="Locuire"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-if="!isHomeRoute"
      show-if-above
      v-model="left"
      side="left"
      bordered
    >
      <!-- drawer content -->
      <search-panel></search-panel>
    </q-drawer>

    <q-drawer
      v-if="!isHomeRoute"
      show-if-above
      v-model="right"
      side="right"
      bordered
      :width="450"
    >
      <!-- drawer content -->
      <info-panel></info-panel>
    </q-drawer>

    <q-page-container id="map-enclosure">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import SearchPanel from '@/components/SearchPanel'
import InfoPanel from '@/components/InfoPanel'

export default {
  data () {
    return {
      left: false,
      right: false,
    }
  },
  components: {
    SearchPanel,
    InfoPanel,
  },
  computed: {
    // if home route, hide all bars and panels
    isHomeRoute () {
      return this.$route.name === 'home';
    },
  },
  created: function () {
    // get monuments list
    this.$store.dispatch("monuments/getAllMonuments");
    // get monuments photos
    this.$store.dispatch(
      "photos/getMonumentImages",
      this.$store.state.photos.monumentShown.nr
    );
  },
}
</script>

<style lang="sass" scoped>
.q-layout
  overflow: scroll
</style>