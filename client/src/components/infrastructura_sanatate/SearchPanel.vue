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
      <q-card>
        <q-card-section class="column bg-grey-4">
          <q-checkbox keep-color v-model="filtruUnitatiAll" label="Toate tipurile" color="grey-8"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="SPITAL" label="Spital"
                      color="purple-9"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="DISPOZITIVE_MEDICALE" label="Dispozitive medicale"
                      color="orange-8"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="MEDIC_FAMILIE" label="Medic de familie"
                      color="red-8"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="MEDICINA_DENTARA" label="Medicina dentara "
                      color="yellow-12"/>
          <q-checkbox keep-color v-model="filtruUnitati" val="FARMACIE" label="Farmacie"
                      color="purple-12"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- units list -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="scatter_plot"
        :label="itemGroups[0].label"
    >
      <q-list
          separator
          class="bg-grey-4"
          v-for="(layer, lIndex) in itemGroups[0].layers"
          :key="lIndex"
      >
        <q-item
            dense
            clickable
            v-ripple
            v-for="(item, index) in layer.data"
            :key="index"
            @click="selectItem(item)"
            class="row items-start no-padding">
<!--            v-bind:class="{active: (selectedItem ? item.properties.id === selectedItem.properties.id : false)}"-->
<!--        >-->
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
            <q-icon class="" name="fiber_manual_record" size="24px" color="red"/>
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
          <q-item>Tip serviciu:</q-item>
          <q-separator/>
          <q-checkbox keep-color v-model="filtruServicii" val="TOATE" label="Toate tipurile" color="grey-8"/>
          <q-checkbox keep-color v-model="filtruServicii" val="DOMESTIC_URBAN" label="Imagistica medicala"
                      color="orange-8"/>
          <q-checkbox keep-color v-model="filtruServicii" val="DOMESTIC_RURAL" label="Ambulanta"
                      color="red-8"/>
          <q-checkbox keep-color v-model="filtruServicii" val="RELIGIOS" label="Reabilitare si recuperare"
                      color="blue-7"/>
          <q-checkbox keep-color v-model="filtruServicii" val="ADMINISTRATIV" label="Ambulatoriu de specialitate "
                      color="yellow-12"/>
          <q-checkbox keep-color v-model="filtruServicii" val="TRANSPORTURI" label="Ingrijiri la domiciliu"
                      color="purple-12"/>
          <q-checkbox keep-color v-model="filtruServicii" val="PREINDUSTRIAL_PRELUCRATOR"
                      label="Laborator" color="lime-13"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- services list -->
    <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="scatter_plot"
        :label="itemGroups[1].label"
    >
      <q-list
          separator
          class="bg-grey-4"
          v-for="(layer, lIndex) in itemGroups[1].layers"
          :key="lIndex"
      >
        <q-item
            dense
            clickable
            v-ripple
            v-for="(item, index) in layer.data"
            :key="index"
            @click="selectItem(item)"
            class="row items-start no-padding">
          <!--            v-bind:class="{active: (selectedItem ? item.properties.id === selectedItem.properties.id : false)}"-->
          <!--        >-->
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
            <q-icon class="" name="fiber_manual_record" size="24px" color="red"/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

  </div>
</template>

<script>
export default {
  props: {
    // items: {type: Array},
    // setFilter: { type: Function },
    // selectItem: {type: Function},
  },

  data() {
    return {
      // filtruUnitatiAll: true,
      filtruUnitati: [
        'SPITAL',
        'DISPOZITIVE_MEDICALE',
        'MEDIC_FAMILIE',
        'MEDICINA_DENTARA',
        'FARMACIE',
      ],
      filtruServicii: true,
    };
  },

  computed: {
    itemGroups() {
      return this.$store.state.infrastructuraSanatate.itemGroups;
    },

    filteredItems() {
      return this.items;
    },

    countFilteredList() {
      return this?.filteredItems?.length;
    },

    selectedItem() {
      return this.$store.state.infrastructuraSanatate.selectedItem;
    },

    unitSelected: async (item) => {
      const selectedItem = await this.$store.state.infrastructuraSanatate.selectedItem;
      console.log('listItem: ', item);
      return {
        active: selectedItem ? selectedItem.id === item.id : false,
      };
    },

    filtruUnitatiAll: {
      get() {
        return this.$store.state.infrastructuraSanatate.filtruUnitatiAll;
      },
      set(value) {
        this.$store.state.infrastructuraSanatate.filtruUnitatiAll = value;
      }
    },

    // filtruUnitati: {
    //   get() {
    //     // console.log('app: getLeftPanel');
    //     return this.$store.state.infrastructuraSanatate.filtruUnitati;
    //   },
    //   set: function (value) {
    //     console.log('@leftPanel > updateFilter: ', value);
    //     this.$store.dispatch('infrastructuraSanatate/updateUnitsFilter', value);
    //   },
    // },
  },

  methods: {
    // @list select item
    async selectItem(item) {
      // load map object
      const map = this.$store.state.infrastructuraSanatate.map;
      console.log('@list > selectItem >> item: ', item);
      // deselect previous selection
      const previousSelectedItem = this.$store.state.infrastructuraSanatate.selectedItem;
      // console.log('previousSelectedItem: ', previousSelectedItem);
      if(previousSelectedItem && item != previousSelectedItem) map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
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
        map.setFilter(`${item.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], item.properties.id]);
        this.$store.dispatch('app/updateRightPanel', true);
        this.$store.dispatch('app/updateItemSelected', true);
        console.log('@Map_mapbox > selectItem: ', item);
        // this.selectedItem = fullPolygon;
        // let coordinates;
        // if (fullPolygon.geometry.type === 'MultiPolygon') {
        //   coordinates = JSON.parse(
        //       JSON.stringify(fullPolygon.geometry.coordinates[0])
        //   );
        // } else if (fullPolygon.geometry.type === 'MultiLineString') {
        //   coordinates = JSON.parse(
        //       JSON.stringify(fullPolygon.geometry.coordinates)
        //   );
        // } else if (fullPolygon.geometry.type === 'Point') {
        //   coordinates = [
        //     [JSON.parse(JSON.stringify(fullPolygon.geometry.coordinates))],
        //   ];
        // }

        // const coordinates = [
        //   [JSON.parse(JSON.stringify(item.geometry.coordinates))],
        // ];

        // let point = coordinates[0].shift().slice(0, 2);
        // let bounds = new Mapbox.LngLatBounds(
        //     new Mapbox.LngLat(...point),
        //     new Mapbox.LngLat(...point)
        // );
        // while (coordinates[0].length) {
        //   point = coordinates[0].shift().slice(0, 2);
        //   bounds.extend(new Mapbox.LngLat(...point));
        // }
        //
        // map.fitBounds(bounds, {margin: 2, maxZoom: 15});
        // this.currentItem = {
        //   ...fullPolygon,
        // };

        map.flyTo({
          center: item.geometry.coordinates,
          zoom: 15,
        });

        this.$store.dispatch('infrastructuraSanatate/selectItem', item);
      }
    },

    // toggle layer visibility
    toggleLayerVisibility(layerId) {
      // load map object
      const map = this.$store.state.infrastructuraSanatate.map;
      // get current layer visibility state
      const visibility = map.getLayoutProperty(layerId, 'visibility');

      // toggle layer visibility by changing the layout object's visibility property
      if (visibility === 'visible') {
        map.setLayoutProperty(layerId, 'visibility', 'none');
      } else {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
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
