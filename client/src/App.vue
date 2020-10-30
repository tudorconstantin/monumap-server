<template>
  <div>

    <!-- DESKTOP -->
    <q-layout
        view="hHh lpR fFf"
        class="aller-font"
        v-if="$q.platform.is.desktop"
    >
      <!-- lmi2015 photo gallery -->
      <lmi2015-album-dates></lmi2015-album-dates>
      <lmi2015-album-sections></lmi2015-album-sections>
      <lmi2015-album-photo-gallery></lmi2015-album-photo-gallery>

      <!-- header -->
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
              v-if="monumentInfoShown && $q.platform.is.desktop"
              dense
              flat
              round
              icon="menu"
              @click="clearSelection"
          />
        </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/lmi" label="LMI 2015" />
        <q-route-tab to="/spatii-publice" label="Spatii Publice" />
        <q-route-tab to="/servicii-medicale" label="Servicii Medicale" />
        <q-route-tab to="/toalete-publice" label="Toalete Publice" />
        <!-- <q-route-tab to="/lie-2020-1" label="LIE 2020.1" /> -->
      </q-tabs>
    </q-header>

    <!-- left panel -->
      <q-drawer
          v-if="!isHomeRoute"
          :overlay="true"
          v-model="leftPanel"
          side="left"
          bordered
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
      <!-- drawer content -->
      <lmi2015-search-panel-content></lmi2015-search-panel-content>
    </q-drawer>

    <!-- right panel -->
      <q-drawer
          v-if="!isHomeRoute"
          v-model="monumentInfoShown"
          side="right"
          bordered
          :width="400"
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
      <!-- drawer content -->
      <lmi2015-info-panel-content></lmi2015-info-panel-content>
    </q-drawer>

      <!-- page container / map container -->
      <q-page-container id="map-enclosure">
        <router-view/>
      </q-page-container>
    </q-layout>


    <!-- MOBILE -->
    <q-layout
        view="hHh lpR fFf"
        class="aller-font"
        v-if="$q.platform.is.mobile"
    >
      <!-- photo gallery -->
      <lmi2015-album-dates></lmi2015-album-dates>
      <lmi2015-album-sections></lmi2015-album-sections>
      <lmi2015-album-photo-gallery></lmi2015-album-photo-gallery>

      <!-- header -->
      <q-header
          elevated
          id="header-mobile"
          class="bg-primary text-blue-grey-10"
          height-hint="98"
          v-if="!isHomeRoute"
      >
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftPanel"/>

          <q-toolbar-title class="row justify-start">
<!--            <img-->
<!--                class="q-pr-xs"-->
<!--                src="./assets/logo_bucuresti_2050.svg"-->
<!--                style="max-width: 600px; max-height: 40px;"-->
<!--            />-->
            <img
                class="q-pl-xs no-padding"
                src="./assets/logo_bucuresti_2050_text_fara-subtitlu_bicrom_linie.svg"
                style="max-width: 230px; max-height: 25px;"
            />
          </q-toolbar-title>


          <q-tabs align="left">
            <q-btn-dropdown auto-close stretch flat label="Harta">
              <q-list>
                <q-route-tab
                    to="/lmi"
                    label="LMI 2015"
                    @click="this.$store.dispatch('monuments/updateCurrentTab', 'LMI 2015')"
                />
                <q-route-tab
                    to="/spatii-publice"
                    label="Spatii Publice"
                    @click="this.$store.dispatch('monuments/updateCurrentTab', 'Spatii Publice')"
                />
                <q-route-tab
                    to="/servicii-medicale"
                    label="Servicii Medicale"
                    @click="this.$store.dispatch('monuments/updateCurrentTab', 'Servicii Medicale')"
                />
                <q-route-tab
                    to="/toalete-publice"
                    label="Toalete Publice"
                    @click="this.$store.dispatch('monuments/updateCurrentTab', 'Toalete Publice')"
                />
<!--                <q-route-tab-->
<!--                    to="/lie-2020-1"-->
<!--                    label="LIE 2020.1"-->
<!--                    @click="this.$store.dispatch('monuments/updateCurrentTab', 'LIE 2020.1')"-->
<!--                />-->
              </q-list>
            </q-btn-dropdown>
          </q-tabs>

        </q-toolbar>
      </q-header>

      <!-- left drawer -->
      <q-drawer
          v-if="!isHomeRoute"
          :overlay="true"
          v-model="leftPanel"
          side="left"
          bordered
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
        <!-- drawer content -->
        <lmi2015-search-panel-content></lmi2015-search-panel-content>
      </q-drawer>

      <!--      <q-page-sticky z-max position="bottom-right" :offset="[18, 18]">-->
      <!--        <q-btn fab icon="add" color="accent" />-->
      <!--      </q-page-sticky>-->

      <!-- right drawer -->
      <q-drawer
          v-if="!isHomeRoute && rightPanel"
          v-model="monumentInfoShown"
          side="right"
          bordered
          :width="$q.screen.width < 640 ? $q.screen.width : 400"
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
        <!-- drawer content -->
        <lmi2015-info-panel-content></lmi2015-info-panel-content>
        <q-page-sticky position="bottom-right" :offset="[50, 50]" v-if="this.$store.state.monuments.selectedItem">
          <q-btn fab color="blue-8" icon="o_visibility_off" type="button" @click="toggleRightPanel"/>
        </q-page-sticky>
      </q-drawer>

      <!-- page container / map container -->
      <q-page-container id="map-enclosure-mobile">
        <router-view/>
        <q-page-sticky position="bottom-right" :offset="[50, 50]" v-if="this.$store.state.monuments.selectedItem">
          <q-btn fab color="blue-8" icon="o_visibility" type="button" @click="toggleRightPanel"/>
        </q-page-sticky>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Lmi2015SearchPanelContent from '@/components/lmi_2015/SearchPanelContent';
import Lmi2015InfoPanelContent from '@/components/lmi_2015/InfoPanelContent';
import Lmi2015AlbumDates from '@/components/lmi_2015/AlbumDates';
import Lmi2015AlbumSections from '@/components/lmi_2015/AlbumSections';
import Lmi2015AlbumPhotoGallery from '@/components/lmi_2015/AlbumPhotoGallery';
import {mapState} from 'vuex';

export default {
  data() {
    return {
      left: true,
    };
  },
  components: {
    Lmi2015SearchPanelContent,
    Lmi2015InfoPanelContent,
    Lmi2015AlbumDates,
    Lmi2015AlbumSections,
    Lmi2015AlbumPhotoGallery,
  },
  computed: {
    // if home route, hide all bars and panels
    isHomeRoute() {
      return this.$route.name === 'home';
    },
    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.monuments.leftPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('monuments/setLeftPanel', value);
      },
    },
    rightPanel: {
      get() {
        // console.log('app: getRightPanel');
        return this.$store.state.monuments.rightPanel;
      },
      set: function (value) {
        // console.log('app: setRightPanel: ', value);
        this.$store.dispatch('monuments/setRightPanel', value);
      },
    },
    monumentInfoShown: {
      get() {
        return (
            this.$store.state.monuments.monumentDisplayed &&
            this.$store.state.monuments.selectedItem &&
            !!this.$store.state.monuments.selectedItem['cod_lmi']
        );
      },
      set: function (value) {
        // console.log('app: setMonumentInfoShown: ', value);
        this.$store.dispatch('monuments/setRightPanel', value);
      },
    },
    ...mapState({
      monumentDisplayed: (state) => state.monuments.monumentDisplayed,
    }),
  },

  methods: {
    toggleLeftPanel() {
      this.$store.dispatch('monuments/toggleLeftPanel');
    },
    toggleRightPanel() {
      this.$store.dispatch('monuments/toggleRightPanel');
    },
    clearSelection: function () {
      this.toggleRightPanel();
      this.$store.dispatch('monuments/clearSelection');
    },
  },
  created: async function () {
    // get monuments list
    await this.$store.dispatch('monuments/getAllMonuments');

    // get monuments photos
    this.$store.dispatch('photos/getMonumentImages', this.$store.state.photos.monumentShown.nr);

    // open the left panel
    if (this.$q.platform.is.desktop) this.leftPanel = true;
  },
};
</script>

<style lang="sass" scoped>
img
  padding: 0 60px
</style>
