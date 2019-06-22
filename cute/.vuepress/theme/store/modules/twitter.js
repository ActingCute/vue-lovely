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
            //console.log("设置commits data ", commits_data)
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
                commit('SET_TWITTER_LOADING', false)
                if (response) {
                    if (response.length > 0) {
                        commit('SET_TWITTER_DATA', response)
                    }
                } else {
                    console.info("获取不到心情呢~")
                }
            })
        }
    }
}

export default twitter