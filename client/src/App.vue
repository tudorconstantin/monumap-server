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

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Romania in Harti
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
    </q-drawer>

    <q-drawer
      v-if="!isHomeRoute"
      show-if-above
      v-model="right"
      side="right"
      bordered
      :width="500"
    >
      <!-- drawer content -->
      <info-bar></info-bar>
    </q-drawer>

    <q-page-container id="map-enclosure">
      <router-view />
    </q-page-container>

    <q-footer
      v-if="!isHomeRoute"
      elevated
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          2020 <strong>Spatial Planning Tools</strong>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import InfoBar from '@/components/InfoBar'

export default {
  data () {
    return {
      left: false,
      right: false,
    }
  },
  components: {
    InfoBar,
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