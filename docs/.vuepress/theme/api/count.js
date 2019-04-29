//count
import request from '../util/request'
import {Service} from './index'

export function CountGet(data) {
    return request({
        url: Service.CountGet,
        method: 'POST',
        data
    })
}
export function CountAdd(data) {
    return request({
        url: Service.CountAdd,
        method: 'POST',
        data
    })
}