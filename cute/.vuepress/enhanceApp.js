import storage from './theme/storage'
import {
    Code
} from './theme/api'
import {
    FormatGoTime,
    GetPostDate,
    GetPostTag,
    GetPostTime,
    GetRandomItem,
    GetUrl,
    IsBlog,
    Msg,
    SetSidebarPostion
} from './theme/util'
import store from './theme/store'

import './theme/styles/index.styl'

import Element from 'element-ui'
//ico
import './theme/ico/lovely_ico/iconfont.css'

import Viewer from 'v-viewer'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData // 站点元数据
}) => {
    //选出blog data
    let webData = ["/Commits/", "/Harem/", "/History/", "/Message/", "/Twitter/"]
    let blogData = siteData.pages.filter(sD => webData.indexOf(sD.path) == -1 && sD.path != "/")
    let navData = siteData.pages.filter(sD => webData.indexOf(sD.path) != -1 && sD.path != "/")

    //对文章进行排序
    blogData.sort((a, b) => {
        return b.lastUpdated-a.lastUpdated;
    })

    Vue.prototype.siteData = siteData
    Vue.prototype.blogData = blogData
    Vue.prototype.navData = navData

    Vue.prototype.Storage = storage;
    Vue.prototype.Code = Code;
    Vue.prototype.Msg = Msg;
    Vue.prototype.FormatGoTime = FormatGoTime;
    Vue.prototype.$store = store;

    Vue.prototype.GetPostTag = GetPostTag
    Vue.prototype.GetPostTime = GetPostTime
    Vue.prototype.GetPostDate = GetPostDate
    Vue.prototype.SetSidebarPostion = SetSidebarPostion
    Vue.prototype.IsBlog = IsBlog
    Vue.prototype.GetUrl = GetUrl
    Vue.prototype.GetRandomItem = GetRandomItem

    Vue.prototype.Config = siteData.themeConfig
    Vue.prototype.Harem = siteData.themeConfig.harem

    Vue.use(Element)

    Vue.use(mavonEditor)

    Vue.use(Viewer, {
        defaultOptions: {
            zIndex: 9999
        }
    })

    Vue.component("anchored-heading", {
        render: function (createElement) {
            let title = this.title;
            let slug = this.slug;
            return createElement("h" + this.level, [
                createElement(
                    "a", {
                        attrs: {
                            href: "#" + slug
                        }
                    },
                    title
                )
            ]);
        },
        props: {
            level: {
                type: Number,
                required: true
            },
            slug: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    });

}