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
  signin ({ commit }) {
    Promise.resolve(gapi.auth2.getAuthInstance().signIn()).then(_ => {
      // signIn処理実行後にloginステータスを変更する
      commit('SET_IS_LOGGED_IN', {
        isLoggedIn: true
      });
    });
  },

  signout ({ commit }) {
    Promise.resolve(gapi.auth2.getAuthInstance().signOut()).then(_ => {
      commit('SET_IS_LOGGED_IN', {
        isLoggedIn: false
      });
    });
  },

  setIsLoggedIn ({ commit }, isLoggedIn) {
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