<!-- toalete-publice :: searchPanel -->

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
          <q-btn flat no-caps label="Date WGS84 [SHP... @43KB]" align="between" type="a"
                 href="/downloads/toalete_publice/toalete_publice.zip" target="_blank"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- units list -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="scatter_plot"
        label="Toalete Publice"
        default-opened
    >
      <q-list
          separator
          class="bg-grey-4"
      >
        <q-item
            dense
            clickable
            v-ripple
            v-for="(item, index) in items.layers[0].data"
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
              {{ item['properties']['locatie'].toUpperCase() }}
            </q-item-label>
            <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
              {{ item['properties']["institutie"] }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
            <q-icon class="" name="fiber_manual_record" size="24px"
                    :color="itemsColors['TOALETE_PUBLICE']"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

  </div>
</template>


<script>
export default {
  computed: {
    items() {
      return this.$store.state.toaletePublice.items;
    },

    filteredUnits() {
      return this.$store.getters["toaletePublice/filteredUnits"];
    },

    filteredServices() {
      return this.$store.getters["toaletePublice/filteredServices"];
    },

    itemsColors() {
      return this.$store.state.toaletePublice.itemsInfoPanelColors;
    },

    selectedItem() {
      return this.$store.state.toaletePublice.selectedItem;
    },

    unitSelected: async (item) => {
      const selectedItem = await this.$store.state.toaletePublice.selectedItem;
      // console.log('listItem: ', item);
      return {
        active: selectedItem ? selectedItem.id === item.id : false,
      };
    },
  },

  methods: {
    // @list select item
    async selectItem(item) {
      // load map object
      const map = this.$store.state.toaletePublice.map;
      // console.log('@list > selectItem >> item: ', item);
      // deselect previous selection
      const previousSelectedItem = this.$store.state.toaletePublice.selectedItem;
      // console.log('previousSelectedItem: ', previousSelectedItem);
      if (previousSelectedItem && item != previousSelectedItem) map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
      // if nothing is selected
      if (!item) {
        // clear selection data
        this.$store.dispatch('app/updateItemSelected', false);
        this.$store.dispatch('app/updateRightPanel', false);
        this.$store.dispatch('toaletePublice/updateItemSelected', false);
        this.$store.dispatch('toaletePublice/selectItem', null);

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

        this.$store.dispatch('toaletePublice/selectItem', item);
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
