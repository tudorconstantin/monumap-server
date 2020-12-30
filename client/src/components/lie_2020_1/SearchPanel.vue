<!-- lie2020_1 :: searchPanel -->

<template>
  <div class="bg-grey-5">

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
          <q-btn flat no-caps label="Date [SHP @385KB]" align="between" type="a"
                 href="/downloads/lie2020_1/lie-2020-1_bucuresti.zip" target="_blank"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- items filter -->
    <q-list separator v-for="group in itemGroups" :key="group.code">
      <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="done"
          label="Filtrare Risc Seismic"
          default-opened
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-checkbox keep-color v-model="filtruRiscSeismicToate"
                        :label="`Toate categoriile [${
                        items && items.features ?
                        items.features.length : 0}]`"
                        :color="itemsColors['TOATE']"/>
            <q-checkbox keep-color
                        v-model="filtruRiscSeismic"
                        v-for="(layer, index) in layersArr"
                        :key="index"
                        :val="layer.id"
                        :label="`${layer.name} [${
                          filtruLMI && filtruLMI.length === 0 ?
                            0 : (filtruLMI.length === 2 ? layer.itemsCount :
                              (filtruLMI[0] === 'cu_LMI' ?
                                layer.lmiCount : layer.noLmiCount)
                            )}]`"
                        :color="itemsColors[layer.id]"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- lmi filter -->
      <q-list separator>
        <q-expansion-item
            dense
            dense-toggle
            expand-separator
            icon="done"
            label="Filtrare cod LMI"
            default-opened
        >
          <q-card>
            <q-card-section class="column bg-grey-4">
              <q-checkbox keep-color v-model="filtruLMIToate"
                          val=""
                          :label="`Toate [${ items ? items.totalCount : 0}]`"
                          :color="itemsColors['TOATE']"/>
              <q-checkbox keep-color v-model="filtruLMI"
                          val="cu_LMI"
                          :label="`cu cod LMI [${ items ? items.lmiCount : 0}]`"
                          :color="itemsColors['cu_LMI']"/>
              <q-checkbox keep-color v-model="filtruLMI"
                          val="fara_LMI"
                          :label="`fara cod LMI [${ items ? items.noLmiCount : 0}]`"
                          :color="itemsColors['fara_LMI']"/>

            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

      <!-- items list -->
      <q-expansion-item
          dense
          dense-toggle
          expand-separator
          icon="scatter_plot"
          v-model="group.open"
          :label="group.label"
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
              v-for="(item, index) in filteredItems"
              :key="item['properties']['id']"
              @click="selectItem(item)"
              class="row items-start no-padding"
              v-bind:class="{active: (selectedItem ? item.properties.id === selectedItem.properties.id : false)}"
          >
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
              <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
            </q-item-section>
            <q-item-section class="column q-pt-xs">
              <q-item-label class="q-pa-xs" style="min-height: 20px">
                {{ item['properties']['adr_tip'] }}
                {{ item['properties']['adr_strada'] }}
                {{ item['properties']['adr_nr'] }}
              </q-item-label>
              <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                Sector {{ item['properties']["sector"] }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
              <q-icon class="" name="fiber_manual_record" size="24px"
                      :color="itemsColors[item.layer.id]"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
// import constants from "@/util/constants";

export default {
  props: [
    'map',
    'mapLoadedFlag'
  ],

  data() {
    return {
      dummyFilterText: '',
      // itemGroups: [
      //   {
      //     code: 'LIE_2020_1',
      //     label: 'LIE 2020',
      //     checked: true,
      //     open: true,
      //   },
      // ],
    };
  },

  computed: {
    items() {
      return this.$store.state.lie2020_1.items;
    },

    itemGroups() {
      return this.$store.state.lie2020_1.itemGroups;
    },

    filteredItems() {
      // return this.items;
      // console.log('@SearchPanel > filteredArray: ', this.$store.getters["lie2020_1/filteredArray"]);
      return this.$store.getters["lie2020_1/filteredArray"];
    },

    itemsCount() {
      return this.$store.state.lie2020_1.items &&
      this.$store.state.lie2020_1.items.features ?
          this.$store.state.lie2020_1.items.features.length : 0;
    },

    layersArr() {
      return this.$store.state.lie2020_1.itemGroups ?
          this.$store.state.lie2020_1.itemGroups[0].layers : [];
    },

    countFilteredList() {
      return this?.filteredItems?.length;
    },

    itemsColors() {
      return this.$store.state.lie2020_1.itemsInfoPanelColors;
    },

    selectedItem() {
      return this.$store.state.lie2020_1.selectedItem;
    },

    filtruRiscSeismic: {
      get() {
        return this.$store.state.lie2020_1.filtruRiscSeismic || [];
      },
      set(value) {
        this.$store.dispatch("lie2020_1/updateFiltruRiscSeismic", {value, map: this.map});
      }
    },

    filtruRiscSeismicToate: {
      get() {
        return this.$store.state.lie2020_1.filtruRiscSeismicToate || false;
      },
      set(value) {
        this.$store.dispatch("lie2020_1/updateFiltruRiscSeismicToate", {value, map: this.map});
      }
    },

    filtruLMI: {
      get() {
        return this.$store.state.lie2020_1.filtruLMI || [];
      },
      set(value) {
        this.$store.dispatch("lie2020_1/updateFiltruLMI", {value});
      }
    },

    filtruLMIToate: {
      get() {
        return this.$store.state.lie2020_1.filtruLMIToate || [];
      },
      set(value) {
        this.$store.dispatch("lie2020_1/updateFiltruLMIToate", {value});
      }
    },
  },

  methods: {
    // @list select item
    async selectItem(clickedItem) {
      const desktopFlag = this.$q.platform.is.desktop;
      // console.log('@searchPanel > clickedItem: ', clickedItem);

      // deselect previous selection
      const previousSelectedItem = this.$store.state.lie2020_1.selectedItem;
      // console.log('previousSelectedItem: ', previousSelectedItem);
      if (previousSelectedItem && clickedItem.properties.id != previousSelectedItem.properties.id)
        this.map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);

      // if nothing is selected
      if (!clickedItem) {
        // clear selection data
        this.$store.dispatch('app/updateItemSelected', false);
        this.$store.dispatch('app/updateRightPanel', false);
        this.$store.dispatch('lie2020_1/updateItemSelected', false);
        this.$store.dispatch('lie2020_1/selectItem', null);

        // if selected
      } else {
        // highlight clicked clickedItem
        this.map.setFilter(`${clickedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);
        if(desktopFlag) {
          this.$store.dispatch('app/updateRightPanel', true);
        } else {
          // this.$store.dispatch('app/updateRightPanel', true);
          this.$store.dispatch('lie2020_1/updateLeftPanel', false);
        }
        this.$store.dispatch('app/updateItemSelected', true);

        this.map.flyTo({
          center: clickedItem.geometry.coordinates[0],
          zoom: 17,
        });

        this.$store.dispatch('lie2020_1/selectItem', clickedItem);
      }
    },

    filterMap(map) {
      // if no map object is provided, take no action and return
      if (!map || !this.mapLoadedFlag) return;
      // for each layer
      this.$store.state.lie2020_1.itemGroups[0].layers
          .forEach((layer) => {
            map
                // get source
                .getSource(layer.sourceId)
                // reset data to mirror filters selection
                .setData({
                  "type": "FeatureCollection",
                  "name": layer.id,
                  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
                  features: this.filteredItems
                      .filter(i => i.layer.id === layer.id),
                })

          });
    },
  },

  watch: {
    /* eslint-disable-next-line no-unused-vars */
    filteredItems(newValue, oldValue) {
      this.filterMap(this.map);
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
