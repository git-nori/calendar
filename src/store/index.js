import Vue from "vue";
import Vuex from "vuex";
import authModule from '@/store/modules/auth'
import apiModule from '@/store/modules/api'
import calendarModule from '@/store/modules/calendar'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    apiModule,
    calendarModule
  }
});
