import Vue from "vue";
import Vuex from "vuex";
import authModule from '@/store/modules/auth'
import calendarModule from '@/store/modules/calendar'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    calendarModule
  }
});
