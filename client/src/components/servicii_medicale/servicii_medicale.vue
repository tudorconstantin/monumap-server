<template>
  <div id="mapContainer" :style="cssVars()">
    <q-drawer :overlay="true" v-model="left" side="left" bordered>
      <!-- drawer content -->
      <search-panel
        :set-filter="setFilter"
        :select-item="selectItem"
        :items="filteredItems"
      ></search-panel>
    </q-drawer>

    <q-drawer v-model="itemInfoShown" side="right" bordered :width="400">
      <!-- drawer content -->
      <info-panel v-bind:current-item="currentItem"></info-panel>
    </q-drawer>
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :container="container"
      :center="center"
      :zoom="zoom"
      height="1000px"
      @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left" />
      <MglGeolocateControl position="top-left" />
    </MglMap>
  </div>
</template>

<script>
import SearchPanel from './SearchPanel';
import InfoPanel from './InfoPanel';
import { matRoom } from '@quasar/extras/material-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import constants from '@/util/constants.js';

import { MglMap, MglNavigationControl, MglGeolocateControl } from 'vue-mapbox';
import Mapbox from 'mapbox-gl';

import { mapGetters } from 'vuex';

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    SearchPanel,
    InfoPanel,
  },
  data() {
    return {
      geoJSON: {},
      items: [],
      filteredItems: [],
      currentItem: {},
      left: true,
      geometryTypes: {
        MultiPolygon: {
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.8,
          },
          type: 'fill',
        },
        Point: {
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222',
          },
          type: 'circle',
        },
        MultiLineString: {
          paint: {
            'line-color': 'black',
            'line-width': 3,
          },
          type: 'line',
        },
      },

      accessToken:
        'pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ',
      mapStyle: 'mapbox://styles/tudorconstantin/ck6e0nrah6h571ipdkgakat2u',
      container: 'mapContainer',
      center: [26.0986, 44.4365],
      zoom: 12.5,
      constants: null,
    };
  },

  async created() {
    this.map = null;
    this.matRoom = matRoom;
    this.constants = constants;
    const [specializate, primare] = await Promise.all([
      fetch('/geojson/servicii-medicale-specializate.geojson').then((r) =>
        r.json()
      ),
      fetch('/geojson/servicii-medicale-primare.geojson').then((r) => r.json()),
    ]);

    let features = [];

    features = features.concat(
      (specializate?.features || [])
        .filter((i) => i?.geometry?.type)
        .map((i) => {
          i.properties = i.properties || {};
          i.properties.source = 'SPECIALIZATE';
          return i;
        })
    );

    features = features.concat(
      (primare?.features || []).map((i) => {
        i.properties = i.properties || {};
        i.properties.source = 'PRIMARE';
        return i;
      })
    );

    features = features.sort((a, b) => {
      const A = a?.properties?.denumire?.toUpperCase();
      const B = b?.properties?.denumire?.toUpperCase();

      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });

    const geoJSON = {
      type: 'FeatureCollection',
      name: 'spatiiPublice',
      features,
    };
    this.geoJSON = geoJSON;
    this.filteredItems = geoJSON.features;
    this.items = geoJSON.features;
  },
  computed: {
    itemInfoShown() {
      return !!this.currentItem?.cod_lmi;
    },
    selectedItem: {
      get: function() {
        return this.currentItem;
      },
      set: function(newValue) {
        if (newValue) {
          let coordinates;
          if (newValue.geometry.type === 'MultiPolygon') {
            coordinates = JSON.parse(
              JSON.stringify(newValue.geometry.coordinates[0])
            );
          } else if (newValue.geometry.type === 'MultiLineString') {
            coordinates = JSON.parse(
              JSON.stringify(newValue.geometry.coordinates)
            );
          } else if (newValue.geometry.type === 'Point') {
            coordinates = [
              [JSON.parse(JSON.stringify(newValue.geometry.coordinates))],
            ];
          }

          let point = coordinates[0].shift().slice(0, 2);
          let bounds = new Mapbox.LngLatBounds(
            new Mapbox.LngLat(...point),
            new Mapbox.LngLat(...point)
          );
          while (coordinates[0].length) {
            point = coordinates[0].shift().slice(0, 2);
            bounds.extend(new Mapbox.LngLat(...point));
          }

          this.$store.map.fitBounds(bounds, { margin: 2, maxZoom: 17 });
          this.currentItem = {
            ...newValue.properties,
            images: newValue.images,
          };
          return;
        }

        this.currentItem = {};
      },
    },

    ...mapGetters({
      polygons: 'polygons/filteredArray',
    }),
  },

  methods: {
    addLayers() {
      const map = this.$store.map;
      ['PRIMARE', 'SPECIALIZATE'].forEach((medicalType) => {
        let paint = this.geometryTypes['Point']['paint'];
        if (medicalType === 'SPECIALIZATE') paint['circle-color'] = 'green';
        Object.keys(this.geometryTypes || {}).forEach((geometryType) => {
          if (
            !this.geoJSON.features.find((f) => f.geometry.type === geometryType)
          )
            return;
          if (geometryType !== 'Point') {
            paint = this.geometryTypes[geometryType].paint;
          }
          const mapSourceId = `${geometryType}_${medicalType}`;
          map
            .addSource(mapSourceId, {
              type: 'geojson',
              data: {
                ...this.geoJSON,
                features: this.geoJSON.features.filter(
                  (m) =>
                    m.geometry &&
                    m.geometry?.type === geometryType &&
                    m.properties.source === medicalType
                ),
              },
              generateId: true, // This ensures that all features have unique IDs
            })
            .on('mousemove', mapSourceId, (e) => {
              if (e.features && e.features.length > 0) {
                hoveredMonumentId = e.features[0].id;
                map.getCanvas().style.cursor = 'pointer';
              }
            })
            .on('mouseleave', mapSourceId, () => {
              if (hoveredMonumentId) {
                hoveredMonumentId = null;
                map.getCanvas().style.cursor = '';
              }
            });

          let hoveredMonumentId = null;

          map.addLayer({
            id: mapSourceId,
            type: this.geometryTypes[geometryType]['type'],
            source: mapSourceId,
            layout: {},
            paint: paint,
          });
        });
      });
    },

    /* eslint-disable-next-line no-unused-vars */
    setFilter(filter) {
      let filteredItems = [...this.items];
      if (filter.text) {
        filteredItems = filteredItems.filter(
          (i) =>
            i.properties.denumire_s
              .toUpperCase()
              .indexOf(filter.text.toUpperCase()) > -1
        );
      }

      this.filteredItems = filteredItems;
    },
    customizeMap() {
      const map = this.$store.map;
      this.addLayers();

      map
        .on('click', (e) => {
          const clickedPolygon = (this.$store.map.queryRenderedFeatures(
            e.point
          ) || [])[0];
          if (clickedPolygon) {
            this.selectItem(clickedPolygon.properties);
          } else {
            this.selectItem(null);
          }
        })
        .on('zoomend', () => {
          this.$store.dispatch('polygons/mapViewChanged');
        })
        .on('moveend', () => {
          this.$store.dispatch('polygons/mapViewChanged');
        });
    },
    onMapLoaded(event) {
      const map = event.map;
      this.$store.map = map;
      this.customizeMap();
    },
    cssVars() {
      //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        '--height':
          window.innerHeight -
          document.getElementById('header').offsetHeight +
          'px',
        '--width': window.innerWidth + 'px',
      };
    },

    async selectItem(polygonProps) {
      if (!polygonProps) {
        this.currentItem = {};
        this.selectedItem = null;
        return;
      }

      // get all polygon data
      const fullPolygon = this.geoJSON.features.find(
        (m) => m['properties']['place_id'] === polygonProps['place_id']
      );

      // const polygonProperties = fullPolygon['properties'];

      // request image list
      // const srvImgArrPath = `${polygonProperties['SIRSUP']}_${
      //   polygonProperties['UAT']
      // }/${polygonProperties['SIRUTA']}_${polygonProperties['localitate']}/${
      //   polygonProperties['SIRINF']
      // }_${polygonProperties['sector'].replace(' ', '-')}/${
      //   polygonProperties['cod_lmi']
      // }`;

      // //TODO: polygon images????
      // const imgArrReqPath = `/api/monument.images?polygonPath=${srvImgArrPath}`;
      // const res = await fetch(imgArrReqPath);
      // const imgArr = (await res.json()) || [];

      // // save full path images to array
      // const fullPathImageArray = imgArr.map(
      //   (photoName) => `/images/${srvImgArrPath}/${photoName}`
      // );

      // creat images properties
      fullPolygon.images = []; //fullPathImageArray;
      this.selectedItem = fullPolygon;
    },
  },
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
