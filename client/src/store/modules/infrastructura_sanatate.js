// store >> infrastructura_sanatate.js

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
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#ff0000',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'DISPOZITIVE_MEDICALE',
          name: 'Dispozitive medicale',
          sourceId: 'UNITATI',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#ffc900',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'MEDIC_FAMILIE',
          name: 'Medic de familie',
          sourceId: 'UNITATI',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#0089ff',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'MEDICINA_DENTARA',
          name: 'Medicina dentara',
          sourceId: 'UNITATI',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#29ad04',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'FARMACIE',
          name: 'Farmacie',
          sourceId: 'UNITATI',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#3b238e',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
      ],
      // hoverLayer: {
      //   id: 'UNITS_HOVER',
      //   name: 'Hover',
      //   sourceId: 'UNITATI',
      //   geometry: 'Point',
      //   render: {
      //     shape: 'circle',
      //     paint: {
      //       'circle-radius': 10,
      //       'circle-color': '#5ead04',
      //       'circle-opacity': [
      //         'case',
      //         ['boolean', ['feature-state', 'hover'], false],
      //         0.01,
      //         0
      //       ],
      //       'circle-stroke-color': '#faf302',
      //       'circle-stroke-width': 3,
      //       'circle-stroke-opacity': [
      //         'case',
      //         ['boolean', ['feature-state', 'hover'], false],
      //         1,
      //         0
      //       ],
      //     },
      //   },
      // },
      // highlightLayer: {
      //   id: 'UNITS_HIGHLIGHT',
      //   name: 'Highlight',
      //   sourceId: 'UNITATI',
      //   geometry: 'Point',
      //   render: {
      //     shape: 'circle',
      //     paint: {
      //       'circle-radius': 11,
      //       'circle-color': '#5ead04',
      //       'circle-opacity': 0.01,
      //       'circle-stroke-color': '#fa0202',
      //       'circle-stroke-width': 5,
      //       'circle-stroke-opacity': 1,
      //     },
      //     filter: ['==', ['get', 'id'], ''],
      //   },
      // },
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
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#ff0000',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'AMBULANTA',
          name: 'Servicii de ambulanta',
          sourceId: 'SERVICII',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#ffc900',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'REABILITARE_RECUPERARE',
          name: 'Reabilitare si recuperare medicala',
          sourceId: 'SERVICII',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#0089ff',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'AMBULATORIU_SPECIALITATE',
          name: 'Ambulatoriu de specialitate',
          sourceId: 'SERVICII',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#29ad04',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'INGRIJIRI_DOMICILIU',
          name: 'Ingrijiri la domiciliu',
          sourceId: 'SERVICII',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#3b238e',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
        {
          id: 'LABORATOR',
          name: 'Laborator',
          sourceId: 'SERVICII',
          data: null,
          geometry: 'Point',
          render: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#3b238e',
              'circle-opacity': 0.5,
              'circle-stroke-color': '#925959',
              'circle-stroke-width': 3,
            },
          },
          hover: {
            shape: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#5ead04',
              'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.01,
                0
              ],
              'circle-stroke-color': '#faf302',
              'circle-stroke-width': 3,
              'circle-stroke-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
              ],
            },
          },
          highlight: {
            shape: 'circle',
            paint: {
              'circle-radius': 11,
              'circle-color': '#5ead04',
              'circle-opacity': 0.01,
              'circle-stroke-color': '#fa0202',
              'circle-stroke-width': 5,
              'circle-stroke-opacity': 1,
            },
            filter: ['==', ['get', 'id'], ''],
          },
        },
      ],
    },
  ],
  filtruUnitatiAll: true,
  filtruUnitati: [
    'SPITAL',
    'DISPOZITIVE_MEDICALE',
    'MEDIC_FAMILIE',
    'MEDICINA_DENTARA',
    'FARMACIE',
  ],
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {

  getUnitsAll() {
    return state.unitsArr;
  },

  getUnitsHospital() {
    return state.unitsArr;
  },

  getAllLayersIds() {
    return state.itemGroups.map(group => group.layers.map(layer => layer.id)).flat();
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

  // updateUnits({commit}, value) {
  //   commit('setUnits', value);
  // },
  //
  // updateServices({commit}, value) {
  //   commit('setServices', value);
  // },

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
    console.log('@store > setAllData >> units: ', units);
    state.itemGroups[0].data = units;
    state.itemGroups[0].layers.forEach((layer) => {
      const features = units.features.filter((i) => i.properties.tip_unit === layer.name);
      layer.data = features.map((feature) => {
        const newFeature = feature;
        newFeature.layer = { id: layer.id };
        return newFeature;
      });
    });
    // set services
    state.servicesArr = services;
    console.log('@store > setAllData >> services: ', services);
    state.itemGroups[1].data = services;
    state.itemGroups[1].layers.forEach((layer) => {
      const features = units.features.filter((i) => i.properties.tip_serv === layer.name);
      layer.data = features.map((feature) => {
        const newFeature = feature;
        newFeature.layer = { id: layer.id };
        return newFeature;
      });
    });
  },

  setMap(state, value) {
    state.map = value;
  },

  // setUnits(state, value) {
  //   state.unitsArr = value;
  //   state.itemGroups[0].data = value;
  //   state.itemGroups[0].layers.forEach((layer) => {
  //     layer.data = value.features.filter((i) => i.properties.source === layer.name);
  //   });
  // },
  //
  // setServices(state, value) {
  //   state.servicesArr = value;
  //   state.itemGroups[1].data = value;
  //   state.itemGroups[1].layers.forEach((layer) => {
  //     layer.data = value.features.filter((i) => i.properties.source === layer.name);
  //   });
  // },

  setSelectedItem(state, value) {
    state.selectedItem = value;
    // if(value) {
    //   const details = state.metodologie.filter(item => item.id === value.layer.source)[0];
    //   state.selectedItem.definition = details.definition;
    //   state.selectedItem.methodology = details.methodology;
    //   state.selectedItem.date = details.date;
    // }
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
