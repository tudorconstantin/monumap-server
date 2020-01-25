const state = {
  items: []
};

const getters = {};

const actions = {
  async getAllMonuments({ commit }) {
    const res = await fetch("/api/monuments/");
    const monuments = await res.json();
    commit("setMonuments", monuments);
  }
};

const mutations = {
  setMonuments(state, monuments) {
    state.items = monuments;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
