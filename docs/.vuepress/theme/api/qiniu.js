import request from '../util/request'
import {
    Service
} from './index'
import Axios from 'axios';

const QiniuUploadPath = "http://up-z0.qiniup.com"

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

export async function QiniuUploadImagesForBase64($file) {
    //获取上传的key
    QiniuGetToken($file.name).then(response => {
        let code = response.Result
        console.log("response ---", response)
        switch (code) {
            case this.Code.SUCCESS:
                //上传成功后更新预览用到
                //转化为合法的base
                let imageData = $file.miniurl
                imageData = imageData.replace("data:image/webp;base64,", "")
                imageData = imageData.replace("data:image/png;base64,", "")
                let newPic = response.Data.key //先保存好当前的七牛路径，若上传成功则使用它
                var url = QiniuUploadPath + "/putb64/" + fileSize(imageData)
                //将图片上传七牛
                Axios({
                    url,
                    method: 'POST',
                    data: imageData,
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Authorization': "UpToken " + response.Data.token
                    },
                }).then(res => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾
                    console.log("res --- ", res, newPic)
                }).catch(error => {
                    this.Msg(code + "上传失败", 1)
                    console.error(error)
                })
                return
            default:
                this.Msg(code + ":获取上传信息失败，不能上传图片", 2)
                return
        }
    }).catch((err) => {
        console.log(err)
        this.Msg("获取上传信息失败，不能上传图片", 2)
    })

}

function fileSize(str) {
    var fileSize;
    if (str.indexOf('=') > 0) {
        var indexOf = str.indexOf('=');
        str = str.substring(0, indexOf); //把末尾的=号去掉
    }
    fileSize = parseInt(str.length - (str.length / 8) * 2);
    return fileSize;
}