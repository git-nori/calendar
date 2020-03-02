const state = {
  isLoggedIn: false,
};

const getters = {
};

const mutations = {
  SET_IS_LOGGED_IN (state, payload) {
    state.isLoggedIn = payload.isLoggedIn
  }
};

const actions = {
  /**
   *  Sign in the user upon button click.
   */
  signin ({ commit, rootState }) {
    Promise.resolve(rootState.apiModule.api.auth2.getAuthInstance().signIn()).then(_ => {
      commit('SET_IS_LOGGED_IN', {
        isLoggedIn: true
      });
    });
  },

  /**
   *  Sign out the user upon button click.
   */
  signout ({ commit, rootState }) {
    Promise.resolve(rootState.apiModule.api.auth2.getAuthInstance().signOut()).then(_ => {
      commit('SET_IS_LOGGED_IN', {
        isLoggedIn: false
      });
    });
  },
  setAuth ({ commit }, isLoggedIn) {
    commit('SET_IS_LOGGED_IN', {
      isLoggedIn: isLoggedIn
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