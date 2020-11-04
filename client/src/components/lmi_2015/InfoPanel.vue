<!-- lmi-2015 :: infoPanel -->

<template>
  <div>
    <!-- DESKTOP -->
    <q-drawer
        v-if="!!currentItem && currentItem['cod_lmi']"
        :overlay="true"
        class="bg-grey-5"
        v-model="monumentInfoShown"
        side="right"
        bordered
        :width="400"
        :content-style="{ backgroundColor: '#bdbdbd' }"
    >
      <q-list class="q-pa-xs q-gutter-xs">
        <!-- image -->
        <q-card v-ripple>
          <q-img
              :src="currentItem.images[0] ? currentItem.images[0].replace('.jpg', '_thumb.jpg') : require('../../assets/no-image.png')"
              :alt="currentItem['cod_lmi']"
              @click="openPhotoDatesDialog"
              basic
              class="cursor-pointer"
              img-class="image-class"
          >
            <div class="
        absolute-bottom
        text-subtitle2
        text-left">
              {{ currentItem["cod_lmi"] }}: {{ currentItem["denumire"] }}
            </div>
            <q-btn
                rounded
                color="blue"
                icon="photo_camera"
                class="absolute no-pointer-events"
                style="top: 30px; right: 12px; transform: translateY(-50%);"
                :label="currentItem.images.length"
                :ripple="false"
            />
          </q-img>
        </q-card>

        <!-- location data -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Localizare</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left name-column">Coordonate</td>
              <td class="text-left">
                {{ formatGPSCoord(currentItem["latitudine_y"]) }},
                {{ formatGPSCoord(currentItem["longitudine_x"]) }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Sector</td>
              <td class="text-left">
                {{ currentItem["SIRUTA"] }} {{ currentItem["localitate"] }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Adresa</td>
              <td class="text-left">
                {{ currentItem["adresa"] }}
              </td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>

        <!-- monument data -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Încadrare</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left name-column">Patrimoniu</td>
              <td class="text-left">{{ currentItem["tip_patrimoniu"] }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Program</td>
              <td class="text-left">{{ currentItem["program_arhitectura"] }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Monument</td>
              <td class="text-left">{{ currentItem["tip_monument"] }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Datare</td>
              <td class="text-left">{{ currentItem["datare"] }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>

        <!-- survey data -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Evaluare</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left name-column">Stare generală</td>
              <td class="text-left">{{ currentItem["stare_generala"] }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Observații</td>
              <td class="text-left">
                {{ currentItem["observatii"] }}
              </td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </q-list>
    </q-drawer>

    <!-- MOBILE -->
    <q-drawer
        v-if="rightPanel"
        v-model="monumentInfoShown"
        side="right"
        bordered
        :width="$q.screen.width < 640 ? $q.screen.width : 400"
        :content-style="{ backgroundColor: '#bdbdbd' }"
    >
      <!-- drawer content -->
      <q-page-sticky
          v-if="$q.platform.is.mobile && this.$store.state.lmi2015.selectedItem"
          position="bottom-right"
          :offset="[50, 50]"
      >
        <q-btn fab color="blue-8" icon="o_visibility_off" type="button" @click="toggleRightPanel"/>
      </q-page-sticky>
    </q-drawer>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Lmi2015InfoPanel",

  computed: {
    ...mapState({
      currentItem: state => {
        return state.lmi2015.selectedItem;
      }
    }),

    rightPanel: {
      get() {
        return this.$store.state.lmi2015.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('lmi2015/updateRightPanel', value);
      },
    },

    monumentInfoShown: {
      get() {
        return (
            this.rightPanel &&
            this.$store.state.lmi2015.selectedItem &&
            !!this.$store.state.lmi2015.selectedItem['cod_lmi']
        );
      },
      set: function (value) {
        // console.log('app: setMonumentInfoShown: ', value);
        this.$store.dispatch('lmi2015/updateRightPanel', value);
      },
    },
  },

  methods: {
    formatGPSCoord(number) {
      return parseFloat(number).toFixed(6);
    },
    toggleRightPanel() {
      this.$store.dispatch('lmi2015/toggleRightPanel');
    },
    openPhotoDatesDialog() {
      if (this.currentItem && this.currentItem.images.length > 0) this.$store.dispatch("lmi2015/toggleAlbumDatesDialog");
    },
    clearSelection: function () {
      this.toggleRightPanel();
      this.$store.dispatch('lmi2015/clearSelection');
      this.$store.dispatch('app/updateItemSelected', false);
    },
  },
};
</script>


<style lang="sass" scoped>
.name-column
  width: 20px

.image-class
  image-orientation: from-image
</style>
