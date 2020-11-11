<!-- spatii-publice :: searchPanel -->

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
            <q-btn flat no-caps label="spatii_publice [SHP @206KB]" align="between" type="a"
                   href="/downloads/spatii_publice/spatii_publice_shp_wgs84.zip" target="_blank"/>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- spatii abandonate -->
      <q-expansion-item
          default-opened
          dense
          dense-toggle
          expand-separator
          icon="scatter_plot"
          :label="`Spatii abandonate [${spatiiAbandonate.length}]`"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-list separator class="">
              <q-item
                  dense
                  clickable
                  v-ripple
                  v-for="(item, index) in spatiiAbandonate"
                  :key="index"
                  @click="selectItem(item)"
                  class="row items-start no-padding"
              >
                <q-item-section class="column q-pt-xs">
                  <q-item-label class="q-pa-xs" style="min-height: 20px">
                    {{ index + 1 }}. {{ item.properties.denumire }}
                  </q-item-label>
                  <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                    {{ item.properties.cartier }}
                  </q-item-label>
                </q-item-section>
                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 26px">
                  <q-icon class="" name="fiber_manual_record" size="24px"
                          color="pink-7"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- spatii punctuale -->
      <q-expansion-item
          default-opened
          dense
          dense-toggle
          expand-separator
          icon="scatter_plot"
          :label="`Spatii punctuale [${spatiiPunctuale.length}]`"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-list separator class="">
              <q-item
                  dense
                  clickable
                  v-ripple
                  v-for="(item, index) in spatiiPunctuale"
                  :key="index"
                  @click="selectItem(item)"
                  class="row items-start no-padding"
              >
                <q-item-section class="column q-pt-xs">
                  <q-item-label class="q-pa-xs" style="min-height: 20px">
                    {{ index + 1 }}. {{ item.properties.denumire }}
                  </q-item-label>
                  <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                    {{ item.properties.cartier }}
                  </q-item-label>
                </q-item-section>
                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 26px">
                  <q-icon class="" name="fiber_manual_record" size="24px"
                          color="blue-13"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- spatii liniare -->
      <q-expansion-item
          default-opened
          dense
          dense-toggle
          expand-separator
          icon="show_chart"
          :label="`Spatii liniare [${spatiiLiniare.length}]`"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-list separator class="">
              <q-item
                  dense
                  clickable
                  v-ripple
                  v-for="(item, index) in spatiiLiniare"
                  :key="index"
                  @click="selectItem(item)"
                  class="row items-start no-padding"
              >
                <q-item-section class="column q-pt-xs">
                  <q-item-label class="q-pa-xs" style="min-height: 20px">
                    {{ index + 1 }}. {{ item.properties.denumire }}
                  </q-item-label>
                  <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                    {{ item.properties.cartier }}
                  </q-item-label>
                </q-item-section>
                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 26px">
                  <q-icon class="" name="fiber_manual_record" size="24px"
                          color="amber"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- spatii suprafata -->
      <q-expansion-item
          default-opened
          dense
          dense-toggle
          expand-separator
          icon="crop_3_2"
          :label="`Spatii suprafata [${spatiiSuprafata.length}]`"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">
            <q-list separator class="">
              <q-item
                  dense
                  clickable
                  v-ripple
                  v-for="(item, index) in spatiiSuprafata"
                  :key="index"
                  @click="selectItem(item)"
                  class="row items-start no-padding"
              >
                <q-item-section class="column q-pt-xs">
                  <q-item-label class="q-pa-xs" style="min-height: 20px">
                    {{ index + 1 }}. {{ item.properties.denumire }}
                  </q-item-label>
                  <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                    {{ item.properties.cartier }}
                  </q-item-label>
                </q-item-section>
                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 26px">
                  <q-icon class="" name="fiber_manual_record" size="24px"
                          color="green-7"/>
                </q-item-section>
              </q-item>
            </q-list>

          </q-card-section>
        </q-card>
      </q-expansion-item>

    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'SpatiiPubliceSearchPanel',

  data() {
    return {
      // dummyFilterText: '',
      // itemGroups: [
      //   {
      //     id: 'SPATII_ABANDONATE',
      //     label: 'Spatii abandonate',
      //     checked: true,
      //     color: 'red',
      //   },
      //   {
      //     id: 'SPATII_PUNCTUALE',
      //     label: 'Spatii punctuale',
      //     checked: true,
      //     color: 'blue',
      //   },
      //   {
      //     id: 'SPATII_LINIARE',
      //     label: 'Spatii liniare',
      //     checked: true,
      //     color: 'orange',
      //   },
      //   {
      //     id: 'SPATII_SUPRAFATA',
      //     label: 'Spatii suprafata',
      //     checked: true,
      //     color: 'green',
      //   },
      // ],
    };
  },

  computed: {
    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.spatiiPublice.leftPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('spatiiPublice/updateLeftPanel', value);
      },
    },
    spatiiAbandonate() {
      return this.$store.getters['spatiiPublice/getSpatiiAbandonate'] ?
          this.$store.getters['spatiiPublice/getSpatiiAbandonate'].features : [];
    },
    spatiiPunctuale() {
      return this.$store.getters['spatiiPublice/getSpatiiPunctuale'] ?
          this.$store.getters['spatiiPublice/getSpatiiPunctuale'].features : [];
    },
    spatiiLiniare() {
      return this.$store.getters['spatiiPublice/getSpatiiLiniare'] ?
          this.$store.getters['spatiiPublice/getSpatiiLiniare'].features : [];
    },
    spatiiSuprafata() {
      // return this.$store.getters['spatiiPublice/getSpatiiSuprafata'] ?
      //     this.$store.getters['spatiiPublice/getSpatiiSuprafata'].features : [];
      return this.$store.state.spatiiPublice.myMap.querySourceFeatures('SPATII_SUPRAFATA', {
            sourceLayer: 'SPATII_SUPRAFATA'
          });
    },
    // filteredItems() {
    //   const items = this.$store.state.spatiiPublice.myMap.querySourceFeatures('SPATII_SUPRAFATA', {
    //     sourceLayer: 'SPATII_SUPRAFATA'
    //   });
    //   console.log('items: ', items);
    //   return items;
    //   // return this.$store.getters["monuments/filteredArray"];
    // },
    // countFilteredList() {
    //   return this?.filteredItems?.length;
    // },
    // filterText: {
    //   set(newVal) {
    //     this.$props.setFilter({text: newVal});
    //     this.dummyFilterText = newVal;
    //   },
    //   get() {
    //     return this.dummyFilterText;
    //   },
    // },
  },

  methods: {
    selectItem(item) {
      // console.log('@selectItem > item: ', item);
      this.$store.state.spatiiPublice.myMap.flyTo({
        center: [item.geometry.coordinates[0], item.geometry.coordinates[1]],
        zoom: 18
      });
      this.$store.dispatch("spatiiPublice/selectItem", item);
      if (this.$q.platform.is.mobile) this.$store.dispatch('spatiiPublice/updateLeftPanel', false);
      this.$store.dispatch('app/updateRightPanel', true);
      this.$store.dispatch('app/updateItemSelected', true);
    },

    mSpatiiAbandonate() {
      return this.$store.state.spatiiPublice.myMap.querySourceFeatures('SPATII_ABANDONATE', {
        sourceLayer: 'SPATII_ABANDONATE'
      });
    },

    mSpatiiPunctuale() {
      return this.$store.state.spatiiPublice.myMap.querySourceFeatures('SPATII_PUNCTUALE', {
        sourceLayer: 'SPATII_PUNCTUALE'
      });
    },

    mSpatiiLiniare() {
      return this.$store.state.spatiiPublice.myMap.querySourceFeatures('SPATII_LINIARE', {
        sourceLayer: 'SPATII_LINIARE'
      });
    },

    mSpatiiSuprafata() {
      return this.$store.state.spatiiPublice.myMap.querySourceFeatures('SPATII_SUPRAFATA', {
        sourceLayer: 'SPATII_SUPRAFATA'
      });
    },
  },

  watch: {
    /* eslint-disable-next-line no-unused-vars */
    // geoJSON(newValue, oldValue) {
    //   this.filterMap();
    // },
    /* eslint-disable-next-line no-unused-vars */
    // selectedItem(newValue) {
    //   // re-center map view
    //   if (newValue)
    //     this.$store.state.spatiiPublice.myMap.flyTo({
    //       center: [newValue.geometry.coordinates[0], newValue.geometry.coordinates[1]],
    //       zoom: 18
    //     });
    // },
  },
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px
</style>
