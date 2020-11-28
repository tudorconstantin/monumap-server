<!-- reabilitare-termica :: infoPanel -->

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
            <td class="text-left" style="width: 100px;">Adresa</td>
            <td class="text-left">
              {{ currentItem.properties.adresa.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Sector</td>
            <td class="text-left">
              {{ currentItem.properties.sector }}
            </td>
          </tr>
          <tr>
            <td class="text-left">GPS</td>
            <td class="text-left">
              {{ formatGPSCoord(currentItem.properties.lat) }},
              {{ formatGPSCoord(currentItem.properties.lng) }}
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <!-- Stadiu reabilitare -->
      <q-card class="my-card bg-grey-3">
        <q-card-section>
          <div class="text-subtitle1">Stadiu Reabilitare</div>
        </q-card-section>

        <q-markup-table wrap-cells bordered separator="horizontal">
          <tbody>
          <tr>
            <td class="text-left" style="width: 100px;">Etapa</td>
            <td class="text-left">
              {{ currentItem.properties.stadiu_normalizat.toUpperCase() }}
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
            <td class="text-left">Primariile de Sector</td>
          </tr>
          <tr>
            <td class="text-left">URL S1</td>
            <td class="text-left">
              https://bit.ly/3fLWLsy
              <q-tooltip>https://www.primariasector1.ro/desfasurare-reabilitare-termica.html</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">URL S2</td>
            <td class="text-left">
              https://bit.ly/3fL8FmD
              <q-tooltip>https://www.ps2.ro/index.php/reabilitare</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">URL S3</td>
            <td class="text-left">
              https://bit.ly/3lkwSkC
              <q-tooltip>https://www.primarie3.ro/index.php/programe/reabilitare</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">URL S4</td>
            <td class="text-left">
              https://bit.ly/2VeQ5tm
              <q-tooltip>https://www.ps4.ro/util-cetatenilor/reabilitare-termica</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">URL S5</td>
            <td class="text-left">
              https://bit.ly/36hRs0E
              <q-tooltip>http://www.sector5.ro/proiecte/reabilitare-termica</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">URL S6</td>
            <td class="text-left">
              https://bit.ly/2Vb2ApM
              <q-tooltip>https://www.primarie6.ro/informatii-utile/reabilitare-termica</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">Data</td>
            <td class="text-left">2020-01-27</td>
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
            <td class="text-left">1. Datele sunt obtinute de pe paginile de internet ale Primariilor de Sector.</td>
          </tr>
          <tr>
            <td class="text-left">2. Tabelele PDF a fost transformate in format CSV cu servicii gratuite on-line.</td>
          </tr>
          <tr>
            <td class="text-left">3. După procesul de conversie, am corectat manual erori de conversie generate fie la
              identificarea caracterelor, fie la identificarea celulelor de tabel.
            </td>
          </tr>
          <tr>
            <td class="text-left">4. Pentru geo-localizare am utilizat serviciul Google API. Google oferă adrese
              aproximative, unele pe parcele, dar cele mai multe în axul străzii. Scarile de bloc
              apar separat in liste, dar au aceasi pozitie pe harta, sunt suprapuse. O parte din adrese au
              fost mutate manual pe pozitia corespunzătoare. Nu au fost identificate toate adresele, iar articolele
              fara localizare nu sunt incluse.
            </td>
          </tr>
          <tr>
            <td class="text-left">5. Exista diferente de reprezentare a punctelor pe hartile cu suport fotografic intre
              serviciile de harti Google, Bing si OSM.
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <!-- notes -->
      <q-card class="my-card bg-grey-3">
        <q-card-section>
          <div class="text-subtitle1">Observatii</div>
        </q-card-section>
        <q-markup-table wrap-cells>
          <tbody>
          <tr>
            <td class="text-left">
              <span>Sectorul 1<q-tooltip>https://www.reabilitaretermica.eu/entitati/sector-1-bucuresti</q-tooltip></span>,
              <span>Sectorul 4<q-tooltip>https://www.reabilitaretermica.eu/entitati/sector-4-bucuresti</q-tooltip></span>
              si <span>Sectorul 6<q-tooltip>https://www.reabilitaretermica.eu/entitati/sector-6-bucuresti</q-tooltip></span>
              au datele reprezentate pe harti puse la dispozitie de
              <span>Verde<q-tooltip>https://www.reabilitaretermica.eu</q-tooltip></span>.
            </td>
          </tr>
          <tr>
            <td class="text-left">
              <span>Sectorul 2 <q-tooltip>https://www.ps2.ro/index.php/reabilitare</q-tooltip></span>
              are datele reprezentate pe o harta proprie, diferita de Sectoarele 1, 4 si 6.
            </td>
          </tr>
          <tr>
            <td class="text-left">Sectoarele 3 si 5 pun la dispozitie doar fisiere PDF.</td>
          </tr>
          <tr>
            <td class="text-left">Exista diferente la impartirea pe etape a proiectelor intre Primariile de Sector,
              pentru a le procesa unitar, am redus numarul de clase la cel mai mic numitor comun.
            </td>
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
      return this.$store.state.reabilitareTermica.selectedItem;
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
