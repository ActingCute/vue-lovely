let qiniu = {
    state: {
      qiniu_data: {
        in_upload: false,//处于上传图片阶段
        domain: ""
      }
    },
  
    mutations: {
      SET_QINIU_DATA: (state, qiniu_data) => {
        //console.log("设置qiniu data ", qiniu_data)
        state.qiniu_data = qiniu_data
      }
    },

    actions: {
      SetQiNiuData({
        commit
      }, qiniu_data) {
        commit('SET_QINIU_DATA', qiniu_data)
      }
    }
  }
  
  export default qiniu