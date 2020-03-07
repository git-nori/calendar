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
    await gapi.auth2.getAuthInstance().signIn()
    dispatch('setIsSignedIn', gapi.auth2.getAuthInstance().isSignedIn.get())
  },

  async signout ({ commit, dispatch }) {
    await gapi.auth2.getAuthInstance().signOut()
    dispatch('setIsSignedIn', gapi.auth2.getAuthInstance().isSignedIn.get())
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