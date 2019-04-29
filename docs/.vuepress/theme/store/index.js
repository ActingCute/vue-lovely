import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import qiniu from './modules/qiniu'
import blog from './modules/blog'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    qiniu,
    blog
  },
  getters
})

export default store
