//comment
import request from '../util/request'
import {Service} from './index'

export function CommentGet(data) {
    console.log("Service.CommentGet --- ",Service.CommentGet)
    return request({
        url: Service.CommentGet,
        method: 'POST',
        data
    })
}
export function CommentAdd(data) {
    return request({
        url: Service.CommentAdd,
        method: 'POST',
        data
    })
}