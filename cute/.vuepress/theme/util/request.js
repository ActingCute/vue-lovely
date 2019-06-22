import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  GetConfig
} from "./index"

import {
  getToken
} from './auto'

const c = GetConfig()

const service = axios.create({
  baseURL: c.base_url, // api的base_url
  timeout: 50000 // request timeout
})

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  let token = getToken()
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(response => {
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

export default service