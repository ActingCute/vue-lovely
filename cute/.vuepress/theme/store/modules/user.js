let user = {
  state: {
    user_data: {
      uid: "",
      name: "",
      email: "",
      website: ""
    },
    is_login:false
  },

  mutations: {
    SET_USER_DATA: (state, user_data) => {
      console.log("设置user data ", user_data)
      state.user_data = user_data
    },
    SET_USER_LOGIN_DATA: (state, is_login) => {
      console.log("设置user login data ", is_login)
      state.is_login = is_login
    }
  },

  actions: {
    SetUserData({
      commit
    }, user_data) {
      commit('SET_USER_DATA', user_data)
    },
    SetLoginData({
      commit
    }, is_login) {
      commit('SET_USER_LOGIN_DATA', is_login)
    }
  }
}

export default user