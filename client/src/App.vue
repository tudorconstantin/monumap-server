<template>
  <div>

    <!-- DESKTOP -->
    <q-layout
        view="hHh lpR fFf"
        class="aller-font"
        v-if="$q.platform.is.desktop"
    >

      <!-- app header -->
      <q-header
          elevated
          id="header"
          class="bg-primary text-blue-grey-10"
          height-hint="98"
          v-if="!isHomeRoute"
      >
        <q-toolbar>
          <!-- left panel toggle icon -->
          <q-btn dense flat round icon="menu" @click="toggleLeftPanel"/>

          <q-toolbar-title class="row">
            <img
                class="q-pr-xs"
                src="./assets/logo_bucuresti_2050.svg"
                style="max-width: 600px; max-height: 40px;"
            />
            <img
                class="q-pl-xs"
                src="./assets/logo_bucuresti_2050_text_fara-subtitlu_bicrom_linie.svg"
                style="max-width: 600px; max-height: 40px;"
            />
          </q-toolbar-title>

          <!-- right panel toggle icon -->
          <q-btn
              v-if="this.$store.state.app.itemSelected && $q.platform.is.desktop"
              dense
              flat
              round
              icon="menu"
              @click="toggleRightPanel"
          />
        </q-toolbar>

        <!-- tabs -->
        <q-tabs align="left">
          <q-route-tab to="/lmi-2015" label="LMI 2015"/>
          <q-route-tab to="/spatii-publice" label="Spatii Publice"/>
          <q-route-tab to="/servicii-medicale" label="Servicii Medicale"/>
          <q-route-tab to="/toalete-publice" label="Toalete Publice"/>
          <!-- <q-route-tab to="/lie-2020-1" label="LIE 2020.1" /> -->
        </q-tabs>
      </q-header>



      <!-- page container / map container -->
      <q-page-container id="map-enclosure">
        <router-view/>
      </q-page-container>
    </q-layout>

  </div>
</template>


<script>
export default {

  computed: {
    // if home route, hide all bars and panels
    isHomeRoute() {
      return this.$route.name === 'home';
    },
    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.app.leftPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('app/updateLeftPanel', value);
      },
    },
    rightPanel: {
      get() {
        // console.log('app: getRightPanel');
        return this.$store.state.app.rightPanel;
      },
      set: function (value) {
        // console.log('app: setRightPanel: ', value);
        this.$store.dispatch('app/updateRightPanel', value);
      },
    },
  },

  methods: {
    toggleLeftPanel() {
      this.$store.dispatch('app/toggleLeftPanel');
    },
    toggleRightPanel() {
      this.$store.dispatch('app/toggleRightPanel');
    },
  },

  created: async function () {
    // get lmi2015 monuments list
    await this.$store.dispatch('lmi2015/getAllMonuments');

    // get lmi2015 monuments photos
    this.$store.dispatch('photos/getMonumentImages', this.$store.state.photos.monumentShown.nr);

    // load 'spatii publice' data into store
    await this.$store.dispatch(('spatiiPublice/loadAllData'));

    // if client platform is desktop, show the left panel
    // if (this.$q.platform.is.desktop) this.leftPanel = true;
  },
};
</script>


<style lang="sass" scoped>
img
  padding: 0 60px
</style>
