let web = {
  state: {
    web_data: {
      url: ""
    }
  },

  mutations: {
    SET_WEB_DATA: (state, web_data) => {
      console.log("设置web data ", web_data)
      state.web_data = web_data
    }
  },

  actions: {
    SetWebData({
      commit
    }, web_data) {
      commit('SET_WEB_DATA', web_data)
    }
  }
}

export default web