const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const QiniuDomain = "http://lovely.haibarai.com/"
module.exports = {
    title: 'Hello ActingCute',
    port: 1314,
    description: '今天也要打起精神来',
    dest: "dist/html",
    themeConfig: {
        own: {
            name: "ActingCute酱",
            portrait: QiniuDomain + "aimi.jpg",
            cover: QiniuDomain + "me.jpg"
        },
        head_cover: QiniuDomain + "bg1.jpg?imageView2/0/format/jpg/interlace/1/q/75|watermark/2/text/QEFjdGluZ0N1dGXphbE=/font/5a6L5L2T/fontsize/500/fill/I0VGRUZFRg==/dissolve/60/gravity/SouthEast/dx/10/dy/10|imageslim",
        moving_graph: [{
                src: QiniuDomain + "mbg1.png",
                class: "left animated infinite bounce slow delay-1s"
            },
            {
                src: QiniuDomain + "mbg3.png",
                class: "right animated infinite bounce slow delay-3s"
            },
            {
                src: QiniuDomain + "mbg1.png",
                class: "left animated infinite bounce slow delay-2s"
            },
            {
                src: QiniuDomain + "mbg3.png",
                class: "right animated infinite bounce slow delay-4s"
            },
        ],
        foot_cover: QiniuDomain + "foot.png",
        record_number: "粤ICP备15047722号-1 ",
        none_text:"啥都没有呢！有点失望了~",
        random_text:[
            "真正重要的东西，自己用心对待，没人......能够夺走的.",
            "懂得努力的人早就努力了，不愿意努力的人，一百句口号也没用。而且这世界上最后占据中央舞台的，是超级努力的天才，或者一般努力的超天才，智能平庸者，再怎么努力，也是做人的附庸.",
            "一个从心底就不相信奇迹的人，就算奇迹来到他面前他也不会珍惜的",
            "每当不经意闻到那一缕学生时代的橡皮香味，总会让人有一刹那的恍惚，回想起学生时代那一块怎么也舍不得擦的漂亮橡皮。",
            "上天入地、摘星揽月并非什么奇迹，真正的奇迹是：沧海桑田之后，那个说要爱你一生一世的人，仍然等在原地，期望得到你一个拥抱......"
        ]
    },
    head: [
        [
            'link',
            {
                rel: "stylesheet",
                type: "text/css",
                href: 'https://libs.cdnjs.net/dplayer/1.25.0/DPlayer.min.css'
            },
        ],
        [
            'link',
            {
                rel: "stylesheet",
                type: "text/css",
                href: 'https://libs.cdnjs.net/element-ui/2.8.2/theme-chalk/index.css'
            }
        ],
        [
            'link',
            {
                rel: "stylesheet",
                type: "text/css",
                href: 'https://libs.cdnjs.net/animate.css/3.7.0/animate.min.css'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/dplayer/1.25.0/DPlayer.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/vue/2.6.10/vue.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/vuex/3.1.1/vuex.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/axios/0.19.0/axios.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/element-ui/2.8.2/index.js'
            }
        ],
    ],
    configureWebpack: (config, isServer) => {
        if (!isServer) {
            //开启gizp
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }));
            //告诉webpack,下面的东东不打包啦
            config.externals = {
                'vue': 'Vue',
                'element-ui': 'ELEMENT',
                'vuex': 'Vuex',
                'axios': 'axios'
            }
        }
    }
}