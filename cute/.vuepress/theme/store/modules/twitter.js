import {
    TwitterAdd,
    TwitterDelete,
    TwitterGet
} from "../../api/twitter";

let twitter = {
    state: {
        data: [],
        has_data: true,
        loading: false
    },

    mutations: {
        SET_TWITTER_DATA: (state, twitter_data) => {
            console.log("设置commits data ", twitter_data)
            if (twitter_data.length < 30) {
                state.has_data = false
            }
            twitter_data.forEach(d => {
                state.data.push(d)
            });
        },
        SET_TWITTER_LOADING: (state, loading) => {
            state.loading = loading
        }
    },

    actions: {
        GettwitterData({
            commit
        }, data) {
            commit('SET_TWITTER_LOADING', true)
            TwitterGet(data).then(response => {
                console.log(response)
                commit('SET_TWITTER_LOADING', false)
                if (response) {
                    if (response.Result == 10000){
                        if (response.Data.list.length > 0) {
                            commit('SET_TWITTER_DATA', response.Data.list)
                        }
                    }
                    
                } else {
                    console.info("获取不到心情呢~")
                }
            })
        }
    }
}

export default twitter