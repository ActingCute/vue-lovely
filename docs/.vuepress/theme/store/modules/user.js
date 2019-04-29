let user = {
  state: {
    user_data: {
      uid: "",
      name: "",
      email: "",
      website: ""
    }
  },

  mutations: {
    SET_USER_DATA: (state, user_data) => {
      console.log("设置user data ", user_data)
      state.user_data = user_data
    }
  },

  actions: {
    SetUserData({
      commit
    }, user_data) {
      commit('SET_USER_DATA', user_data)
    }
  }
}

export default user