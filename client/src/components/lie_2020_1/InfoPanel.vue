<!-- lie_2020_1 :: infoPanel -->

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
              {{ currentItem.properties.adr_tip }}
              {{ currentItem.properties.adr_strada.toUpperCase() }}
              {{ currentItem.properties.adr_nr.toUpperCase() }},
              sector {{ currentItem.properties.sector }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Regim inaltime</td>
            <td class="text-left">
              {{ currentItem.properties.regim_h }}
            </td>
          </tr>
          <tr>
            <td class="text-left">An constructie</td>
            <td class="text-left">
              {{ currentItem.properties.an_constru }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Cod LMI</td>
            <td class="text-left">
              {{ currentItem.properties.cod_lmi }}
            </td>
          </tr>
          <tr>
            <td class="text-left">GPS</td>
            <td class="text-left">
              {{ formatGPSCoord(currentItem.properties.lat) }},
              {{ formatGPSCoord(currentItem.properties.lng) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Observatii</td>
            <td class="text-left">
              {{ currentItem.properties.adr_nr_obs !== 'null' ? currentItem.properties.adr_nr_obs : '' }}
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <!-- Risc seismic -->
      <q-card class="my-card bg-grey-3">
        <q-card-section>
          <div class="text-subtitle1">Risc seismic</div>
        </q-card-section>

        <q-markup-table wrap-cells bordered separator="horizontal">
          <tbody>
          <tr>
            <td class="text-left" style="width: 100px;">Risc</td>
            <td class="text-left">
              {{ currentItem.properties.risc_seism }}
            </td>
          </tr>
          <tr>
            <td class="text-left">An expertiza</td>
            <td class="text-left">
              {{ currentItem.properties.an_experti }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Expert tehnic</td>
            <td class="text-left">
              {{ currentItem.properties.expert_teh }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Observatii</td>
            <td class="text-left">
              {{ currentItem.properties.observatii !== 'null' ? currentItem.properties.observatii : '' }}
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
            <td class="text-left">Administraţia Municipala pentru Consolidarea Clădirilor cu Risc Seismic</td>
          </tr>
          <tr>
            <td class="text-left">URL</td>
            <td class="text-left">
              https://amccrs-pmb.ro/amr/file2.pdf
              <q-tooltip>https://amccrs-pmb.ro/amr/file2.pdf</q-tooltip>
            </td>
          </tr>
          <tr>
            <td class="text-left">Data</td>
            <td class="text-left">2020-03-01</td>
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
            <td class="text-left">1. Am descarcat Lista Imobilelor Expertizate (LIE), în format PDF, de pe pagina
              oficială a Administraţiei Municipale pentru Consolidarea Clădirilor cu Risc Seismic.</td>
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
            <td class="text-left">4. Am scris un program în JavaScript (utilizand librăria Sentence-Similarity) care,
              pentru fiecare adresă din lista LIE-2020.1, returneaza cea mai probabilă adresă din lista LMI-2015. Pe
              urmă, am verificat manual potrivirea in tabel.
            </td>
          </tr>
          <tr>
            <td class="text-left">5. Pentru geo-localizare am utilizat serviciul Google API. Google oferă adrese
              aproximative, unele pe parcele, dar cele mai multe în axul străzii. O parte din adrese au
              fost mutate manual pe pozitia corespunzătoare. Nu au fost identificate toate adresele, iar articolele
              fara localizare nu sunt incluse.
            </td>
          </tr>
          <tr>
            <td class="text-left">6. Exista diferente de reprezentare a punctelor pe hartile cu suport fotografic intre
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
              Coordonatele reprezinta o localizare aproximativa.
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Imobilele cu aceeasi adresa, sau aceeasi adresa rezultata din geo-localizare, vor fi reprezentate suprapuse
              pe harta.
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Unele imobile sunt compuse din corpuri multiple de cladiri.
              Acestea pot sa aiba regim de inaltime si risc seismic diferite.
              Nu au fost identificate separat corpurile cladirilor.
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
      return this.$store.state.lie2020_1.selectedItem;
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
