<!-- lmi-2015 :: infoPanel -->

<template>
  <div>
    <q-drawer
        v-if="!!currentItem && currentItem['cod_lmi']"
        :overlay="true"
        class="bg-grey-5"
        v-model="monumentInfoShown"
        side="right"
        bordered
        :width="$q.platform.is.desktop ? 400 : ($q.screen.width < 640 ? $q.screen.width : 400)"
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
              <td class="text-left">{{
                  currentItem["tip_patrimoniu"] !== 'null' ? currentItem["tip_patrimoniu"] : ''
                }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Program</td>
              <td class="text-left">{{
                  currentItem["program_arhitectura"] !== 'null' ? currentItem["program_arhitectura"] : ''
                }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Monument</td>
              <td class="text-left">{{
                  currentItem["tip_monument"] !== 'null' ? currentItem["tip_monument"] : ''
                }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Datare</td>
              <td class="text-left">{{
                  currentItem["datare"] !== 'null' ? currentItem["datare"] : ''
                }}</td>
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
              <td class="text-left">{{
                  currentItem["stare_generala"] !== 'null' ? currentItem["stare_generala"] : ''
                }}</td>
            </tr>
            <tr>
              <td class="text-left name-column">Observații</td>
              <td class="text-left">
                {{
                  currentItem["observatii"] !== 'null' ? currentItem["observatii"] : ''
                }}
              </td>
            </tr>
            <tr>
              <td class="text-left">Perioada evaluare</td>
              <td class="text-left">{{
                  currentItem["observatii"] !== 'null' ? 'sept 2019 - fev 2020' : ''
                }}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card>

        <!-- source -->
        <q-card class="my-card bg-grey-3">
          <q-card-section>
            <div class="text-subtitle1">Sursa datelor</div>
          </q-card-section>
          <q-markup-table wrap-cells>
            <tbody>
            <tr>
              <td class="text-left" style="width: 100px;">Sursa datelor</td>
              <td class="text-left">Institutul Național al Patrimoniului</td>
            </tr>
            <tr>
              <td class="text-left">URL</td>
              <td class="text-left">
                https://bit.ly/35FVzU6
                <q-tooltip>https://patrimoniu.ro/images/lmi-2015/LMI-B.pdf</q-tooltip>
              </td>
              <!--            <td class="text-left">https://www.infocons.ro/vault/upload/Studiu/tabel_complet_toalete_+_cismele.pdf</td>-->
            </tr>
            <tr>
              <td class="text-left">Data</td>
              <td class="text-left">2019-06-15</td>
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
            <tr>
              <td class="text-left">1. Am descarcat Lista Monumentelor Istorice publicată în 2015, în format PDF,
                de pe pagina oficială a Institutului National al Patrimoniului.</td>
            </tr>
            <tr>
              <td class="text-left">2. Tabelul PDF a fost transformat in format CSV cu servicii gratuite on-line.</td>
            </tr>
            <tr>
              <td class="text-left">3. După procesul de conversie, am corectat manual erori de conversie generate fie la
                identificarea caracterelor, fie la identificarea celulelor de tabel. Cele mai intalnite erori sunt
                create de caracterele: „i”, „1”, „ l” și „I” (confuzie alimentată de fontul utilizat), care
                generează erori la adrese gen: „l(e vorba de caracterul L). C. Brătianu” și „Carol 1”. O alta sursa de
                erori este generata de lipsa liniilor verticale în tabel si celule impartite pe doua pagini.</td>
            </tr>
            <tr>
              <td class="text-left">4. In studiul de fata am utilizat doar monumentele de arhitectura.</td>
            </tr>
            <tr>
              <td class="text-left">5. Pentru geo-localizare am utilizat serviciul Google API. Google oferă adrese
                aproximative, unele pe parcele, dar cele mai multe în axul străzii. O parte din adresele rezultate au
                fost mutate manual pe parcela corespunzătoare.</td>
            </tr>
            <tr>
              <td class="text-left">6. Exista diferente de reprezentare a punctelor pe hartile cu suport fotografic
                intre serviciile de harti Google, Bing si OSM.</td>
            </tr>
            <tr>
              <td class="text-left">7. Cladirile vizitate au fost fotografiate. La evaluare, starea generala reprezinta
                parearea evaluatorului despre starea generala a exteriorului cladirii.</td>
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
