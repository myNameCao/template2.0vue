import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loading: false //  全局loading
  },
  mutations: {
    setLoading(state, bol) {
      state.loading = bol
    }
  },
  actions: {},
  modules: {}
})
