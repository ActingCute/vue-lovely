// .vuepress/enhanceApp.js
import Vue from 'vue'

import { Input,Form,FormItem,Button,Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import './theme/static/lovely_ico/iconfont.css'

import store from './theme/store'
import storage from './theme/storage'

import { Code } from './theme/api'
import {
    Msg,
    FormatGoTime
} from './theme/util'

Vue.prototype.$store = store;
Vue.prototype.Storage = storage;
Vue.prototype.Code = Code;
Vue.prototype.Msg = Msg;
Vue.prototype.FormatGoTime = FormatGoTime;

export default ({
    Vue
}) => {
    Vue.use(Input);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Button);
    Vue.use(Loading);
    Vue.use(mavonEditor);
}