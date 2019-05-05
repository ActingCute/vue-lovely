import axios from 'axios'
import {
    Message
} from 'element-ui'

import Gist from './config'

import store from 'vuex'

const gist = axios.create({
    baseURL: "https://api.github.com/", // api的base_url
    timeout: 5000 // request timeout
})

gist.interceptors.request.use(config => {
    console.log("Gist -- ",Gist)
    config.headers['Content-Type'] = 'application/json'
    if (Gist.token) {
        config.headers['Authorization'] = 'token ' + Gist.token
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

gist.interceptors.response.use(response => {
        return response.data
    },
    error => {
        console.error('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default gist