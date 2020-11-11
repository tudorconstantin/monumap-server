<!-- infrastructura-sanatate :: Map_mapbox -->

<template>
  <div id="mapContainer" :style="cssVars()">

    <!-- left panel -->
    <q-drawer
        :overlay="true"
        v-model="leftPanel"
        side="left"
        bordered
        :content-style="{ backgroundColor: '#bdbdbd' }"
        class="bg-grey-5"
    >
      <!-- drawer content -->
      <search-panel></search-panel>
    </q-drawer>

    <!-- right panel -->
    <q-drawer
        v-model="rightPanel"
        :overlay="true"
        class="bg-grey-5"
        side="right"
        bordered
        :width="400"
        :content-style="{ backgroundColor: '#bdbdbd' }"
    >
      <!-- drawer content -->
      <info-panel v-bind:current-item="currentItem"></info-panel>
    </q-drawer>

    <!-- map -->
    <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :container="container"
        :center="center"
        :zoom="zoom"
        height="1000px"
        @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left"/>
      <MglGeolocateControl position="top-left"/>
    </MglMap>
  </div>
</template>

<script>
import SearchPanel from './SearchPanel';
import InfoPanel from './InfoPanel';
import {matRoom} from '@quasar/extras/material-icons';
import 'mapbox-gl/dist/mapbox-gl.css';
import constants from '@/util/constants.js';

import {MglMap, MglNavigationControl, MglGeolocateControl} from 'vue-mapbox';
import Mapbox from 'mapbox-gl';

import {mapGetters} from 'vuex';
// import infrastructuraSanatate from "../../store/modules/infrastructura_sanatate";

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
      units: [],
      services: [],
      filteredItems: [],
      hoverItemId: null,
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
            'circle-radius': 10,
            'circle-color': '#B42222',
            'circle-opacity': 0.5,
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
    // const [unitati, servicii] = await Promise.all([
    //   fetch('/geojson/infrastructura_sanatate/cnas_unitati.geojson').then((r) => {
    //         const res = r.json();
    //         this.$store.dispatch('infrastructuraSanatate/updateUnits', res);
    //         return res;
    //       }
    //   ),
    //   fetch('/geojson/infrastructura_sanatate/cnas_servicii.geojson').then((r) => {
    //     const res = r.json();
    //     this.$store.dispatch('infrastructuraSanatate/updateServices', res);
    //     return res;
    //   }),
    // ]);

    // let features = [];
    //
    // features = features.concat(
    //     (unitati?.features || []).map((i) => {
    //       i.properties = i.properties || {};
    //       i.properties.source = 'UNITATI';
    //       return i;
    //     })
    // );
    //
    // features = features.concat(
    //     (servicii?.features || [])
    //         .filter((i) => i?.geometry?.type)
    //         .map((i) => {
    //           i.properties = i.properties || {};
    //           i.properties.source = 'SERVICII';
    //           return i;
    //         })
    // );
    //
    // features = features.sort((a, b) => {
    //   const A = a?.properties?.denumire?.toUpperCase();
    //   const B = b?.properties?.denumire?.toUpperCase();
    //
    //   if (A < B) return -1;
    //   if (A > B) return 1;
    //   return 0;
    // });
    //
    // const geoJSON = {
    //   type: 'FeatureCollection',
    //   name: 'infrastructuraSanatate',
    //   features,
    // };
    // this.geoJSON = geoJSON;
    // this.filteredItems = geoJSON.features;
    // this.items = geoJSON.features;
  },

  computed: {

    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.infrastructuraSanatate.leftPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('infrastructuraSanatate/updateLeftPanel', value);
      },
    },

    rightPanel: {
      get() {
        return this.$store.state.infrastructuraSanatate.rightPanel;
      }
      ,
      set: function (value) {
        this.$store.dispatch('infrastructuraSanatate/updateRightPanel', value);
      },
    },

    currentItem: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.infrastructuraSanatate.selectedItem;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('infrastructuraSanatate/selectItem', value);
      },
    },

    selectedItem: {
      get: function () {
        return this.currentItem;
      },
      set: function (newValue) {
        // load map object
        const map = this.$store.state.infrastructuraSanatate.map;
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

          map.fitBounds(bounds, {margin: 2, maxZoom: 17});
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
    // addLayers() {
    //   const map = this.$store.map;
    //   ['UNITATI', 'SERVICII'].forEach((medicalType) => {
    //     let paint = this.geometryTypes['Point']['paint'];
    //     if (medicalType === 'SERVICII') paint['circle-color'] = 'green';
    //     Object.keys(this.geometryTypes || {}).forEach((geometryType) => {
    //       if (
    //           !this.geoJSON.features.find((f) => f.geometry && f.geometry.type === geometryType)
    //       )
    //         return;
    //       if (geometryType !== 'Point') {
    //         paint = this.geometryTypes[geometryType].paint;
    //       }
    //       const mapSourceId = `${geometryType}_${medicalType}`;
    //       map
    //           .addSource(mapSourceId, {
    //             type: 'geojson',
    //             data: {
    //               ...this.geoJSON,
    //               features: this.geoJSON.features.filter(
    //                   (m) =>
    //                       m.geometry &&
    //                       m.geometry?.type === geometryType &&
    //                       m.properties.source === medicalType
    //               ),
    //             },
    //             generateId: true, // This ensures that all features have unique IDs
    //           })
    //           .on('mousemove', mapSourceId, (e) => {
    //             if (e.features && e.features.length > 0) {
    //               hoveredMonumentId = e.features[0].id;
    //               map.getCanvas().style.cursor = 'pointer';
    //             }
    //           })
    //           .on('mouseleave', mapSourceId, () => {
    //             if (hoveredMonumentId) {
    //               hoveredMonumentId = null;
    //               map.getCanvas().style.cursor = '';
    //             }
    //           });
    //
    //       let hoveredMonumentId = null;
    //
    //       map.addLayer({
    //         id: mapSourceId,
    //         type: this.geometryTypes[geometryType]['type'],
    //         source: mapSourceId,
    //         layout: {},
    //         paint: paint,
    //       });
    //     });
    //   });
    // },

    /* eslint-disable-next-line no-unused-vars */
    // setFilter(filter) {
    //   let filteredItems = [...this.items];
    //   if (filter.text) {
    //     filteredItems = filteredItems.filter(
    //         (i) =>
    //             i.properties.denumire_s
    //                 .toUpperCase()
    //                 .indexOf(filter.text.toUpperCase()) > -1
    //     );
    //   }
    //
    //   this.filteredItems = filteredItems;
    // },

    // customizeMap() {
    //   const map = this.$store.map;
    //   this.addLayers();
    //
    //   map
    //       .on('click', (e) => {
    //         const clickedPolygon = (map.queryRenderedFeatures(
    //             e.point
    //         ) || [])[0];
    //         if (clickedPolygon) {
    //           this.selectItem(clickedPolygon.properties);
    //         } else {
    //           this.selectItem(null);
    //         }
    //       })
    //       .on('zoomend', () => {
    //         this.$store.dispatch('polygons/mapViewChanged');
    //       })
    //       .on('moveend', () => {
    //         this.$store.dispatch('polygons/mapViewChanged');
    //       });
    // },

    // add map source
    addMapSource(sourceId, data) {
      // load map object
      const map = this.$store.state.infrastructuraSanatate.map;
      // add source
      map.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: data.type,
          features: data.features,
        },
        generateId: true, // This ensures that all features have unique IDs
      });
    },

    // add map layer
    addMapLayer: function (layer) {
      // load map object
      const map = this.$store.state.infrastructuraSanatate.map;
      // add map layer
      map.addLayer({
        id: layer.id,
        type: layer.render.shape,
        source: layer.sourceId,
        layout: {
          // make layer visible by default
          'visibility': 'visible',
        },
        paint: layer.render.paint,
        filter: ['==', ['get', 'tip_unit'], layer.name],
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on('mouseenter', layer.id, function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', layer.id, function () {
        map.getCanvas().style.cursor = '';
      });

      // add hover layer
      let hoveredItemId = this.hoveredItemId;
      // console.log('@hoveredItemId: ', hoveredItemId);
      const hoverLayerId = `${layer.id}_HOVER`
      map.addLayer({
        'id': hoverLayerId,
        'type': layer.hover.shape,
        'source': layer.sourceId,
        'layout': {},
        'paint': layer.hover.paint,
      });
      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.on('mousemove', hoverLayerId, function (e) {
            if (e.features.length > 0) {
              if (hoveredItemId) {
                map.setFeatureState(
                    {source: layer.sourceId, id: hoveredItemId},
                    {hover: false}
                );
              }
              hoveredItemId = e.features[0].id;
              map.setFeatureState(
                  {source: layer.sourceId, id: hoveredItemId},
                  {hover: true}
              );
            }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', hoverLayerId, function () {
        if (hoveredItemId) {
          map.setFeatureState(
              {source: layer.sourceId, id: hoveredItemId},
              {hover: false}
          );
        }
        hoveredItemId = null;
      });

      // add highlight layer
      const highlightLayerId = `${layer.id}_HIGHLIGHT`;
      map.addLayer({
        'id': highlightLayerId,
        'type': layer.highlight.shape,
        'source': layer.sourceId,
        'layout': {},
        'paint': layer.highlight.paint,
        'filter': layer.highlight.filter,
      });
    },

    // // add hover layer
    // addMapHoverLayer(layer) {
    //   // load map object
    //   const map = this.$store.state.infrastructuraSanatate.map;
    //   let hoveredItemId = this.hoveredItemId;
    //   // console.log('@hoveredItemId: ', hoveredItemId);
    //   map.addLayer({
    //     'id': layer.id,
    //     'type': layer.render.shape,
    //     'source': layer.sourceId,
    //     'layout': {},
    //     'paint': layer.render.paint,
    //   });
    //   // When the user moves their mouse over the state-fill layer, we'll update the
    //   // feature state for the feature under the mouse.
    //   map.on('mousemove', layer.id, function (e) {
    //     if (e.features.length > 0) {
    //       if (hoveredItemId) {
    //         map.setFeatureState(
    //             {source: layer.sourceId, id: hoveredItemId},
    //             {hover: false}
    //         );
    //       }
    //       hoveredItemId = e.features[0].id;
    //       map.setFeatureState(
    //           {source: layer.sourceId, id: hoveredItemId},
    //           {hover: true}
    //       );
    //     }
    //   });
    //
    //   // When the mouse leaves the state-fill layer, update the feature state of the
    //   // previously hovered feature.
    //   map.on('mouseleave', `${layer.id}`, function () {
    //     if (hoveredItemId) {
    //       map.setFeatureState(
    //           {source: layer.sourceId, id: hoveredItemId},
    //           {hover: false}
    //       );
    //     }
    //     hoveredItemId = null;
    //   });
    // },
    //
    // // add highlighted/selected item layer
    // addHighlightLayer(layer) {
    //   // load map object
    //   const map = this.$store.state.infrastructuraSanatate.map;
    //   // let highlightedItemId = this.highlightedItemId;
    //   // console.log('@hoveredItemId: ', hoveredItemId);
    //   map.addLayer({
    //     'id': layer.id,
    //     'type': layer.render.shape,
    //     'source': layer.sourceId,
    //     'layout': {},
    //     'paint': layer.render.paint,
    //     'filter': layer.render.filter,
    //   });
    // },

    // add map click event handler
    addMapClickHandler() {
      // load map object
      const map = this.$store.state.infrastructuraSanatate.map;
      // load store
      const store = this.$store;
      // load array of layers ids
      const layersIdsArr = this.$store.getters["infrastructuraSanatate/getAllLayersIds"];
      // on click action
      map.on('click', function (e) {
        // console.log('@click e: ', e);
        // find clicked item
        const clickedItem = (map.queryRenderedFeatures(e.point, { layers: layersIdsArr }) || [])[0];
        console.log('clickedItem: ', clickedItem);
        // deselect previous selection
        const previousSelectedItem = store.state.infrastructuraSanatate.selectedItem;
        // console.log('previousSelectedItem: ', previousSelectedItem);
        if(previousSelectedItem) map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
        // if clicked on item
        if (clickedItem) {
          // highlight selected item
          map.setFilter(`${clickedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], clickedItem.properties.id]);

          // save selected item to store
          store.dispatch('infrastructuraSanatate/selectItem', clickedItem);
          // set app right panel flag to true
          store.dispatch('app/updateRightPanel', true);
          // set app item selected flag to true
          store.dispatch('app/updateItemSelected', true);

          // move to item or center of bounding box
          if (clickedItem.geometry.type === 'Point') {
            // console.log('Geometry Type: ', e.features[0].geometry.type);
            map.flyTo({
              center: clickedItem.geometry.coordinates,
              zoom: 15,
            });
          } else if (clickedItem.geometry.type === 'LineString') {
            // console.log('Geometry Type: ', clickedItem.geometry.type);
            // Geographic coordinates for LineString
            const coordinates = clickedItem.geometry.coordinates;
            // Pass the first coordinates in the LineString to `lngLatBounds` &
            // wrap each coordinate pair in `extend` to include them in the bounds
            // result. A variation of this technique could be applied to zooming
            // to the bounds of multiple Points or Polygon geometries - it just
            // requires wrapping all the coordinates with the extend method.
            // console.log('coordinates: ', coordinates);
            const bounds = coordinates.reduce(function (bounds, coord) {
              return bounds.extend(coord);
            }, new Mapbox.LngLatBounds(coordinates[0], coordinates[0]));
            // map.fitBounds(bounds, {
            //   padding: 400
            // });
            map.flyTo({
              center: bounds.getCenter(),
              zoom: 15,
            });
          } else {
            // console.log('Geometry Type: ', clickedItem.geometry.type);
            // Geographic coordinates for MultiLineString or Polygon
            const coordinates = clickedItem.geometry.coordinates;
            // console.log('coordinates: ', coordinates);
            const bounds = coordinates[0].reduce(function (bounds, coord) {
              return bounds.extend(coord);
            }, new Mapbox.LngLatBounds(coordinates[0][0], coordinates[0][1]));
            map.flyTo({
              center: bounds.getCenter(),
              zoom: 15,
            });
          }
        } else {
          // set selected item to null
          store.dispatch('infrastructuraSanatate/selectItem', null);
          // set item selected flag to false
          store.dispatch('infrastructuraSanatate/updateItemSelected', false);
          // set app related flags to false
          store.dispatch('app/updateRightPanel', false);
          store.dispatch('app/updateItemSelected', false)
        }

      });
    },


    async onMapLoaded(event) {
      const map = event.map;
      // save map reference to store
      this.$store.dispatch('infrastructuraSanatate/saveMap', map);
      // add map data sources
      const unitsArr = await this.$store.state.infrastructuraSanatate.unitsArr;
      // console.log('unitsArr: ', unitsArr);
      await this.addMapSource('UNITATI', unitsArr);
      const servicesArr = await this.$store.state.infrastructuraSanatate.servicesArr;
      await this.addMapSource('SERVICII', servicesArr);
      // console.log('mapSource: ', map.getSource('UNITATI'));
      // add map layers
      // add layers for 'UNITATI'
      const unitatiLayers = this.$store.state.infrastructuraSanatate.itemGroups[0].layers;
      // console.log('unitatiLayers: ', unitatiLayers.layers);
      unitatiLayers.forEach((layer) => {
        this.addMapLayer(layer)
      });
      // add layers for 'SERVICII'
      const serviciiLayers = this.$store.state.infrastructuraSanatate.itemGroups[1].layers;
      // console.log('serviciiLayers: ', serviciiLayers.layers);
      serviciiLayers.forEach((layer) => {
        this.addMapLayer(layer)
      });

      this.addMapClickHandler();
      // this.addHoverLayer(map, this.layers.spatiiSuprafata, this.layers.spatiiSuprafataHover);


      // add click event handler
      // this.addMapClickHandler();

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

    // // @list select item
    // async selectItem(item) {
    //   // load map object
    //   const map = this.$store.state.infrastructuraSanatate.map;
    //   console.log('@list > selectItem >> item: ', item);
    //   // deselect previous selection
    //   const previousSelectedItem = this.$store.state.infrastructuraSanatate.selectedItem;
    //   // console.log('previousSelectedItem: ', previousSelectedItem);
    //   if(previousSelectedItem && item != previousSelectedItem) map.setFilter(`${previousSelectedItem.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], '']);
    //   // if nothing is selected
    //   if (!item) {
    //     // clear selection data
    //     this.$store.dispatch('app/updateItemSelected', false);
    //     this.$store.dispatch('app/updateRightPanel', false);
    //     this.$store.dispatch('infrastructuraSanatate/updateItemSelected', false);
    //     this.$store.dispatch('infrastructuraSanatate/selectItem', null);
    //
    //     // if selected
    //   } else {
    //     // highlight clicked item
    //     map.setFilter(`${item.layer.id}_HIGHLIGHT`, ['==', ['get', 'id'], item.properties.id]);
    //     this.$store.dispatch('app/updateRightPanel', true);
    //     this.$store.dispatch('app/updateItemSelected', true);
    //     console.log('@Map_mapbox > selectItem: ', item);
    //     // this.selectedItem = fullPolygon;
    //     // let coordinates;
    //     // if (fullPolygon.geometry.type === 'MultiPolygon') {
    //     //   coordinates = JSON.parse(
    //     //       JSON.stringify(fullPolygon.geometry.coordinates[0])
    //     //   );
    //     // } else if (fullPolygon.geometry.type === 'MultiLineString') {
    //     //   coordinates = JSON.parse(
    //     //       JSON.stringify(fullPolygon.geometry.coordinates)
    //     //   );
    //     // } else if (fullPolygon.geometry.type === 'Point') {
    //     //   coordinates = [
    //     //     [JSON.parse(JSON.stringify(fullPolygon.geometry.coordinates))],
    //     //   ];
    //     // }
    //
    //     // const coordinates = [
    //     //   [JSON.parse(JSON.stringify(item.geometry.coordinates))],
    //     // ];
    //
    //     // let point = coordinates[0].shift().slice(0, 2);
    //     // let bounds = new Mapbox.LngLatBounds(
    //     //     new Mapbox.LngLat(...point),
    //     //     new Mapbox.LngLat(...point)
    //     // );
    //     // while (coordinates[0].length) {
    //     //   point = coordinates[0].shift().slice(0, 2);
    //     //   bounds.extend(new Mapbox.LngLat(...point));
    //     // }
    //     //
    //     // map.fitBounds(bounds, {margin: 2, maxZoom: 15});
    //     // this.currentItem = {
    //     //   ...fullPolygon,
    //     // };
    //
    //     map.flyTo({
    //       center: item.geometry.coordinates,
    //       zoom: 15,
    //     });
    //
    //     this.$store.dispatch('infrastructuraSanatate/selectItem', item);
    //   }
    // },
  },
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
