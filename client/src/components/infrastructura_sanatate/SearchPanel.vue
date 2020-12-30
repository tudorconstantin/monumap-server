<!-- infrastructura-sanatate :: searchPanel -->

<template>
  <div style="overflow-x: hidden">

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
          <q-btn flat no-caps label="Date CNAS [SHP @561KB]" align="between" type="a"
                 href="/downloads/infrastructura_sanatate/infrastructura_sanatate.zip" target="_blank"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- units filter -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="done"
        label="Filtrare Unitati"
        default-opened
    >
      <q-list>
        <q-card-section class="column bg-grey-4">
          <q-checkbox keep-color v-model="filtruUnitatiToate" label="Toate tipurile"
                      :color="unitsColors['TOATE']"/>
          <q-checkbox v-model="filtruUnitati" val="SPITAL" label="Spital"
                      :color="unitsColors['SPITAL']"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="DISPOZITIVE_MEDICALE" label="Dispozitive medicale"
                      :color="unitsColors['DISPOZITIVE_MEDICALE']"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="MEDIC_FAMILIE" label="Medic de familie"
                      :color="unitsColors['MEDIC_FAMILIE']"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="MEDICINA_DENTARA" label="Medicina dentara "
                      :color="unitsColors['MEDICINA_DENTARA']"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="FARMACIE" label="Farmacie"
                      :color="unitsColors['FARMACIE']"/>
        </q-card-section>
      </q-list>
    </q-expansion-item>

    <!-- units list -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="scatter_plot"
        :label="filteredUnits.label"
    >
      <q-list
          separator
          class="bg-grey-4"
          v-for="(layer, lIndex) in filteredUnits.layers"
          :key="lIndex"
      >
        <q-item
            dense
            clickable
            v-ripple
            v-for="(item, index) in layer.data"
            :key="index"
            @click="selectItem(item)"
            class="row items-start no-padding"
            v-bind:class="{active: (selectedItem ? item.properties.id === selectedItem.properties.id : false)}"
        >
          <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
            <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
          </q-item-section>
          <q-item-section class="column q-pt-xs">
            <q-item-label class="q-pa-xs" style="min-height: 20px">
              {{ item['properties']['denumire'].toUpperCase() }}
            </q-item-label>
            <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
              {{ item['properties']["adresa_pl"] }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
            <q-icon class="" name="fiber_manual_record" size="24px"
                    :color="unitsColors[layer.id]"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <!-- services filter -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="done"
        label="Filtrare Servicii"
        default-opened
    >
      <q-card>
        <q-card-section class="column bg-grey-4">
          <q-checkbox keep-color v-model="filtruServiciiToate" label="Toate tipurile"
                      :color="servicesColors['TOATE']"/>
          <q-checkbox keep-color v-model="filtruServicii" val="IMAGISTICA_MEDICALA" label="Imagistica medicala"
                      :color="servicesColors['IMAGISTICA_MEDICALA']"/>
          <q-checkbox keep-color v-model="filtruServicii" val="AMBULANTA" label="Ambulanta"
                      :color="servicesColors['AMBULANTA']"/>
          <q-checkbox keep-color v-model="filtruServicii" val="REABILITARE_RECUPERARE" label="Reabilitare si recuperare"
                      :color="servicesColors['REABILITARE_RECUPERARE']"/>
          <q-checkbox keep-color v-model="filtruServicii" val="AMBULATORIU_SPECIALITATE"
                      label="Ambulatoriu de specialitate "
                      :color="servicesColors['AMBULATORIU_SPECIALITATE']"/>
          <q-checkbox keep-color v-model="filtruServicii" val="INGRIJIRI_DOMICILIU" label="Ingrijiri la domiciliu"
                      :color="servicesColors['INGRIJIRI_DOMICILIU']"/>
          <q-checkbox keep-color v-model="filtruServicii" val="LABORATOR" label="Laborator"
                      :color="servicesColors['LABORATOR']"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- services list -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="scatter_plot"
        :label="filteredServices.label"
    >
      <q-list
          separator
          class="bg-grey-4"
          v-for="(layer, lIndex) in filteredServices.layers"
          :key="lIndex"
      >
        <q-item
            dense
            clickable
            v-ripple
            v-for="(item, index) in layer.data"
            :key="index"
            @click="selectItem(item)"
            class="row items-start no-padding"
            v-bind:class="{active: (selectedItem ? item.properties.id === selectedItem.properties.id : false)}"
        >
          <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
            <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
          </q-item-section>
          <q-item-section class="column q-pt-xs">
            <q-item-label class="q-pa-xs" style="min-height: 20px">
              {{ item['properties']['denumire'].toUpperCase() }}
            </q-item-label>
            <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
              {{ item['properties']["adresa_pl"] }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
            <q-icon class="" name="fiber_manual_record" size="24px"
                    :color="servicesColors[layer.id]"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

  </div>
</template>


<script>
export default {
  props: [
    'map',
  ],

  computed: {
    loading: {
      get() {
        return this.$store.state.spatiiPublice.loading;
      },
      set: function (value) {
        this.$store.dispatch('infrastructuraSanatate/updateLoading', value);
      },
    },

    itemGroups() {
      return this.$store.state.infrastructuraSanatate.itemGroups;
    },

    filteredUnits() {
      return this.$store.getters["infrastructuraSanatate/filteredUnits"];
    },

    filteredServices() {
      return this.$store.getters["infrastructuraSanatate/filteredServices"];
    },

    unitsColors() {
      return this.$store.state.infrastructuraSanatate.unitsInfoPanelColors;
    },

    servicesColors() {
      return this.$store.state.infrastructuraSanatate.servicesInfoPanelColors;
    },

    countFilteredList() {
      return this?.filteredItems?.length;
    },

    selectedItem() {
      return this.$store.state.infrastructuraSanatate.selectedItem;
    },

    unitSelected: async (item) => {
      const selectedItem = await this.$store.state.infrastructuraSanatate.selectedItem;
      // console.log('listItem: ', item);
      return {
        active: selectedItem ? selectedItem.id === item.id : false,
      };
    },

    filtruUnitatiToate: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.infrastructuraSanatate.filtruUnitatiToate;
      },
      set: function (value) {
        // console.log('@leftPanel > updateUnitatiFilterToate: ', value);
        this.$store.dispatch('infrastructuraSanatate/updateUnitsFilterToate', {map: this.map, value});
      },
    },

    filtruUnitati: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.infrastructuraSanatate.filtruUnitati;
      },
      set: function (value) {
        // console.log('@leftPanel > updateUnitsFilter: ', value);
        this.$store.dispatch('infrastructuraSanatate/updateUnitsFilter', {map: this.map, value});
      },
    },

    filtruServiciiToate: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.infrastructuraSanatate.filtruServiciiToate;
      },
      set: function (value) {
        // console.log('@leftPanel > updateServiciiFilterToate: ', value);
        this.$store.dispatch('infrastructuraSanatate/updateServicesFilterToate', {map: this.map, value});
      },
    },

    filtruServicii: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.infrastructuraSanatate.filtruServicii;
      },
      set: function (value) {
        // console.log('@leftPanel > updateServicesFilter: ', value);
        this.$store.dispatch('infrastructuraSanatate/updateServicesFilter', {map: this.map, value});
      },
    },
  },

  methods: {
    // @list select item
    async selectItem(item) {
      const desktopFlag = this.$q.platform.is.desktop;
      // load map object
      const mapObj = this.map;
      // console.log('@list > selectItem >> map: ', mapObj);

      // deselect previous selection
      const previousSelectedItem = this.$store.state.infrastructuraSanatate.selectedItem;
      // console.log('previousSelectedItem: ', previousSelectedItem);
      if (previousSelectedItem && item != previousSelectedItem) mapObj.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);

      // if nothing is selected
      if (!item) {
        // clear selection data
        this.$store.dispatch('app/updateItemSelected', false);
        this.$store.dispatch('app/updateRightPanel', false);
        this.$store.dispatch('infrastructuraSanatate/updateItemSelected', false);
        this.$store.dispatch('infrastructuraSanatate/selectItem', null);

        // if selected
      } else {
        // highlight clicked item
        mapObj.setFilter(`${item.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], item.properties.id]);

        // update flags
        if(desktopFlag) {
          this.$store.dispatch('app/updateRightPanel', true);
        } else {
          // this.$store.dispatch('app/updateRightPanel', true);
          this.$store.dispatch('infrastructuraSanatate/updateLeftPanel', false);
        }
        this.$store.dispatch('app/updateItemSelected', true);
        this.$store.dispatch('infrastructuraSanatate/selectItem', item);

        // center map view on new item
        mapObj.flyTo({
          center: item.geometry.coordinates,
          zoom: 15,
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px

.active
  background-color: #F2C037

.text-brand
  color: #a2aa33

</style>
