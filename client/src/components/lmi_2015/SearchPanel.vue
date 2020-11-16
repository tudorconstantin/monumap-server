<!-- lmi-2015 :: searchPanel -->

<template>
  <!-- drawer container -->
  <q-drawer
      :overlay="true"
      v-model="leftPanel"
      side="left"
      bordered
      :content-style="{ backgroundColor: '#bdbdbd' }"
      class="bg-grey-5"
  >

    <!-- menu list -->
    <q-list padding bordered class="rounded-borders">

      <!-- download data -->
      <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="save_alt"
          label="Descarcare date"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-btn flat no-caps label="Lista monumente [CSV @745KB]" align="between" type="a"
                   href="/data/lmi-2015_bucuresti.csv" target="_blank"/>
            <q-btn disable flat no-caps label="Arhiva poze [JPG @3.2GB]" align="between" type="a"
                   href="/data/lmi-2015_bucuresti.csv" target="_blank"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- filter tip patrimoniu -->
      <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="done"
          label="Filtrare Tip Patrimoniu"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="" label="Toate tipurile" color="grey-8"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="REPREZENTATIV" label="Reprezentativ"
                     color="purple-9"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="DOMESTIC_URBAN" label="Domestic Urban"
                     color="orange-8"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="DOMESTIC_RURAL" label="Domestic Rural"
                     color="red-8"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="RELIGIOS" label="Religios" color="blue-7"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="ADMINISTRATIV" label="Administrativ "
                     color="yellow-12"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="TRANSPORTURI" label="Transporturi"
                     color="purple-12"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="PREINDUSTRIAL_PRELUCRATOR"
                     label="Preindustrial Prelucrator" color="lime-13"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="INDUSTRIAL_EXTRACTIV" label="Industrial Extractiv"
                     color="light-green-13"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="INDUSTRIAL_PRELUCRATOR"
                     label="Industrial Prelucrator" color="cyan-12"/>
            <q-radio keep-color v-model="filtruTipPatrimoniu" val="INDUSTRIAL_ENERGETIC" label="Industrial Energetic"
                     color="green-10"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- filtrare valoare -->
      <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="done_all"
          label="Filtrare Valoare"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-radio keep-color v-model="filtruValoareMon" val="" label="Toate" color="grey-8"/>
            <q-radio keep-color v-model="filtruValoareMon" val="A" label="Nationala (A)" color="teal">
              <q-tooltip>
                Categoria A - monumente de interes naţional
              </q-tooltip>
            </q-radio>
            <q-radio keep-color v-model="filtruValoareMon" val="B" label="Locala (B)" color="teal">
              <q-tooltip>
                Categoria B - monumente de interes local
              </q-tooltip>
            </q-radio>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- filtrare scara -->
      <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="done_all"
          label="Filtrare Scara"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-radio keep-color v-model="filtruScaraMon" val="" label="Toate" color="grey-8"/>
            <q-radio keep-color v-model="filtruScaraMon" val="m" label="Monument (m)" color="teal"/>
            <q-radio keep-color v-model="filtruScaraMon" val="a" label="Ansamblu (a)" color="teal"/>
            <q-radio keep-color v-model="filtruScaraMon" val="s" label="Sit arheologic (s)" color="teal"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- search area -->
      <q-expansion-item
          default-opened
          dense
          dense-toggle
          expand-separator
          icon="search"
          label="Cautare"
      >
        <q-list>
          <!-- search box -->
            <q-input
                bottom-slots
                v-model="filterText"
                label="Căutare"
                :dense="true"
                class="q-pl-xs q-pr-xs q-pb-xl"
            >
              <template v-slot:prepend>
                <q-icon name="place"/>
              </template>
              <template v-slot:append>
                <q-icon
                    name="close"
                    @click="filterText = ''"
                    class="cursor-pointer"
                />
              </template>

              <template v-slot:hint>
                <div class="row">
                  <p class="col text-left">Total selecție</p>
                  <p class="col text-right">{{ countFilteredList }}</p>
                </div>
              </template>
            </q-input>

          <!-- items list -->
            <q-list separator class="bg-grey-4">
              <q-item
                  dense
                  clickable
                  v-ripple
                  v-for="(item, index) in monFilteredList"
                  :key="index"
                  @click="selectMonument(item['cod_lmi'])"
                  class="row items-start no-padding"
                  v-bind:class="{active: (selectedItem ? item.cod_lmi === selectedItem.cod_lmi : false)}"

              >
                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
                  <q-item-label class="q-pa-xs" style="min-height: 20px"> {{ item.nr }}. </q-item-label>
                </q-item-section>
                <q-item-section class="column q-pt-xs">
                  <q-item-label class="q-pa-xs" style="min-height: 20px">
                    {{ item["denumire"] }}
                  </q-item-label>
                  <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                    {{ item["adresa"] }}
                  </q-item-label>
                </q-item-section>
                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
                  <q-icon class="" name="fiber_manual_record" size="24px" :color="colorCodes[item['icon_code']]"/>
                </q-item-section>
              </q-item>
            </q-list>

        </q-list>
      </q-expansion-item>

    </q-list>

  </q-drawer>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "Lmi2015SearchPanel",

  data() {
    return {
      colorCodes: {
        REPREZENTATIV: 'purple-9',
        DOMESTIC_URBAN: 'orange-8',
        DOMESTIC_RURAL: 'red-8',
        RELIGIOS: 'blue-7',
        ADMINISTRATIV: 'yellow-12',
        TRANSPORTURI: 'purple-12',
        PREINDUSTRIAL_PRELUCRATOR: 'lime-13',
        INDUSTRIAL_EXTRACTIV: 'light-green-13',
        INDUSTRIAL_PRELUCRATOR: 'cyan-12',
        INDUSTRIAL_ENERGETIC: 'green-10',
      },
    };
  },
  computed: {
    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.lmi2015.leftPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('lmi2015/updateLeftPanel', value);
      },
    },

    selectedItem() {
      return this.$store.state.lmi2015.selectedItem;
    },

    filterText: {
      get() {
        return this.$store.state.lmi2015.filterText || "";
      },
      set: function (value) {
        this.$store.dispatch("lmi2015/setFilterText", value);
      }
    },

    filtruTipPatrimoniu: {
      get() {
        return this.$store.state.lmi2015.filtruTipPatrimoniu || "";
      },
      set(value) {
        this.$store.dispatch("lmi2015/setFiltruTipPatrimoniu", value);
      }
    },

    filtruValoareMon: {
      get() {
        return this.$store.state.lmi2015.filtruValoareMon || "";
      },
      set(value) {
        this.$store.dispatch("lmi2015/setFiltruValoareMon", value);
      }
    },

    filtruScaraMon: {
      get() {
        return this.$store.state.lmi2015.filtruScaraMon || "";
      },
      set(value) {
        this.$store.dispatch("lmi2015/setFiltruScaraMon", value);
      }
    },

    ...mapState({
      monumentDisplayed: (state) => state.lmi2015.monumentDisplayed,
    }),

    monFilteredList() {
      return this.$store.getters["lmi2015/filteredArray"];
    },
    countFilteredList() {
      return this.monFilteredList.length;
    },
    getColorCode(value) {
      return this.colorCodes[value];
    }
  },

  methods: {
    toggleLeftPanel() {
      this.$store.dispatch('lmi2015/toggleLeftPanel');
    },
    selectMonument(codLmi) {
      this.$store.dispatch("lmi2015/selectItem", codLmi);
      if (this.$q.platform.is.mobile) this.$store.dispatch('lmi2015/updateLeftPanel', false);
    }
  },

  created: async function () {
    // open the left panel
    if (this.$q.platform.is.desktop) this.leftPanel = true;
  },
};
</script>

<style lang="sass" scoped>
.active
  background-color: #F2C037

p
  padding: 0 30px
</style>
