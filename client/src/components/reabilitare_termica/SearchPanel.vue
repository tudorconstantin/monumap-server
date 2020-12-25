<!-- reabilitare-termica :: searchPanel -->

<template>
  <div style="overflow-x: hidden">

    <!-- download data -->
    <q-expansion-item
        id="rt-sp-descarcare-date"
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
        id="rt-sp-lista-filtre"
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
                        items && items.features ?
                        items.features.length : 0}]`"
                      :color="itemsColors['TOATE']"/>
          <q-checkbox v-model="filtruEtape" val="URMEAZA"
                      :label="`Urmeaza [${
                        itemGroups[0].layers ?
                        itemGroups[0].layers[0].itemsCount : 0}]`"
                      :color="itemsColors['URMEAZA']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="IN_PROIECTARE"
                      :label="`In Proiectare [${
                        itemGroups[0].layers ?
                        itemGroups[0].layers[1].itemsCount : 0}]`"
                      :color="itemsColors['IN_PROIECTARE']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="IN_EXECUTIE"
                      :label="`In Executie [${
                        itemGroups[0].layers ?
                        itemGroups[0].layers[2].itemsCount : 0}]`"
                      :color="itemsColors['IN_EXECUTIE']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="FINALIZAT"
                      :label="`Finalizat [${
                        itemGroups[0].layers ?
                        itemGroups[0].layers[3].itemsCount : 0}]`"
                      :color="itemsColors['FINALIZAT']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="REZILIAT"
                      :label="`Reziliat [${
                        itemGroups[0].layers ?
                        itemGroups[0].layers[4].itemsCount : 0}]`"
                      :color="itemsColors['REZILIAT']"/>
          <q-checkbox keep-color v-model="filtruEtape" val="AVIZ_NEGATIV_ISC"
                      :label="`Aviz Negativ ISC [${
                        itemGroups[0].layers ?
                        itemGroups[0].layers[5].itemsCount : 0}]`"
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
        :label="`Imobile [${filteredItems.length}]`"
        default-opened
    >
      <q-virtual-scroll
          id="rt-sp-vscroll"
          :items="filteredItems"
          :items-size="filteredItems.length"
          separator
          class="bg-grey-4"
          style="max-height: 100px;"
      >
        <template v-slot="{ item, index }">
          <q-item
              dense
              clickable
              v-ripple
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
                {{ item['properties']['adresa'] }}
              </q-item-label>
              <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                {{ item['properties']["sector"] }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
              <q-icon class="" name="fiber_manual_record" size="24px"
                      :color="itemsColors[item.layer.id]"/>
            </q-item-section>
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-expansion-item>
  </div>
</template>


<script>
// import Mapbox from "mapbox-gl";

export default {
  props: [
    'map',
    'mapLoadedFlag',
  ],

  computed: {
    loading: {
      get() {
        return this.$store.state.spatiiPublice.loading;
      },
      set: function (value) {
        this.$store.dispatch('reabilitareTermica/updateLoading', value);
      },
    },

    items() {
      return this.$store.state.reabilitareTermica.items;
    },

    filteredItems() {
      return this.$store.state.reabilitareTermica.items && this.$store.state.reabilitareTermica.items.features ?
          this.$store.state.reabilitareTermica.items.features.filter(i => this.filtruEtape.includes(i.layer.id)) :
          [];
    },

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
        this.$store.dispatch('reabilitareTermica/updateItemsFilterToate', {value, map: this.map});
      },
    },

    filtruEtape: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.reabilitareTermica.filtruEtape;
      },
      set: function (value) {
        // console.log('@leftPanel > updateItemsFilter: ', value);
        this.$store.dispatch('reabilitareTermica/updateItemsFilter', {value, map: this.map});
      },
    },

  },

  methods: {
    // @list select item
    async selectItem(clickedItem) {
      // console.log('@searchPanel > clickedItem: ', clickedItem);
      // load map object
      const map = this.map;

      // select corresponding item from map
      // const item = await map.querySourceFeatures(layerId, {
      //   sourceLayer: sourceId,
      //   filter: ['==', ['get', 'id'], clickedItem.properties.id]
      // })[0];
      // console.log('@searchPanel > mapItem: ', item);
      // item.layer = clickedItem.layer;
      // item.layer = {};
      // item.layer.id = layerId;
      // item.layer.source = sourceId;
      // console.log('@searchPanel > mapItem: ', item);

      // de-highlight all layers
      this.$store.state.reabilitareTermica.filtruEtape
          .forEach((lItem) => {
            map.setFilter(`${lItem}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
          });

      // highlight clicked item
      if (clickedItem) map.setFilter(`${clickedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);

      // if nothing is selected
      if (!clickedItem) {
        // clear selection data
        this.$store.dispatch('app/updateItemSelected', false);
        this.$store.dispatch('app/updateRightPanel', false);
        this.$store.dispatch('reabilitareTermica/updateItemSelected', false);
        this.$store.dispatch('reabilitareTermica/selectItem', null);

        // if selected
      } else {
        // highlight clicked clickedItem
        map.setFilter(`${clickedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);
        this.$store.dispatch('app/updateRightPanel', true);
        this.$store.dispatch('app/updateItemSelected', true);

        map.flyTo({
          center: clickedItem.geometry.coordinates,
          zoom: 15,
        });

        this.$store.dispatch('reabilitareTermica/selectItem', clickedItem);
      }
    },
  },

  // created() {
  //   const spBox = document.getElementById('mapContainer').offsetHeight;
  //   const spDD = document.getElementById('rt-sp-descarcare-date').offsetHeight;
  //   const spFL = document.getElementById('rt-sp-lista-filtre').offsetHeight;
  //   const spVSmaxHeight = spBox - spDD - spFL;
  //   console.log('searchPanel VB height: ', spVSmaxHeight);
  //   const spVSelement = document.getElementById('rt-sp-vscroll');
  //   spVSelement.style.maxHeight = `${spVSmaxHeight} px`;
  // },
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px

.active
  background-color: #F2C037

</style>
