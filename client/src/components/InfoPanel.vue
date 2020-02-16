<template>
  <div
    v-if="!!currentItem && currentItem['cod_lmi']"
    class="q-pa-md q-gutter-md"
  >
    <q-card class="my-card">
      <q-img
        src="currentItem.images[0]"
        basic
      >
        <div class="absolute-bottom text-subtitle2 text-left">
          {{ currentItem["cod_lmi"] }}: {{ currentItem["denumire"] }}
        </div>
      </q-img>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Localizare</div>
      </q-card-section>

      <q-markup-table>
        <tbody>
          <tr>
            <td class="text-left">GPS</td>
            <!-- <td class="text-right">alt: {{ currentItem['cota'] }} m</td> -->
            <td class="text-right">
              {{ formatGPSCoord(currentItem["y"]) }},
              {{ formatGPSCoord(currentItem["x"]) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">UAT Superioară</td>
            <td class="text-right">{{ currentItem["SIRSUP"] }}</td>
            <td class="text-right">{{ currentItem["UAT"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Localitate</td>
            <td class="text-right">{{ currentItem["SIRUTA"] }}</td>
            <td class="text-right">{{ currentItem["localitate"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Adresă</td>
            <td class="text-right">{{ currentItem["cod postal"] }}</td>
          </tr>
        </tbody>
        <q-card-section>
          {{ currentItem["adresa"] }}
        </q-card-section>
      </q-markup-table>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Încadrare</div>
      </q-card-section>

      <q-markup-table>
        <tbody>
          <tr>
            <td class="text-left">Tip Patrimoniu</td>
            <td class="text-right">{{ currentItem["tip_patrimoniu"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Program</td>
            <td class="text-right">{{ currentItem["program"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Tip Monument</td>
            <td class="text-right">{{ currentItem["tip_monument"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Datare</td>
            <td class="text-right">{{ currentItem["datare"] }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Evaluare</div>
      </q-card-section>

      <q-markup-table>
        <tbody>
          <tr>
            <td class="text-left">Data vizitei</td>
            <td class="text-right">{{ currentItem["fotografiat"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Stare generală</td>
            <td class="text-right">{{ currentItem["stare"] }}</td>
          </tr>
          <tr>
            <td class="text-left">Observații</td>
          </tr>
        </tbody>
        <q-card-section>
          {{ currentItem["observatii"] }}
        </q-card-section>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InfoBar",
  computed: {
    ...mapState({
      currentItem: state => {
        return state.monuments.selectedItem;
      }
    })
  },
  methods: {
    formatGPSCoord (number) {
      return parseFloat(number).toFixed(6);
    }
  }
};
</script>

<style></style>
