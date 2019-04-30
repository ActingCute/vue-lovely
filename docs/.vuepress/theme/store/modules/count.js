import {
    CountAddAndGet
} from "../../api/count";

import {
    Code
} from '../../api/index';

let count = {
    state: {
        count_data: []
    },

    mutations: {
        SET_COUNT_DATA: (state, count_data) => {
            console.log("设置count data ", count_data)
            state.count_data = null
            state.count_data = count_data
        }
    },

    actions: {
        SetCountData({
            commit
        }, url) {
            CountAddAndGet({
                url
            }).then(response => {
                let code = response.Result;
                switch (code) {
                    case Code.SUCCESS:
                        commit('SET_COUNT_DATA', response.Data)
                        break;
                    default:
                        this.Msg("code:" + code + " 获取浏览数失败", 2);
                }
            })
        }
    }
}

export default count