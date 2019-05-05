let web = {
  state: {
    web_data: {
      url: ""
    },
    is_twitter: false
  },

  mutations: {
    SET_WEB_DATA: (state, web_data) => {
      console.log("设置web data ", web_data)
      state.web_data = web_data
    },
    SET_IS_TWITTER: (state, is_twitter) => {
      console.log("设置 is_twitter ", is_twitter)
      state.is_twitter = is_twitter
    }
  },

  actions: {
    SetWebData({
      commit
    }, web_data) {
      commit('SET_WEB_DATA', web_data)
    },
    SetIsTwitter({
      commit
    }, is_twitter) {
      commit('SET_IS_TWITTER', is_twitter)
    }
  }
}

export default web