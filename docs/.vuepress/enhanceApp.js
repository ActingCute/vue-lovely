// .vuepress/enhanceApp.js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './theme/store'
import storage from './theme/storage'

import {
    Message
} from 'element-ui';

Vue.prototype.Message = Message;
Vue.prototype.Storage = storage;

export default ({
    Vue
}) => {
    Vue.use(store);
    Vue.use(ElementUI);
}