// .vuepress/enhanceApp.js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './theme/store'
import storage from './theme/storage'

import Code from './theme/util/api'
import {
    Msg
} from './theme/util'

Vue.prototype.Storage = storage;
Vue.prototype.Code = Code;
Vue.prototype.Msg = Msg;

export default ({
    Vue
}) => {
    Vue.use(store);
    Vue.use(ElementUI);
}