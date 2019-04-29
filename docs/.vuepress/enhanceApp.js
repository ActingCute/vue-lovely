// .vuepress/enhanceApp.js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import store from './theme/store'
import storage from './theme/storage'

import {Code} from './theme/api'
import {
    Msg
} from './theme/util'

import {QiniuUploadImagesForBase64} from './theme/api/qiniu'



Vue.prototype.Storage = storage;
Vue.prototype.Code = Code;
Vue.prototype.Msg = Msg;
Vue.prototype.QiniuUploadImagesForBase64 = QiniuUploadImagesForBase64;

export default ({
    Vue
}) => {
    Vue.use(mavonEditor);
    Vue.use(store);
    Vue.use(ElementUI);
}