<!-- toalete-publice :: infoPanel -->

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
              {{ currentItem.properties.locatie.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <td class="text-left" style="width: 100px;">Institutie</td>
            <td class="text-left">
              {{ currentItem.properties.institutie }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Toalete ecologice</td>
            <td class="text-left">
              {{ currentItem.properties.ecologice !== 'null' ? currentItem.properties.ecologice : '' }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Toalete automate</td>
            <td class="text-left">
              {{ currentItem.properties.automat !== 'null' ? currentItem.properties.automat : '' }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Perioada functionare</td>
            <td class="text-left">
              {{ currentItem.properties.perioada_f !== 'null' ? currentItem.properties.perioada_f : '' }}
            </td>
          </tr>
          <tr>
            <td class="text-left">GPS</td>
            <td class="text-left">
              {{ formatGPSCoord(currentItem.geometry.coordinates[0]) }},
              {{ formatGPSCoord(currentItem.geometry.coordinates[1]) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Observatii</td>
            <td class="text-left">
              {{ currentItem.properties.locatie_ob !== 'null' ? currentItem.properties.locatie_ob : '' }}
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
            <td class="text-left">InfoCons - Asociație pentru Protecția Consumatorilor</td>
          </tr>
          <tr>
            <td class="text-left">URL</td>
            <td class="text-left">
              https://bit.ly/36xpBIO
              <q-tooltip>https://www.infocons.ro/vault/upload/Studiu/tabel_complet_toalete_+_cismele.pdf</q-tooltip>
            </td>
<!--            <td class="text-left">https://www.infocons.ro/vault/upload/Studiu/tabel_complet_toalete_+_cismele.pdf</td>-->
          </tr>
          <tr>
            <td class="text-left">Data</td>
            <td class="text-left">2020-05-28</td>
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
            <td class="text-left">1. Datele au fost obtinute de pe pagina de internet a InfoCons sub forma de tabel PDF.</td>
          </tr>
          <tr>
            <td class="text-left">2. Tabelul PDF a fost transformat in format CSV cu servicii gratuite on-line.
              Dupa transformare, a fost prelucrat manual suplimentar pentru a putea fi integrat in aplicatii.</td>
          </tr>
          <tr>
            <td class="text-left">3. Localizarile s-au facut manual, fie pe baza la paginile de internet ale autoritatilor
              responsabile, unde au fost disponibile, fie pe baza serviciilor Google Maps si OSM.
              Coordonatele indica zona deservita, conform tabelului original, nu pozitia actuala a toaletelor.</td>
          </tr>
          <tr>
            <td class="text-left">4. Nu am reusit sa identificam Parcul de agrement 1 Decembrie 1989 (#41) din Sectorul 6,
              am ales coordonatele la inceputul Str. 1 Decembrie 1989.
              Nu am identificat Terenul de Joaca Piata Amzei (#20) din Sectorul 1, am ales coordonatele pe cladirea pietei.
              Unde am considerat necesar, am adaugat observatii.
            </td>
          </tr>
          <tr>
            <td class="text-left">5. Toaleta de pe Aleea Pan Halipa a fost adaugata manual.</td>
          </tr>
          <tr>
            <td class="text-left">6. Exista diferente de reprezentare a punctelor pe hartile cu
              suport fotografic intre serviciile de harti Google, Bing si OSM.</td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <!-- info -->
      <q-card class="my-card bg-grey-3">
        <q-card-section>
          <div class="text-subtitle1">@InfoCons</div>
        </q-card-section>
        <q-markup-table wrap-cells>
          <tbody>
          <tr>
            <td class="text-left">In București există o toaletă publică la fiecare 10.000 de persoane, adică 220 de toalete publice în total.</td>
          </tr>
          <tr>
            <td class="text-left">Cele 220 de toalete publice sunt împărțite în 2 tipuri: ecologice și automate.
              Toaletele publice se află în subordinea Primăriilor de Sector sau țin de Administratia Lacuri Parcuri Si Agrement Bucuresti.</td>
          </tr>
          <tr>
            <td class="text-left">În Sectorul 1 sunt 74 de toalete publice,
              in Sectorul 2 sunt 9 toalete publice,
              in Sectorul 3 sunt 17 toalete publice,
              in Sectorul 4 sunt 42 de toalete publice,
              in Sectorul 5 sunt 14 toalete publice, iar
              in Sectorul 6 sunt 64 de toalete publice.</td>
          </tr>
          <tr>
            <td class="text-left">50% din toalete au un program de funcționare în intervalul 07.00 - 22.00.
              Doar toaletele aflate în subordinea Primăriei Sectorului 1 și cea din Piața Veteranilor I,
              din cadrul Primăriei Sectorului 6, au un program de funcționare NON-STOP.</td>
          </tr>
          <tr>
            <td class="text-left">
              Sursa: https://bit.ly/3mTGyEa
              <q-tooltip>https://www.infocons.ro/ro/i-in-bucuresti-o-singura-toaleta-publica-pentru-10000-de-persoane-MjIyODYtMQ.html</q-tooltip>
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
      return this.$store.state.toaletePublice.selectedItem;
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
