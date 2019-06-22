import {
    GistGetToken,
    GistCreated,
    GistGetData
} from '../../api/gist'

let gist = {
    state: {
        gist_data: {
            token: "",
            twitter: []
        }
    },

    mutations: {
        SET_GIST_TWITTER_DATA: (state, gist_twitter_data) => {
            GistGetData().then(r => {
                //console.log(r)
                if (r.files) {
                    if (r.files["lovely.json"]) {
                        let data = r.files["lovely.json"].content
                        state.gist_data.twitter = JSON.parse(data).twitter
                        //console.log("设置gist twitter data ", JSON.parse(data).twitter)
                    }
                }
            })
        },
        SET_GIST_LOC_TWITTER_DATA: (state, gist_twitter_data) => {
            state.gist_data.twitter = []
            state.gist_data.twitter = gist_twitter_data
        },
        SET_GIST_TOKEN_DATA: (state, gist_token_data) => {
            //console.log("设置gist token data ", gist_token_data)
            state.gist_data.token = gist_token_data
        }
    },
    actions: {
        SetGistTokenData({
            commit
        }, gist_token_data) {
            commit('SET_GIST_TOKEN_DATA', gist_token_data)
        },
        GistInit({
            commit
        }) {
            GistGetToken().then(response => {
                if (response) {
                    for (let i = 0; i < response.length; i++) {
                        let data = response[i]
                        if (data.files["lovely.json"]) {
                            commit('SET_GIST_TOKEN_DATA', data.id)
                            commit('SET_GIST_TWITTER_DATA', data.id)
                            return
                        }
                        if (i + 1 == response.length) {
                            console.info("需要新建,不要刷新页面,gist有缓存,没更新那么快")
                            //初始化数据
                            GistCreated().then(c_response => {
                                if (c_response.id) {
                                    commit('SET_GIST_TOKEN_DATA', c_response.id)
                                    commit('SET_GIST_TWITTER_DATA', data.id)
                                }
                            })
                        }
                    }
                }
            })
        }
    }
}

export default gist