//app
import request from '../util/request'
import {Service} from './index'

export function GetRunTime() {
    //console.log("Service.CommentGet --- ",Service.CommentGet)
    return request({
        url: Service.GetRunTime,
        method: 'get',
    })
}