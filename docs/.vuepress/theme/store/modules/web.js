let web = {
  state: {
    web_data: {
      url: ""
    },
    is_twitter: false,
    is_mb: false,
    now_url: "",
    old_url: "",
    need_get_data: false
  },

  mutations: {
    SET_WEB_DATA: (state, web_data) => {
      console.log("设置web data ", web_data)
      state.web_data = web_data
    },
    SET_IS_TWITTER: (state, is_twitter) => {
      console.log("设置 is_twitter ", is_twitter)
      state.is_twitter = is_twitter
    },
    SET_IS_MB: (state, is_mb) => {
      console.log("设置 is_mb ", is_mb)
      state.is_mb = is_mb
    },
    NEDD_UPDATE: (state, url) => {
      state.old_url = state.now_url
      state.now_url = url
      state.need_get_data = state.now_url != state.old_url
      console.log("需要更新吗？-》", state.need_get_data, state.now_url, state.old_url)
      return state.need_get_data
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
    },
    SetIsMb({
      commit
    }, is_mb) {
      commit('SET_IS_MB', is_mb)
    },
    NeedUpdate({
      commit
    }, url) {
      commit('NEDD_UPDATE', url)
    }
  }
}

export default web