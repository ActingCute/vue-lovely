import axios from 'axios'
import {Message} from 'element-ui'


const service = axios.create({
  baseURL: "http://127.0.0.1:9527", // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
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
