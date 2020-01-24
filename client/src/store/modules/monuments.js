const state = {
  items: []
};

const getters = {};

const actions = {
  async getAllMonuments({ commit }) {
    const res = await fetch(
      "/api/monuments/"
      // {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   }
      // }
    );
    console.log(`got'em monuments`, res);
    commit("setMonuments", res);
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
