const state = {
  isSignedIn: false,
};

const getters = {
};

const mutations = {
  SET_IS_LOGGED_IN (state, payload) {
    state.isSignedIn = payload.isSignedIn
  }
};

const actions = {
  async signin ({ commit }) {
    await gapi.auth2.getAuthInstance().signIn()
  },

  signout ({ commit }) {
    Promise.resolve(gapi.auth2.getAuthInstance().signOut()).then(_ => {
      commit('SET_IS_LOGGED_IN', {
        isSignedIn: false
      });
    });
  },

  setIsSignedIn ({ commit }, isSignedIn) {
    commit('SET_IS_LOGGED_IN', {
      isSignedIn: isSignedIn
    })
  }
};

const authModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default authModule;