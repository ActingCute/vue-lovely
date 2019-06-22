//twitter
import request from '../util/request'
import {Service} from './index'

export function TwitterGet(data) {
    return request({
        url: Service.TwitterGet,
        method: 'POST',
        data
    })
}


export function TwitterAdd(data) {
    return request({
        url: Service.TwitterAdd,
        method: 'POST',
        data
    })
}

export function TwitterDelete(data) {
    return request({
        url: Service.TwitterDelete,
        method: 'POST',
        data
    })
}