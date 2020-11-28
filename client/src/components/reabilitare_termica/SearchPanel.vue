<!-- reabilitare-termica :: searchPanel -->

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
          <q-btn flat no-caps label="Date [SHP @905KB]" align="between" type="a"
                 href="/downloads/reabilitare_termica/b_reabilitare-termica_l.zip" target="_blank"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- items filter -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="done"
        label="Filtrare Etape"
        default-opened
    >
      <q-list>
        <q-card-section class="column bg-grey-4">
          <q-checkbox keep-color v-model="filtruEtapeToate"
                      :label="`Toate etapele [${
                        itemGroups[0].data && itemGroups[0].data.features ?
                        itemGroups[0].data.features.length : 0}]`"
                      :color="itemsColors['TOATE']"/>
          <q-checkbox v-model="filtruEtape" val="URMEAZA"
                      :label="`Urmeaza [${
                        itemGroups[0].layers && itemGroups[0].layers[0].data ?
                        itemGroups[0].layers[0].data.length : 0}]`"
                      :color="itemsColors['URMEAZA']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="IN_PROIECTARE"
                      :label="`In Proiectare [${
                        itemGroups[0].layers && itemGroups[0].layers[0].data ?
                        itemGroups[0].layers[1].data.length : 0}]`"
                      :color="itemsColors['IN_PROIECTARE']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="IN_EXECUTIE"
                      :label="`In Executie [${
                        itemGroups[0].layers && itemGroups[0].layers[0].data ?
                        itemGroups[0].layers[2].data.length : 0}]`"
                      :color="itemsColors['IN_EXECUTIE']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="FINALIZAT"
                      :label="`Finalizat [${
                        itemGroups[0].layers && itemGroups[0].layers[0].data ?
                        itemGroups[0].layers[3].data.length : 0}]`"
                      :color="itemsColors['FINALIZAT']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="REZILIAT"
                      :label="`Reziliat [${
                        itemGroups[0].layers && itemGroups[0].layers[0].data ?
                        itemGroups[0].layers[4].data.length : 0}]`"
                      :color="itemsColors['REZILIAT']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="AVIZ_NEGATIV_ISC"
                      :label="`Aviz Negativ ISC [${
                        itemGroups[0].layers && itemGroups[0].layers[0].data ?
                        itemGroups[0].layers[5].data.length : 0}]`"
                      :color="itemsColors['AVIZ_NEGATIV_ISC']"/>
        </q-card-section>
      </q-list>
    </q-expansion-item>

    <!-- items list -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="scatter_plot"
        v-for="(layer, lIndex) in itemGroups[0].layers"
        :key="lIndex"
        :label="`${layer.name} [${layer && layer.data ? layer.data.length : 0}]`"
        default-closed
    >
      <q-item
          dense
          clickable
          v-ripple
          v-for="(item, index) in layer.data"
          :key="index"
          @click="selectItem(item)"
          class="row items-start no-padding bg-grey-4"
          v-bind:class="{active: (selectedItem ? item.properties.id === selectedItem.properties.id : false)}"
      >
        <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
          <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
        </q-item-section>
        <q-item-section class="column q-pt-xs">
          <q-item-label class="q-pa-xs" style="min-height: 20px">
            {{ item['properties']['adresa'] }}
          </q-item-label>
          <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
            {{ item['properties']["sector"] }}
          </q-item-label>
        </q-item-section>
        <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
          <q-icon class="" name="fiber_manual_record" size="24px"
                  :color="itemsColors[layer.id]"/>
        </q-item-section>
      </q-item>
    </q-expansion-item>
  </div>
</template>


<script>
export default {
  computed: {
    itemGroups() {
      return this.$store.state.reabilitareTermica.itemGroups;
    },

    itemsColors() {
      return this.$store.state.reabilitareTermica.itemsInfoPanelColors;
    },

    selectedItem() {
      return this.$store.state.reabilitareTermica.selectedItem;
    },

    unitSelected: async (item) => {
      const selectedItem = await this.$store.state.reabilitareTermica.selectedItem;
      // console.log('listItem: ', item);
      return {
        active: selectedItem ? selectedItem.id === item.id : false,
      };
    },

    filtruEtapeToate: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.reabilitareTermica.filtruEtapeToate;
      },
      set: function (value) {
        // console.log('@leftPanel > updateUnitatiFilterToate: ', value);
        this.$store.dispatch('reabilitareTermica/updateItemsFilterToate', value);
      },
    },

    filtruEtape: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.reabilitareTermica.filtruEtape;
      },
      set: function (value) {
        // console.log('@leftPanel > updateItemsFilter: ', value);
        this.$store.dispatch('reabilitareTermica/updateItemsFilter', value);
      },
    },
  },

  methods: {
    // @list select item
    async selectItem(item) {
      // console.log('current selectedItem: ', this.selectedItem);
      // load map object
      const map = this.$store.state.reabilitareTermica.map;
      // console.log('@list > selectItem >> item: ', item);
      // deselect previous selection
      const previousSelectedItem = this.$store.state.reabilitareTermica.selectedItem;
      // console.log('previousSelectedItem: ', previousSelectedItem);
      if (previousSelectedItem && item != previousSelectedItem)
        map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
      // if nothing is selected
      if (!item) {
        // clear selection data
        this.$store.dispatch('app/updateItemSelected', false);
        this.$store.dispatch('app/updateRightPanel', false);
        this.$store.dispatch('reabilitareTermica/updateItemSelected', false);
        this.$store.dispatch('reabilitareTermica/selectItem', null);

        // if selected
      } else {
        // highlight clicked item
        map.setFilter(`${item.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], item.properties.id]);
        this.$store.dispatch('app/updateRightPanel', true);
        this.$store.dispatch('app/updateItemSelected', true);

        map.flyTo({
          center: item.geometry.coordinates,
          zoom: 15,
        });

        this.$store.dispatch('reabilitareTermica/selectItem', item);
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

</style>
