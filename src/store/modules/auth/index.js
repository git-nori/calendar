const state = {
  authorized: false,
};

const getters = {
};

const mutations = {
  SET_AUTHORIZED (state, payload) {
    state.authorized = payload.authorized
  }
};

const actions = {
  /**
   *  Sign in the user upon button click.
   */
  signin ({ commit, rootState }) {
    Promise.resolve(rootState.apiModule.api.auth2.getAuthInstance().signIn()).then(_ => {
      commit('SET_AUTHORIZED', {
        authorized: true
      });
    });
  },

  /**
   *  Sign out the user upon button click.
   */
  signout ({ commit, rootState }) {
    Promise.resolve(rootState.apiModule.api.auth2.getAuthInstance().signOut()).then(_ => {
      commit('SET_AUTHORIZED', {
        authorized: false
      });
    });
  },
  setAuth ({ commit }, authorized) {
    commit('SET_AUTHORIZED', {
      authorized: authorized
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