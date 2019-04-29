import request from './request'

const Code = {
    SUCCESS: 10000, //请求成功
    FAILED: 10001, //请求失败
    UNKNOWE_RROR: 10002, //未知错误
    PARAMETER_ERROR: 10003, //参数错误
    MARSHAL_ERROR: 10004, //序列化错误
    UNMARSHAL_ERROR: 10005, //反序列化错误
    SQL_CONNECT_ERROR: 10006, //数据库连接错误
    SQL_ERROR: 10007, //数据库出现错误
    DEFAULT_FIELD: 10008, //默认参数不能修改
    CUSTOM_ERROR: 10009, //自定义错误
    EXIST_FAILED: 10010, //存在操作失败项
    TEXT_TOO_LOANG: 10011, //文本太长了
}

export default Code



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