import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const KEY = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(KEY, data)
    }
  },
  actions: {},
  modules: {}
})
