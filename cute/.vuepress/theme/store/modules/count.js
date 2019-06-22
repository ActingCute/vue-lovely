import {
    CountAddAndGet
} from "../../api/count";

import {
    Code
} from '../../api/index';

import {
    Msg
} from '../../util'

let count = {
    state: {
        count_data: {
            page_count: {
                count: 1
            },
            web_count: {
                count: 1
            }
        }
    },

    mutations: {
        SET_COUNT_DATA: (state, count_data) => {
            //console.log("设置count data ", count_data)
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
                        Msg("code:" + code + " 获取浏览数失败", 2);
                }
            })
        }
    }
}

export default count