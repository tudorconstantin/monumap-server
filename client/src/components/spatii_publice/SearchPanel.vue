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

      <!-- menu list -->
      <q-list separator v-for="group in itemGroups" :key="group.code">
        <q-expansion-item
            dense
            dense-toggle
            expand-separator
            :label="group.label"
        >
          <q-card>
            <q-card-section class="column bg-grey-4">
              <!-- <q-checkbox v-model="group.checked" /> -->

              <!--              <q-item-->
              <!--                  dense-->
              <!--                  clickable-->
              <!--                  v-ripple-->
              <!--                  v-for="item in filteredItems.filter(-->
              <!--                (i) => i.properties.source === group.code-->
              <!--              )"-->
              <!--                  :key="item['properties']['cod_lmi']"-->
              <!--                  @click="selectItem(item['properties'])"-->
              <!--              >-->
              <!--                <q-item-section>{{-->
              <!--                    item['properties']['denumire']-->
              <!--                  }}-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

      <!-- search box -->
      <q-expansion-item
          default-opened
          dense
          dense-toggle
          expand-separator
          icon="search"
          label="Cautare"
      >
        <q-card>
          <q-card-section class="column bg-grey-4">

            <q-input
                bottom-slots
                v-model="filterText"
                label="Căutare"
                :dense="true"
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

            <div style="padding-top: 15px"></div>

            <q-list separator class="q-pt-md">
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
                <!--                <q-item-section class="q-pa-xs no-border no-margin" style="max-width: 26px">-->
                <!--                  <q-icon class="" name="fiber_manual_record" size="24px" :color="colorCodes[item['icon_code']]"/>-->
                <!--                </q-item-section>-->
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
      dummyFilterText: '',
      itemGroups: [
        {
          code: 'SPATII_ABANDONATE',
          label: 'Spatii abandonate',
          checked: true,
        },
        {
          code: 'SPATII_LINIARE',
          label: 'Spatii liniare',
          checked: true,
        },
        {
          code: 'SPATII_SUPRAFATA',
          label: 'Spatii suprafata',
          checked: true,
        },
        {
          code: 'SPATII_PUNCTUALE',
          label: 'Spatii punctuale',
          checked: true,
        },
      ],
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
    filteredItems() {
      return this.spatiiAbandonate;
      // return this.$store.getters["monuments/filteredArray"];
    },
    countFilteredList() {
      return this?.filteredItems?.length;
    },
    filterText: {
      set(newVal) {
        this.$props.setFilter({text: newVal});
        this.dummyFilterText = newVal;
      },
      get() {
        return this.dummyFilterText;
      },
    },
  },

  methods: {
    selectItem(item) {
      this.$store.dispatch("spatiiPublice/selectItem", item);
      if (this.$q.platform.is.mobile) this.$store.dispatch('spatiiPublice/updateLeftPanel', false);
      this.$store.dispatch('app/updateRightPanel', true);
      this.$store.dispatch('app/updateItemSelected', true);
    }
  },

  watch: {
    /* eslint-disable-next-line no-unused-vars */
    geoJSON(newValue, oldValue) {
      this.filterMap();
    },
    /* eslint-disable-next-line no-unused-vars */
    selectedItem(newValue) {
      // re-center map view
      if (newValue)
        this.$store.map.flyTo({center: [newValue.geometry.coordinates[0], newValue.geometry.coordinates[1]], zoom: 18});
    },
  },
};
</script>

<style lang="sass" scoped>
p
  padding: 0 30px
</style>
