import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import qiniu from './modules/qiniu'
import blog from './modules/blog'
import web from './modules/web'
import comment from './modules/comment'
import count from './modules/count'
import gist from './modules/gist'
import commits from './modules/commits'


import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    qiniu,
    blog,
    web,
    comment,
    count,
    gist,
    commits
  },
  getters
})

export default store
