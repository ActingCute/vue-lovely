import request from '@/utils/request'

const Service = {
    //comment
    CommentGet: "/v1/comment/get",
    CommentAdd: "/v1/comment/add",

    //count
    CountGet: "/v1/count/get",
    CountAdd: "/v1/count/add"
}

//comment
export function CommentGet(data) {
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

//count
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