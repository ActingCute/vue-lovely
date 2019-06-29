<template>
    <div id="wangeditor">
        <div>
            <el-input type="textarea" :rows="2" placeholder="说点什么好呢" v-model="editorContent">
            </el-input>
        </div>
        <el-upload class="uploader" action="http://up-z0.qiniup.com" :data="qiniu" :show-file-list="false"
            :on-success="handleImgSuccess" :before-upload="beforeImgUpload">
            <i class="ico el-icon-picture"></i>
        </el-upload>
        <el-upload class="uploader" action="http://up-z0.qiniup.com" :data="qiniu" :show-file-list="false"
            :on-success="handleVdoSuccess" :before-upload="beforeVdoUpload">
            <i class="ico el-icon-video-camera-solid"></i>
        </el-upload>
    </div>
</template>
<script>
    import {
        QiniuGetToken
    } from "../api/qiniu"

    export default {
        name: 'Wangeditor',
        computed: {
            is_mb() {
                return this.$store.getters.is_mb;
            }
        },
        data() {
            return {
                editor: null,
                editorContent: '',
                qiniu: {
                    action: "http://up-z2.qiniup.com",
                    domain: "http://lovely.haibarai.com/",
                    token: "",
                    key: ""
                }
            }
        },
        props: ['catchData'], // 接收父组件的方法
        watch: {
            editorContent(new_val, old_val) {
                this.catchData(new_val)
            }
        },
        mounted() {

        },
        methods: {
            beforeImgUpload(file) {
                console.log(file.type)
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.Msg('上传图片只能是 JPG PNG 格式!', 2);
                    return
                }
                console.log(file.name)
                const _self = this;
                return new Promise((resolve, reject) => {
                    QiniuGetToken()
                        .then(response => {
                            console.log('upload -- ', response)
                            let code = response.Result;
                            switch (code) {
                                case 10000:
                                    _self._data.qiniu = response.Data
                                    break;
                                default:
                                    _self.Msg(code + ":获取上传信息失败，将不能上传图片", 2);
                                    return;
                            }
                            resolve(true);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(false);
                        });
                });
            },
            handleImgSuccess(response, file, fileList) {
                this.editor.txt.append('<img src="http://' + this.qiniu.domain + "/" + response.key + '"/>')
            },
            beforeVdoUpload(file) {
                console.log(file.type)
                const isMP4 = file.type === 'video/mp4';
                if (!isMP4) {
                    this.Msg('上传视频只能是 MP4 格式!', 2);
                    return
                }
                console.log(file.name)
                const _self = this;
                return new Promise((resolve, reject) => {
                    QiniuGetToken()
                        .then(response => {
                            console.log('upload -- ', response)
                            let code = response.Result;
                            switch (code) {
                                case 10000:
                                    _self._data.qiniu = response.Data
                                    break;
                                default:
                                    _self.Msg(code + ":获取上传信息失败，将不能上传图片", 2);
                                    return;
                            }
                            resolve(true);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(false);
                        });
                });
            },
            handleVdoSuccess(response, file, fileList) {
                this.editor.txt.append('<img src="http://' + this.qiniu.domain + "/" + response.key + '"/>')
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #wangeditor {
        width: 100%;
    }

    .ico {
        font-size: 25px;
        padding: 10px
    }

    .uploader {
        float: left;
        font-size: 18px;
    }
</style>