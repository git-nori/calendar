const state = {
  items: [],
};

const getters = {
};

const mutations = {
  SET_ITEMS (state, payload) {
    console.log(payload)
    state.items = payload
  }
};

const actions = {
  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  getData ({ commit, rootState }) {
    const api = rootState.apiModule.api
    api.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime"
      })
      .then(response => {
        commit('SET_ITEMS', response.result.items)
      });
  },
};

const calendarModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default calendarModule;