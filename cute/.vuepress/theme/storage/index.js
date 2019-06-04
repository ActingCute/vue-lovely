/*
 * storage.js
 */

/*
 * @Explain:为了不new对象，只能多写几遍
 * @Example:
 *
 * 1、LocalStorage的使用
 * import storage from '@/storage'
 * storage.setItem('rem0',[1,2,3,4,5,6])
 * storage.setItem('rem1',{userId:'dfdf',token:11232323})
 * storage.setItem('rem2','dfdfdf')
 * console.log(storage.getItem('rem0'))
 * console.log(storage.getItem('rem1'))
 * console.log(storage.getItem('rem2'))
 * storage.removeItem('rem0')
 *
 *
 * 2、SessionStorage的使用
 * storage.setItem('rem0',[1,2,3,4,5,6],{type:'session'})
 *
 * */

// TODO:其他方法的实现
// TODO:超时时间的设置

/*
 * 方法实现
 * */
import local from './localstorage.js'
import session from './session.js'
import cookies from './cookies.js'
import json from './json.js'

/*
* 函数体
* */
let storage= {
  config:{
    type:'local',// local,session,cookies,json
    expires:new Date().getTime() + 100 * 24 * 60 * 60 * 1000
  },
  getStorage(options){
    let config={}
    if(options){
      config=Object.assign({},this.config,options)
    }else{
      config=this.config
    }
    return this.createStorage(config.type)
  },
  createStorage(name){
    switch(name){
      case 'local':return local;break
      case 'session':return session;break
      case 'cookies':return cookies;break
      case 'json':return json;break
    }
  },
  getItem(key,options){
    let store=this.getStorage(options)
    return store.getItem(key)
  },
  setItem(key, value,options){
    let store=this.getStorage(options)
    store.setItem(key,value)
  },
  removeItem(key,options){
    let store=this.getStorage(options)
    store.removeItem(key)
  },
  getAll(){},
  clear(options){
    let store=this.getStorage(options)
    store.clear()
  },
  key(n){},
  lenght(){},
  has(key){},
  forEach(cb){},
  deleteAllExpires(){},
  // 获取最大存储空间：只有LocalStorage和SessionStorage可以使用这个方法
  getMaxSpace(options){
    let store=this.getStorage(options)
    store.getMaxSpace()
  },
  // 获取使用了的空间：只有LocalStorage和SessionStorage可以使用这个方法
  getUsedSpace(options){
    let store=this.getStorage(options)
    store.getUsedSpace()
  }

}
export default storage

// https://segmentfault.com/a/1190000002458488
// 5、遍历localStorage存储的key
//     .length 数据总量，例：localStorage.length
//     .key(index) 获取key，例：var key=localStorage.key(index);

// 备注：localStorage存数的数据是不能跨浏览器共用的，一个浏览器只能读取各自浏览器的数据,储存空间5M。

// 超时设置
//  function(st, key, value, expires) {
//     if (st == 'l') {
//         st = window.localStorage;
//         expires = expires || 60;
//     } else {
//         st = window.sessionStorage;
//         expires = expires || 5;
//     }
//     if (typeof value != 'undefined') {
//         try {
//             return st.setItem(key, JSON.stringify({
//                 data: value,
//                 expires: new Date().getTime() + expires * 1000 * 60
//             }));
//         } catch (e) {}
//     } else {
//         var result = JSON.parse(st.getItem(key) || '{}');
//         if (result && new Date().getTime() < result.expires) {
//             return result.data;
//         } else {
//             st.removeItem(key);
//             return null;
//         }
//     }
// }
