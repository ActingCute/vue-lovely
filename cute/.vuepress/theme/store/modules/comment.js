import {
    CommentGet
} from "../../api/comment";

import {
    Code
} from '../../api/index';

import {
    Msg
} from '../../util'

let comment = {
    state: {
        comment_data: []
    },

    mutations: {
        SET_COMMENT_DATA: (state, comment_data) => {
            console.log("设置comment data ", comment_data)
            state.comment_data = null
            state.comment_data = comment_data
        }
    },

    actions: {
        SetCommentData({
            commit
        }, url) {
            CommentGet({
                url
            }).then(response => {
                let code = response.Result;
                switch (code) {
                    case Code.SUCCESS:
                        commit('SET_COMMENT_DATA', response.Data)
                        break;
                    default:
                        Msg("code:" + code + " 获取评论失败", 2);
                }
            })
        }
    }
}

export default comment