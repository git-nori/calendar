const state = {
  items: [],
  chartType: null
};

const getters = {
  // チャートテーブル表示用データを返す
  getChartTableData: state => state.items,
  // チャート表示用データを返す
  getChartData: state => {
    // observerにならないようstateからデータを取得
    let data = JSON.parse(JSON.stringify(state.items))

    // 日時が設定されているデータのみを抽出
    data = data.filter(e => {
      const startTime = new Date(e.start)
      const endTime = new Date(e.end)
      return startTime.toString() !== 'Invalid Date' && endTime.toString() !== 'Invalid Date'
    })

    // summary: hoursとなるオブジェクトを返却
    return data.reduce((obj, e) => {
      const summary = e.summary
      const startTime = new Date(e.start)
      const endTime = new Date(e.end)
      const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
      obj[summary] = obj.summary === summary ? obj[summary] + hours : hours
      return obj
    }, {})
  }
};

const mutations = {
  SET_ITEMS (state, payload) {
    // googleCalendarのデータからイベント名, 開始日時, 終了日時を抽出
    console.log(payload)
    payload.map(e => {
      let obj = {}
      obj.summary = e.summary
      obj.start = e.start.dateTime
      obj.end = e.end.dateTime
      state.items.push(obj)
    })
  },
  SET_CHART_TYPE (state, payload) {
    state.chartType = payload
  }
};

const actions = {
  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  getData ({ state, commit }, { timeMin }) {
    state.items = [] // itemsの中身を初期化
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