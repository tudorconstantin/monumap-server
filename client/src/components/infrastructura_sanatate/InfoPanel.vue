<!-- infrastructura-sanatate :: infoPanel -->

<template>
  <div v-if="currentItem">
    <q-list class="q-pa-xs q-gutter-xs" separator>

      <!-- ID info -->
      <q-card class="my-card bg-grey-3">
        <q-card-section>
          <div class="text-subtitle1">Identificare</div>
        </q-card-section>

        <q-markup-table wrap-cells bordered separator="horizontal">
          <tbody>
          <tr>
            <td class="text-left" style="width: 100px;">Denumire</td>
            <td class="text-left">
              {{ currentItem.properties.denumire.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Adresa PL</td>
            <td class="text-left">
              {{ currentItem.properties.adresa_pl }}
            </td>
          </tr>
          <tr v-if="currentItem.properties.tip_unit">
            <td class="text-left">Tip Unitate</td>
            <td class="text-left">
              {{ currentItem.properties.tip_unit }}
            </td>
          </tr>
          <tr v-if="currentItem.properties.nume_doc">
            <td class="text-left">Doctor</td>
            <td class="text-left">
              {{ currentItem.properties.nume_doc !== 'null' ? currentItem.properties.nume_doc : ''}}
            </td>
          </tr>
          <tr v-if="currentItem.properties.tip_serv">
            <td class="text-left">Tip Serviciu</td>
            <td class="text-left">
              {{ currentItem.properties.tip_serv }}
            </td>
          </tr>
          <tr v-if="currentItem.properties.specialit">
            <td class="text-left">Specialitate</td>
            <td class="text-left">
              {{ currentItem.properties.specialit }}
            </td>
          </tr>
          <tr>
            <td class="text-left">GPS</td>
            <td class="text-left">
              {{ formatGPSCoord(currentItem.properties.latlong.split(',')[0]) }},
              {{ formatGPSCoord(currentItem.properties.latlong.split(',')[1]) }}
            </td>
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
            <td class="text-left" style="width: 100px;">Sursa</td>
            <td class="text-left">Casa Naţională de Asigurări de Sănătate (CNAS)</td>
          </tr>
          <tr>
            <td class="text-left">URL</td>
            <td class="text-left">http://www.cnas.ro/map-county</td>
          </tr>
          <tr>
            <td class="text-left">Data</td>
            <td class="text-left">2020-11-04</td>
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
            <td class="text-left">1. Datele sunt obtinute de pe pagina de internet a CNAS.</td>
          </tr>
          <tr>
            <td class="text-left">2. Datele descarcate au fost curatate manual pentru a corecta celule populate cu date multiple.</td>
          </tr>
          <tr>
            <td class="text-left">3. Adresele au fost geo-localizare cu QGis + extensia MMQgis si serviciul GoogleAPI. Articolele cu aceasi adresa au generat aceleasi coordonate si sunt suprapuse vizual. Rezultatele din afara Municipiului Bucuresti au fost sterse si considerate ne-gasite. O parte din adresele ne-gasite au fost adaugate de mana in coloana de coordonate.</td>
          </tr>
          <tr>
            <td class="text-left">4. Exista diferente de reprezentare a punctelor pe hartile cu suport fotografic intre serviciile de harti Google, Bing si OSM.</td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>

    </q-list>

  </div>
</template>

<script>
export default {
  name: 'InfoPanel',

  methods: {
    formatGPSCoord(number) {
      return parseFloat(number).toFixed(6);
    },
  },

  computed: {
    currentItem() {
      return this.$store.state.infrastructuraSanatate.selectedItem;
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
