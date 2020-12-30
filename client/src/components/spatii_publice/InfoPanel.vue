<!-- spatii-publice :: infoPanel -->

<template>
  <div>
    <!-- DESKTOP -->
    <q-drawer
        v-if="isLmiRoute
        && this.$store.state.app.rightPanel
        && this.$store.state.spatiiPublice.rightPanel"
        :overlay="true"
        class="bg-grey-5"
        v-model="rightPanel"
        side="right"
        bordered
        :width="$q.platform.is.desktop ? 400 : ($q.screen.width < 640 ? $q.screen.width : 400)"
        :content-style="{ backgroundColor: '#bdbdbd' }"
    >
      <q-list class="q-pa-xs q-gutter-xs">

        <!-- location -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Identificare</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tr>
              <td class="text-left">Denumire</td>
              <td class="text-left">
                {{ currentItem.properties.denumire }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Cartier</td>
              <td class="text-left">
                {{ currentItem.properties.cartier }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Sector</td>
              <td class="text-left">
                {{ currentItem.properties.sector.replace(/s/gi, 'Sector ') }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Tip Spatiu</td>
              <td class="text-left">
                {{ currentItem.properties.tip_spatiu }}
              </td>
            </tr>
            <tr v-if="currentItem.layer.source !== 'SPATII_LINIARE'" >
              <td class="text-left">Suprafata</td>
              <td class="text-left">
                {{ currentItem.properties.suprafata }} mp
              </td>
            </tr>
          </q-markup-table>
        </q-card>

        <!-- evaluation data -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Evaluare</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left">Acces persoane cu dizabilitati</td>
              <td class="text-left">
                {{ currentItem.properties.acc_p_diz }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Piste biciclete</td>
              <td class="text-left">
                {{ currentItem.properties.piste_b }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Parcari biciclete</td>
              <td class="text-left">
                {{ currentItem.properties.parcari_b }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Locuri sezut</td>
              <td class="text-left">
                {{ currentItem.properties.loc_sezut }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Cismele</td>
              <td class="text-left">
                {{ currentItem.properties.cismele }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Toalete publice</td>
              <td class="text-left">
                {{ currentItem.properties.wc_pub }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Locuri de joaca pentru copii</td>
              <td class="text-left">
                {{ currentItem.properties.loc_j_c }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Spatii si instalatii pentru sport</td>
              <td class="text-left">
                {{ currentItem.properties.si_sport }}
              </td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>

        <!-- date -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Perioada evaluare</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left name-column">{{ currentItem.date }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>

        <!-- definition -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Definitie</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left name-column">{{ currentItem.definition }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>

        <!-- methodology -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Metodologie</div>
          </q-card-section>

          <q-markup-table wrap-cells>
            <tbody>
            <tr v-for="(item, index) in currentItem.methodology" :key="index">
              <td class="text-left name-column">{{ item }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </q-list>
    </q-drawer>
  </div>
</template>


<script>
import {mapState} from "vuex";

export default {
  name: 'SpatiiPubliceInfoPanel',

  computed: {
    ...mapState({
      currentItem: state => {
        return state.spatiiPublice.selectedItem;
      }
    }),

    isLmiRoute() {
      return this.$route.name === 'spatii-publice';
    },

    rightPanel: {
      get() {
        return this.$store.state.spatiiPublice.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('spatiiPublice/updateRightPanel', value);
      },
    },
  },

  methods: {
    formatGPSCoord(number) {
      return parseFloat(number).toFixed(6);
    },

    toggleRightPanel() {
      this.$store.dispatch('spatiiPublice/toggleRightPanel');
    },

    clearSelection: function () {
      this.toggleRightPanel();
      this.$store.dispatch('spatiiPublice/clearSelection');
      this.$store.dispatch('app/updateItemSelected', false);
    },
  },
};
</script>


<style lang="sass" scoped>
.name-column
  width: 20px
</style>
