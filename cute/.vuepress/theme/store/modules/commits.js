import {
    CommitsGet
} from "../../api/gist";

let commits = {
    state: {
        data: [],
        has_data: true
    },

    mutations: {
        SET_COMMITS_DATA: (state, commits_data) => {
            console.log("设置commits data ", commits_data)
            if (commits_data.length < 30) {
                state.has_data = false
            }
            commits_data.forEach(d => {
                state.data.push(d)
            });
        }
    },

    actions: {
        GetCommitsData({
            commit
        }, data) {
            CommitsGet(data).then(response => {
                if (response) {
                    if (response.length > 0) {
                        commit('SET_COMMITS_DATA', response)
                    }
                } else {
                    console.info("获取不到commits呢~")
                }
            })
        }
    }
}

export default commits