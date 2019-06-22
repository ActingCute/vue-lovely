//admin
import request from '../util/request'
import {Service} from './index'

export function AdminLogin(data) {
    return request({
        url: Service.AdminLogin,
        method: 'POST',
        data
    })
}

export function AdminCheckLogin() {
    return request({
        url: Service.AdminCheckLogin,
        method: 'GET'
    })
}