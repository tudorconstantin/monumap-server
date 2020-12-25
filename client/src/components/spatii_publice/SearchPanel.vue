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
            <q-btn flat no-caps label="Date [SHP @280KB]" align="between" type="a"
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
        <q-list separator class="bg-grey-4">
          <q-item
              dense
              clickable
              v-ripple
              v-for="(item, index) in spatiiAbandonate"
              :key="index"
              @click="selectItem(item, {layerId: 'SPATII_ABANDONATE', sourceId: 'SPATII_ABANDONATE'})"
              class="row items-start no-padding"
              v-bind:class="{active: (selectedItem && selectedItem.layer && selectedItem.layer.id === 'SPATII_ABANDONATE' ? item.properties.id === selectedItem.properties.id : false)}"

          >
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
              <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
            </q-item-section>
            <q-item-section class="column q-pt-xs">
              <q-item-label class="q-pa-xs" style="min-height: 20px">
                {{ item.properties.denumire }}
              </q-item-label>
              <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                {{ item.properties.cartier }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
              <q-icon class="" name="fiber_manual_record" size="24px"
                      :color="itemsColors['SPATII_ABANDONATE']"/>
            </q-item-section>
          </q-item>
        </q-list>
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
        <q-list separator class="bg-grey-4">
          <q-item
              dense
              clickable
              v-ripple
              v-for="(item, index) in spatiiPunctuale"
              :key="index"
              @click="selectItem(item, {layerId: 'SPATII_PUNCTUALE', sourceId: 'SPATII_PUNCTUALE'})"
              class="row items-start no-padding"
              v-bind:class="{active: (selectedItem && selectedItem.layer && selectedItem.layer.id === 'SPATII_PUNCTUALE' ? item.properties.id === selectedItem.properties.id : false)}"

          >
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
              <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
            </q-item-section>
            <q-item-section class="column q-pt-xs">
              <q-item-label class="q-pa-xs" style="min-height: 20px">
                {{ item.properties.denumire }}
              </q-item-label>
              <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                {{ item.properties.cartier }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
              <q-icon class="" name="fiber_manual_record" size="24px"
                      :color="itemsColors['SPATII_PUNCTUALE']"/>
            </q-item-section>
          </q-item>
        </q-list>
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
        <q-list separator class="bg-grey-4">
          <q-item
              dense
              clickable
              v-ripple
              v-for="(item, index) in spatiiLiniare"
              :key="index"
              @click="selectItem(item, {layerId: 'SPATII_LINIARE', sourceId: 'SPATII_LINIARE'})"
              class="row items-start no-padding"
              v-bind:class="{active: (selectedItem && selectedItem.layer && selectedItem.layer.id === 'SPATII_LINIARE' ? item.properties.id === selectedItem.properties.id : false)}"

          >
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
              <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
            </q-item-section>
            <q-item-section class="column q-pt-xs">
              <q-item-label class="q-pa-xs" style="min-height: 20px">
                {{ item.properties.denumire }}
              </q-item-label>
              <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                {{ item.properties.cartier }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
              <q-icon class="" name="fiber_manual_record" size="24px"
                      :color="itemsColors['SPATII_LINIARE']"/>
            </q-item-section>
          </q-item>
        </q-list>
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
        <q-list separator class="bg-grey-4">
          <q-item
              dense
              clickable
              v-ripple
              v-for="(item, index) in spatiiSuprafata"
              :key="index"
              @click="selectItem(item, {layerId: 'SPATII_SUPRAFATA', sourceId: 'SPATII_SUPRAFATA'})"
              class="row items-start no-padding"
              v-bind:class="{active: (selectedItem && selectedItem.layer && selectedItem.layer.id === 'SPATII_SUPRAFATA' ?
              item.properties.id === selectedItem.properties.id : false)}"

          >
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 40px">
              <q-item-label class="q-pa-xs" style="min-height: 20px">{{ index + 1 }}.</q-item-label>
            </q-item-section>
            <q-item-section class="column q-pt-xs">
              <q-item-label class="q-pa-xs" style="min-height: 20px">
                {{ item.properties.denumire }}
              </q-item-label>
              <q-item-label class="text-caption text-grey-7 q-pa-xs no-border no-margin" style="min-height: 20px">
                {{ item.properties.cartier }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 32px">
              <q-icon class="" name="fiber_manual_record" size="24px"
                      :color="itemsColors['SPATII_SUPRAFATA']"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

    </q-list>
  </q-drawer>
</template>

<script>
import Mapbox from 'mapbox-gl';

export default {
  name: 'SpatiiPubliceSearchPanel',

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
        this.$store.dispatch('spatiiPublice/updateLoading', value);
      },
    },

    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.spatiiPublice.leftPanel;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('spatiiPublice/updateLeftPanel', value);
      },
    },

    rightPanel: {
      get() {
        return this.$store.state.spatiiPublice.rightPanel;
      },
      set: function (value) {
        this.$store.dispatch('spatiiPublice/updateRightPanel', value);
      },
    },

    currentItem: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.spatiiPublice.selectedItem;
      },
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('spatiiPublice/selectItem', value);
      },
    },

    itemsColors() {
      return this.$store.state.spatiiPublice.itemsInfoPanelColors;
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
      return this.$store.getters['spatiiPublice/getSpatiiSuprafata'] ?
          this.$store.getters['spatiiPublice/getSpatiiSuprafata'].features : [];
    },
    selectedItem() {
      return this.$store.state.spatiiPublice.selectedItem;
    },
  },

  methods: {
    selectItem(clickedItem, {layerId, sourceId}) {
      // add layerId and sourceId to item
      const item = clickedItem;
      item.layer = {};
      item.layer.id = layerId;
      item.layer.source = sourceId;
      // console.log('@selectItem > item: ', item);

      // load map object
      const mapObj = this.map;

      // de-highlight all layers
      ['SPATII_ABANDONATE', 'SPATII_PUNCTUALE', 'SPATII_LINIARE', 'SPATII_SUPRAFATA']
          .forEach((item) => {
            mapObj.setFilter(`${item}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
          });

      // highlight clicked item
      if (item) mapObj.setFilter(`${item.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], item.properties.id]);

      // center view on selected item
      if (item.geometry.type === 'Point') {
        // console.log('Geometry Type: ', e.features[0].geometry.type);
        mapObj.flyTo({
          center: item.geometry.coordinates,
          zoom: 15,
        });
      } else if (item.geometry.type === 'LineString') {
        // console.log('Geometry Type: ', item.geometry.type);
        // Geographic coordinates for LineString
        const coordinates = item.geometry.coordinates;
        // Pass the first coordinates in the LineString to `lngLatBounds` &
        // wrap each coordinate pair in `extend` to include them in the bounds
        // result. A variation of this technique could be applied to zooming
        // to the bounds of multiple Points or Polygon geometries - it just
        // requires wrapping all the coordinates with the extend method.
        // console.log('coordinates: ', coordinates);
        const bounds = coordinates.reduce(function (bounds, coord) {
          return bounds.extend(coord);
        }, new Mapbox.LngLatBounds(coordinates[0], coordinates[0]));
        // mapObj.fitBounds(bounds, {
        //   padding: 400
        // });
        mapObj.flyTo({
          center: bounds.getCenter(),
          zoom: 15,
        });
      } else {
        // console.log('Geometry Type: ', item.geometry.type);
        // Geographic coordinates for MultiLineString or Polygon
        const coordinates = clickedItem.geometry.coordinates;
        // console.log('coordinates: ', coordinates);
        const bounds = coordinates[0].reduce(function (bounds, coord) {
          return bounds.extend(coord);
        }, new Mapbox.LngLatBounds(coordinates[0][0], coordinates[0][1]));
        mapObj.flyTo({
          center: bounds.getCenter(),
          zoom: 15,
        });
      }

      // save new selected item to store
      this.$store.dispatch("spatiiPublice/selectItem", item);
      // update flags
      if (this.$q.platform.is.mobile) this.$store.dispatch('spatiiPublice/updateLeftPanel', false);
      this.$store.dispatch('app/updateRightPanel', true);
      this.$store.dispatch('app/updateItemSelected', true);
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

.active
  background-color: #F2C037
</style>
