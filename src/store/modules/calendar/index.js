const state = {
  items: [],
  chartType: null
};

const getters = {
};

const mutations = {
  SET_ITEMS (state, payload) {
    console.log(payload)
    state.items = payload
  },
  SET_CHART_TYPE (state, payload) {
    console.log(payload)
    state.chartType = payload
  }
};

const actions = {
  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  getData ({ commit }, { timeMin }) {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: timeMin.toISOString(),
        timeMax: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        // maxResults: 1000,
        orderBy: "startTime"
      })
      .then(response => {
        commit('SET_ITEMS', response.result.items)
      });
  },
  setChartType ({ commit }, { chartType }) {
    commit('SET_CHART_TYPE', chartType)
  }
};

const calendarModule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default calendarModule;