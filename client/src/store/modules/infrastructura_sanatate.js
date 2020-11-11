// store >> infrastructura_sanatate.js

const circleRadius = 7;
const circleOpacity = 0.9;

const unitsCircleStrokeColor = '#b4b4b4';
const unitsCircleStrokeWidth = 3;

const servicesCircleStrokeColor = '#636363';
const servicesCircleStrokeWidth = 3;

const unitsColors = {
  'SPITAL': '#d32f2f',
  'DISPOZITIVE_MEDICALE': '#f5622e',
  'MEDIC_FAMILIE': '#faee0e',
  'MEDICINA_DENTARA': '#2ed706',
  'FARMACIE': '#016357',
};

const unitsInfoPanelColors = {
  'TOATE': 'grey-5',
  'SPITAL': 'red-8',
  'DISPOZITIVE_MEDICALE': 'orange-6',
  'MEDIC_FAMILIE': 'yellow-4',
  'MEDICINA_DENTARA': 'green-13',
  'FARMACIE': 'teal-5',
};

const servicesColors = {
  'IMAGISTICA_MEDICALA': '#07d3db',
  'AMBULANTA': '#0073ff',
  'REABILITARE_RECUPERARE': '#352dac',
  'AMBULATORIU_SPECIALITATE': '#6127cd',
  'INGRIJIRI_DOMICILIU': '#a201dc',
  'LABORATOR': '#ff5e9d',
};

const servicesInfoPanelColors = {
  'TOATE': 'grey-8',
  'IMAGISTICA_MEDICALA': 'cyan-4',
  'AMBULANTA': 'light-blue-8',
  'REABILITARE_RECUPERARE': 'indigo-6',
  'AMBULATORIU_SPECIALITATE': 'deep-purple-5',
  'INGRIJIRI_DOMICILIU': 'purple-5',
  'LABORATOR': 'red-4',
};

const hoverStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': 11,
    'circle-color': '#000000',
    'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.01, 0],
    'circle-stroke-color': '#fafafa',
    'circle-stroke-width': 3,
    'circle-stroke-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
  },
};

const highlightStyle = {
  shape: 'circle',
  paint: {
    'circle-radius': 11,
    'circle-color': '#000000',
    'circle-opacity': 0.01,
    'circle-stroke-color': '#faec01',
    'circle-stroke-width': 5,
    'circle-stroke-opacity': 1,
  },
  filter: ['==', ['get', 'id'], ''],
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  map: null,
  leftPanel: true,
  rightPanel: false,
  itemSelected: false,
  selectedItem: null,
  unitsArr: [],
  servicesArr: [],
  unitsInfoPanelColors,
  servicesInfoPanelColors,
  itemGroups: [
    {
      code: 'UNITATI',
      label: 'CNAS Unitati',
      data: null,
      checked: true,
      open: true,
      layers: [
        {
          id: 'SPITAL',
          name: 'Spital',
          sourceId: 'UNITATI',
          data: null,
          infoPanelColor: unitsInfoPanelColors['SPITAL'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': unitsColors['SPITAL'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': unitsCircleStrokeColor,
              'circle-stroke-width': unitsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'DISPOZITIVE_MEDICALE',
          name: 'Dispozitive medicale',
          sourceId: 'UNITATI',
          data: null,
          infoPanelColor: unitsInfoPanelColors['DISPOZITIVE_MEDICALE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': unitsColors['DISPOZITIVE_MEDICALE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': unitsCircleStrokeColor,
              'circle-stroke-width': unitsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'MEDIC_FAMILIE',
          name: 'Medic de familie',
          sourceId: 'UNITATI',
          data: null,
          infoPanelColor: unitsInfoPanelColors['MEDIC_FAMILIE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': unitsColors['MEDIC_FAMILIE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': unitsCircleStrokeColor,
              'circle-stroke-width': unitsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'MEDICINA_DENTARA',
          name: 'Medicina dentara',
          sourceId: 'UNITATI',
          data: null,
          infoPanelColor: unitsInfoPanelColors['MEDICINA_DENTARA'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': unitsColors['MEDICINA_DENTARA'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': unitsCircleStrokeColor,
              'circle-stroke-width': unitsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'FARMACIE',
          name: 'Farmacie',
          sourceId: 'UNITATI',
          data: null,
          infoPanelColor: unitsInfoPanelColors['FARMACIE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': unitsColors['FARMACIE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': unitsCircleStrokeColor,
              'circle-stroke-width': unitsCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
      ],

    },
    {
      code: 'SERVICII',
      label: 'CNAS Servicii',
      data: null,
      checked: true,
      open: true,
      // type: [
      //   {name: 'Servicii de imagistica medicala', color: 'blue'},
      //   {name: 'Servicii de ambulanta', color: 'blue'},
      //   {name: 'Reabilitare si recuperare medicala', color: 'blue'},
      //   {name: 'Ambulatoriu de specialitate', color: 'blue'},
      //   {name: 'Ingrijiri la domiciliu', color: 'blue'},
      //   {name: 'Laborator', color: 'blue'},
      // ],
      layers: [
        {
          id: 'IMAGISTICA_MEDICALA',
          name: 'Servicii de imagistica medicala',
          sourceId: 'SERVICII',
          data: null,
          infoPanelColor: servicesInfoPanelColors['IMAGISTICA_MEDICALA'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': servicesColors['IMAGISTICA_MEDICALA'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': servicesCircleStrokeColor,
              'circle-stroke-width': servicesCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'AMBULANTA',
          name: 'Servicii de ambulanta',
          sourceId: 'SERVICII',
          data: null,
          infoPanelColor: servicesInfoPanelColors['AMBULANTA'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': servicesColors['AMBULANTA'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': servicesCircleStrokeColor,
              'circle-stroke-width': servicesCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'REABILITARE_RECUPERARE',
          name: 'Reabilitare si recuperare medicala',
          sourceId: 'SERVICII',
          data: null,
          infoPanelColor: servicesInfoPanelColors['REABILITARE_RECUPERARE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': servicesColors['REABILITARE_RECUPERARE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': servicesCircleStrokeColor,
              'circle-stroke-width': servicesCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'AMBULATORIU_SPECIALITATE',
          name: 'Ambulatoriu de specialitate',
          sourceId: 'SERVICII',
          data: null,
          infoPanelColor: servicesInfoPanelColors['AMBULATORIU_SPECIALITATE'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': servicesColors['AMBULATORIU_SPECIALITATE'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': servicesCircleStrokeColor,
              'circle-stroke-width': servicesCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'INGRIJIRI_DOMICILIU',
          name: 'Ingrijiri la domiciliu',
          sourceId: 'SERVICII',
          data: null,
          infoPanelColor: servicesInfoPanelColors['INGRIJIRI_DOMICILIU'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': servicesColors['INGRIJIRI_DOMICILIU'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': servicesCircleStrokeColor,
              'circle-stroke-width': servicesCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
        {
          id: 'LABORATOR',
          name: 'Laborator',
          sourceId: 'SERVICII',
          data: null,
          infoPanelColor: servicesInfoPanelColors['LABORATOR'],
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': circleRadius,
              'circle-color': servicesColors['LABORATOR'],
              'circle-opacity': circleOpacity,
              'circle-stroke-color': servicesCircleStrokeColor,
              'circle-stroke-width': servicesCircleStrokeWidth,
            },
          },
          hover: hoverStyle,
          highlight: highlightStyle,
        },
      ],
    },
  ],
  filtruUnitatiToate: true,
  filtruUnitati: [
    'SPITAL',
    'DISPOZITIVE_MEDICALE',
    'MEDIC_FAMILIE',
    'MEDICINA_DENTARA',
    'FARMACIE',
  ],
  filtruUnitatiReset: [
    'SPITAL',
    'DISPOZITIVE_MEDICALE',
    'MEDIC_FAMILIE',
    'MEDICINA_DENTARA',
    'FARMACIE',
  ],
  filtruServiciiToate: true,
  filtruServicii: [
    'IMAGISTICA_MEDICALA',
    'AMBULANTA',
    'REABILITARE_RECUPERARE',
    'AMBULATORIU_SPECIALITATE',
    'INGRIJIRI_DOMICILIU',
    'LABORATOR',
  ],
  filtruServiciiReset: [
    'IMAGISTICA_MEDICALA',
    'AMBULANTA',
    'REABILITARE_RECUPERARE',
    'AMBULATORIU_SPECIALITATE',
    'INGRIJIRI_DOMICILIU',
    'LABORATOR',
  ],
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {

  getAllLayersIds() {
    return state.itemGroups.map(group => group.layers.map(layer => layer.id)).flat();
  },

  filteredUnits(state) {
    const units = { ...state.itemGroups[0] };
    units.layers = units.layers.filter(layer => state.filtruUnitati.includes(layer.id));
    return units;
  },

  filteredServices(state) {
    const services = { ...state.itemGroups[1] };
    services.layers = services.layers.filter(layer => state.filtruServicii.includes(layer.id));
    return services;
  },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

const actions = {

  async loadAllData({commit}) {
    const [
      units,
      services,
    ] = await Promise.all([
      fetch('/geojson/infrastructura_sanatate/cnas_unitati.geojson').then((r) => r.json()),
      fetch('/geojson/infrastructura_sanatate/cnas_servicii.geojson').then((r) => r.json()),
    ]);
    commit("setAllData", {units, services});
  },

  saveMap({commit}, value) {
    commit('setMap', value);
  },

  updateUnitsFilterToate({commit}, value) {
    commit('setUnitsFilterToate', value);
  },

  updateUnitsFilter({commit}, value) {
    commit('setUnitsFilter', value);
  },

  updateServicesFilterToate({commit}, value) {
    commit('setServicesFilterToate', value);
  },

  updateServicesFilter({commit}, value) {
    commit('setServicesFilter', value);
  },

  async selectItem({commit}, value) {
    // if null value
    if (!value) {
      commit("setSelectedItem", undefined);
      commit('setItemSelected', false);
      commit("setRightPanel", false);
    } else {
      commit('setSelectedItem', value);
      commit('setItemSelected', true);
      commit('setRightPanel', true);
    }
  },

  updateLeftPanel({commit}, value) {
    commit('setLeftPanel', value);
  },

  updateRightPanel({commit}, value) {
    commit('setRightPanel', value);
  },

  toggleLeftPanel({commit, state}) {
    commit('setLeftPanel', !state.leftPanel);
  },

  toggleRightPanel({commit, state}) {
    commit('setRightPanel', !state.rightPanel);
  },

  updateItemSelected({commit}, value) {
    commit('setItemSelected', value);
  },

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUTATIONS

const mutations = {

  setAllData(state, {units, services}) {
    // set units
    state.unitsArr = units;
    // console.log('@store > setAllData >> units: ', units);
    state.itemGroups[0].data = units;
    state.itemGroups[0].layers.forEach((layer) => {
      const features = units.features.filter((i) => i.properties.tip_unit === layer.name);
      layer.data = features.map((feature) => {
        const newFeature = feature;
        newFeature.layer = {id: layer.id};
        return newFeature;
      });
    });
    // set services
    state.servicesArr = services;
    // console.log('@store > setAllData >> services: ', services);
    state.itemGroups[1].data = services;
    state.itemGroups[1].layers.forEach((layer) => {
      const features = services.features.filter((i) => i.properties.tip_serv === layer.name);
      layer.data = features.map((feature) => {
        const newFeature = feature;
        newFeature.layer = {id: layer.id};
        return newFeature;
      });
    });
  },

  setMap(state, value) {
    state.map = value;
  },

  setUnitsFilterToate(state, value) {
    // set checkbox 'TOATE'
    state.filtruUnitatiToate = value;

    // if set to true
    if(value) {
      // show all map layers
      state.filtruUnitatiReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });
      // reset checkboxes values
      state.filtruUnitati = state.filtruUnitatiReset.slice();

      // else, if set to false
    } else {
      // hide all map layers
      state.filtruUnitatiReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'none');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
      });
      // set all checkboxes to false
      state.filtruUnitati = [];
    }
  },

  setUnitsFilter(state, value) {
    // update checkboxes value
    state.filtruUnitati = value;

    // if all checkboxes are selected
    if(value.length === state.filtruUnitatiReset.length) {
      // set checkbox 'TOATE' to true
      state.filtruUnitatiToate = true;
      // show all map layers
      state.filtruUnitatiReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });

      // if some checkboxes are de-selected
    } else {
      // set 'TOATE' filter to false
      state.filtruUnitatiToate = false;
      // for each checkbox
      state.filtruUnitatiReset.forEach((layerId) => {
        // if checkbox list includes layerId, show layer
        if(state.filtruUnitati.includes(layerId)) {
          state.map.setLayoutProperty(layerId, 'visibility', 'visible');
          state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
          state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
          // else, if checkbox does not include layerId, hide layer
        } else {
          state.map.setLayoutProperty(layerId, 'visibility', 'none');
          state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
          state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
        }
      });
    }
  },

  setServicesFilterToate(state, value) {
    // set checkbox 'TOATE'
    state.filtruServiciiToate = value;

    // if set to true
    if(value) {
      // show all map layers
      state.filtruServiciiReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });
      // reset checkboxes values
      state.filtruServicii = state.filtruServiciiReset.slice();

      // else, if set to false
    } else {
      // hide all map layers
      state.filtruServiciiReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'none');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
      });
      // set all checkboxes to false
      state.filtruServicii = [];
    }
  },

  setServicesFilter(state, value) {
    // update checkboxes value
    state.filtruServicii = value;

    // if all checkboxes are selected
    if(value.length === state.filtruServiciiReset.length) {
      // set checkbox 'TOATE' to true
      state.filtruServiciiToate = true;
      // show all map layers
      state.filtruServiciiReset.forEach((layerId) => {
        state.map.setLayoutProperty(layerId, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
        state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
      });

      // if some checkboxes are de-selected
    } else {
      // set 'TOATE' filter to false
      state.filtruServiciiToate = false;
      // for each checkbox
      state.filtruServiciiReset.forEach((layerId) => {
        // if checkbox list includes layerId, show layer
        if(state.filtruServicii.includes(layerId)) {
          state.map.setLayoutProperty(layerId, 'visibility', 'visible');
          state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'visible');
          state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'visible');
          // else, if checkbox does not include layerId, hide layer
        } else {
          state.map.setLayoutProperty(layerId, 'visibility', 'none');
          state.map.setLayoutProperty(`${layerId}_HOVER`, 'visibility', 'none');
          state.map.setLayoutProperty(`${layerId}_HIGHLIGHT`, 'visibility', 'none');
        }
      });
    }
  },

  setSelectedItem(state, value) {
    state.selectedItem = value;
  },

  setLeftPanel(state, value) {
    state.leftPanel = value;
  },

  setRightPanel(state, value) {
    state.rightPanel = value;
  },

  setItemSelected(state, value) {
    state.itemSelected = value;
  },

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPORT

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
