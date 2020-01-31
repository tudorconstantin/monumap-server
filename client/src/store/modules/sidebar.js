const state = {
  isNavOpen: false,
  monumentShown: {
    images: [],
  },
};

const getters = {};

const actions = {
  async getMonumentImages({ commit }, monumentID) {
    // eslint-disable-next-line no-console
    console.log(`=======adding images to monument ${monumentID}`)
    commit('updateShownMonumentInfo', {images: [
      '/images/CJ-II-a-A-07240/DSC_3408.jpg',
      '/images/CJ-II-a-A-07240/DSC_3411.jpg',
      '/images/CJ-II-a-A-07240/DSC_3413.jpg',
      '/images/CJ-II-a-A-07240/DSC_3414.jpg',
    ]});
  }
};

const mutations = {
  setIsNavOpen(state, yesno) {
    state.isNavOpen = yesno;
  },
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  },
  closeNav(state) {
    state.isNavOpen = false;
    state.monumentShown = {};
  },
  openNav(state, monument ) {
    state.isNavOpen = true;
    state.monumentShown = monument;
  },
  updateShownMonumentInfo(state, extraInfo){
    state.monumentShown = { ...state.monumentShown, ...extraInfo};
  }

};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
