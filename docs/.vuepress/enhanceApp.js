// .vuepress/enhanceApp.js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './theme/store'
import storage from './theme/storage'

import Code from './theme/util/api'

import {
    Message
} from 'element-ui';

Vue.prototype.Message = Message;
Vue.prototype.Storage = storage;
Vue.prototype.Code = Code;

export default ({
    Vue
}) => {
    Vue.use(store);
    Vue.use(ElementUI);
}