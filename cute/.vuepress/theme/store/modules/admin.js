import {
    AdminCheckLogin,
    AdminLogin
} from "../../api/admin";
import {setToken} from '../../util/auto'

import { Message } from 'element-ui'

let admin = {
    state: {
        data: [],
        has_data: true,
        loading: false
    },

    mutations: {
        SET_ADMIN_DATA: (state, admin_data) => {
            console.log("设置ADMIN data ", admin_data)
            state.data = admin_data

        },
        SET_ADMIN_LOADING: (state, loading) => {
            state.loading = loading
        }
    },

    actions: {
        SetAdminData({
            commit
        }, data) {
            commit('SET_ADMIN_LOADING', true)
            AdminLogin(data).then(response => {
                console.log("response --- ",response)
                commit('SET_ADMIN_LOADING', false)
                if (response) {
                    if (response.Result != 10000){
                        Message({
                            message: response.Message,
                            type: 'error',
                            duration: 5 * 1000
                          })
                        return
                    }
                    if (response.Data) {
                        if (response.Data.token){
                            commit('SET_ADMIN_DATA', response.Data)
                            setToken(response.Data.token)
                        }
                    }
                } else {
                    console.error("获取不到admin登陆数据呢~")
                }
            })
        },
        CheckAdmin({
            commit
        }) {
            AdminCheckLogin().then(response => {
                console.log(response)
                if (response) {
                    if (response.Data) {
                        if (response.Data.token){
                            commit('SET_ADMIN_DATA', response.Data)
                            setToken(response.Data.token)
                        }
                    }
                } else {
                    console.error("获取不到admin数据呢~")
                }
            })
        }
    }
}

export default admin