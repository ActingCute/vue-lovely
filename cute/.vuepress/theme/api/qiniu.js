import request from '../util/request'
import {
    Service
} from './index'

export function QiniuGetToken(file_name) {
    console.log(file_name)
    return request({
        url: Service.QiniuGetToken,
        method: 'GET',
        params: {
            file_name
        }
    })
}