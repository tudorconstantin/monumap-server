// import _ from 'lodash';
import constants from '../../util/constants.js';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STATE

const state = {
  loading: true,
  items: [],
  geoJSON: {},
  filtruTipPatrimoniu: '',
  filtruValoareMon: '',
  filtruScaraMon: '',

  selectedItem: null,
  // monumentDisplayed: false,
  filterText: '',
  albumPhotoGalleryDialog: false,
  albumSectionsDialog: false,
  albumDatesDialog: false,
  leftPanel: true,
  rightPanel: false,
  currentTab: 'lmi-2015',
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GETTERS

const getters = {

  getMapHeight() {
    return this.$q.platform.is.desktop ? document.getElementById('map-enclosure').offsetHeight : document.getElementById('map-enclosure-mobile').offsetHeight;
  },

  getSelectedItem() {
    return state.selectedItem;
  },

  filteredArray: (state) => {
    // if array has no items, return empty array
    if (!state.geoJSON.features) return [];
    // if no filters are applied, return all items
    if (!(state.filterText || state.filtruTipPatrimoniu || state.filtruValoareMon || state.filtruScaraMon)) return state.geoJSON.features;
    // filter items
    let filteredItems = [...state.geoJSON.features];
    // console.log('filteredItems', filteredItems);
    if (state.filtruTipPatrimoniu) {
      filteredItems = filteredItems.filter(i => i.properties.icon_code === state.filtruTipPatrimoniu);
    }
    if (state.filtruValoareMon) {
      filteredItems = filteredItems.filter(i => i.properties.cod_lmi_val === state.filtruValoareMon);
    }
    if (state.filtruScaraMon) {
      filteredItems = filteredItems.filter(i => i.properties.cod_lmi_grupa === state.filtruScaraMon);
    }

    const needle = state.filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // return array filtered by the search bar, searching without diacritics
    return filteredItems.filter(m => {
        for (const field of constants.searchableFields) {
          if (m.properties[field] && m.properties[field].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(needle))
            return true;
        }
        return false;
      }
    );
  },

  filteredGeoJSON: (state, getters) => {
    const res = {
      type: state.geoJSON.type,
      features: [],
    };
    if (!getters.filteredArray) {
      return res;
    }
    if (!state.geoJSON.features) {
      return res;
    }

    let filteredItems = [...getters.filteredArray];

    if (state.filtruTipPatrimoniu) {
      filteredItems = filteredItems.filter(i => i.properties.icon_code === state.filtruTipPatrimoniu);
    }
    if (state.filtruValoareMon) {
      filteredItems = filteredItems.filter(i => i.properties.cod_lmi_val === state.filtruValoareMon);
    }
    if (state.filtruScaraMon) {
      filteredItems = filteredItems.filter(i => i.properties.cod_lmi_scara === state.filtruScaraMon);
    }

    const filteredMonuments = filteredItems.map(m => m.properties.cod_lmi);

    res.features = state.geoJSON.features.filter(feature => filteredMonuments.indexOf(feature.properties.cod_lmi) > -1);

    return res;
  },

  getSelectedItemPhotoAlbums() {
    return state.selectedItem ? state.selectedItem.photoAlbums : [];
  },

  getSelectedPhotoDate() {
    // return '2019-10-29';
    if (state.selectedItem && state.selectedItem.albumDate) {
      // console.log('@store.monuments :: @getSelectedPhotoDate >> date = ', state.selectedItem.albumDate);
      return state.selectedItem.albumDate;
    } else {
      return '';
    }
  },

  getSelectedDatePhotoAlbum(state) {
    // console.log('@store.monuments :: @getSelectedDatePhotoAlbum >> selected date: ', state.selectedItem.albumDate);
    return {
      date: state.selectedItem.albumDate,
      album: state.selectedItem.photoAlbums.filter(item => item.properties.date === state.selectedItem.albumDate)[0],
    };

  },

  getSelectedPhotoAlbum() {
    const selectedDate = state.selectedItem.albumDate;
    const selectedSectionIndex = state.selectedItem.albumSectionIndex;
    const selectedDateArray = state.selectedItem.photoAlbums.filter(item => item.properties.date === selectedDate)[0];
    const selectedSection = selectedDateArray.sections[selectedSectionIndex];

    // console.log('@store.monuments :: @getSelectedPhotoAlbum: ', selectedSection);
    return selectedSection;
  },

  // getLeftPanel: (state) => {
  //   return state.leftPanel;
  // },
  //
  // getRightPanel: (state) => {
  //   return state.rightPanel;
  // },
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACTIONS

const actions = {

  // async getAllMonuments({commit}) {
  //
  //     const geojson = await fetch("/api/monuments.geojson");
  //     const geojsonMonuments = await geojson.json();
  //     commit("setGeoJSON", geojsonMonuments);
  //     commit("setMonuments", geojsonMonuments.features.map(m => m.properties));
  // },

  async loadAllData({commit}) {
    const geojsonMonuments = await fetch('/geojson/lmi2015/lmi-2015_bucuresti.geojson')
      .then((r) => r.json());
    geojsonMonuments.features
      .forEach(m => m.properties.icon_code = m.properties.tip_patrimoniu.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace('PATRIMONIU ', '').replace(/\s+/g, '_'));
    commit("setGeoJSON", geojsonMonuments);
    commit("setMonuments", geojsonMonuments.features.map(m => m.properties));
  },

  saveMap({commit}, value) {
    commit('setMap', value);
  },

  updateLoading({commit}, value) {
    // console.log('@store > loading: ', value);
    commit('setLoading', value);
  },

  async selectItem({commit, dispatch}, {monument, desktopFlag}) {
    // console.log('@store > monument: ', monument);
    // if null value
    if (!monument) {
      commit("setSelectedItem", undefined);
      // commit("setMonumentDisplay", false);
      commit("setRightPanel", false);
      dispatch('app/updateRightPanel', false, {root: true});
      dispatch('app/updateItemSelected', false, {root: true});

      // else, if valid item is selected
    } else {
      dispatch('app/updateRightPanel', true, {root: true});
      dispatch('app/updateItemSelected', true, {root: true});
      // get all monument data
      // const fullMonument = state.geoJSON.features.find(
      //     m => m['properties']["cod_lmi"] === codLmi
      // )['properties'];

      // console.log('@store > monProp: ', monument.properties);
      const monProp = monument.properties;

      // request image list
      const srvImgArrPath = `${monProp['SIRUTA_judet']}_${monProp['judet']}/${monProp['SIRUTA_UAT']}_${monProp['UAT']}/${monProp['SIRUTA']}_${monProp['localitate'].replace(' ', '-')}/${monProp['cod_lmi']}`;
      const imgArrReqPath = `/api/monument.images?monumentPath=${srvImgArrPath}`;
      const imgRes = await fetch(imgArrReqPath);
      const imgArr = await imgRes.json();

      // request photo albums
      const photoAlbumsReqPath = `/api/monument.photoalbums?monumentPath=${srvImgArrPath}`;
      const albRes = await fetch(photoAlbumsReqPath);
      const photoAlbumsArr = await albRes.json();

      // save full path images to array
      const fullPathImageArray = imgArr.map(photoName => `/images/${srvImgArrPath}/${encodeURIComponent(photoName)}`);

      // save full path photo albums
      const fullPathPhotoAlbums = photoAlbumsArr.map((album) => {
        return {
          date: album.date,
          sections: album.sections.map((photoName) => {
            return {
              title: photoName.title,
              images: photoName.images.map(item => `/images/${srvImgArrPath}/${encodeURIComponent(item)}`),
              thumbnails: photoName.images.map(item => `/images/${srvImgArrPath}/${encodeURIComponent(item.replace('.jpg', '_thumb.jpg'))}`),
            };
          }),
          photoCount: album.sections.reduce((acc, section) => acc + section.images.length, 0)
        };
      });

      // creat images properties
      monProp.images = fullPathImageArray;
      monProp.photoAlbums = fullPathPhotoAlbums;
      monProp.albumDate = fullPathPhotoAlbums[0] ? fullPathPhotoAlbums[0].date : '';
      monProp.albumSectionIndex = 0;

      // commit new item
      commit("setSelectedItem", monProp);
      // show right panel
      if (desktopFlag) commit('setRightPanel', true);
    }
  },

  setFilterText({commit}, text) {
    commit('setFilterText', text);
  },

  setFiltruTipPatrimoniu({commit, state, dispatch}, val) {
    if (val && state.selectedItem && state.selectedItem.icon_code !== val) {
      dispatch('selectItem', null);
    }
    commit('setFiltruTipPatrimoniu', val);
  },

  setFiltruValoareMon({commit, state, dispatch}, val) {
    if (val && state.selectedItem && state.selectedItem.cod_lmi_val !== val) {
      dispatch('selectItem', null);
    }
    commit('setFiltruValoareMon', val);
  },

  setFiltruScaraMon({commit, state, dispatch}, val) {
    if (val && state.selectedItem && state.selectedItem.cod_lmi_scara !== val) {
      dispatch('selectItem', null);
    }
    commit('setFiltruScaraMon', val);
  },

  toggleAlbumDatesDialog({commit, state}) {
    commit('setAlbumDatesDialog', state);
  },

  setAlbumSelectedDate({commit}, value) {
    // console.log('@store.monuments :: @setAlbumSelectedDate >> new date value:', value);
    commit('setAlbumDate', value);
  },

  toggleAlbumSectionsDialog({commit}) {
    // console.log('@store.monuments :: @toggleAlbumSectionsDialog');
    commit('setAlbumSectionsDialog');
  },

  setAlbumSelectedSection({commit}, value) {
    // console.log('@store.monuments :: @setAlbumSelectedSection >> new section value:', value);
    commit('setAlbumSection', value);
  },

  toggleAlbumPhotoGalleryDialog({commit}) {
    // console.log('@store.monuments :: @toggleAlbumPhotoGalleryDialog');
    commit('setAlbumPhotoGalleryDialog', state);
  },

  updateCurrentTab({commit, state}, value) {
    // console.log(value);
    commit('setCurrentTab', state, value);
  },

  clearSelection({commit}) {
    // console.log('@store>action: clearSelectedItem');
    commit('setSelectedItem', null);
  },

  updateLeftPanel({commit}, value) {
    // console.log('store: setLeftPanel: ', value);
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

  /* eslint-disable no-unused-vars*/
  mapViewChanged({commit, state}) {
    return;
    // (?)TODO: filter the available markers based on the displayed area
    // commit('setMonuments', state.geoJSON.features.map(i => i.properties));
    // const items = this.map.queryRenderedFeatures();
    // commit('setMonuments', items.map(i => i.properties));
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUTATIONS

const mutations = {

  setMonuments(state, monuments) {
    state.items = monuments;
  },

  setLoading(state, value) {
    state.loading = value;
  },

  setGeoJSON(state, monuments) {
    state.geoJSON = monuments;
  },

  setMap(state, value) {
    state.map = value;
  },

  setSelectedItem(state, value) {
    state.selectedItem = value;
  },

  setMonumentDisplay(state, v) {
    state.monumentDisplayed = v;
    // state.selectedItem = '';
  },

  setFilterText(state, v) {
    state.filterText = v;
  },

  setFiltruTipPatrimoniu(state, v) {
    state.filtruTipPatrimoniu = v;
  },

  setFiltruValoareMon(state, v) {
    state.filtruValoareMon = v;
  },

  setFiltruScaraMon(state, v) {
    state.filtruScaraMon = v;
  },

  setAlbumDatesDialog(state) {
    state.albumDatesDialog = !state.albumDatesDialog;
  },

  setAlbumDate(state, value = '') {
    if (value) state.selectedItem.albumDate = value;
  },

  setAlbumSectionsDialog(state) {
    state.albumSectionsDialog = !state.albumSectionsDialog;
  },

  setAlbumSection(state, value = 0) {
    state.selectedItem.albumSectionIndex = value;
  },

  setAlbumPhotoGalleryDialog(state) {
    state.albumPhotoGalleryDialog = !state.albumPhotoGalleryDialog;
    // state.albumDatesDialog = !state.albumDatesDialog;
  },

  setCurrentTab(state, value) {
    state.currentTab = value;
  },

  setLeftPanel(state, value) {
    state.leftPanel = value;
  },

  setRightPanel(state, value) {
    state.rightPanel = value;
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
