const state = {
  isSignedIn: false,
};

const getters = {
};

const mutations = {
  SET_IS_SIGNED_IN (state, payload) {
    state.isSignedIn = payload.isSignedIn
  }
};

const actions = {
  async signin ({ commit, dispatch }) {
    await gapi.auth2.getAuthInstance().signIn().then(() => {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        dispatch('setIsSignedIn', true)
      }
    })
  },

  async signout ({ commit }) {
    await gapi.auth2.getAuthInstance().signOut()
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      dispatch('setIsSignedIn', false)
    }
  },

  setIsSignedIn ({ commit }, isSignedIn) {
    commit('SET_IS_SIGNED_IN', {
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