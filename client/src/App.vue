<template>
  <div>

    <!-- -------------------------------------------------------------------------------- -->
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
          <!-- title -->
          <q-toolbar-title class="row items-center">
            <!-- logo_1 -->
            <img
                class="q-pr-xs img-desktop"
                src="./assets/logo_bucuresti_2050.svg"
                style="max-width: 600px; max-height: 40px;"
            />
            <!-- logo_2 -->
            <img
                class="q-pl-xs img-desktop"
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
        <!-- navigation tabs -->
        <q-tabs align="left" active-color="deep-orange-10">
          <q-route-tab to="/lmi-2015" label="LMI 2015"/>
          <q-route-tab to="/lie-2020-1" label="LIE 2020.1"/>
          <q-route-tab to="/spatii-publice" label="Spatii Publice"/>
          <q-route-tab to="/infrastructura-sanatate" label="Infrastructura Sanatate"/>
          <q-route-tab to="/toalete-publice" label="Toalete Publice"/>
          <q-route-tab to="/reabilitare-termica" label="Reabilitare termica"/>
        </q-tabs>
      </q-header>

      <!-- page container / map container -->
      <q-page-container id="map-enclosure">
        <router-view/>
      </q-page-container>
    </q-layout>


    <!-- -------------------------------------------------------------------------------- -->
    <!-- MOBILE -->
    <q-layout
        view="hHh lpR fFf"
        class="aller-font"
        v-if="$q.platform.is.mobile"
    >
      <!-- app header for portrait -->
      <div
          elevated
          id="header-mobile-portrait"
          class="orientation-portrait bg-primary text-blue-grey-10"
          height-hint="90"
          v-if="!isHomeRoute"
      >
        <div>
          <div class="row q-ma-xs items-center">
            <!-- left panel toggle icon -->
            <q-btn dense flat round icon="menu" @click="toggleLeftPanel" style="margin-left: 4px"/>
            <!-- logo_1 -->
            <img
                class="img-mobile"
                src="./assets/logo_bucuresti_2050.svg"
                style="max-width: 150px; max-height: 25px;"
            />
            <!-- logo_2 -->
            <img
                class="img-mobile"
                src="./assets/logo_bucuresti_2050_text_fara-subtitlu_bicrom_linie.svg"
                style="max-width: 200px; max-height: 25px;"
            />
          </div>
        </div>
        <!-- navigation tabs -->
        <q-tabs align="left" active-color="deep-orange-10">
          <q-route-tab to="/lmi-2015" label="LMI 2015"/>
          <q-route-tab to="/lie-2020-1" label="LIE 2020.1"/>
          <q-route-tab to="/spatii-publice" label="Spatii Publice"/>
          <q-route-tab to="/infrastructura-sanatate" label="Infrastructura Sanatate"/>
          <q-route-tab to="/toalete-publice" label="Toalete Publice"/>
          <q-route-tab to="/reabilitare-termica" label="Reabilitare termica"/>
        </q-tabs>
      </div>

      <!-- app header for landscape -->
      <q-header
          elevated
          id="header-mobile-landscape"
          class="orientation-landscape bg-primary text-blue-grey-10"
          height-hint="48"
          v-if="!isHomeRoute"
      >
        <div class="row items-center no-wrap">
          <!-- left panel toggle icon -->
          <q-btn
              dense
              flat
              round
              icon="menu"
              @click="toggleLeftPanel"
              style="margin-left: 8px"
          />
          <!-- logo_1 -->
          <img
              class="img-mobile"
              src="./assets/logo_bucuresti_2050.svg"
              style="max-width: 70px; max-height: 40px;"
          />
          <!-- logo_2 -->
          <img
              class="img-mobile"
              src="./assets/logo_bucuresti_2050_text_fara-subtitlu_bicrom_linie.svg"
              style="max-width: 130px; max-height: 40px;"
          />
          <!-- navigation tabs -->
          <q-tabs class="row" style="overflow: auto" active-color="deep-orange-10">
            <q-route-tab to="/lmi-2015" label="LMI 2015"/>
            <q-route-tab to="/lie-2020-1" label="LIE 2020.1"/>
            <q-route-tab to="/spatii-publice" label="Spatii Publice"/>
            <q-route-tab to="/infrastructura-sanatate" label="Infrastructura Sanatate"/>
            <q-route-tab to="/toalete-publice" label="Toalete Publice"/>
            <q-route-tab to="/reabilitare-termica" label="Reabilitare termica"/>
          </q-tabs>
        </div>
      </q-header>

      <!-- page container / map container -->
      <q-page-container id="map-enclosure-mobile">
        <router-view/>
        <!-- fab button to toggle infoPanel -->
        <q-page-sticky
            position="bottom-right"
            :offset="[50, 50]"
            v-if="this.$store.state.app.itemSelected"
            class="z-top"
        >
          <q-btn
              fab
              color="blue-8"
              :icon="this.$store.state.app.rightPanel ? 'o_visibility_off' : 'o_visibility'"
              type="button"
              @click="toggleRightPanel"
          />
        </q-page-sticky>
      </q-page-container>
    </q-layout>

    <!-- -------------------------------------------------------------------------------- -->

  </div>
</template>


<script>

export default {
  name: "App",

  data() {
    return {};
  },

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
      // update current tab leftPanel
      if (this.$route.name === 'lmi-2015') {
        this.$store.dispatch('lmi2015/updateLeftPanel', true);
      } else if (this.$route.name === 'lie2020_1') {
        this.$store.dispatch('lie2020_1/updateLeftPanel', true);
      } else if (this.$route.name === 'spatii-publice') {
        this.$store.dispatch('spatiiPublice/updateLeftPanel', true);
      }
      // update app leftPanel
      if (this.$q.platform.is.desktop) {
        this.$store.dispatch('app/toggleLeftPanel');
      } else {
        this.$store.dispatch('app/updateLeftPanel', true);
      }
    },
    toggleRightPanel() {
      // update current tab leftPanel
      if (this.$route.name === 'lmi-2015') {
        this.$store.dispatch('lmi2015/updateRightPanel', true);
      } else if (this.$route.name === 'lie2020_1') {
        this.$store.dispatch('lie2020_1/updateRightPanel', true);
      } else if (this.$route.name === 'spatii-publice') {
        this.$store.dispatch('spatiiPublice/updateRightPanel', true);
      }
      this.$store.dispatch('app/toggleRightPanel');
    },
  },

  created: async function () {

    // get 'lmi2015' monuments list
    await this.$store.dispatch('lmi2015/loadAllData');

    // get 'lmi2015' monuments photos
    this.$store.dispatch('photos/getMonumentImages', this.$store.state.photos.monumentShown.nr);

    // load 'lie2020-1' data into store
    this.$store.dispatch('lie2020_1/loadAllData');

    // load 'spatii publice' data into store
    await this.$store.dispatch('spatiiPublice/loadAllData');

    // load 'infrastructura sanatate' data into store
    this.$store.dispatch('infrastructuraSanatate/loadAllData');

    // load 'toalete publice' data into store
    this.$store.dispatch('toaletePublice/loadAllData');

    // load 'reabilitare termica' data into store
    this.$store.dispatch('reabilitareTermica/loadAllData');

    // if platform is desktop, show left panel
    if (this.$q.platform.is.desktop) this.leftPanel = true;

  },
};
</script>


<style lang="sass" scoped>
.img-desktop
  padding: 0 60px

.img-mobile
  padding: 0 10px
</style>
