import gcApi from '@/api/gcApi'

const state = {
  api: undefined,
};

const getters = {
};

const mutations = {
  SET_API (state) {
    state.api = gapi
  },
};

const actions = {
  setApi ({ commit }) {
    commit('SET_API')
  },
  /**
   *  On load, called to load the auth2 library and API client library.
   */
  load ({ state, dispatch }) {
    state.api.load("client:auth2", dispatch('initClient'));
  },

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient ({ state, dispatch }) {
    state.api.client
      .init({
        apiKey: gcApi.API_KEY,
        clientId: gcApi.CLIENT_ID,
        discoveryDocs: gcApi.DISCOVERY_DOCS,
        scope: gcApi.SCOPES
      })
      .then(_ => {
        // Listen for sign-in state changes.
        state.api.auth2.getAuthInstance().isSignedIn.listen(dispatch('authModule/setAuth', true, { root: true }));
      });
  }
};

const apiModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default apiModule;